import { render, screen } from '@testing-library/react';
import { FaqSection } from '../components/sections/FaqSection';
import { LocalPresenceSection } from '../components/sections/LocalPresenceSection';

describe('local seo and aieo content', () => {
  it('renders a dedicated local presence section', async () => {
    render(
      <>
        <LocalPresenceSection />
        <FaqSection />
      </>
    );

    expect(screen.getByRole('heading', { name: /local partner, national reach/i })).toBeInTheDocument();
    expect(screen.getByText(/texas-based, nationwide-ready/i)).toBeInTheDocument();
    expect(screen.getByText(/client fit q&a/i)).toBeInTheDocument();
    expect(screen.getByText(/dallas-fort worth metro coverage/i)).toBeInTheDocument();
    expect(screen.getByText(/how do i make my own app for my business/i)).toBeInTheDocument();
    expect(screen.getByText(/how can i use ai in my business to cut costs/i)).toBeInTheDocument();
  });
});
