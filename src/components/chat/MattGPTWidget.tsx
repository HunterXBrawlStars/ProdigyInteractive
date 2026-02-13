import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { type FormEvent, type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { MdClose, MdSmartToy } from 'react-icons/md';
import { mattGptIntro } from '../../content/siteContent';
import { triggerHaptic } from '../../lib/haptics';
import { type MattGptMessage, requestMattGptReply } from '../../lib/mattGptApi';
import { submitContact } from '../../lib/contactApi';

const COOLDOWN_MS = 5_000;
const CLIENT_LIMIT_PER_MINUTE = 6;
const CLIENT_LIMIT_PER_HOUR = 50;
const MINUTE_WINDOW_MS = 60_000;
const HOUR_WINDOW_MS = 3_600_000;
const CLIENT_SENDS_STORAGE_KEY = 'mattgpt-client-sends-v1';

interface ClientLimitState {
  retryAfterMs: number;
}

interface BlockNoticeState {
  type: 'cooldown' | 'client-limit';
  untilMs: number;
}

interface MattGptEmailDraft {
  subject: string;
  body: string;
}

type MattGptUiMessage = MattGptMessage & { emailDraft?: MattGptEmailDraft };

function toCountdownSeconds(milliseconds: number): number {
  return Math.max(1, Math.ceil(milliseconds / 1000));
}

function readClientSendLog(): number[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CLIENT_SENDS_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((value): value is number => typeof value === 'number' && Number.isFinite(value));
  } catch {
    return [];
  }
}

function writeClientSendLog(timestamps: number[]) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(CLIENT_SENDS_STORAGE_KEY, JSON.stringify(timestamps));
  } catch {
    // Ignore write failures (private mode/storage restrictions) and continue gracefully.
  }
}

function getPrunedSendLog(nowMs: number): number[] {
  const windowStart = nowMs - HOUR_WINDOW_MS;
  const timestamps = readClientSendLog()
    .filter((timestamp) => timestamp >= windowStart && timestamp <= nowMs)
    .sort((left, right) => left - right);

  writeClientSendLog(timestamps);
  return timestamps;
}

function getClientLimitState(nowMs: number): ClientLimitState {
  const timestamps = getPrunedSendLog(nowMs);
  const minuteStart = nowMs - MINUTE_WINDOW_MS;
  const minuteTimestamps = timestamps.filter((timestamp) => timestamp >= minuteStart);

  let retryAfterMs = 0;

  if (minuteTimestamps.length >= CLIENT_LIMIT_PER_MINUTE) {
    const oldestInMinute = minuteTimestamps[0];
    retryAfterMs = Math.max(retryAfterMs, MINUTE_WINDOW_MS - (nowMs - oldestInMinute));
  }

  if (timestamps.length >= CLIENT_LIMIT_PER_HOUR) {
    const oldestInHour = timestamps[0];
    retryAfterMs = Math.max(retryAfterMs, HOUR_WINDOW_MS - (nowMs - oldestInHour));
  }

  return { retryAfterMs: Math.max(0, retryAfterMs) };
}

function recordClientSend(nowMs: number) {
  const timestamps = getPrunedSendLog(nowMs);
  timestamps.push(nowMs);
  writeClientSendLog(timestamps);
}

function createInitialMessages(): MattGptMessage[] {
  return [
    {
      role: 'assistant',
      content:
        'Hi, I’m MattGPT. I can help with services, portfolio guidance, project scoping, and drafting a quote-ready email to our team.'
    }
  ];
}

function extractEmailDraft(markdown: string): { cleaned: string; draft: MattGptEmailDraft | null } {
  const fencePattern = /```([a-z0-9_-]*)\s*\r?\n([\s\S]*?)\r?\n```/gi;

  const tryParseDraft = (rawJson: string): MattGptEmailDraft | null => {
    if (!rawJson) {
      return null;
    }

    const normalized = rawJson.trim();
    if (!normalized.startsWith('{') || !normalized.endsWith('}')) {
      return null;
    }

    try {
      const parsed = JSON.parse(normalized) as unknown;
      if (
        parsed &&
        typeof parsed === 'object' &&
        'subject' in parsed &&
        'body' in parsed &&
        typeof (parsed as { subject: unknown }).subject === 'string' &&
        typeof (parsed as { body: unknown }).body === 'string'
      ) {
        return {
          subject: (parsed as { subject: string }).subject.trim(),
          body: (parsed as { body: string }).body.trim()
        };
      }
    } catch {
      return null;
    }

    return null;
  };

  const tryExtractRawJsonObjectDraft = (text: string): { cleaned: string; draft: MattGptEmailDraft | null } => {
    let inString = false;
    let escape = false;
    const stack: number[] = [];

    let bestDraft: MattGptEmailDraft | null = null;
    let bestStart = -1;
    let bestEnd = -1;

    for (let index = 0; index < text.length; index += 1) {
      const char = text[index];

      if (inString) {
        if (escape) {
          escape = false;
          continue;
        }

        if (char === '\\\\') {
          escape = true;
          continue;
        }

        if (char === '"') {
          inString = false;
        }

        continue;
      }

      if (char === '"') {
        inString = true;
        continue;
      }

      if (char === '{') {
        stack.push(index);
        continue;
      }

      if (char === '}' && stack.length > 0) {
        const start = stack.pop();
        if (typeof start !== 'number') {
          continue;
        }

        const candidate = text.slice(start, index + 1);
        const parsedDraft = tryParseDraft(candidate);
        if (parsedDraft) {
          bestDraft = parsedDraft;
          bestStart = start;
          bestEnd = index + 1;
        }
      }
    }

    if (!bestDraft || bestStart < 0 || bestEnd < 0) {
      return { cleaned: text, draft: null };
    }

    const cleaned = `${text.slice(0, bestStart)}${text.slice(bestEnd)}`
      .replace(/^\s*mattgpt_email\s*$/gim, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    return { cleaned, draft: bestDraft };
  };

  let lastMatch: RegExpExecArray | null = null;
  let lastDraft: MattGptEmailDraft | null = null;

  let match = fencePattern.exec(markdown);
  while (match) {
    const raw = match[2]?.trim() ?? '';
    const candidate = tryParseDraft(raw);
    if (candidate) {
      lastMatch = match;
      lastDraft = candidate;
    }
    match = fencePattern.exec(markdown);
  }

  if (!lastMatch || !lastDraft) {
    return tryExtractRawJsonObjectDraft(markdown);
  }

  try {
    const startIndex = typeof lastMatch.index === 'number' ? lastMatch.index : -1;
    if (startIndex < 0) {
      return { cleaned: markdown, draft: null };
    }

    const endIndex = startIndex + lastMatch[0].length;
    const cleaned = `${markdown.slice(0, startIndex)}${markdown.slice(endIndex)}`
      .replace(/^\s*mattgpt_email\s*$/gim, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return { cleaned, draft: lastDraft };
  } catch {
    return { cleaned: markdown, draft: null };
  }
}

function formatEmailDraftBody(body: string): string {
  const normalized = body.replace(/\r\n/g, '\n').trim();
  if (!normalized) {
    return '';
  }

  // If the model already included blank lines, preserve its formatting.
  if (/\n\s*\n/.test(normalized)) {
    return normalized;
  }

  const lines = normalized.split('\n').map((line) => line.trimEnd());
  const nonEmptyLines = lines.filter((line) => line.trim().length > 0);
  const labeledLineCount = nonEmptyLines.filter((line) => /^[^:\n]{2,80}:\s*\S/.test(line)).length;

  // Intake summaries tend to be "Label: value" lines; add blank lines to improve scanability.
  if (nonEmptyLines.length >= 3 && labeledLineCount >= 3) {
    return nonEmptyLines.join('\n\n').trim();
  }

  return normalized;
}

function createInputFieldName(): string {
  const token = Math.random().toString(36).slice(2, 10);
  return `mattgpt_prompt_${token}`;
}

function ThinkingIndicator() {
  return (
    <Stack
      role="status"
      aria-label="MattGPT is thinking"
      aria-live="polite"
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ mt: 0.3 }}
    >
      <Box sx={{ display: 'inline-flex', gap: 0.45 }}>
        {[0, 1, 2].map((dot) => (
          <Box
            key={dot}
            component={motion.span}
            animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut', delay: dot * 0.14 }}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'var(--pi-cyan)',
              boxShadow: '0 0 8px rgba(24, 224, 255, 0.6)'
            }}
          />
        ))}
      </Box>
      <Typography sx={{ color: 'var(--pi-muted)', fontSize: '.82rem', letterSpacing: 0.01 }}>
        MattGPT is thinking
      </Typography>
    </Stack>
  );
}

export function MattGPTWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [cooldownUntilMs, setCooldownUntilMs] = useState(0);
  const [clientLimitUntilMs, setClientLimitUntilMs] = useState(0);
  const [blockNotice, setBlockNotice] = useState<BlockNoticeState | null>(null);
  const [clockMs, setClockMs] = useState(() => Date.now());
  const [inputFieldName, setInputFieldName] = useState(() => createInputFieldName());
  const [messages, setMessages] = useState<MattGptUiMessage[]>(() => createInitialMessages());
  const sessionRef = useRef(0);

  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailDraft, setEmailDraft] = useState<MattGptEmailDraft | null>(null);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderCompany, setSenderCompany] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [emailSendState, setEmailSendState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [emailSendError, setEmailSendError] = useState('');

  const blockNoticeRemainingMs = blockNotice ? Math.max(0, blockNotice.untilMs - clockMs) : 0;
  const blockMessage =
    blockNotice && blockNoticeRemainingMs > 0
      ? blockNotice.type === 'client-limit'
        ? `You’re sending messages too quickly. Try again in ${toCountdownSeconds(blockNoticeRemainingMs)}s.`
        : `Please wait ${toCountdownSeconds(blockNoticeRemainingMs)}s before sending another message.`
      : '';

  useEffect(() => {
    if (!open) {
      return;
    }

    const now = Date.now();
    setClockMs(now);

    const { retryAfterMs } = getClientLimitState(now);
    if (retryAfterMs > 0) {
      setClientLimitUntilMs(now + retryAfterMs);
    }
  }, [open]);

  useEffect(() => {
    if (!open || !blockNotice || blockNotice.untilMs <= clockMs) {
      return;
    }

    const timerId = window.setInterval(() => {
      setClockMs(Date.now());
    }, 1_000);

    return () => window.clearInterval(timerId);
  }, [open, blockNotice, clockMs]);

  useEffect(() => {
    if (blockNotice && blockNotice.untilMs <= clockMs) {
      setBlockNotice(null);
    }
  }, [blockNotice, clockMs]);

  const resetSessionState = () => {
    setDraft('');
    setIsSending(false);
    setCooldownUntilMs(0);
    setClientLimitUntilMs(0);
    setBlockNotice(null);
    setClockMs(Date.now());
    setInputFieldName(createInputFieldName());
    setMessages(createInitialMessages());
    setEmailDialogOpen(false);
    setEmailDraft(null);
    setSenderName('');
    setSenderEmail('');
    setSenderCompany('');
    setEmailSubject('');
    setEmailBody('');
    setEmailSendState('idle');
    setEmailSendError('');
  };

  const openMattGpt = () => {
    triggerHaptic('medium');
    sessionRef.current += 1;
    resetSessionState();
    setOpen(true);
  };

  const closeMattGpt = () => {
    triggerHaptic('light');
    sessionRef.current += 1;
    resetSessionState();
    setOpen(false);
  };

  const openEmailDialog = (draftToSend: MattGptEmailDraft) => {
    triggerHaptic('light');
    setEmailDraft(draftToSend);
    setEmailSubject(draftToSend.subject);
    setEmailBody(formatEmailDraftBody(draftToSend.body));
    setEmailSendState('idle');
    setEmailSendError('');
    setEmailDialogOpen(true);
  };

  const closeEmailDialog = () => {
    triggerHaptic('light');
    setEmailDialogOpen(false);
  };

  const canSendEmail =
    Boolean(senderName.trim()) &&
    Boolean(senderEmail.trim()) &&
    Boolean(emailSubject.trim()) &&
    Boolean(emailBody.trim()) &&
    emailSendState !== 'sending';

  const onConfirmSendEmail = async () => {
    if (!emailDraft || !canSendEmail) {
      return;
    }

    setEmailSendState('sending');
    setEmailSendError('');
    triggerHaptic('medium');

    try {
      await submitContact({
        name: senderName.trim(),
        email: senderEmail.trim(),
        company: senderCompany.trim(),
        projectScope: emailBody.trim(),
        website: '',
        subject: emailSubject.trim(),
        source: 'mattgpt'
      });

      setEmailSendState('sent');
      triggerHaptic('success');
    } catch (error) {
      const message = error instanceof Error && error.message ? error.message : 'Unable to send email right now.';
      setEmailSendState('error');
      setEmailSendError(message);
      triggerHaptic('light');
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const now = Date.now();
    setClockMs(now);

    const message = draft.trim();
    if (!message || isSending) {
      return;
    }
    const activeSession = sessionRef.current;

    const activeClientLimitRemaining = Math.max(0, clientLimitUntilMs - now);
    const { retryAfterMs } = getClientLimitState(now);
    const effectiveLimitRemainingMs = Math.max(activeClientLimitRemaining, retryAfterMs);

    if (effectiveLimitRemainingMs > 0) {
      const untilMs = now + effectiveLimitRemainingMs;
      setClientLimitUntilMs(untilMs);
      setBlockNotice({ type: 'client-limit', untilMs });
      triggerHaptic('light');
      return;
    }

    if (cooldownUntilMs > now) {
      setBlockNotice({ type: 'cooldown', untilMs: cooldownUntilMs });
      triggerHaptic('light');
      return;
    }

    recordClientSend(now);
    setCooldownUntilMs(now + COOLDOWN_MS);
    setBlockNotice(null);

    const historyForRequest = messages.map(({ role, content }) => ({ role, content }));
    const userMessage: MattGptMessage = { role: 'user', content: message };

    setDraft('');
    setIsSending(true);
    setMessages((current) => [...current, userMessage]);
    triggerHaptic('medium');

    try {
      const reply = await requestMattGptReply(message, historyForRequest);
      if (activeSession !== sessionRef.current) {
        return;
      }
      const { cleaned, draft: emailDraftFromReply } = extractEmailDraft(reply);
      setMessages((current) => [...current, { role: 'assistant', content: cleaned, emailDraft: emailDraftFromReply ?? undefined }]);
      triggerHaptic('success');
    } catch (error) {
      if (activeSession !== sessionRef.current) {
        return;
      }
      const fallback =
        error instanceof Error && error.message
          ? error.message
          : 'MattGPT is temporarily unavailable. Please try again.';
      setMessages((current) => [...current, { role: 'assistant', content: fallback }]);
      triggerHaptic('light');
    } finally {
      if (activeSession === sessionRef.current) {
        setIsSending(false);
        setInputFieldName(createInputFieldName());
      }
    }
  };

  const onDraftKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) {
      return;
    }

    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
  };

  return (
    <>
      {!open ? (
        <Button
          variant="contained"
          onClick={openMattGpt}
          aria-label="Open MattGPT"
          startIcon={<MdSmartToy />}
          sx={{
            position: 'fixed',
            right: { xs: 12, md: 22 },
            bottom: { xs: 74, md: 22 },
            borderRadius: '999px',
            zIndex: 1300,
            textTransform: 'none',
            boxShadow: 'var(--pi-glow)',
            '&:active': { transform: 'scale(0.96)' }
          }}
        >
          Open MattGPT
        </Button>
      ) : null}

      <Drawer anchor="right" open={open} onClose={closeMattGpt}>
        <Box
          sx={{
            width: { xs: 320, sm: 390 },
            maxWidth: '100vw',
            height: '100%',
            p: 2,
            background: 'linear-gradient(160deg, #080b1b, #0f1632)'
          }}
        >
          <Stack spacing={2} sx={{ height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" component="h2" sx={{ fontFamily: 'Sora, sans-serif' }}>
                MattGPT
              </Typography>
              <IconButton aria-label="Close MattGPT" onClick={closeMattGpt}>
                <MdClose />
              </IconButton>
            </Stack>

            <Box className="glass-panel" sx={{ p: 1.5 }}>
              <Typography sx={{ fontSize: '.95rem' }}>{mattGptIntro}</Typography>
            </Box>

            <Box className="glass-panel" sx={{ p: 1.2, flex: 1, minHeight: 0, overflowY: 'auto' }}>
              <Stack spacing={1.2}>
                {messages.map((entry, index) => (
                  <Box
                    key={`${entry.role}-${index}`}
                    sx={{
                      alignSelf: entry.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '92%',
                      px: 1.15,
                      py: 0.9,
                      borderRadius: 1.2,
                      backgroundColor:
                        entry.role === 'user' ? 'rgba(24, 224, 255, 0.2)' : 'rgba(126, 180, 255, 0.12)',
                      border: '1px solid rgba(126, 180, 255, 0.25)'
                    }}
                  >
                    {entry.role === 'assistant' ? (
                      <Box
                        sx={{
                          color: 'var(--pi-text)',
                          fontSize: '.92rem',
                          lineHeight: 1.5,
                          '& p': { margin: 0, marginBottom: 0.7 },
                          '& p:last-of-type': { marginBottom: 0 },
                          '& ul, & ol': { margin: 0, marginBottom: 0.7, paddingLeft: '1.25rem' },
                          '& li': { marginBottom: 0.25 },
                          '& h3, & h4': { margin: 0, marginBottom: 0.45, fontSize: '.95rem', fontWeight: 700 }
                        }}
                      >
                        <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml>
                          {entry.content}
                        </ReactMarkdown>
                        {entry.emailDraft ? (
                          <Stack direction="row" spacing={1} sx={{ mt: 1.1 }}>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => openEmailDialog(entry.emailDraft as MattGptEmailDraft)}
                              sx={{ textTransform: 'none' }}
                            >
                              Send to Prodigy Interactive
                            </Button>
                          </Stack>
                        ) : null}
                      </Box>
                    ) : (
                      <Typography sx={{ color: 'var(--pi-text)', fontSize: '.92rem', whiteSpace: 'pre-wrap' }}>
                        {entry.content}
                      </Typography>
                    )}
                  </Box>
                ))}
                {isSending ? <ThinkingIndicator /> : null}
              </Stack>
            </Box>

            <Box component="form" onSubmit={onSubmit} autoComplete="off" sx={{ width: '100%' }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ width: '100%', alignItems: 'stretch' }}>
                <TextField
                  key={inputFieldName}
                  label="Ask MattGPT"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  disabled={isSending}
                  multiline
                  rows={2}
                  autoComplete="off"
                  slotProps={{
                    htmlInput: {
                      name: inputFieldName,
                      onKeyDown: onDraftKeyDown,
                      autoComplete: 'new-password',
                      autoCorrect: 'off',
                      autoCapitalize: 'none',
                      spellCheck: 'false'
                    }
                  }}
                  sx={{
                    flexGrow: 1,
                    width: '100%',
                    '& textarea': {
                      resize: 'none'
                    }
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSending || !draft.trim()}
                  sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: { sm: 118 }, px: 2.2 }}
                >
                  Send
                </Button>
              </Stack>
            </Box>

            {blockMessage ? (
              <Alert severity={blockNotice?.type === 'client-limit' ? 'warning' : 'info'} sx={{ py: 0.5 }}>
                {blockMessage}
              </Alert>
            ) : null}

            <Dialog
              open={emailDialogOpen}
              onClose={closeEmailDialog}
              aria-labelledby="mattgpt-email-dialog-title"
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle id="mattgpt-email-dialog-title">Send email to Prodigy Interactive</DialogTitle>
              <DialogContent dividers>
                <Stack spacing={1.4} sx={{ pt: 0.5 }}>
                  <Typography sx={{ color: 'var(--pi-muted)', fontSize: '.9rem' }}>
                    Review the draft and confirm. We&apos;ll send it to our team and reply to you by email.
                  </Typography>
                  <TextField
                    label="Your name"
                    value={senderName}
                    onChange={(event) => setSenderName(event.target.value)}
                    autoComplete="name"
                  />
                  <TextField
                    label="Your email"
                    value={senderEmail}
                    onChange={(event) => setSenderEmail(event.target.value)}
                    autoComplete="email"
                  />
                  <TextField
                    label="Company (optional)"
                    value={senderCompany}
                    onChange={(event) => setSenderCompany(event.target.value)}
                    autoComplete="organization"
                  />
                  <TextField
                    label="Subject"
                    value={emailSubject}
                    onChange={(event) => setEmailSubject(event.target.value)}
                  />
                  <TextField
                    label="Email body"
                    value={emailBody}
                    onChange={(event) => setEmailBody(event.target.value)}
                    multiline
                    minRows={6}
                  />

                  {emailSendState === 'sent' ? (
                    <Alert severity="success">Email sent.</Alert>
                  ) : null}

                  {emailSendState === 'error' ? (
                    <Alert severity="warning">{emailSendError || 'Unable to send email right now.'}</Alert>
                  ) : null}
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeEmailDialog} sx={{ textTransform: 'none' }}>
                  {emailSendState === 'sent' ? 'Close' : 'Cancel'}
                </Button>
                <Button
                  variant="contained"
                  onClick={onConfirmSendEmail}
                  disabled={!canSendEmail || emailSendState === 'sent'}
                  sx={{ textTransform: 'none' }}
                >
                  {emailSendState === 'sending' ? 'Sending…' : 'Confirm send'}
                </Button>
              </DialogActions>
            </Dialog>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
