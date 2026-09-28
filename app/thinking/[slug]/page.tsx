import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Arrow } from '@/components/Arrow';
import { articles, findArticle } from '@/content/articles';
import { profile } from '@/content/profile';
import { ogImage } from '@/lib/site';

type PageProps = { params: Promise<{ slug: string }> };

/**
 * Renders `*emphasis*` from the content layer as real `<em>`.
 *
 * Deliberately not a Markdown parser: the body is authored in this repository,
 * and building React nodes directly keeps the copy out of `dangerouslySetInnerHTML`.
 */
function withEmphasis(paragraph: string) {
  return paragraph.split(/(\*[^*]+\*)/g).map((part, index) =>
    part.length > 2 && part.startsWith('*') && part.endsWith('*') ? (
      <em key={index}>{part.slice(1, -1)}</em>
    ) : (
      part
    ),
  );
}

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/thinking/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      url: `/thinking/${article.slug}`,
      publishedTime: article.published,
      authors: [profile.name],
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const index = articles.indexOf(article);
  const next = articles[(index + 1) % articles.length];

  return (
    <main id="main" className="inner article">
      <article>
        <header>
          <p className="inner-kicker">
            Thinking / <time dateTime={article.published}>{article.date}</time>
          </p>
          <h1>{article.title}</h1>
          <p className="article-standfirst">{article.excerpt}</p>
        </header>

        <div className="article-body">
          {article.body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{withEmphasis(paragraph)}</p>
          ))}
        </div>

        <footer className="article-sign">
          <span>{profile.name}</span>
          <span>{profile.location.label}</span>
        </footer>
      </article>

      {next.slug === article.slug ? null : (
        <nav className="detail-next" aria-label="Next essay">
          <span className="inner-kicker">Next</span>
          <Link href={`/thinking/${next.slug}`}>
            {next.title} <Arrow />
          </Link>
        </nav>
      )}
    </main>
  );
}
