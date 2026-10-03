# Mohammad Sajidus Shakerin — Portfolio

A cinematic personal site built with React 19, TypeScript, Next APIs on the
Vinext runtime, Tailwind CSS and Lenis, deployed to Cloudflare Workers.

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

To preview a production build as it will actually run:

```bash
npm run build
SITE_URL=https://your-domain npm start
```

`npm start` runs `vite preview`, which serves the build in the Cloudflare
Workers runtime. `vinext start` is not used: it runs the worker bundle in plain
Node, which cannot resolve the `cloudflare:` import scheme the build contains.

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
silently. Set it before the first deploy. An unset `SITE_URL` now also logs a
warning at build and boot, which is the last moment it can still be corrected.

On Cloudflare Workers the value arrives as a Worker variable, which
`nodejs_compat` surfaces on `process.env`. The worker does not inherit your
shell, so `vite.config.ts` forwards `SITE_URL` into the local runtime when it is
set — which is why `SITE_URL=… npm run dev` produces the same absolute URLs
locally that the deployed site will.

## Project structure

```
app/
  layout.tsx          root metadata, fonts, JSON-LD, chrome
  page.tsx            home
  work/               index + [slug] detail
  thinking/           index + [slug] essay
  ventures/           companies co-founded
  speaking/           stages, talks and ceremonies
  about/ awards/ contact/
  feed.xml/           RSS 2.0 for the notebook
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
components/           SiteNav, SmoothScroll, RevealObserver, Still, …
content/              profile.ts, projects.ts, articles.ts,
                      ventures.ts, speaking.ts, media.ts
lib/                  site.ts, motion.ts, lenis-instance.ts,
                      structured-data.ts
scripts/              encode-media.mjs, make-favicon.mjs
public/media/         pre-encoded AVIF / WebP / JPEG stills
public/favicon.ico    generated from app/icon.png
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
- `content/speaking.ts` — stages, talks, panels and award ceremonies, with the
  photographs. Same empty-safe behaviour as ventures. This is where a stage
  photograph belongs; see **Adding a stage or speech** below.
- `content/media.ts` — the shared `SiteImage` shape every photograph uses.

Adding a project, article, venture or appearance automatically creates its page,
adds it to the relevant index and the home page where one exists, and registers
it in the sitemap and the JSON-LD graph.

Awards support optional `proof` links, an event `image`, and an `appearance`
slug that links the award to its stage photographs on `/speaking`. Prefer
linking an official results or announcement page over a scanned certificate: it
can be verified, it does not age, and it carries no personal identifiers.

## Adding a stage or speech

1. Put the original photographs in `media-src/` (gitignored, any size).
2. Run `npm run media`. Each becomes `public/media/<name>.{avif,webp,jpg}` and
   the script prints a snippet carrying the real pixel dimensions.
3. Paste the snippet into an entry in `content/speaking.ts`, replace the
   placeholder `alt` with a description of what is happening in the photograph,
   and fill in the event, date, role and location.

The first image in `images` becomes the lead still; the rest form the gallery
below the account. `/speaking`, its menu entry and its sitemap record appear as
soon as the first entry exists.

Write `alt` for someone who cannot see the photograph: *"accepting the first
prize on stage at the UNDP National Dialogue"*, not *"award photo"*. It is read
aloud by screen readers and indexed by image search.

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
Paste that into `content/profile.ts`, `content/ventures.ts` or
`content/speaking.ts` and replace the `alt` text — the placeholder is
deliberately shouty so it cannot ship.

Every photograph on the site renders through `components/Still.tsx`, which
expands one basename into the AVIF → WebP → JPEG trio and sets the dimensions
that stop the page shifting as images load. The `width` and `height` in content
must match the encoded file; `npm run media` prints the real numbers so they
never have to be guessed.

To replace the photography, produce the same three formats at the same paths:

| Asset                        | Size     | Used by                        |
| ---------------------------- | -------- | ------------------------------ |
| `public/media/portrait-hero` | 1416×368 | hero, desktop                  |
| `public/media/portrait-face` | 340×338  | hero on mobile, the interlude  |
| `public/og.jpg`              | 1200×630 | every social card              |
| `app/icon.png`               | 512×512  | tab icon, PWA                  |
| `app/apple-icon.png`         | 180×180  | iOS home screen                |
| `public/favicon.ico`         | 48×48    | crawlers and older agents      |

`favicon.ico` is generated from `app/icon.png` — run `npm run favicon` after
replacing the icon.

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

## Discovery

- **`/feed.xml`** — RSS 2.0 for the notebook, with the full essay bodies so a
  reader does not have to round-trip to the site. Linked from every page's
  `<head>`.
- **`/sitemap.xml`** and **`/robots.txt`** — generated from content, so a new
  project, essay or appearance registers itself.
- **JSON-LD** — `lib/structured-data.ts` builds the graph from `content/`, so
  the structured data cannot drift from what the pages say. The root graph
  carries the person (employers, both institutions, every award, languages),
  the site, and a node for each project, essay and appearance; detail pages add
  their own breadcrumb trail.

## Deployment

Configured for OpenAI Sites on Cloudflare Workers. `npm run build` emits to
`dist/`. Set `SITE_URL` in the deployment environment before going live.

## Notes

- `db/` holds unused Cloudflare D1 scaffolding from the project template. It is
  inert — nothing imports it — and is kept only because `.openai/hosting.json`
  declares a `DB` binding. Remove both together if the site never needs a
  database.
- `vinext` is pinned to 1.0.1. On the 1.0.0-beta.3 the project shipped with,
  the client router failed to initialise (`RSC prefetch setup error`), which
  silently broke every menu link: a click was intercepted and then went
  nowhere. In-page anchors still worked, which made it easy to miss.

## Facts to confirm

These are the places where the site asserts something that could not be
verified from the repository alone:

- **Patents.** `content/projects.ts` lists CN119453703A, CN120293095A and
  CN120674870A as *granted*. In the Chinese system a publication number ending
  in `A` is a published *application*; a granted invention patent ends in `B`.
  Either the numbers or the word "Granted" needs correcting.
- **Team size.** The home page states two figures — 7–10 people led day to day,
  inside a company of roughly sixty. `content/profile.ts` previously read "a
  team of roughly sixty people", which contradicted it; it now follows the home
  page. Confirm which is right.
- **Tsinghua.** The About page says the degree is being *completed*, while the
  dates read 2022–2026. The degree type is not stated anywhere.
- **"36% revenue growth"** on the home page does not say which company it
  refers to.
- **Tsinghua communities, 2023—** appears on the home page but is not in the
  Experience list.
