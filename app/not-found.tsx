import type { Metadata } from 'next';
import Link from 'next/link';

import { Arrow } from '@/components/Arrow';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main" className="inner status-page">
      <p className="inner-kicker">Error / 404</p>
      <h1>
        This page
        <br />
        isn&rsquo;t built.
      </h1>
      <p className="inner-intro">
        The address exists, the page does not. The rest of the site is still here.
      </p>
      <ul className="status-links">
        <li>
          <Link className="text-link" href="/">
            Back to the index <Arrow />
          </Link>
        </li>
        <li>
          <Link className="text-link" href="/work">
            Selected work <Arrow />
          </Link>
        </li>
        <li>
          <Link className="text-link" href="/thinking">
            The notebook <Arrow />
          </Link>
        </li>
      </ul>
    </main>
  );
}
