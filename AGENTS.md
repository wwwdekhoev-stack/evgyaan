# evgyan.com — notes for whoever (or whatever) edits this repo next

## Shape of the thing

Next.js 15 + Velite (MDX) + Tailwind. **The app is at the repo root.** If you
find a note anywhere saying the app lives in an `evgyaan/` subfolder, it is
out of date — that folder no longer exists. Vercel builds the root and
auto-deploys `main` to www.evgyan.com.

Articles are `content/blogs/article_<N>/index.mdx` plus a `hero.jpg` beside
each one. Velite copies hero and in-body images into `public/blogs/`, which is
gitignored — never commit it.

Get push access with `add_repo` (owner `wwwdekhoev-stack`, repo `evgyaan`,
access `push`). Do not use a hardcoded token.

## Article frontmatter

```yaml
title: "..."
description: "..."
seoTitle: "..."            # optional
image: hero.jpg
imageAlt: "..."            # describe what is in the picture, never the headline
publishedAt: 2026-11-17T16:55:00+05:30
updatedAt: 2026-11-17T16:55:00+05:30
author: "EVGyan Desk"
isPublished: true
tags: [...]
slug: the-slug
sources:                   # see below
  - name: "Autocar India"
    url: "https://..."
```

### Dates
Real IST minute, always with the `+05:30` offset. Get it with
`TZ=Asia/Kolkata date +%Y-%m-%dT%H:%M:00+05:30`. Never a future time, never
rounded up to a neat minute, never staggered placeholder times across a batch.
`npm run build` runs `scripts/check-dates.mjs` first and **fails** on a
future-dated or malformed date, locally and on Vercel.

### Sources
Every news article should carry `sources`. Three to five external ones, named
by masthead rather than by domain ("Autocar India", not "autocarindia.com"),
most important first. A company's own page is a source — name it as such,
e.g. `"Ultraviolette (official)"`.

Leave out internal `/blogs/...` links (they belong in the body as real links),
editorial notes, and anything that is a syndication of a source already in the
list. They render as a Sources block at the end of the article.

### Bylines
`"EVGyan Desk"` for wire and press-release-derived news — most of the site.
A named person (`"Vishal Kumar"`, `"Tarun Pal"`) only where that person did
work that carries their judgement: analysis, a verdict, a ride or drive, or a
data story they built. The byline is a claim about who stands behind the
piece, so do not attach a name to something that person did not write.

Author profiles live in `src/utils/authors.js`.

## Images

Hero and in-body images go in the article's own folder, never in `public/`.
In-body images are measured at build time (see `rehypeImageDimensions` in
`velite.config.js`) and rendered through `next/image`, so they need no manual
width or height.

**Never generate the likeness of a real person** — no ministers, executives or
any other identifiable individual. Manufacturer press photography for product
news; generated illustration only for data and concept stories, and always
labelled. This is also written into `/editorial-policy`, which is a promise to
readers.

Do not delete `public/google0f9534780ce59993.html`. It is the Search Console
verification file and removing it un-verifies the property.

## Analytics

Event names live in `src/utils/analytics.js` — add new ones there rather than
typing a string at a call site, and use `track` / `trackOutbound` rather than
`window.gtag`, which is often not loaded yet on a first paint.

Outbound links to the channel go through `withYouTubeUtm()` so YouTube can
attribute them. Not in structured data: `sameAs` keeps the clean canonical URL.

## Before you push

`npm install` (not `npm ci` — the lock file drifts), then `npm run build`.
Stage only what you changed; never `git add .` or `-A`, because `npm install`
rewrites `package-lock.json` and Velite writes into `public/blogs/`.
