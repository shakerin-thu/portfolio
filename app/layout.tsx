import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { RevealObserver } from '@/components/RevealObserver';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteNav } from '@/components/SiteNav';
import { SmoothScroll } from '@/components/SmoothScroll';
import { profile } from '@/content/profile';
import { ogImage, siteUrl } from '@/lib/site';
import { jsonLd, siteGraph } from '@/lib/structured-data';

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
  alternates: {
    canonical: '/',
    // A bare string, not Next's `[{ url, title }]` descriptor form: vinext's
    // metadata shim passes this value straight to a string helper, so the
    // descriptor typechecks against Next's types and then throws at render.
    types: { 'application/rss+xml': '/feed.xml' },
  },
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
          // Serialised from content/ in this repository; `<` is escaped by
          // jsonLd so the block cannot be closed early.
          dangerouslySetInnerHTML={{ __html: jsonLd(siteGraph()) }}
        />
      </body>
    </html>
  );
}
