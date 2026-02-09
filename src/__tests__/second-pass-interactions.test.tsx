import { render, screen } from '@testing-library/react';
import App from '../App';

describe('second-pass interaction shell', () => {
  it('renders animated ambient background layer', () => {
    render(<App />);

    expect(screen.getByTestId('ambient-background')).toBeInTheDocument();
  });

  it('renders a scroll progress indicator', () => {
    render(<App />);

    expect(
      screen.getByRole('progressbar', { name: /scroll progress/i })
    ).toBeInTheDocument();
  });
});
