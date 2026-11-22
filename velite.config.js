import { defineConfig, s } from 'velite'
import GithubSlugger from "github-slugger"
import readingTime from "reading-time"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { createHash } from "node:crypto"
import { existsSync } from "node:fs"
import { mkdir, writeFile } from "node:fs/promises"
import { basename, dirname, extname, resolve } from "node:path"
import sharp from "sharp"

const codeOptions = {
  theme: 'github-dark',
  grid: false,
}

// Adds the real pixel width/height to every in-article image
// (`![alt](./photo.jpg)`), so the page can render it through next/image
// instead of a bare <img>.
//
// Why: without dimensions the article template had to ship in-body photos
// as full-size original JPEGs with no width/height and no lazy loading, and
// React preloaded every one of them in <head>. On an article with six
// photos that was 1.4 MB fetched before the page finished, and mobile LCP
// measured 7.8 s against 2.0 s on an article with only a hero image.
//
// How: Velite's own copy step runs before this plugin and has already
// rewritten `./photo.jpg` to `/blogs/photo-<8 hex>.jpg`. We undo just the
// hash suffix to find the source file next to the article's index.mdx and
// read its size. If a file cannot be found or read, the image is left
// untouched and the page falls back to a plain lazy <img> - a missing size
// never fails the build.
const HASHED_NAME = /-[0-9a-f]{8}$/

function remarkImageSize() {
  return async (tree, file) => {
    if (!file?.path) return
    const dir = dirname(file.path)
    const images = []
    const walk = (node) => {
      if (node.type === 'image' && typeof node.url === 'string') images.push(node)
      if (Array.isArray(node.children)) node.children.forEach(walk)
    }
    walk(tree)

    await Promise.all(
      images.map(async (node) => {
        const url = node.url.split(/[?#]/)[0]
        if (/^[a-z]+:\/\//i.test(url)) return // remote image: size unknown
        const ext = extname(url)
        const name = basename(url, ext).replace(HASHED_NAME, '')
        const source = resolve(dir, name + ext)
        if (!existsSync(source)) return
        try {
          const meta = await sharp(source).metadata()
          if (!meta.width || !meta.height) return
          // EXIF orientations 5-8 mean the photo is stored rotated 90deg,
          // so the displayed width and height are swapped.
          const rotated = (meta.orientation ?? 1) >= 5
          const width = rotated ? meta.height : meta.width
          const height = rotated ? meta.width : meta.height
          node.data = {
            ...node.data,
            hProperties: { ...(node.data?.hProperties ?? {}), width, height },
          }
        } catch {
          // Unreadable image: leave it as a plain <img>.
        }
      })
    )
  }
}

// ---- The image handed to Google Discover and social cards ---------------
//
// Discover shows the large card only for an image that is at least 1200px
// wide and 16:9, on a page that allows `max-image-preview:large` (set in
// app/layout.js). It takes that image from og:image or the NewsArticle
// schema, so those are the two places that have to be right.
//
// Whatever the publisher drops in as the hero (jpg or png, 1600 or 1920
// wide), this writes ONE WebP beside Velite's own copy and the article's
// og:image, twitter:image, NewsArticle image and RSS enclosure all point at
// it. Nobody has to remember to export WebP by hand, and the publishing
// pipeline keeps writing `hero.jpg` exactly as before.
//
// The hero on the page itself is untouched: next/image already serves it
// as AVIF/WebP from the original, and re-compressing it twice would only
// cost quality.
//
// Two rules it enforces:
//  - A hero within 2% of 16:9 (1600x902, 1600x899) is trimmed to exactly
//    16:9. That costs a few pixels.
//  - A hero of any other shape is NOT cropped. Cropping a 3:2 thumbnail to
//    16:9 cuts the headline text off the top of it, and Google asks for the
//    og:image to keep its key details. It is converted as it is and the
//    build prints a warning, so the image gets fixed at the source.
//
// WebP at quality 82 came out at 135 KB on average against 293 KB for the
// original JPEGs (largest 358 KB against 591 KB), which also keeps every
// file clear of the 600 KB WhatsApp asks link-preview images to stay under.
//
// The filename ends in a hash of the bytes because everything under
// /blogs/ is served `immutable` for a year (see next.config.js).
const SHARE_MIN_WIDTH = 1200
const SHARE_MAX_WIDTH = 1920
const SHARE_RATIO = 16 / 9
const SHARE_RATIO_TOLERANCE = 0.02
const ASSETS_DIR = resolve(process.cwd(), 'public/blogs')

async function buildShareImage(image, slug, mdxPath) {
  try {
    const ext = extname(image.src)
    const name = basename(image.src, ext).replace(HASHED_NAME, '')
    const source = resolve(dirname(mdxPath), name + ext)
    if (!existsSync(source)) return null

    const meta = await sharp(source).metadata()
    if (!meta.width || !meta.height) return null
    const rotated = (meta.orientation ?? 1) >= 5
    const srcW = rotated ? meta.height : meta.width
    const srcH = rotated ? meta.width : meta.height
    const ratio = srcW / srcH

    let width = Math.min(srcW, SHARE_MAX_WIDTH)
    let height
    let pipeline = sharp(source).rotate()

    if (Math.abs(ratio - SHARE_RATIO) / SHARE_RATIO <= SHARE_RATIO_TOLERANCE) {
      width = Math.min(width, Math.floor(srcH * SHARE_RATIO))
      width -= width % 16 // a multiple of 16 wide is a whole number of pixels tall
      height = (width / 16) * 9
      pipeline = pipeline.resize(width, height, { fit: 'cover', position: 'centre' })
    } else {
      height = Math.round(width / ratio)
      pipeline = pipeline.resize(width, height)
      console.warn(
        `[hero] ${slug}: ${srcW}x${srcH} is not 16:9 - left uncropped. ` +
          `Replace it with a 16:9 image at least ${SHARE_MIN_WIDTH}px wide.`
      )
    }
    if (width < SHARE_MIN_WIDTH) {
      console.warn(
        `[hero] ${slug}: only ${width}px wide - Google Discover needs ` +
          `${SHARE_MIN_WIDTH}px for the large card.`
      )
    }

    const buffer = await pipeline.webp({ quality: 82, effort: 5 }).toBuffer()
    const hash = createHash('sha1').update(buffer).digest('hex').slice(0, 8)
    const file = `${slug.replace(/[^a-z0-9-]/gi, '-')}-${hash}.webp`
    await mkdir(ASSETS_DIR, { recursive: true })
    await writeFile(resolve(ASSETS_DIR, file), buffer)
    return { src: `/blogs/${file}`, width, height, type: 'image/webp' }
  } catch {
    // Never fail a build over a share image: the caller falls back to the
    // original hero, which is what every article used before this existed.
    return null
  }
}

// Define the blog schema
const blog = s
  .object({
    title: s.string(),
    // Optional short title for the <title> tag only (the on-page H1, Open
    // Graph title and NewsArticle headline all keep using `title` above,
    // unchanged). Falls back to `title` when not set - see getCategory's
    // sibling helper `metaTitle()` in utils/seo.js for how the brand suffix
    // (" | EVGyan") gets dropped automatically once this would run long.
    seoTitle: s.string().optional(),
    publishedAt: s.isodate(),
    updatedAt: s.isodate(),
    description: s.string(),
    image: s.image(),
    // Descriptive alt text for the hero image, written by the publisher.
    // Optional in the schema so existing articles never break; the publishing
    // flow should treat it as required for new articles going forward.
    imageAlt: s.string().optional(),
    isPublished: s.boolean().default(true),
    author: s.string(),
    tags: s.array(s.string()),
    // Where the story came from. Optional so nothing already published
    // breaks, but the publishing pipeline should fill it on every news
    // article: a reader who cannot see what a claim rests on has no way
    // to check it, and "a report said" with no outlet named is the single
    // most common credibility problem on a news site.
    //
    // Each entry is `name` plus `url`. A bare string is accepted too and
    // treated as a name-only source, for the cases where the original is
    // offline or behind a wall.
    sources: s
      .array(
        s.union([
          s.string(),
          s.object({
            name: s.string(),
            url: s.string().url().optional(),
          }),
        ])
      )
      .optional(),
    body: s.mdx(),
    toc: s.toc(),
    slug: s.string(),
  })
  .transform(async (data, { meta }) => {
    const image = {
      ...data.image,
      src: data.image.src.replace("/static", "/blogs"),
    }
    const shareImage =
      (await buildShareImage(image, data.slug, meta.path)) ||
      { src: image.src, width: image.width, height: image.height }
    return {
      ...data,
      url: `/blogs/${data.slug}`,
      readingTime: readingTime(data.body),
    //   toc: headings,
      // Falls back to the headline when no one has written real alt text yet.
      imageAlt: data.imageAlt || data.title,
      seoTitle: data.seoTitle || data.title,
      image,
      // og:image / twitter:image / NewsArticle image / RSS - see
      // buildShareImage above. Always present: falls back to the hero.
      shareImage,
    }
  })

export default defineConfig({
  root: 'content',
  collections: {
    blogs: {
      name: 'Blog',
      pattern: 'blogs/**/*.mdx',
      schema: blog,
    },
  },
  output: {
    data: '.velite/generated',
    assets: 'public/blogs',
    base: '/blogs/',
    clean: true,
  },
  // Add MDX plugins
  mdx: {
    remarkPlugins: [remarkGfm, remarkImageSize],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, codeOptions]
    ]
  }
})
