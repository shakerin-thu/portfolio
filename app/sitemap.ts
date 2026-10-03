import type { MetadataRoute } from 'next';

import { articles } from '@/content/articles';
import { projects } from '@/content/projects';
import { ventures } from '@/content/ventures';
import { absoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { path: '/', changeFrequency: 'monthly', priority: 1 },
      { path: '/work', changeFrequency: 'monthly', priority: 0.9 },
      { path: '/thinking', changeFrequency: 'monthly', priority: 0.8 },
      { path: '/awards', changeFrequency: 'yearly', priority: 0.6 },
      { path: '/about', changeFrequency: 'yearly', priority: 0.7 },
      { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
    ] as const
  ).map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
  }));

  return [
    ...staticRoutes,
    // Only listed once the page has content and is therefore reachable.
    ...(ventures.length > 0
      ? [
          {
            url: absoluteUrl('/ventures'),
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
          },
        ]
      : []),
    ...projects.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(`/thinking/${article.slug}`),
      lastModified: new Date(article.published),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
