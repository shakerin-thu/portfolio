/**
 * Single source of truth for identity, contact details and biography.
 *
 * Every page reads from here, so a change to an email address, a link or a
 * job title happens once rather than in five separate JSX literals.
 */

import type { Proof, SiteImage } from './media';

export const profile = {
  name: 'Mohammad Sajidus Shakerin',
  chineseName: '孔献恩',
  shortName: 'MSS',
  role: 'Technology, Product & Ideas',
  tagline: 'I build where technology, design, business and people intersect.',
  description:
    'Mohammad Sajidus Shakerin / 孔献恩 works across technology, product, AI, design, international markets, entrepreneurship and leadership. Computer Science & Technology at Tsinghua University.',
  email: 'shakerin.akash@gmail.com',
  location: {
    city: 'Beijing',
    country: 'China',
    label: 'Beijing, China',
    coordinates: '39.9042° N / 116.4074° E',
    timeZone: 'Asia/Shanghai',
  },
  links: {
    github: 'https://github.com/shakerin-thu',
  },
  disciplines: ['Technology', 'Product', 'International markets', 'Ideas'],
  languages: ['Bengali', 'Hindi', 'Urdu', 'English', 'Chinese'],
} as const;

export type Role = {
  period: string;
  organisation: string;
  title: string;
  detail: string;
};

export const roles: Role[] = [
  {
    period: '2026—',
    organisation: 'Shiweixian',
    title: 'Technical Expert (Trainee)',
    detail:
      'Building an LLM-assisted recommendation layer into the automated fresh-rice milling journey.',
  },
  {
    period: '2025',
    organisation: 'Meituan',
    title: 'Software Development Intern',
    detail:
      'Model evaluation on the FRIDAY multi-model platform; structured case analysis of failure patterns.',
  },
  {
    period: '2025—26',
    organisation: 'Fortune Ahead',
    title: 'Lead IT Designer',
    detail: 'Design and front-of-house technical work across client-facing products.',
  },
  {
    period: '2023—26',
    organisation: 'Raa Trade International',
    title: 'Marketing Manager',
    detail:
      'China-to-South-Asia B2B operations, from sourcing conversations through to delivered accounts.',
  },
  {
    period: '2022—25',
    organisation: 'Rabbani IT Solution',
    title: 'Creative Head',
    // The home page states these as two separate figures — a team of 7–10 led
    // day to day, inside a company of roughly sixty. This read "a team of
    // roughly sixty", which contradicted it. Confirm which is right.
    detail:
      'Led day-to-day creative and operational work within a company of roughly sixty people.',
  },
];

export type Education = {
  period: string;
  institution: string;
  programme: string;
  detail?: string;
};

export const education: Education[] = [
  {
    period: '2022—2026',
    institution: 'Tsinghua University',
    programme: 'Computer Science & Technology',
    detail: 'Chinese Government Scholarship recipient.',
  },
  {
    period: '2021—2022',
    institution: 'Capital Normal University',
    programme: 'Chinese Language Foundation',
    detail: 'Ranked 2nd in cohort.',
  },
];

export type Award = {
  year: string;
  /** The competition or programme. */
  title: string;
  /** The placing, e.g. 'First Prize', 'Winner', 'Finalist'. */
  context: string;
  /** Awarding body, e.g. 'UNDP', 'Tsinghua University'. */
  organiser?: string;
  /** Where it was held, e.g. 'Beijing, China'. */
  location?: string;
  /** Whether it was won alone or with a team. */
  entrant?: 'Individual' | 'Team';
  /** Slug of a related entry in `projects.ts`, if the award was for one. */
  project?: string;
  /** Slug of a related entry in `speaking.ts`, if there are stage photographs. */
  appearance?: string;
  /**
   * Public evidence. Prefer an official results or announcement page over a
   * scanned certificate: it is verifiable, it does not age, and it carries no
   * personal identifiers.
   */
  proof?: Proof[];
  /**
   * A photograph from the event — receiving the award, presenting, the team on
   * stage. Encode it with `npm run media` first, then reference the basename.
   */
  image?: SiteImage;
};

export const awards: Award[] = [
  {
    year: '2026',
    title: 'China–ASEAN Innovation & Entrepreneurship Competition',
    context: 'Third Prize',
  },
  {
    year: '2026',
    title: 'Fudan “Xingquan Cup” Grand Final',
    context: 'Third Prize',
  },
  {
    year: '2025',
    title: 'Universities for Goal 13',
    context: 'Winner',
  },
  {
    year: '2025',
    title: 'National Dialogue China — UNDP',
    context: 'First Prize',
  },
  {
    year: '2025',
    title: 'Beijing College Students’ Innovation & Entrepreneurship Competition',
    context: 'First Prize',
  },
  {
    year: '2023—24',
    title: 'China International University Students I&E Competition',
    context: 'Gold & Silver',
  },
  {
    year: '2023',
    title: 'ISCES — International Student Conference on Environment & Sustainability',
    context: 'Global Second Prize',
  },
];
