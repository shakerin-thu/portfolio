import Link from 'next/link';

import { articles } from '@/content/articles';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';

import { Arrow } from './Arrow';
import { ConsoleSignature } from './ConsoleSignature';
import { HeroPortrait } from './HeroPortrait';

const DISCIPLINE_MARQUEE = 'Code · Business · Design · People · Markets · Ideas · ';

export function PortfolioHome() {
  return (
    <main id="main" className="home">
      <ConsoleSignature />

      {/* 01 — Hero -------------------------------------------------------- */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-media">
          <HeroPortrait />
          <div className="hero-scrim" />
        </div>

        <p className="hero-eyebrow">
          <span>Beijing / Dhaka / Beyond</span>
          <span>2026</span>
        </p>

        <div className="hero-body">
          <h1 id="hero-title" className="hero-title">
            <span className="hero-line">Mohammad</span>
            <span className="hero-line">Sajidus</span>
            <span className="hero-line">Shakerin</span>
          </h1>

          <div className="hero-foot">
            <ol className="hero-index">
              {profile.disciplines.map((discipline) => (
                <li key={discipline}>{discipline}</li>
              ))}
            </ol>
            <p className="hero-thesis">{profile.tagline}</p>
            <a className="hero-enter" href="#story">
              <span>Enter the story</span>
              <Arrow direction="down-right" />
            </a>
          </div>
        </div>
      </section>

      {/* 02 — Operating system -------------------------------------------- */}
      <section className="manifesto" id="story" tabIndex={-1} aria-labelledby="manifesto-title">
        <div className="manifesto-inner" data-reveal>
          <p className="chapter-no">02 / Operating system</p>
          <p className="manifesto-kicker">Not a title.</p>
          <h2 id="manifesto-title">A trajectory.</h2>
          <p className="manifesto-copy">
            Technology is one part of the system. People, markets, design and execution are the
            rest.
          </p>
        </div>
        <div className="discipline-marquee" aria-hidden="true">
          <span>{DISCIPLINE_MARQUEE}</span>
          <span>{DISCIPLINE_MARQUEE}</span>
        </div>
      </section>

      {/* 03 — Build ------------------------------------------------------- */}
      <section className="code-chapter" aria-labelledby="code-title">
        <div className="code-image" data-reveal aria-hidden="true">
          <span className="code-image-mark">&lt;MSS/&gt;</span>
        </div>
        <div className="chapter-copy" data-reveal>
          <p className="chapter-no">03 / Build</p>
          <h2 id="code-title">
            Code is a way
            <br />
            into the system.
          </h2>
          <p>
            Computer Science at Tsinghua. Model evaluation at Meituan. AI assistance at the point of
            purchase. The technical work matters most when it changes what people can do.
          </p>
          <p className="metric">
            <strong>
              83 <Arrow direction="right" /> 91
            </strong>
            <span>
              Detection accuracy
              <br />
              through structured evaluation
            </span>
          </p>
        </div>
      </section>

      {/* Interlude -------------------------------------------------------- */}
      <section className="transition-quote" aria-labelledby="transition-title">
        <p className="transition-lead">I don&rsquo;t really believe in</p>
        <h2 id="transition-title">
          one-dimensional
          <br />
          careers.
        </h2>
        <figure className="portrait-still" data-reveal>
          {/* Deliberately a plain <img>: this asset is pre-encoded at build
              time and needs no runtime optimiser. See HeroPortrait. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/portrait-face.jpg"
            alt=""
            width={400}
            height={368}
            loading="lazy"
            decoding="async"
          />
        </figure>
        <p className="transition-answer">So I built across them.</p>
      </section>

      {/* 04 — Selected work ----------------------------------------------- */}
      <section className="work-section" aria-labelledby="work-title">
        <header data-reveal>
          <p className="chapter-no">04 / Selected work</p>
          <h2 id="work-title">
            Things made.
            <br />
            Systems moved.
          </h2>
        </header>

        <ul className="project-track" aria-label="Selected projects">
          {projects.map((project, index) => (
            <li key={project.slug} className="project-panel">
              <Link href={`/work/${project.slug}`}>
                <span className="project-num" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={`project-art art-${index + 1}`} aria-hidden="true">
                  {project.metric ?? project.year}
                </span>
                <span className="project-info">
                  <span>
                    <small>
                      {project.category} — {project.year}
                    </small>
                    <strong>{project.title}</strong>
                    <span className="project-summary">{project.summary}</span>
                  </span>
                  <span className="project-arrow">
                    <Arrow />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="track-foot">
          <Link className="text-link" href="/work">
            View all work <Arrow />
          </Link>
        </p>
      </section>

      {/* 05 — Markets ----------------------------------------------------- */}
      <section className="markets-section" aria-labelledby="markets-title">
        <div data-reveal>
          <p className="chapter-no">05 / Markets</p>
          <h2 id="markets-title">
            Across languages.
            <br />
            Between contexts.
          </h2>
        </div>
        <div className="markets-copy" data-reveal>
          <p>
            Five years studying and working in China. Three years in China-to-South-Asia B2B
            operations. The job is often to make the next step obvious when language, culture and
            incentives do not line up.
          </p>
          <p className="metric is-light">
            <strong>36%</strong>
            <span>
              Revenue growth contribution
              <br />
              through execution-led strategy
            </span>
          </p>
          <p className="languages">{profile.languages.join(' / ')}</p>
        </div>
      </section>

      {/* 06 — Lead -------------------------------------------------------- */}
      <section className="lead-section" aria-labelledby="lead-title">
        <div data-reveal>
          <p className="chapter-no">06 / Lead</p>
          <h2 id="lead-title">
            Ideas need
            <br />
            other people.
          </h2>
        </div>
        <ul className="lead-grid" data-reveal>
          <li>
            <strong>7&ndash;10</strong>
            <p>People led and coordinated through day-to-day creative and operational work.</p>
          </li>
          <li>
            <strong>60</strong>
            <p>Approximate company size at Rabbani IT Solution.</p>
          </li>
          <li>
            <strong>2023&mdash;</strong>
            <p>Marketing and communication leadership across Tsinghua communities.</p>
          </li>
        </ul>
      </section>

      {/* 07 — Thinking ---------------------------------------------------- */}
      <section className="thinking-section" aria-labelledby="thinking-title">
        <header data-reveal>
          <p className="chapter-no">07 / Thinking</p>
          <h2 id="thinking-title">
            Notes from
            <br />
            the intersections.
          </h2>
        </header>

        <ul className="thinking-list">
          {articles.map((article, index) => (
            <li key={article.slug} data-reveal>
              <Link href={`/thinking/${article.slug}`}>
                <span className="thinking-meta">
                  {String(index + 1).padStart(2, '0')} / {article.date}
                </span>
                <strong>{article.title}</strong>
                <span className="thinking-excerpt">{article.excerpt}</span>
                <span className="thinking-cta">
                  Read <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p>
          <Link className="text-link" href="/thinking">
            Open the notebook <Arrow />
          </Link>
        </p>
      </section>

      {/* Closing ---------------------------------------------------------- */}
      <section className="closing" aria-label="Closing">
        <p className="closing-line">The rest</p>
        <p className="closing-line">is still</p>
        <p className="closing-line">being built.</p>
        <p className="closing-signature">Hello world.</p>
      </section>

      {/* 08 — Contact ----------------------------------------------------- */}
      <section className="contact-panel" id="contact" aria-labelledby="contact-title">
        <p className="chapter-no">08 / Contact</p>
        <h2 id="contact-title">
          Let&rsquo;s build
          <br />
          something
          <br />
          interesting.
        </h2>
        <p className="contact-copy">
          Technology. Products. Ideas.
          <br />
          Markets. Collaborations.
        </p>
        <a className="contact-email" href={`mailto:${profile.email}`}>
          {profile.email} <Arrow />
        </a>
      </section>
    </main>
  );
}
