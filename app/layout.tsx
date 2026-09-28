import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { RevealObserver } from '@/components/RevealObserver';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteNav } from '@/components/SiteNav';
import { SmoothScroll } from '@/components/SmoothScroll';
import { profile } from '@/content/profile';
import { absoluteUrl, ogImage, siteUrl } from '@/lib/site';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const title = `${profile.name} — ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    // Inner pages set only their own name; the suffix is added here.
    template: `%s — ${profile.name}`,
  },
  description: profile.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    'Mohammad Sajidus Shakerin',
    '孔献恩',
    'Tsinghua University',
    'technology',
    'product',
    'artificial intelligence',
    'international markets',
    'entrepreneurship',
    'Beijing',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: profile.name,
    title,
    description: profile.description,
    url: siteUrl,
    locale: 'en_GB',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: profile.role,
    images: ['/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
};

/** Person and WebSite graph, so search engines can attribute the work. */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': absoluteUrl('/#person'),
      name: profile.name,
      alternateName: profile.chineseName,
      url: siteUrl,
      email: `mailto:${profile.email}`,
      image: absoluteUrl('/og.jpg'),
      jobTitle: 'Technology & Product',
      description: profile.description,
      knowsLanguage: [...profile.languages],
      homeLocation: {
        '@type': 'Place',
        name: profile.location.label,
        address: {
          '@type': 'PostalAddress',
          addressLocality: profile.location.city,
          addressCountry: profile.location.country,
        },
      },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Tsinghua University' },
      sameAs: [profile.links.github],
    },
    {
      '@type': 'WebSite',
      '@id': absoluteUrl('/#website'),
      url: siteUrl,
      name: profile.name,
      description: profile.description,
      inLanguage: 'en',
      publisher: { '@id': absoluteUrl('/#person') },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* The hero still is the LCP element; `type` keeps browsers without
            AVIF support from downloading a file they cannot decode. */}
        <link
          rel="preload"
          as="image"
          href="/media/portrait-hero.avif"
          type="image/avif"
          media="(min-width: 761px)"
        />
        <link
          rel="preload"
          as="image"
          href="/media/portrait-face.avif"
          type="image/avif"
          media="(max-width: 760px)"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <SmoothScroll />
        <RevealObserver />
        <SiteNav />

        {children}

        <SiteFooter />

        <script
          type="application/ld+json"
          // Serialised from a literal above; there is no user input in this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
