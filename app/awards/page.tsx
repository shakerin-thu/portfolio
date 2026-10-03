import type { Metadata } from 'next';
import Link from 'next/link';

import { Arrow } from '@/components/Arrow';
import { Still } from '@/components/Still';
import { awards } from '@/content/profile';
import { appearances } from '@/content/speaking';

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
            // Only link to the stage photographs once that entry actually exists.
            const stage = award.appearance
              ? appearances.find((entry) => entry.slug === award.appearance)
              : undefined;
            return (
              <li key={`${award.year}-${award.title}`} data-reveal>
                <span className="award-year">{award.year}</span>

                <div className="award-body">
                  <h3>{award.title}</h3>
                  <p className="award-placing">{award.context}</p>

                  {meta.length > 0 ? <p className="award-meta">{meta.join(' · ')}</p> : null}

                  {award.proof?.length || award.project || stage ? (
                    <ul className="award-proof">
                      {award.project ? (
                        <li>
                          <Link href={`/work/${award.project}`}>
                            The project <Arrow />
                          </Link>
                        </li>
                      ) : null}
                      {stage ? (
                        <li>
                          <Link href={`/speaking#${stage.slug}`}>
                            On stage <Arrow />
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

                {award.image ? <Still image={award.image} className="award-figure" /> : null}
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
