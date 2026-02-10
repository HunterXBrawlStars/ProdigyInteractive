import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('portfolio category filtering', () => {
  it('shows category controls and filters projects', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(await screen.findByRole('button', { name: /all work/i }, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /products/i }, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /client work/i }, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /experiments/i }, { timeout: 5000 })).toBeInTheDocument();

    await user.click(await screen.findByRole('button', { name: /client work/i }, { timeout: 5000 }));

    expect(await screen.findByRole('link', { name: /november roses/i }, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByRole('link', { name: /the podcast trailer/i }, { timeout: 5000 })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /brawl connections/i })).not.toBeInTheDocument();
  });
});
