import { render, screen } from '@testing-library/react';
import App from '../App';

describe('engagement section', () => {
  it('renders engagement models for prospective clients', async () => {
    render(<App />);

    expect(await screen.findByText(/engagement models/i)).toBeInTheDocument();
    expect(await screen.findByText('Sprint Build')).toBeInTheDocument();
    expect(await screen.findByText('Product Launch')).toBeInTheDocument();
    expect(await screen.findByText('Growth Partner')).toBeInTheDocument();
  });
});
