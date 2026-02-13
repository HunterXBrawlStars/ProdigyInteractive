export interface MattGptMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface MattGptApiSuccess {
  reply: string;
}

interface MattGptApiError {
  error: string;
}

const MATTGPT_ENDPOINT = import.meta.env.VITE_MATTGPT_ENDPOINT ?? '/api/mattgpt';

function isSuccessPayload(payload: unknown): payload is MattGptApiSuccess {
  return Boolean(
    payload &&
      typeof payload === 'object' &&
      'reply' in payload &&
      typeof (payload as { reply: unknown }).reply === 'string'
  );
}

function parseErrorMessage(payload: unknown): string {
  if (payload && typeof payload === 'object' && 'error' in payload) {
    const maybeError = (payload as MattGptApiError).error;
    if (typeof maybeError === 'string' && maybeError.trim()) {
      return maybeError;
    }
  }

  return 'MattGPT is temporarily unavailable. Please email mhunter@prodigyinteractive.io for immediate help.';
}

export async function requestMattGptReply(message: string, history: MattGptMessage[]): Promise<string> {
  const response = await fetch(MATTGPT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history })
  });

  let payload: unknown = null;
  try {
    payload = (await response.json()) as unknown;
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new Error(parseErrorMessage(payload));
  }

  if (!isSuccessPayload(payload) || !payload.reply.trim()) {
    throw new Error('MattGPT returned an empty response. Please try again.');
  }

  return payload.reply.trim();
}
