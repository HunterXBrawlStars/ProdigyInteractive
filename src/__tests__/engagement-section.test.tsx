import { render, screen } from '@testing-library/react';
import { EngagementSection } from '../components/sections/EngagementSection';

describe('engagement section', () => {
  it('renders engagement models for prospective clients', async () => {
    render(<EngagementSection />);

    expect(screen.getByText(/engagement models/i)).toBeInTheDocument();
    expect(screen.getByText('Sprint Build')).toBeInTheDocument();
    expect(screen.getByText('Product Launch')).toBeInTheDocument();
    expect(screen.getByText('Growth Partner')).toBeInTheDocument();
  });
});
