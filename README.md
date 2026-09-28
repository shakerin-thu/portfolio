# Mohammad Sajidus Shakerin — Portfolio

A cinematic personal site built with React 19, TypeScript, Next APIs on the
Vinext runtime, Tailwind CSS and Lenis, deployed to Cloudflare Workers.

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run check
```

Runs lint, typecheck and a production build in sequence. The individual scripts
are `npm run lint`, `npm run typecheck` and `npm run build`.

## Environment

| Variable   | Required | Purpose                                                   |
| ---------- | -------- | --------------------------------------------------------- |
| `SITE_URL` | Yes      | Canonical public origin, no trailing slash.               |

`SITE_URL` is the origin every absolute URL is resolved against: Open Graph and
Twitter images, canonical links, `sitemap.xml`, `robots.txt` and the JSON-LD
graph. It falls back to `http://localhost:3000` for local development, so if it
is unset in production every social preview will point at localhost and fail
silently. Set it before the first deploy.

## Project structure

```
app/
  layout.tsx          root metadata, fonts, JSON-LD, chrome
  page.tsx            home
  work/               index + [slug] detail
  thinking/           index + [slug] essay
  ventures/           companies co-founded
  about/ awards/ contact/
  not-found.tsx  error.tsx
  sitemap.ts  robots.ts  manifest.ts
  icon.png  apple-icon.png
  globals.css         imports everything in styles/
  styles/
    tokens.css        colour, type scale, rhythm, motion
    base.css          reset, focus, grain, shared primitives
    nav.css           header + menu overlay
    home.css          the home narrative
    pages.css         inner pages
    responsive.css    every breakpoint, in one place
components/           SiteNav, SmoothScroll, RevealObserver, …
content/              profile.ts, projects.ts, articles.ts, ventures.ts
lib/                  site.ts, motion.ts, lenis-instance.ts
scripts/              encode-media.mjs
public/media/         pre-encoded AVIF / WebP / JPEG stills
```

## Editing content

All copy lives in `content/` and nothing else needs touching:

- `content/profile.ts` — name, email, links, location, roles, education, awards.
  This is the single source of truth; every page reads from it, so an email or
  job title changes in exactly one place.
- `content/projects.ts` — the work index and each project detail page.
- `content/articles.ts` — the notebook. Each `body` entry is one paragraph;
  wrap a phrase in `*asterisks*` to italicise it.
- `content/ventures.ts` — companies co-founded. While this array is empty the
  `/ventures` route returns 404, the menu item is hidden and the sitemap omits
  it, so the site never links to an empty section. Add an entry and all three
  appear on their own.

Adding a project, article or venture automatically creates its page, adds it to
the relevant index and the home page, and registers it in the sitemap.

Awards support optional `proof` links and an event `image`. Prefer linking an
official results or announcement page over a scanned certificate: it can be
verified, it does not age, and it carries no personal identifiers.

## Images

Stills are pre-encoded at build time rather than optimised at runtime, because
the site is served from Cloudflare Workers where no image optimiser is
available. `components/HeroPortrait.tsx` serves AVIF, then WebP, then JPEG, and
art-directs a tighter face crop below 760px.

To add photographs, drop the originals into `media-src/` (gitignored, any size
or format) and run:

```bash
npm run media
```

Each becomes `public/media/<name>.avif`, `.webp` and `.jpg`, capped at 1600px
wide, and the script prints a content snippet carrying the real dimensions.
Paste that into `content/profile.ts` or `content/ventures.ts` and replace the
`alt` text — the placeholder is deliberately shouty so it cannot ship.

To replace the photography, produce the same three formats at the same paths:

| Asset                        | Size     | Used by                        |
| ---------------------------- | -------- | ------------------------------ |
| `public/media/portrait-hero` | 1416×368 | hero, desktop                  |
| `public/media/portrait-face` | 340×338  | hero on mobile, the interlude  |
| `public/og.jpg`              | 1200×630 | every social card              |
| `app/icon.png`               | 512×512  | favicon, PWA                   |
| `app/apple-icon.png`         | 180×180  | iOS home screen                |

The current hero is cropped from the top band of the source photograph, which
is the only region free of the wordmark that had been burned into the original
image. A higher-resolution original would let the hero fill more of the
viewport before it softens; at present it is used close to 1:1 on a 1440px
screen.

## Accessibility

The menu overlay is `inert` while closed, traps focus while open, closes on
`Escape` and returns focus to its trigger. Every interactive element has a
visible focus ring, there is a skip link to `#main`, and all motion — the Lenis
smooth scroll included — is disabled under `prefers-reduced-motion`.

## Deployment

Configured for OpenAI Sites on Cloudflare Workers. `npm run build` emits to
`dist/`. Set `SITE_URL` in the deployment environment before going live.

## Notes

- `db/` holds unused Cloudflare D1 scaffolding from the project template. It is
  inert — nothing imports it — and is kept only because `.openai/hosting.json`
  declares a `DB` binding. Remove both together if the site never needs a
  database.
