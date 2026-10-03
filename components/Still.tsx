import type { SiteImage } from '@/content/media';

type StillProps = {
  image: SiteImage;
  /**
   * The LCP image on its page should load eagerly at high priority; everything
   * below the fold should stay lazy. Defaults to lazy, which is right for the
   * galleries this renders.
   */
  priority?: boolean;
  /** Extra class on the wrapping <figure>. */
  className?: string;
  /** Render the caption. Off when the surrounding layout prints its own. */
  showCaption?: boolean;
  /** Fade the figure in as it scrolls into view. See RevealObserver. */
  reveal?: boolean;
};

/**
 * One photograph, in the three formats `npm run media` produces.
 *
 * Deliberately a plain <picture> rather than next/image: every still is already
 * encoded at build time, and the Workers runtime has no image optimiser to call
 * at request time. Centralised here so the AVIF → WebP → JPEG ordering, the
 * dimensions that prevent layout shift and the lazy/async defaults are declared
 * once instead of being retyped at each call site.
 */
export function Still({
  image,
  priority = false,
  className,
  showCaption = true,
  reveal = false,
}: StillProps) {
  const figure = (
    <picture>
      <source srcSet={`/media/${image.src}.avif`} type="image/avif" />
      <source srcSet={`/media/${image.src}.webp`} type="image/webp" />
      {/* A plain <img> rather than next/image: the Workers runtime has no
          request-time optimiser, and these files are already encoded. The
          no-img-element rule permits this inside a <picture>. */}
      <img
        src={`/media/${image.src}.jpg`}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...(priority ? { fetchPriority: 'high' as const } : {})}
      />
    </picture>
  );

  return (
    <figure className={className} {...(reveal ? { 'data-reveal': '' } : {})}>
      {figure}
      {showCaption && image.caption ? <figcaption>{image.caption}</figcaption> : null}
    </figure>
  );
}
