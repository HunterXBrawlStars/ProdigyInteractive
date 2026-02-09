import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('portfolio category filtering', () => {
  it('shows category controls and filters projects', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(await screen.findByRole('button', { name: /all work/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /products/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /client work/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /experiments/i })).toBeInTheDocument();

    await user.click(await screen.findByRole('button', { name: /client work/i }));

    expect(await screen.findByRole('link', { name: /november roses/i })).toBeInTheDocument();
    expect(await screen.findByRole('link', { name: /the podcast trailer/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /brawl connections/i })).not.toBeInTheDocument();
  });
});
