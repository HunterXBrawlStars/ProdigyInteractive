import { beforeEach, describe, expect, it, vi } from 'vitest';

// @ts-expect-error - API route is plain JS in /api for Vercel runtime.
import contactHandler, { __resetContactGuardsForTests } from '../../api/contact.js';

function createReq(options?: {
  method?: string;
  ip?: string;
  body?: Record<string, unknown> | string | null;
}) {
  return {
    method: options?.method ?? 'POST',
    headers: {
      'x-forwarded-for': options?.ip ?? '203.0.113.12',
      'user-agent': 'vitest'
    },
    body:
      options?.body ??
      ({
        name: 'Jane Doe',
        email: 'jane@company.com',
        company: 'Company',
        projectScope: 'We need a new website with AI-assisted intake and analytics.'
      } as const)
  };
}

function createRes() {
  let statusCode = 200;
  let payload: unknown;

  return {
    status(code: number) {
      statusCode = code;
      return this;
    },
    json(body: unknown) {
      payload = body;
      return this;
    },
    getStatus() {
      return statusCode;
    },
    getPayload() {
      return payload as Record<string, unknown>;
    }
  };
}

describe('contact api', () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = 'test-key';
    process.env.CONTACT_TO_EMAIL = 'mhunter@prodigyinteractive.io';
    process.env.CONTACT_FROM_EMAIL = 'onboarding@resend.dev';
    __resetContactGuardsForTests();
    vi.unstubAllGlobals();
  });

  it('returns 503 when RESEND_API_KEY is not configured', async () => {
    delete process.env.RESEND_API_KEY;

    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const res = createRes();
    await contactHandler(createReq(), res);

    expect(res.getStatus()).toBe(503);
    expect(String(res.getPayload().error)).toMatch(/not configured|try again/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('validates required fields before sending', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const res = createRes();
    await contactHandler(
      createReq({
        body: { name: '', email: 'not-an-email', company: '', projectScope: '' }
      }),
      res
    );

    expect(res.getStatus()).toBe(400);
    expect(String(res.getPayload().error)).toMatch(/name|email|scope/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('silently accepts honeypot submissions without sending email', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const res = createRes();
    await contactHandler(
      createReq({
        body: {
          name: 'Spam Bot',
          email: 'spam@example.com',
          company: 'Spam LLC',
          projectScope: 'Spam message.',
          website: 'https://spam.example'
        }
      }),
      res
    );

    expect(res.getStatus()).toBe(200);
    expect(res.getPayload()).toMatchObject({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rate limits repeated requests from a single ip', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'email_123' })
    });
    vi.stubGlobal('fetch', fetchMock);

    let gotRateLimited = false;
    for (let i = 0; i < 25; i += 1) {
      const res = createRes();
      await contactHandler(
        createReq({ ip: '198.51.100.77', body: { name: 'A', email: 'a@b.com', company: 'C', projectScope: `Hi ${i}` } }),
        res
      );
      if (res.getStatus() === 429) {
        gotRateLimited = true;
        break;
      }
    }

    expect(gotRateLimited).toBe(true);
  });

  it('sends contact email via Resend when valid', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'email_123' })
    });
    vi.stubGlobal('fetch', fetchMock);

    const res = createRes();
    await contactHandler(createReq(), res);

    expect(res.getStatus()).toBe(200);
    expect(res.getPayload()).toMatchObject({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0]?.[0]).toMatch(/api\.resend\.com\/emails/i);
  });

  it('uses a provided subject and includes MattGPT email draft labeling when source is mattgpt', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'email_123' })
    });
    vi.stubGlobal('fetch', fetchMock);

    const res = createRes();
    await contactHandler(
      createReq({
        body: {
          name: 'Jane Doe',
          email: 'jane@company.com',
          company: 'Company',
          projectScope: 'Email body from MattGPT.',
          subject: 'Mobile app MVP scoping',
          source: 'mattgpt'
        }
      }),
      res
    );

    expect(res.getStatus()).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const requestOptions = fetchMock.mock.calls[0]?.[1] as RequestInit | undefined;
    const sentPayload = JSON.parse(String(requestOptions?.body ?? '{}')) as Record<string, unknown>;
    expect(sentPayload.subject).toBe('Mobile app MVP scoping');
    expect(String(sentPayload.text)).toMatch(/Email draft/i);
  });
});
