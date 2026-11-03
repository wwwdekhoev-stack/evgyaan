import { blogs } from "@/.velite/generated";
import siteMetadata from "@/src/utils/siteMetaData";
import { sortBlogs } from "@/src/utils";

// Absolute URL on the canonical (www) host. Accepts "/path" or "path".
export const absoluteUrl = (path = "/") =>
  `${siteMetadata.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

export const getPublishedBlogs = () =>
  sortBlogs(blogs.filter((b) => b.isPublished));

export const getBlogBySlug = (slug) => blogs.find((b) => b.slug === slug) || null;

export const blogModifiedAt = (blog) => blog.updatedAt || blog.publishedAt;

// Publisher block reused by NewsArticle + Organization schema.
export const publisherSchema = () => ({
  "@type": "Organization",
  "@id": `${siteMetadata.siteUrl}/#organization`,
  name: siteMetadata.headerTitle,
  url: siteMetadata.siteUrl,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl(siteMetadata.siteLogo),
    width: 512,
    height: 512,
  },
});

// Brand suffix the root layout's `title.template` appends to every plain
// string title ("%s | EVGyan"). Google truncates <title> around 60-65
// chars, so once that suffix would push a page over 60, we skip the
// template entirely (an { absolute } title) rather than let it get cut off
// mid-word. This only affects the <title> tag - the on-page H1, Open Graph
// title and JSON-LD headline are untouched.
const BRAND_SUFFIX = " | EVGyan";
const TITLE_BUDGET = 60;

export function metaTitle(text = "") {
  if (text.length + BRAND_SUFFIX.length <= TITLE_BUDGET) return text;
  return { absolute: text };
}

// Escapes text for use inside XML (sitemaps, RSS).
export const xmlEscape = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
