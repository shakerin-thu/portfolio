/**
 * The JSON-LD graph.
 *
 * Search engines use this to attribute the work to a person rather than
 * guessing from headings — which is what decides whether a name search returns
 * a knowledge panel or a blue link. Built here rather than inline in the layout
 * so each page can contribute its own node without the root graph growing a
 * branch for every route.
 *
 * Every node is derived from `content/`, so the structured data cannot drift
 * away from what the page actually says.
 */

import { articles } from '@/content/articles';
import { awards, education, profile, roles } from '@/content/profile';
import { projects } from '@/content/projects';
import { appearances } from '@/content/speaking';
import { absoluteUrl, siteUrl } from './site';

const PERSON_ID = absoluteUrl('/#person');
const WEBSITE_ID = absoluteUrl('/#website');

/** The person node, referenced by `@id` from every other node. */
function person() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: profile.name,
    alternateName: profile.chineseName,
    url: siteUrl,
    email: `mailto:${profile.email}`,
    image: absoluteUrl('/og.jpg'),
    jobTitle: 'Technology & Product',
    description: profile.description,
    knowsLanguage: [...profile.languages],
    knowsAbout: [...profile.disciplines],
    homeLocation: {
      '@type': 'Place',
      name: profile.location.label,
      address: {
        '@type': 'PostalAddress',
        addressLocality: profile.location.city,
        addressCountry: profile.location.country,
      },
    },
    alumniOf: education.map((entry) => ({
      '@type': 'CollegeOrUniversity',
      name: entry.institution,
    })),
    worksFor: roles.map((role) => ({
      '@type': 'Organization',
      name: role.organisation,
    })),
    // `award` is a plain string list in schema.org; the placing and the
    // competition together are what a reader would recognise.
    award: awards.map((entry) => `${entry.context} — ${entry.title} (${entry.year})`),
    sameAs: [profile.links.github],
  };
}

/** The site node. */
function website() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: siteUrl,
    name: profile.name,
    description: profile.description,
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
  };
}

/**
 * The root graph, emitted once in the layout.
 *
 * Projects and essays are included as lightweight nodes so a search engine can
 * see the body of work from the home page alone, without crawling every route.
 */
export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      person(),
      website(),
      ...projects.map((project) => ({
        '@type': 'CreativeWork',
        '@id': absoluteUrl(`/work/${project.slug}#project`),
        name: project.title,
        url: absoluteUrl(`/work/${project.slug}`),
        description: project.summary,
        dateCreated: project.year,
        creator: { '@id': PERSON_ID },
        about: project.category,
      })),
      ...articles.map((article) => ({
        '@type': 'Article',
        '@id': absoluteUrl(`/thinking/${article.slug}#article`),
        headline: article.title,
        url: absoluteUrl(`/thinking/${article.slug}`),
        description: article.excerpt,
        datePublished: article.published,
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        inLanguage: 'en',
      })),
      ...appearances.map((appearance) => ({
        '@type': 'Event',
        '@id': absoluteUrl(`/speaking#${appearance.slug}`),
        name: appearance.title ?? appearance.event,
        url: absoluteUrl(`/speaking#${appearance.slug}`),
        startDate: appearance.published,
        description: appearance.summary,
        location: { '@type': 'Place', name: appearance.location },
        performer: { '@id': PERSON_ID },
        ...(appearance.images?.length
          ? { image: appearance.images.map((image) => absoluteUrl(`/media/${image.src}.jpg`)) }
          : {}),
      })),
    ],
  };
}

/**
 * A breadcrumb trail for an inner page.
 *
 * Google renders these in place of the raw URL in a result, so a project reads
 * as `shakerin.dev › Work › DP Collector` rather than a path.
 */
export function breadcrumbGraph(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Index', path: '/' }, ...trail].map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** Serialise a graph for `dangerouslySetInnerHTML`. */
export function jsonLd(graph: unknown): string {
  // `<` cannot appear raw inside a <script> block without risking an early
  // close; everything here is derived from repository content, but escaping it
  // keeps that true even if content later carries markup.
  return JSON.stringify(graph).replace(/</g, '\\u003c');
}
