import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Arrow } from '@/components/Arrow';
import { profile } from '@/content/profile';
import { ventures } from '@/content/ventures';

export const metadata: Metadata = {
  title: 'Ventures',
  description: `Companies co-founded by ${profile.name}, what they do and the part he plays in them.`,
  alternates: { canonical: '/ventures' },
};

export default function VenturesPage() {
  // The route exists only while there is something to show; an empty section
  // reads worse than no section, and would still be indexed.
  if (ventures.length === 0) notFound();

  return (
    <main id="main" className="inner">
      <p className="inner-kicker">Ventures / {String(ventures.length).padStart(2, '0')}</p>
      <h1>
        Companies
        <br />
        built.
      </h1>
      <p className="inner-intro">
        Businesses co-founded and run, alongside the technical and product work.
      </p>

      {ventures.map((venture) => (
        <article key={venture.slug} id={venture.slug} className="venture" data-reveal>
          <header className="venture-head">
            <h2>{venture.name}</h2>
            <dl className="venture-meta">
              <div>
                <dt>Role</dt>
                <dd>{venture.role}</dd>
              </div>
              <div>
                <dt>Founded</dt>
                <dd>{venture.founded}</dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>{venture.location}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{venture.status}</dd>
              </div>
            </dl>
          </header>

          <p className="venture-summary">{venture.summary}</p>

          {venture.image ? (
            <figure className="venture-figure">
              <picture>
                <source srcSet={`/media/${venture.image.src}.avif`} type="image/avif" />
                <source srcSet={`/media/${venture.image.src}.webp`} type="image/webp" />
                <img
                  src={`/media/${venture.image.src}.jpg`}
                  alt={venture.image.alt}
                  width={venture.image.width}
                  height={venture.image.height}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </figure>
          ) : null}

          <div className="venture-body">
            <section aria-label={`About ${venture.name}`}>
              <h3>About</h3>
              <div className="venture-prose">
                {venture.about.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </section>

            {venture.focus?.length ? (
              <section aria-label={`What ${venture.name} does`}>
                <h3>What it does</h3>
                <ul className="tag-list">
                  {venture.focus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {venture.responsibilities?.length ? (
              <section aria-label={`Role at ${venture.name}`}>
                <h3>My part in it</h3>
                <ul className="venture-list">
                  {venture.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {venture.website ? (
              <section aria-label={`${venture.name} website`}>
                <h3>Website</h3>
                <p>
                  <a className="venture-link" href={venture.website} rel="noreferrer" target="_blank">
                    {venture.website.replace(/^https?:\/\//, '').replace(/\/$/, '')} <Arrow />
                  </a>
                </p>
              </section>
            ) : null}
          </div>
        </article>
      ))}
    </main>
  );
}
