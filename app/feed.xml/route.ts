import { articles } from '@/content/articles';
import { profile } from '@/content/profile';
import { absoluteUrl } from '@/lib/site';

/**
 * RSS 2.0 feed for the notebook.
 *
 * Written by hand rather than through a library: the feed is four tags around
 * content that already exists, and a dependency here would be a supply-chain
 * risk on a Workers runtime for no gain.
 */

/** Escape the five XML entities. Essay copy contains apostrophes and ampersands. */
function xml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET(): Response {
  const newest = articles
    .map((article) => article.published)
    .sort()
    .at(-1);

  const items = articles
    .map((article) =>
      [
        '    <item>',
        `      <title>${xml(article.title)}</title>`,
        `      <link>${xml(absoluteUrl(`/thinking/${article.slug}`))}</link>`,
        `      <guid isPermaLink="true">${xml(absoluteUrl(`/thinking/${article.slug}`))}</guid>`,
        `      <pubDate>${new Date(article.published).toUTCString()}</pubDate>`,
        `      <description>${xml(article.excerpt)}</description>`,
        // The full essay, so a reader does not have to round-trip to the site.
        `      <content:encoded><![CDATA[${article.body
          .map((paragraph) => `<p>${paragraph.replace(/\*([^*]+)\*/g, '<em>$1</em>')}</p>`)
          .join('\n')}]]></content:encoded>`,
        '    </item>',
      ].join('\n'),
    )
    .join('\n');

  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">',
    '  <channel>',
    `    <title>${xml(`${profile.name} — Thinking`)}</title>`,
    `    <link>${xml(absoluteUrl('/thinking'))}</link>`,
    `    <description>${xml('Short essays on technology, products, markets and the space between disciplines.')}</description>`,
    '    <language>en</language>',
    `    <atom:link href="${xml(absoluteUrl('/feed.xml'))}" rel="self" type="application/rss+xml"/>`,
    ...(newest ? [`    <lastBuildDate>${new Date(newest).toUTCString()}</lastBuildDate>`] : []),
    `    <copyright>© ${new Date().getFullYear()} ${xml(profile.name)}</copyright>`,
    items,
    '  </channel>',
    '</rss>',
  ].join('\n');

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      // The feed is rebuilt with the site, so a long cache is safe and keeps
      // polling readers off the origin.
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

// The feed depends only on repository content, so it is built once rather than
// rendered per request.
export const dynamic = 'force-static';
