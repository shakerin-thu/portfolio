/**
 * Motion tokens shared by CSS and by the scripted transitions.
 *
 * The same values are mirrored as custom properties in `app/styles/tokens.css`;
 * this module exists so TypeScript-driven motion stays in step with the
 * stylesheet rather than drifting into its own set of magic numbers.
 */
export const easing = {
  cinematic: 'cubic-bezier(0.76, 0, 0.24, 1)',
  soft: 'cubic-bezier(0.33, 1, 0.68, 1)',
} as const;

export const duration = {
  fast: 0.35,
  medium: 0.8,
  slow: 1.4,
} as const;

/** The media query used everywhere motion is gated. */
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/** True when the visitor has asked the operating system for reduced motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
