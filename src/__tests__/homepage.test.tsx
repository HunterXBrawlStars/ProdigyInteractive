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

  it('renders required portfolio and client links', () => {
    render(<App />);

    expect(
      screen.getByRole('link', { name: /brawl connections/i })
    ).toHaveAttribute('href');
    expect(screen.getByRole('link', { name: /brawl stars-dle/i })).toHaveAttribute(
      'href'
    );
    expect(
      screen.getByRole('link', {
        name: /power league prodigy draft simulator/i
      })
    ).toHaveAttribute('href');
    expect(screen.getByRole('link', { name: /november roses/i })).toHaveAttribute(
      'href',
      'https://novemberroses.com/'
    );
    expect(
      screen.getByRole('link', { name: /the podcast trailer/i })
    ).toHaveAttribute('href', 'https://thepodcasttrailer.com/');
  });

  it('opens MattGPT stub panel', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /open mattgpt/i }));

    expect(screen.getByRole('heading', { name: /mattgpt/i })).toBeInTheDocument();
    expect(screen.getByText(/ui-only stub/i)).toBeInTheDocument();
  });

  it('shows a stub response on contact submit', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/name/i), 'Alex');
    await user.type(screen.getByLabelText(/email/i), 'alex@example.com');
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));

    expect(
      screen.getByText(/contact workflow is not connected yet/i)
    ).toBeInTheDocument();
  });
});
