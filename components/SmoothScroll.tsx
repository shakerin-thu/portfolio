'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

import { getLenisInstance, setLenisInstance } from '@/lib/lenis-instance';
import { duration, REDUCED_MOTION_QUERY } from '@/lib/motion';

/**
 * Owns the single Lenis smooth-scroll loop for the whole site.
 *
 * Mounted once in the root layout, so inner pages scroll with the same feel as
 * the home page. Honours `prefers-reduced-motion` and re-evaluates it live, and
 * routes same-page anchor links through Lenis so they ease rather than jump.
 */
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    let lenis: Lenis | null = null;
    let frame = 0;

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({ duration: duration.medium + 0.25, smoothWheel: true });
      setLenisInstance(lenis);
      const tick = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = null;
      setLenisInstance(null);
    };

    const sync = () => (query.matches ? stop() : start());

    // Ease same-page anchors instead of letting the browser jump.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const anchor = (event.target as Element | null)?.closest?.('a[href^="#"]');
      const href = anchor?.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      const active = getLenisInstance();
      if (active) active.scrollTo(target as HTMLElement);
      else target.scrollIntoView({ behavior: query.matches ? 'auto' : 'smooth' });
      // Keep the URL and the keyboard focus in step with the visual position.
      history.replaceState(null, '', href);
      (target as HTMLElement).focus?.({ preventScroll: true });
    };

    sync();
    query.addEventListener('change', sync);
    document.addEventListener('click', onClick);

    return () => {
      query.removeEventListener('change', sync);
      document.removeEventListener('click', onClick);
      stop();
    };
  }, []);

  return null;
}
