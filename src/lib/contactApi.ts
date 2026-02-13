export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  projectScope: string;
  // Honeypot field. Must remain empty for legitimate users.
  website?: string;
}

interface ContactApiSuccess {
  ok: true;
}

interface ContactApiError {
  error: string;
}

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT ?? '/api/contact';

function isSuccessPayload(payload: unknown): payload is ContactApiSuccess {
  return Boolean(payload && typeof payload === 'object' && 'ok' in payload && (payload as { ok: unknown }).ok === true);
}

function parseErrorMessage(payload: unknown): string {
  if (payload && typeof payload === 'object' && 'error' in payload) {
    const maybeError = (payload as ContactApiError).error;
    if (typeof maybeError === 'string' && maybeError.trim()) {
      return maybeError.trim();
    }
  }

  return 'We could not send your message right now. Please try again or email mhunter@prodigyinteractive.io.';
}

export async function submitContact(payload: ContactPayload): Promise<void> {
  const response = await fetch(CONTACT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  let body: unknown = null;
  try {
    body = (await response.json()) as unknown;
  } catch {
    body = null;
  }

  if (!response.ok) {
    throw new Error(parseErrorMessage(body));
  }

  if (!isSuccessPayload(body)) {
    throw new Error('Unexpected response from contact service. Please try again.');
  }
}

