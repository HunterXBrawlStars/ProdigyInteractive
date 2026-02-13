import { scrollToHash } from '../lib/scrollToHash';

function createDomRect(overrides: Partial<DOMRect>): DOMRect {
  return {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    toJSON: () => ({}),
    ...overrides
  } as DOMRect;
}

describe('scrollToHash', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('scrolls to a hash target while accounting for the fixed header height', () => {
    const header = document.createElement('header');
    header.setAttribute('data-pi-site-header', 'true');
    document.body.appendChild(header);
    vi.spyOn(header, 'getBoundingClientRect').mockReturnValue(createDomRect({ height: 60 }));

    const target = document.createElement('section');
    target.id = 'services';
    document.body.appendChild(target);
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue(createDomRect({ top: 500 }));

    Object.defineProperty(window, 'scrollY', { value: 200, configurable: true });

    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    scrollToHash('#services', { extraOffsetPx: 12, behavior: 'auto' });

    expect(scrollToSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        top: 500 + 200 - 60 - 12,
        behavior: 'auto'
      })
    );
  });

  it('returns false when the hash target cannot be found', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    expect(scrollToHash('#missing')).toBe(false);
    expect(scrollToSpy).not.toHaveBeenCalled();
  });
});

