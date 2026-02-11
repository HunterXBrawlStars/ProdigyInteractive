import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('applied business decisions', () => {
  it('uses Book a Strategy Call as the primary call to action', async () => {
    render(<App />);

    const ctaLinks = await screen.findAllByRole('link', { name: /book a strategy call/i });
    expect(ctaLinks.length).toBeGreaterThan(0);
  });

  it('shows custom-quote messaging and routes launch-phase contact to business email', async () => {
    render(<App />);

    const pricingMentions = await screen.findAllByText(/custom quote only/i);
    expect(pricingMentions.length).toBeGreaterThan(0);

    expect(await screen.findByRole('button', { name: /form integration in progress/i })).toBeDisabled();
    expect(await screen.findByRole('link', { name: /mhunter\.locus@gmail\.com/i })).toHaveAttribute(
      'href',
      'mailto:mhunter.locus@gmail.com'
    );
  });

  it('positions MattGPT for both services or portfolio help and project scoping Q&A', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole('button', { name: /open mattgpt/i }));

    expect(await screen.findByText(/services and portfolio/i)).toBeInTheDocument();
    const scopingMentions = await screen.findAllByText(/project scoping/i);
    expect(scopingMentions.length).toBeGreaterThan(0);
  });
});
