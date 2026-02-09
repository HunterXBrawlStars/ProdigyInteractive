import { render, screen } from '@testing-library/react';
import App from '../App';

describe('local seo and aieo content', () => {
  it('renders a dedicated Dallas/Fort Worth local presence section', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /dallas-fort worth digital product partner/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/dfw-first, remote-ready/i)).toBeInTheDocument();
    expect(screen.getByText(/ai answer readiness/i)).toBeInTheDocument();
  });
});
