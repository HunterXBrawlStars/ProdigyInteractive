import { useEffect, useState } from 'react';

function getScrollProgress(): number {
  const doc = document.documentElement;
  const scrollTop = window.scrollY || doc.scrollTop;
  const maxScrollable = doc.scrollHeight - window.innerHeight;

  if (maxScrollable <= 0) {
    return 0;
  }

  return Math.min(1, Math.max(0, scrollTop / maxScrollable));
}

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setProgress(getScrollProgress());
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return progress;
}
