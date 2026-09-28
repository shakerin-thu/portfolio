type ArrowDirection = 'up-right' | 'down-right' | 'right';

/**
 * The directional arrow used throughout the site.
 *
 * Drawn rather than typed: Geist ships no glyph for U+2197 / U+2198, so the
 * literal characters fall through to whatever symbol font the operating system
 * happens to have — and render as an empty box where it has none.
 */
export function Arrow({ direction = 'up-right' }: { direction?: ArrowDirection }) {
  return (
    <svg
      className={`icon-arrow icon-arrow--${direction}`}
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4.6 11.4 11.4 4.6M5.9 4.6h5.5v5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
