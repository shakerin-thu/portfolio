/**
 * The shape of every photograph on the site.
 *
 * Stills are pre-encoded by `npm run media` into three formats at one basename,
 * because the site runs on Cloudflare Workers where there is no runtime image
 * optimiser. `src` is that basename — `award-isces-2023`, not a path or an
 * extension — and `<Still>` expands it to the AVIF / WebP / JPEG trio.
 *
 * `width` and `height` are the encoded file's real pixel dimensions. They are
 * required rather than optional because the browser uses them to reserve space
 * before the image arrives; a wrong pair moves the page as it loads, which is
 * the single most visible quality failure on a slow connection.
 */
export type SiteImage = {
  /** Basename under /media, without extension, e.g. 'award-isces-2023'. */
  src: string;
  /**
   * What is happening in the photograph, for anyone who cannot see it.
   * Describe the moment — 'accepting the first prize on stage' — not the file.
   */
  alt: string;
  /** Real width of the encoded file, in pixels. `npm run media` prints it. */
  width: number;
  /** Real height of the encoded file, in pixels. */
  height: number;
  /** Visible caption printed under the photograph. Optional. */
  caption?: string;
};

/** A link that lets a reader verify a claim for themselves. */
export type Proof = {
  label: string;
  url: string;
};
