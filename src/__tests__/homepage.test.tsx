import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { PortfolioSection } from '../components/sections/PortfolioSection';

describe('Prodigy Interactive homepage', () => {
  it('renders core service headings', () => {
    render(<App />);

    expect(screen.getByText('Web Design & Hosting')).toBeInTheDocument();
    expect(screen.getByText('Mobile App Development')).toBeInTheDocument();
    expect(screen.getByText('Game Design & Development')).toBeInTheDocument();
    expect(screen.getByText('SEO & AIEO')).toBeInTheDocument();
  });

  it('renders required portfolio and client links', async () => {
    render(<PortfolioSection />);

    expect(
      await screen.findByRole('link', { name: /brawl connections/i }, { timeout: 5000 })
    ).toHaveAttribute('href');
    expect(await screen.findByRole('link', { name: /brawl stars-dle/i }, { timeout: 5000 })).toHaveAttribute(
      'href'
    );
    expect(
      await screen.findByRole('link', {
        name: /power league prodigy draft simulator/i
      }, { timeout: 5000 })
    ).toHaveAttribute('href');
    expect(await screen.findByRole('link', { name: /november roses/i }, { timeout: 5000 })).toHaveAttribute(
      'href',
      'https://novemberroses.com/'
    );
    expect(
      await screen.findByRole('link', { name: /the podcast trailer/i }, { timeout: 5000 })
    ).toHaveAttribute('href', 'https://thepodcasttrailer.com/');
  });

  it('opens MattGPT panel', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole('button', { name: /open mattgpt/i }));

    expect(await screen.findByRole('heading', { name: /mattgpt/i })).toBeInTheDocument();
    expect(await screen.findByText(/services and portfolio guidance/i)).toBeInTheDocument();
  });

  it('hides the bottom quick dock while MattGPT is open', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(await screen.findByRole('link', { name: /^work$/i }, { timeout: 5000 })).toBeInTheDocument();

    await user.click(await screen.findByRole('button', { name: /open mattgpt/i }));

    expect(await screen.findByRole('heading', { name: /mattgpt/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /^work$/i, hidden: true })).not.toBeInTheDocument();
  });

  it('shows contact guidance and direct email alongside the contact form', async () => {
    render(<App />);

    expect(await screen.findByText(/use the form below or email/i)).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /^send$/i })).toBeDisabled();
    expect(await screen.findByRole('link', { name: /mhunter@prodigyinteractive\.io/i })).toHaveAttribute(
      'href',
      'mailto:mhunter@prodigyinteractive.io'
    );
  });
});
