const MAX_FIELD_CHARS = 1000;
const MAX_SUBJECT_CHARS = 200;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 12;

const requestBuckets = new Map();

function getClientId(req) {
  const forwardedFor = req?.headers?.['x-forwarded-for'] ?? req?.headers?.['x-real-ip'];
  const first =
    typeof forwardedFor === 'string'
      ? forwardedFor.split(',')[0]?.trim()
      : Array.isArray(forwardedFor) && forwardedFor.length > 0
        ? String(forwardedFor[0]).trim()
        : '';

  return first || 'unknown';
}

function isRateLimited(clientId) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = (requestBuckets.get(clientId) ?? []).filter((timestamp) => timestamp >= windowStart);

  recent.push(now);
  requestBuckets.set(clientId, recent);

  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

export function __resetContactGuardsForTests() {
  requestBuckets.clear();
}

function parseBody(rawBody) {
  if (!rawBody) {
    return {};
  }

  if (typeof rawBody === 'string') {
    try {
      return JSON.parse(rawBody);
    } catch {
      return null;
    }
  }

  if (typeof rawBody === 'object') {
    return rawBody;
  }

  return null;
}

function sanitizeText(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, MAX_FIELD_CHARS);
}

function sanitizeSubject(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, MAX_SUBJECT_CHARS);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function shouldTreatAsSpam(body) {
  const honeypot = sanitizeText(body?.website);
  return Boolean(honeypot);
}

async function sendWithResend({ toEmail, fromEmail, replyToEmail, subject, text }) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: replyToEmail,
      subject,
      text
    })
  });

  if (!response.ok) {
    let message = 'Email provider request failed.';
    try {
      const payload = await response.json();
      if (payload && typeof payload === 'object' && typeof payload.message === 'string' && payload.message.trim()) {
        message = payload.message.trim();
      }
    } catch {
      // ignore parse errors
    }
    const error = new Error(message);
    // @ts-expect-error - attach status for callers.
    error.status = response.status;
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(503).json({ error: 'Contact form is not configured yet. Please try again shortly.' });
  }

  const body = parseBody(req.body);
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Invalid JSON payload.' });
  }

  const clientId = getClientId(req);
  if (isRateLimited(clientId)) {
    return res.status(429).json({ error: 'Rate limit reached. Please wait a minute and try again.' });
  }

  if (shouldTreatAsSpam(body)) {
    return res.status(200).json({ ok: true });
  }

  const name = sanitizeText(body.name);
  const email = sanitizeText(body.email);
  const company = sanitizeText(body.company);
  const projectScope = sanitizeText(body.projectScope);
  const source = sanitizeText(body.source).toLowerCase();
  const requestedSubject = sanitizeSubject(body.subject);

  const isMattGpt = source === 'mattgpt';

  if (!name || name.length < 2) {
    return res.status(400).json({ error: 'Please provide your name.' });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  if (!projectScope || projectScope.length < 10) {
    return res.status(400).json({ error: 'Please briefly describe what you want to build.' });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || 'mhunter@prodigyinteractive.io';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  const subject = requestedSubject || `New inquiry: ${name}${company ? ` (${company})` : ''}`;
  const userAgent = typeof req?.headers?.['user-agent'] === 'string' ? req.headers['user-agent'] : '';
  const messageLabel = isMattGpt ? 'Conversation summary:' : 'Project scope:';
  const text = [
    isMattGpt ? 'New inquiry (MattGPT)' : 'New website inquiry',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : 'Company: (not provided)',
    '',
    messageLabel,
    projectScope,
    '',
    `IP: ${clientId}`,
    userAgent ? `User-Agent: ${userAgent}` : ''
  ]
    .filter(Boolean)
    .join('\n');

  try {
    await sendWithResend({
      toEmail,
      fromEmail,
      replyToEmail: email,
      subject,
      text
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('contact_error', error);
    return res.status(502).json({
      error: 'We could not send your message right now. Please email mhunter@prodigyinteractive.io for immediate help.'
    });
  }
}
