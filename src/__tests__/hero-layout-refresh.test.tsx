import { render, screen, within } from '@testing-library/react';
import App from '../App';

describe('hero refresh layout', () => {
  it('uses a blended logo treatment and removes legacy stat labels', () => {
    render(<App />);

    const heading = screen.getByRole('heading', {
      name: /ultra-modern products for ambitious businesses\./i
    });
    const heroSection = heading.closest('section');

    expect(heroSection).not.toBeNull();
    expect(screen.queryByText(/flagship product/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/service area/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/core focus/i)).not.toBeInTheDocument();

    const blend = within(heroSection as HTMLElement).getByTestId('hero-logo-blend');
    expect(blend).toBeInTheDocument();
    expect(blend.closest('.glass-panel')).not.toBeInTheDocument();
  });

  it('positions the visual logo block before the hero headline in DOM order', () => {
    render(<App />);

    const blend = screen.getByTestId('hero-logo-blend');
    const heading = screen.getByRole('heading', {
      name: /ultra-modern products for ambitious businesses\./i
    });

    expect(blend.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
