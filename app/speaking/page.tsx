import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Arrow } from '@/components/Arrow';
import { Still } from '@/components/Still';
import { profile } from '@/content/profile';
import { appearances } from '@/content/speaking';
import { ogImage } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Speaking',
  description: `Talks, panels, pitches and award ceremonies — ${profile.name} on stage.`,
  alternates: { canonical: '/speaking' },
  openGraph: {
    type: 'website',
    title: `Speaking — ${profile.name}`,
    description: 'Talks, panels, pitches and award ceremonies.',
    url: '/speaking',
    images: [ogImage],
  },
};

export default function SpeakingPage() {
  // The route exists only while there is something to show; an empty section
  // reads worse than no section, and would still be indexed.
  if (appearances.length === 0) notFound();

  return (
    <main id="main" className="inner">
      <p className="inner-kicker">Stages / {String(appearances.length).padStart(2, '0')}</p>
      <h1>
        On the
        <br />
        record.
      </h1>
      <p className="inner-intro">
        Talks, panels, pitches and the moments the work was argued out loud.
      </p>

      {appearances.map((appearance) => {
        const [lead, ...rest] = appearance.images ?? [];

        return (
          <article key={appearance.slug} id={appearance.slug} className="appearance" data-reveal>
            <header className="appearance-head">
              <p className="appearance-when">
                <time dateTime={appearance.published}>{appearance.date}</time>
                <span aria-hidden="true"> · </span>
                {appearance.role}
              </p>
              <h2>{appearance.title ?? appearance.event}</h2>
              {appearance.title ? <p className="appearance-event">{appearance.event}</p> : null}
              <p className="appearance-where">{appearance.location}</p>
            </header>

            {lead ? <Still image={lead} className="appearance-lead" /> : null}

            <p className="appearance-summary">{appearance.summary}</p>

            {appearance.detail?.length ? (
              <div className="appearance-prose">
                {appearance.detail.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            {appearance.facts?.length ? (
              <ul className="tag-list appearance-facts">
                {appearance.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            ) : null}

            {rest.length > 0 ? (
              <div className="appearance-gallery">
                {rest.map((image) => (
                  <Still key={image.src} image={image} />
                ))}
              </div>
            ) : null}

            {appearance.proof?.length || appearance.project ? (
              <ul className="award-proof">
                {appearance.project ? (
                  <li>
                    <Link href={`/work/${appearance.project}`}>
                      The project <Arrow />
                    </Link>
                  </li>
                ) : null}
                {appearance.proof?.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} rel="noreferrer" target="_blank">
                      {source.label} <Arrow />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        );
      })}
    </main>
  );
}
