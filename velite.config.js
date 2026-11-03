import { defineConfig, s } from 'velite'
import GithubSlugger from "github-slugger"
import readingTime from "reading-time"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

const codeOptions = {
  theme: 'github-dark',
  grid: false,
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
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, codeOptions]
    ]
  }
})
