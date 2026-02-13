import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactSection } from '../components/sections/ContactSection';

describe('contact form integration', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('submits the contact form to the API and shows a success message', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true })
    });
    vi.stubGlobal('fetch', fetchMock);

    const user = userEvent.setup();
    render(<ContactSection />);

    await user.type(screen.getByLabelText(/name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email/i), 'jane@company.com');
    await user.type(screen.getByLabelText(/company/i), 'Company');
    await user.type(screen.getByLabelText(/project scope/i), 'We need a new website and AI automation.');

    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
    );
    expect(await screen.findByText(/thanks/i)).toBeInTheDocument();
  });
});
