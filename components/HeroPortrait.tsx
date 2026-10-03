import { profile } from '@/content/profile';

/**
 * The hero still.
 *
 * Art-directed: narrow viewports get a tighter, face-centred crop rather than a
 * heavily cropped slice of the wide band. AVIF and WebP are offered ahead of the
 * JPEG fallback, and the element is marked high priority because it is the LCP.
 */
export function HeroPortrait() {
  return (
    <picture>
      <source media="(max-width: 760px)" srcSet="/media/portrait-face.avif" type="image/avif" />
      <source media="(max-width: 760px)" srcSet="/media/portrait-face.webp" type="image/webp" />
      <source media="(max-width: 760px)" srcSet="/media/portrait-face.jpg" type="image/jpeg" />
      <source srcSet="/media/portrait-hero.avif" type="image/avif" />
      <source srcSet="/media/portrait-hero.webp" type="image/webp" />
      <img
        src="/media/portrait-hero.jpg"
        alt={`${profile.name} at a desk of code monitors, lit by neon signs reading ${profile.chineseName} and Hello World.`}
        width={1416}
        height={368}
        fetchPriority="high"
        decoding="async"
      />
    </picture>
  );
}
