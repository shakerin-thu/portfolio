import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Arrow } from '@/components/Arrow';
import { findProject, projects } from '@/content/projects';
import { ogImage } from '@/lib/site';

type PageProps = { params: Promise<{ slug: string }> };

/** Every project is known at build time, so unknown slugs are a 404, not a render. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: 'article',
      title: `${project.title} — ${project.category}`,
      description: project.summary,
      url: `/work/${project.slug}`,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <main id="main" className="inner">
      <article>
        <header className="detail-hero">
          <p className="inner-kicker">{project.category}</p>
          <h1>{project.title}</h1>
          <dl className="detail-meta">
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{project.status}</dd>
            </div>
          </dl>
        </header>

        <section className="detail-section" aria-labelledby="overview-title">
          <h2 id="overview-title">Overview</h2>
          <div className="detail-prose">
            <p>{project.overview}</p>
          </div>
        </section>

        <section className="detail-section" aria-labelledby="process-title">
          <h2 id="process-title">Process</h2>
          <div className="detail-blocks">
            {project.challenge ? (
              <div data-reveal>
                <h3>Challenge</h3>
                <p>{project.challenge}</p>
              </div>
            ) : null}
            <div data-reveal>
              <h3>Approach</h3>
              <p>{project.approach}</p>
            </div>
            <div data-reveal>
              <h3>Result</h3>
              <p>{project.result}</p>
            </div>
            {project.metric ? (
              <div data-reveal>
                <h3>{project.metricLabel}</h3>
                <p className="metric is-inline">
                  <strong>{project.metric}</strong>
                </p>
              </div>
            ) : null}
          </div>
        </section>

        {project.stack?.length ? (
          <section className="detail-section" aria-labelledby="stack-title">
            <h2 id="stack-title">Disciplines</h2>
            <ul className="tag-list">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>

      <nav className="detail-next" aria-label="Next project">
        <span className="inner-kicker">Next project</span>
        <Link href={`/work/${next.slug}`}>
          {next.title} <Arrow />
        </Link>
      </nav>
    </main>
  );
}
