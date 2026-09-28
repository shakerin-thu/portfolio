import type { Metadata } from 'next';

import { Arrow } from '@/components/Arrow';
import { profile } from '@/content/profile';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${profile.name} about technology, products, ideas, markets and collaborations.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main id="main" className="inner contact-page">
      <p className="inner-kicker">Contact / {profile.location.city}</p>
      <h1>
        Let&rsquo;s build
        <br />
        something
        <br />
        interesting.
      </h1>
      <p className="contact-copy">
        Technology. Products. Ideas.
        <br />
        Markets. Collaborations.
      </p>

      <ul className="contact-list">
        <li>
          <span className="contact-label">Email</span>
          <a href={`mailto:${profile.email}`}>
            {profile.email} <Arrow />
          </a>
        </li>
        <li>
          <span className="contact-label">GitHub</span>
          <a href={profile.links.github} rel="me noreferrer" target="_blank">
            github.com/shakerin-thu <Arrow />
          </a>
        </li>
        <li>
          <span className="contact-label">Based in</span>
          <span>{profile.location.label}</span>
        </li>
      </ul>
    </main>
  );
}
