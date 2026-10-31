import { blogs } from "@/.velite/generated";
import siteMetadata from "@/src/utils/siteMetaData";
import { sortBlogs } from "@/src/utils";

// Absolute URL on the canonical (www) host. Accepts "/path" or "path".
export const absoluteUrl = (path = "/") =>
  `${siteMetadata.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

export const getPublishedBlogs = () =>
  sortBlogs(blogs.filter((b) => b.isPublished));

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

// Escapes text for use inside XML (sitemaps, RSS).
export const xmlEscape = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
