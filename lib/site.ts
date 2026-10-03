/**
 * Canonical origin for the deployed site.
 *
 * `SITE_URL` must be set in the deployment environment. Without it every
 * absolute URL — Open Graph images, canonicals, the sitemap, JSON-LD — would
 * silently resolve against localhost and social previews would break with no
 * visible error, so the fallback is only ever used in local development.
 */
const FALLBACK_ORIGIN = 'http://localhost:3000';

export const siteUrl = (process.env.SITE_URL ?? FALLBACK_ORIGIN).replace(/\/+$/, '');

export const isPlaceholderOrigin = siteUrl === FALLBACK_ORIGIN;

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, `${siteUrl}/`).toString();
}

/**
 * The shared social card.
 *
 * Declaring `openGraph` on a page replaces the parent's object outright rather
 * than merging into it, so any route that sets its own Open Graph data has to
 * repeat the image or ship a link preview with no picture.
 */
export const ogImage = {
  url: '/og.jpg',
  width: 1200,
  height: 630,
  alt: 'Mohammad Sajidus Shakerin — Technology, Product & Ideas',
} as const;
