import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import * as haptics from '../lib/haptics';

describe('mobile and haptic interactions', () => {
  it('renders a mobile navigation trigger', () => {
    render(<App />);

    expect(
      screen.getByRole('button', { name: /open navigation menu/i, hidden: true })
    ).toBeInTheDocument();
  });

  it('fires haptic feedback when opening MattGPT', async () => {
    const hapticSpy = vi.spyOn(haptics, 'triggerHaptic').mockReturnValue(true);

    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole('button', { name: /open mattgpt/i }));

    expect(hapticSpy).toHaveBeenCalledWith('medium');
    hapticSpy.mockRestore();
  });
});
