import { render, screen } from '@testing-library/react';
import App from '../App';

describe('local seo and aieo content', () => {
  it('renders a dedicated local presence section', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /local partner, national reach/i })).toBeInTheDocument();
    expect(screen.getByText(/texas-based, nationwide-ready/i)).toBeInTheDocument();
    expect(screen.getByText(/client fit q&a/i)).toBeInTheDocument();
  });
});
