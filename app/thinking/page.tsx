import type { Metadata } from 'next';
import Link from 'next/link';

import { Arrow } from '@/components/Arrow';
import { articles } from '@/content/articles';

export const metadata: Metadata = {
  title: 'Thinking',
  description:
    'Short essays on technology, products, markets and the space between disciplines, by Mohammad Sajidus Shakerin.',
  alternates: { canonical: '/thinking' },
};

export default function ThinkingPage() {
  return (
    <main id="main" className="inner">
      <p className="inner-kicker">Notebook</p>
      <h1>
        Thinking
        <br />
        in public.
      </h1>
      <p className="inner-intro">
        Short observations from technology, products, markets and the space between disciplines.
      </p>

      <ul className="index-list">
        {articles.map((article, index) => (
          <li key={article.slug} data-reveal>
            <Link href={`/thinking/${article.slug}`}>
              <span className="index-num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="index-body">
                <strong>{article.title}</strong>
                <span className="index-summary">{article.excerpt}</span>
              </span>
              <span className="index-meta">
                <time dateTime={article.published}>{article.date}</time>
              </span>
              <span className="index-year">
                <Arrow />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
