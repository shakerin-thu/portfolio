import type { Metadata } from 'next';

import { education, profile, roles } from '@/content/profile';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Mohammad Sajidus Shakerin works across technology, product, international markets, design and leadership, completing Computer Science & Technology at Tsinghua University.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <main id="main" className="inner">
      <p className="inner-kicker">Profile / {profile.location.city}</p>
      <h1>
        Between
        <br />
        worlds.
      </h1>
      <p className="inner-intro">
        {profile.name} / {profile.chineseName} works across technology, product, international
        markets, design and leadership. He is completing Computer Science &amp; Technology at
        Tsinghua University as a Chinese Government Scholarship recipient.
      </p>

      <section className="detail-section" aria-labelledby="experience-title">
        <h2 id="experience-title">Experience</h2>
        <ol className="timeline">
          {roles.map((role) => (
            <li key={`${role.organisation}-${role.period}`} data-reveal>
              <span className="timeline-period">{role.period}</span>
              <div>
                <h3>{role.organisation}</h3>
                <p className="timeline-role">{role.title}</p>
              </div>
              <p className="timeline-detail">{role.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="detail-section" aria-labelledby="education-title">
        <h2 id="education-title">Education</h2>
        <ol className="timeline">
          {education.map((entry) => (
            <li key={entry.institution} data-reveal>
              <span className="timeline-period">{entry.period}</span>
              <div>
                <h3>{entry.institution}</h3>
                <p className="timeline-role">{entry.programme}</p>
              </div>
              <p className="timeline-detail">{entry.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="detail-section" aria-labelledby="language-title">
        <h2 id="language-title">Language</h2>
        <div className="detail-prose">
          <p>
            {profile.languages.join(', ')}&mdash;and the practical language of making things move.
          </p>
        </div>
      </section>
    </main>
  );
}
