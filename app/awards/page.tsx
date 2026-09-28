import type { Metadata } from 'next';
import Link from 'next/link';

import { Arrow } from '@/components/Arrow';
import { awards } from '@/content/profile';

export const metadata: Metadata = {
  title: 'Awards',
  description:
    'Selected recognition across innovation, entrepreneurship and sustainability competitions, including ISCES, UNDP National Dialogue China and the China–ASEAN Innovation & Entrepreneurship Competition.',
  alternates: { canonical: '/awards' },
};

export default function AwardsPage() {
  return (
    <main id="main" className="inner">
      <p className="inner-kicker">Recognition</p>
      <h1>
        Proof of
        <br />
        motion.
      </h1>
      <p className="inner-intro">
        Selected recognition from innovation, entrepreneurship and sustainability competitions
        across China and beyond.
      </p>

      <section className="detail-section" aria-labelledby="awards-title">
        <h2 id="awards-title">Selected awards</h2>
        <ol className="award-list">
          {awards.map((award) => {
            const meta = [award.organiser, award.location, award.entrant].filter(Boolean);
            return (
              <li key={`${award.year}-${award.title}`} data-reveal>
                <span className="award-year">{award.year}</span>

                <div className="award-body">
                  <h3>{award.title}</h3>
                  <p className="award-placing">{award.context}</p>

                  {meta.length > 0 ? <p className="award-meta">{meta.join(' · ')}</p> : null}

                  {award.proof?.length || award.project ? (
                    <ul className="award-proof">
                      {award.project ? (
                        <li>
                          <Link href={`/work/${award.project}`}>
                            The project <Arrow />
                          </Link>
                        </li>
                      ) : null}
                      {award.proof?.map((source) => (
                        <li key={source.url}>
                          <a href={source.url} rel="noreferrer" target="_blank">
                            {source.label} <Arrow />
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                {award.image ? (
                  <figure className="award-figure">
                    <picture>
                      <source srcSet={`/media/${award.image.src}.avif`} type="image/avif" />
                      <source srcSet={`/media/${award.image.src}.webp`} type="image/webp" />
                      <img
                        src={`/media/${award.image.src}.jpg`}
                        alt={award.image.alt}
                        width={award.image.width}
                        height={award.image.height}
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                    {award.image.caption ? <figcaption>{award.image.caption}</figcaption> : null}
                  </figure>
                ) : null}
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
