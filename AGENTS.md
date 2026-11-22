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
author: "Vishal Kumar"
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
`"Vishal Kumar"` on every article. This is Tarun's decision of 22 Nov 2026,
and it is what `/editorial-policy` tells readers: every article carries the
byline of a named member of the team.

The `"EVGyan Desk"` byline is retired. The 58 articles that carried it were
moved to Vishal Kumar the same day, and `/authors/evgyan-desk` redirects to
his author page. Do not publish under it again. If the article arrives from
Notion with Author set to "EVGyan Desk", publish it as `"Vishal Kumar"`.

Another name (`"Tarun Pal"`) only when Tarun asks for it on a specific piece.

Author profiles live in `src/utils/authors.js`.

## Images

Hero and in-body images go in the article's own folder, never in `public/`.
In-body images are measured at build time (see `rehypeImageDimensions` in
`velite.config.js`) and rendered through `next/image`, so they need no manual
width or height.

### Hero size (Google Discover)

A hero must be **16:9 and at least 1200px wide** - 1600x900 or 1920x1080 is
what the site uses. Discover shows the large card for nothing smaller, and
Google asks publishers to avoid heroes that are mostly text.

Keep writing `hero.jpg`. The build makes the WebP that og:image, the
NewsArticle schema and RSS point at (`buildShareImage` in
`velite.config.js`), so never export or commit a WebP by hand. A hero that is
not 16:9 is not cropped: the build prints a `[hero]` warning, and the fix is
a new image, not a code change.

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
