'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { prefersReducedMotion } from '@/lib/motion';

/**
 * Reveals any `[data-reveal]` element as it enters the viewport.
 *
 * The hidden starting state lives behind `html[data-reveal-ready]`, which this
 * component sets on mount. If JavaScript never runs the attribute is absent and
 * every section renders fully visible, so the content is never trapped behind
 * an animation that did not fire.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = prefersReducedMotion();
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((element) => element.setAttribute('data-reveal', 'shown'));
      return;
    }

    root.setAttribute('data-reveal-ready', '');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-reveal', 'shown');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
