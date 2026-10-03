/**
 * Stages, speeches, panels and ceremonies — shown on `/speaking`.
 *
 * This is where the photographs belong: accepting a prize, presenting to a
 * jury, on a panel, at a podium. The route, its navigation entry and its
 * sitemap record all appear only once this array has entries, so the site never
 * ships an empty section while the photographs are still being gathered.
 *
 * To add one:
 *   1. Drop the photographs into `media-src/` and run `npm run media`.
 *   2. Paste the printed snippet into `images` below and write real `alt` text.
 *   3. Fill in the event, the date and what actually happened.
 */

import type { Proof, SiteImage } from './media';

export type Appearance = {
  /** URL-safe id, used as the anchor for this entry. */
  slug: string;
  /** Display date, YYYY.MM. */
  date: string;
  /** Machine-readable date for <time> and ordering, YYYY-MM-DD. */
  published: string;
  /** What you did there, e.g. 'Keynote', 'Finalist pitch', 'Panellist'. */
  role: string;
  /** The event itself, e.g. 'ISCES 2023'. */
  event: string;
  /** The talk or pitch title. Omit when there was no titled talk. */
  title?: string;
  /** Where it happened, e.g. 'Tongji University, Shanghai'. */
  location: string;
  /** One sentence for the index and the page summary. */
  summary: string;
  /** The longer account. Each string is one paragraph. */
  detail?: string[];
  /** Audience size, jury, format — short factual chips. */
  facts?: string[];
  /** Photographs from the event. The first is used as the lead image. */
  images?: SiteImage[];
  /** Programme page, results announcement, recording. */
  proof?: Proof[];
  /** Slug of the related entry in `projects.ts`, if the talk was about one. */
  project?: string;
};

export const speaking: Appearance[] = [
  // Add entries here, newest first. Worked example of the expected shape:
  //
  // {
  //   slug: 'isces-2023-final',
  //   date: '2023.11',
  //   published: '2023-11-18',
  //   role: 'Finalist pitch',
  //   event: 'ISCES — International Student Conference on Environment & Sustainability',
  //   title: 'DP Collector: making individual recycling visible',
  //   location: 'Tongji University, Shanghai',
  //   summary:
  //     'Presented DP Collector to the ISCES jury and placed second globally.',
  //   detail: [
  //     'What the room was, who was judging, and what you were arguing.',
  //     'What happened, and what you would say differently now.',
  //   ],
  //   facts: ['400+ competing projects', 'UNEP & Tongji University', 'Team of four'],
  //   images: [
  //     {
  //       src: 'isces-2023-stage',
  //       alt: 'Accepting the global second prize on the ISCES stage.',
  //       width: 1600,
  //       height: 1067,
  //       caption: 'Receiving the award, Shanghai, November 2023.',
  //     },
  //   ],
  //   proof: [{ label: 'Results announcement', url: 'https://example.org/results' }],
  //   project: 'dp-collector',
  // },
];

/** Newest first, regardless of the order entries were written in. */
export const appearances: Appearance[] = [...speaking].sort((a, b) =>
  b.published.localeCompare(a.published),
);

export function findAppearance(slug: string): Appearance | undefined {
  return appearances.find((appearance) => appearance.slug === slug);
}

/** Every photograph across every appearance, for the gallery strip. */
export function appearanceImages(): { image: SiteImage; appearance: Appearance }[] {
  return appearances.flatMap((appearance) =>
    (appearance.images ?? []).map((image) => ({ image, appearance })),
  );
}
