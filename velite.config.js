import { defineConfig, s } from 'velite'
import GithubSlugger from "github-slugger"
import readingTime from "reading-time"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { existsSync } from "node:fs"
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
  .transform(data => {
    return {
      ...data,
      url: `/blogs/${data.slug}`,
      readingTime: readingTime(data.body),
    //   toc: headings,
      // Falls back to the headline when no one has written real alt text yet.
      imageAlt: data.imageAlt || data.title,
      seoTitle: data.seoTitle || data.title,
      image: {
        ...data.image,
        src: data.image.src.replace("/static", "/blogs"),
      },
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
