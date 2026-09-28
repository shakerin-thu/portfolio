/**
 * Companies co-founded, shown on `/ventures`.
 *
 * The route and its navigation entry appear only when this array has entries,
 * so the site never ships an empty section. Add a venture and the page, the
 * menu item and the sitemap all pick it up.
 */

export type Venture = {
  /** URL-safe id, used as the anchor on the ventures page. */
  slug: string;
  name: string;
  /** Your title, e.g. 'Co-founder'. */
  role: string;
  /** Year founded or registered, e.g. '2025'. */
  founded: string;
  /** Where it operates from, e.g. 'Dhaka, Bangladesh'. */
  location: string;
  /** Current state in your own words, e.g. 'Registered · Building'. */
  status: string;
  /** One sentence for the index and the page summary. */
  summary: string;
  /** The 'about' section. Each string is one paragraph. */
  about: string[];
  /** What the company does — three to six short phrases. */
  focus?: string[];
  /** What *you* do there, as distinct from what the company does. */
  responsibilities?: string[];
  /** Public site, if there is one. Omit rather than linking a placeholder. */
  website?: string;
  /** Optional still. Encode with `npm run media` before referencing it. */
  image?: {
    /** Basename under /media, without extension, e.g. 'venture-one'. */
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const ventures: Venture[] = [
  // Add entries here. Worked example of the expected shape:
  //
  // {
  //   slug: 'example-co',
  //   name: 'Example Co.',
  //   role: 'Co-founder',
  //   founded: '2025',
  //   location: 'Dhaka, Bangladesh',
  //   status: 'Registered · Building',
  //   summary: 'One sentence on what the company does and who it is for.',
  //   about: [
  //     'First paragraph: what the company is and why it exists.',
  //     'Second paragraph: how it works, or where it is headed.',
  //   ],
  //   focus: ['Sourcing', 'Logistics', 'B2B trade'],
  //   responsibilities: ['Product and technology', 'Partner relationships'],
  //   website: 'https://example.com',
  // },
];

export function findVenture(slug: string): Venture | undefined {
  return ventures.find((venture) => venture.slug === slug);
}
