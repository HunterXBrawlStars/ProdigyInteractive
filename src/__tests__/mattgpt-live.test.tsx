import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MattGPTWidget } from '../components/chat/MattGPTWidget';

describe('MattGPT live chat', () => {
  afterEach(() => {
    window.localStorage.clear();
    vi.unstubAllGlobals();
  });

  it('submits a prompt to the API and renders the assistant response', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ reply: 'We can scope a 4-week launch for your site.' })
    });

    vi.stubGlobal('fetch', fetchMock);

    const user = userEvent.setup();
    render(<MattGPTWidget />);

    await user.click(screen.getByRole('button', { name: /open mattgpt/i }));
    await user.type(await screen.findByLabelText(/ask mattgpt/i), 'Can you scope a website rebuild?');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/mattgpt',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
    );
    expect(await screen.findByText(/4-week launch/i)).toBeInTheDocument();
  }, 10_000);

  it('shows a helpful fallback message when the API call fails', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'MattGPT is temporarily unavailable. Please email mhunter@prodigyinteractive.io for immediate help.' })
    });

    vi.stubGlobal('fetch', fetchMock);

    const user = userEvent.setup();
    render(<MattGPTWidget />);

    await user.click(screen.getByRole('button', { name: /open mattgpt/i }));
    await user.type(await screen.findByLabelText(/ask mattgpt/i), 'Can you help scope this project?');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect((await screen.findAllByText(/temporarily unavailable/i)).length).toBeGreaterThan(0);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  }, 10_000);

  it('hard-disables input and submit while a request is in-flight', async () => {
    let resolveFetch:
      | ((value: { ok: boolean; json: () => Promise<{ reply: string }> }) => void)
      | undefined;
    const fetchMock = vi.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
    );

    vi.stubGlobal('fetch', fetchMock);

    const user = userEvent.setup();
    render(<MattGPTWidget />);

    await user.click(screen.getByRole('button', { name: /open mattgpt/i }));
    const input = await screen.findByLabelText(/ask mattgpt/i);
    const sendButton = screen.getByRole('button', { name: /send/i });
    await user.type(input, 'Can you scope my project?');
    await user.click(sendButton);

    expect(input).toBeDisabled();
    expect(sendButton).toBeDisabled();
    expect(screen.getByRole('status', { name: /mattgpt is thinking/i })).toBeInTheDocument();

    if (!resolveFetch) {
      throw new Error('Expected fetch resolver to be initialized.');
    }

    resolveFetch({
      ok: true,
      json: async () => ({ reply: 'Absolutely. Let us map goals and timeline.' })
    });

    expect(await screen.findByText(/goals and timeline/i)).toBeInTheDocument();
  });

  it('shows cooldown messaging only after a second send attempt during cooldown', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ reply: 'Done.' })
    });
    vi.stubGlobal('fetch', fetchMock);

    const user = userEvent.setup();
    render(<MattGPTWidget />);

    await user.click(screen.getByRole('button', { name: /open mattgpt/i }));
    await user.type(await screen.findByLabelText(/ask mattgpt/i), 'Can you scope an app?');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(screen.queryByText(/please wait \d+s before sending another message/i)).not.toBeInTheDocument();
    await user.type(await screen.findByLabelText(/ask mattgpt/i), 'Another one');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByText(/please wait \d+s before sending another message/i)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('enforces per-browser limits and shows retry countdown before calling the API', async () => {
    const now = Date.now();
    const minuteBurst = Array.from({ length: 6 }, (_, index) => now - (index + 1) * 1000);
    window.localStorage.setItem('mattgpt-client-sends-v1', JSON.stringify(minuteBurst));

    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const user = userEvent.setup();
    render(<MattGPTWidget />);

    await user.click(screen.getByRole('button', { name: /open mattgpt/i }));
    await user.type(await screen.findByLabelText(/ask mattgpt/i), 'Can we start this project next month?');
    await user.click(screen.getByRole('button', { name: /send/i }));

    const alert = await screen.findByText(/sending messages too quickly/i);
    expect(alert).toHaveTextContent(/sending messages too quickly/i);
    expect(alert.textContent).toMatch(/try again in \d+s/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('removes the Open MattGPT launcher while the drawer is open', async () => {
    const user = userEvent.setup();
    render(<MattGPTWidget />);

    expect(screen.getByLabelText(/open mattgpt/i, { selector: 'button' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /open mattgpt/i }));

    expect(screen.queryByLabelText(/open mattgpt/i, { selector: 'button' })).not.toBeInTheDocument();
  });

  it('removes long placeholder guidance text from the input field', async () => {
    const user = userEvent.setup();
    render(<MattGPTWidget />);

    await user.click(screen.getByRole('button', { name: /open mattgpt/i }));

    expect(screen.queryByPlaceholderText(/ask about services, portfolio examples, or project scoping/i)).not.toBeInTheDocument();
  });

  it('clears historical chat messages after close and reopen', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ reply: 'We can help scope this mobile app.' })
    });
    vi.stubGlobal('fetch', fetchMock);

    const user = userEvent.setup();
    render(<MattGPTWidget />);

    await user.click(screen.getByRole('button', { name: /open mattgpt/i }));
    await user.type(await screen.findByLabelText(/ask mattgpt/i), 'Need help scoping a mobile app build.');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByText(/we can help scope this mobile app/i)).toBeInTheDocument();
    expect(screen.getByText(/need help scoping a mobile app build/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close mattgpt/i }));
    await user.click(await screen.findByRole('button', { name: /open mattgpt/i }));

    expect(screen.queryByText(/need help scoping a mobile app build/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/we can help scope this mobile app/i)).not.toBeInTheDocument();
  });

  it('shows scope guardrails in chat without a duplicate warning alert', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        error: 'MattGPT can only help with Prodigy Interactive site, services, projects, and related scoping topics.'
      })
    });
    vi.stubGlobal('fetch', fetchMock);

    const user = userEvent.setup();
    render(<MattGPTWidget />);

    await user.click(screen.getByRole('button', { name: /open mattgpt/i }));
    await user.type(await screen.findByLabelText(/ask mattgpt/i), 'Write me a fantasy poem');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByText(/can only help with prodigy interactive/i)).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('configures the input to reduce browser history suggestions', async () => {
    const user = userEvent.setup();
    render(<MattGPTWidget />);

    await user.click(screen.getByRole('button', { name: /open mattgpt/i }));
    const input = await screen.findByRole('textbox', { name: /ask mattgpt/i });
    const form = input.closest('form');

    expect(input).toHaveAttribute('autocomplete', 'new-password');
    expect(input).toHaveAttribute('autocorrect', 'off');
    expect(input).toHaveAttribute('autocapitalize', 'none');
    expect(input).toHaveAttribute('spellcheck', 'false');
    expect(form).toHaveAttribute('autocomplete', 'off');
  });

  it('uses a textarea-based prompt field to reduce browser history popups', async () => {
    const user = userEvent.setup();
    render(<MattGPTWidget />);

    await user.click(screen.getByRole('button', { name: /open mattgpt/i }));
    const input = await screen.findByRole('textbox', { name: /ask mattgpt/i });

    expect(input.tagName).toBe('TEXTAREA');
  });

  it('uses a fixed two-line prompt field', async () => {
    const user = userEvent.setup();
    render(<MattGPTWidget />);

    await user.click(screen.getByRole('button', { name: /open mattgpt/i }));
    const input = await screen.findByRole('textbox', { name: /ask mattgpt/i });

    expect(input).toHaveAttribute('rows', '2');
  });

  it('submits on Enter and allows Shift+Enter for a newline', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ reply: 'Perfect. I can scope that next.' })
    });
    vi.stubGlobal('fetch', fetchMock);

    const user = userEvent.setup();
    render(<MattGPTWidget />);

    await user.click(screen.getByRole('button', { name: /open mattgpt/i }));
    const input = await screen.findByRole('textbox', { name: /ask mattgpt/i });

    await user.type(input, 'Can you scope this app build?{enter}');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(await screen.findByText(/scope that next/i)).toBeInTheDocument();

    const nextInput = await screen.findByRole('textbox', { name: /ask mattgpt/i });
    await user.type(nextInput, 'line 1{shift>}{enter}{/shift}line 2');
    expect(nextInput).toHaveValue('line 1\nline 2');
  });

  it('rotates input field identity after each send to reduce browser suggestions', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ reply: 'Great, send over your app details and we can scope this.' })
    });
    vi.stubGlobal('fetch', fetchMock);

    const user = userEvent.setup();
    render(<MattGPTWidget />);

    await user.click(screen.getByRole('button', { name: /open mattgpt/i }));
    const initialInput = await screen.findByRole('textbox', { name: /ask mattgpt/i });
    const initialName = initialInput.getAttribute('name');

    await user.type(initialInput, 'I want to build an app.');
    await user.click(screen.getByRole('button', { name: /send/i }));
    await screen.findByText(/scope this/i);

    const rotatedInput = await screen.findByRole('textbox', { name: /ask mattgpt/i });
    expect(rotatedInput.getAttribute('name')).not.toEqual(initialName);
  });

  it('renders assistant replies with markdown structure', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        reply:
          'Great, we can help.\n\n### Quick intake checklist\n- Company context\n- Primary goals\n- Core features'
      })
    });
    vi.stubGlobal('fetch', fetchMock);

    const user = userEvent.setup();
    render(<MattGPTWidget />);

    await user.click(screen.getByRole('button', { name: /open mattgpt/i }));
    await user.type(await screen.findByLabelText(/ask mattgpt/i), 'I need a mobile app.');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByRole('heading', { name: /quick intake checklist/i, level: 3 })).toBeInTheDocument();
    const checklistItems = await screen.findAllByRole('listitem');
    expect(checklistItems.map((item) => item.textContent)).toEqual(
      expect.arrayContaining(['Company context', 'Primary goals', 'Core features'])
    );
  });

  it('offers to send a quote-ready email draft via Resend after confirmation', async () => {
    const mattGptReply = [
      'Here is a quote-ready email you can send to our team.',
      '',
      '**Subject:** Mobile app MVP scoping',
      '',
      '**Body:**',
      'Hi Prodigy Interactive,',
      '',
      'I want to build a mobile app for my business. The primary goal is to reduce support costs.',
      '',
      'Timeline: 6-8 weeks.',
      'Budget: $15k-$25k.',
      '',
      'Thanks,',
      'Jane',
      '',
      '```mattgpt_email',
      JSON.stringify(
        {
          subject: 'Mobile app MVP scoping',
          body: 'Hi Prodigy Interactive,\n\nI want to build a mobile app for my business. The primary goal is to reduce support costs.\n\nTimeline: 6-8 weeks.\nBudget: $15k-$25k.\n\nThanks,\nJane'
        },
        null,
        2
      ),
      '```'
    ].join('\n');

    const fetchMock = vi.fn().mockImplementation((input: RequestInfo | URL) => {
      const url = typeof input === 'string' ? input : input.toString();
      if (url === '/api/mattgpt') {
        return Promise.resolve({
          ok: true,
          json: async () => ({ reply: mattGptReply })
        });
      }
      if (url === '/api/contact') {
        return Promise.resolve({
          ok: true,
          json: async () => ({ ok: true })
        });
      }
      throw new Error(`Unexpected request to ${url}`);
    });

    vi.stubGlobal('fetch', fetchMock);

    const user = userEvent.setup();
    render(<MattGPTWidget />);

    await user.click(screen.getByRole('button', { name: /open mattgpt/i }));
    await user.type(await screen.findByLabelText(/ask mattgpt/i), 'I want to build an app.');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByText(/here is a quote-ready email you can send/i)).toBeInTheDocument();
    expect(screen.queryByText(/"subject":/i)).not.toBeInTheDocument();

    const sendDraftButton = await screen.findByRole('button', { name: /send to prodigy interactive/i });
    await user.click(sendDraftButton);

    expect(await screen.findByRole('dialog', { name: /send email to prodigy interactive/i })).toBeInTheDocument();

    await user.type(screen.getByLabelText(/your name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/your email/i), 'jane@company.com');

    await user.click(screen.getByRole('button', { name: /confirm send/i }));

    const contactCall = fetchMock.mock.calls.find((call) => call[0] === '/api/contact');
    expect(contactCall).toBeTruthy();
    const [, options] = contactCall as unknown as [string, RequestInit];
    expect(options.method).toBe('POST');
    const parsed = JSON.parse(String(options.body)) as Record<string, unknown>;
    expect(parsed).toMatchObject({
      name: 'Jane Doe',
      email: 'jane@company.com',
      source: 'mattgpt',
      subject: 'Mobile app MVP scoping'
    });
    expect(String(parsed.projectScope)).toMatch(/reduce support costs/i);

    expect(await screen.findByText(/email sent/i)).toBeInTheDocument();
  });

  it('extracts a quote-ready email draft when the model returns a generic json code block', async () => {
    const mattGptReply = [
      'Here is a quote-ready email you can send to our team.',
      '',
      '**Subject:** Test subject',
      '',
      '**Body:**',
      'Hi Prodigy Interactive,',
      '',
      '```json',
      JSON.stringify({ subject: 'Test subject', body: 'Hi Prodigy Interactive,' }, null, 2),
      '```'
    ].join('\n');

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ reply: mattGptReply })
    });

    vi.stubGlobal('fetch', fetchMock);

    const user = userEvent.setup();
    render(<MattGPTWidget />);

    await user.click(screen.getByRole('button', { name: /open mattgpt/i }));
    await user.type(await screen.findByLabelText(/ask mattgpt/i), 'Can you draft an email?');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByRole('button', { name: /send to prodigy interactive/i })).toBeInTheDocument();
    expect(screen.queryByText(/"subject":/i)).not.toBeInTheDocument();
  });

  it('extracts a quote-ready email draft when the model returns raw JSON text (no code fence)', async () => {
    const rawJson = JSON.stringify(
      {
        subject: 'Raw subject',
        body: 'Hello team.'
      },
      null,
      0
    );

    const mattGptReply = `Draft is ready. Please confirm send.\n\n${rawJson}`;

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ reply: mattGptReply })
    });

    vi.stubGlobal('fetch', fetchMock);

    const user = userEvent.setup();
    render(<MattGPTWidget />);

    await user.click(screen.getByRole('button', { name: /open mattgpt/i }));
    await user.type(await screen.findByLabelText(/ask mattgpt/i), 'Draft an email.');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByRole('button', { name: /send to prodigy interactive/i })).toBeInTheDocument();
    expect(screen.queryByText(/"subject":/i)).not.toBeInTheDocument();
  });
});
