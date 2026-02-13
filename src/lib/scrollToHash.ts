export interface ScrollToHashOptions {
  behavior?: ScrollBehavior;
  extraOffsetPx?: number;
  updateHash?: boolean;
}

function clampToDocumentTop(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.max(0, value);
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function scrollToHash(hash: string, options: ScrollToHashOptions = {}): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  const normalized = typeof hash === 'string' ? hash.trim() : '';
  if (!normalized.startsWith('#') || normalized.length < 2) {
    return false;
  }

  const rawId = normalized.slice(1);
  const id = rawId ? decodeURIComponent(rawId) : '';
  if (!id) {
    return false;
  }

  const target = document.getElementById(id);
  if (!target) {
    return false;
  }

  const header = document.querySelector<HTMLElement>('[data-pi-site-header]');
  const headerHeight = header ? header.getBoundingClientRect().height : 0;
  const extraOffsetPx = options.extraOffsetPx ?? 12;

  const targetTop = target.getBoundingClientRect().top + window.scrollY;
  const scrollTop = clampToDocumentTop(targetTop - headerHeight - extraOffsetPx);

  const behavior = options.behavior ?? (prefersReducedMotion() ? 'auto' : 'smooth');

  try {
    window.scrollTo({ top: scrollTop, behavior });
  } catch {
    window.scrollTo(0, scrollTop);
  }

  if (options.updateHash !== false) {
    try {
      window.history.pushState(null, '', normalized);
    } catch {
      // Fallback: can cause native anchor scroll in some browsers, but is better than not updating the URL at all.
      window.location.hash = normalized;
    }
  }

  return true;
}
