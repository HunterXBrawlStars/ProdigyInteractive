import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Prodigy Interactive homepage', () => {
  it('renders core service headings', () => {
    render(<App />);

    expect(screen.getByText('Web Design & Hosting')).toBeInTheDocument();
    expect(screen.getByText('Mobile App Development')).toBeInTheDocument();
    expect(screen.getByText('Game Design & Development')).toBeInTheDocument();
    expect(screen.getByText('SEO & AIEO')).toBeInTheDocument();
  });

  it('renders required portfolio and client links', async () => {
    render(<App />);

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

  it('opens MattGPT stub panel', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole('button', { name: /open mattgpt/i }));

    expect(await screen.findByRole('heading', { name: /mattgpt/i })).toBeInTheDocument();
    expect(await screen.findByText(/services-and-portfolio guidance/i)).toBeInTheDocument();
  });

  it('shows a stub response on contact submit', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(await screen.findByLabelText(/name/i), 'Alex');
    await user.type(await screen.findByLabelText(/email/i), 'alex@example.com');
    await user.click(await screen.findByRole('button', { name: /book a strategy call/i }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/mhunter@prodigyinteractive\.com/i);
  });
});
