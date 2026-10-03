import type { Metadata } from 'next';
import Link from 'next/link';

import { Arrow } from '@/components/Arrow';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected products, systems and experiments across software, sustainability, AI and engineering — including DP Collector, Health AI and model evaluation at Meituan.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <main id="main" className="inner">
      <p className="inner-kicker">Index / 01—{String(projects.length).padStart(2, '0')}</p>
      <h1>
        Selected
        <br />
        work.
      </h1>
      <p className="inner-intro">
        Products, systems and experiments made across software, sustainability, AI and engineering.
      </p>

      <ul className="index-list">
        {projects.map((project, index) => (
          <li key={project.slug} data-reveal>
            <Link href={`/work/${project.slug}`}>
              <span className="index-num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="index-body">
                <strong>{project.title}</strong>
                <span className="index-summary">{project.summary}</span>
              </span>
              <span className="index-meta">{project.category}</span>
              <span className="index-year">
                {project.year} <Arrow />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
