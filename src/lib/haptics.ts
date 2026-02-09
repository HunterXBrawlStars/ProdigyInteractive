export type HapticStrength = 'light' | 'medium' | 'success';

const patterns: Record<HapticStrength, number | number[]> = {
  light: 8,
  medium: 16,
  success: [12, 45, 14]
};

export function triggerHaptic(strength: HapticStrength = 'light'): boolean {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') {
    return false;
  }

  return navigator.vibrate(patterns[strength]);
}
