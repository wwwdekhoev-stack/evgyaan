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
//
// Typed NewsMediaOrganization rather than a bare Organization: this site
// publishes news, and news surfaces (and sponsors doing diligence) look for
// the publisher to say who stands behind it, who founded it, where the
// editorial standards are written down, and how to reach a human. A bare
// Organization node answers none of that.
//
// Still missing and only Tarun can supply them: the registered postal
// address (`address`) and the founding date (`foundingDate`). Both are
// deliberately absent rather than guessed - a wrong legal detail in
// structured data is worse than a missing one.
export const publisherSchema = () => ({
  "@type": "NewsMediaOrganization",
  "@id": `${siteMetadata.siteUrl}/#organization`,
  name: siteMetadata.headerTitle,
  legalName: siteMetadata.legalName,
  url: siteMetadata.siteUrl,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl(siteMetadata.siteLogo),
    width: 512,
    height: 512,
  },
  founder: {
    "@type": "Person",
    name: siteMetadata.founder,
    url: absoluteUrl("/authors/tarun-pal"),
  },
  // Where the standards this masthead claims are actually written down.
  publishingPrinciples: absoluteUrl("/editorial-policy"),
  // Same page carries the corrections policy.
  correctionsPolicy: absoluteUrl("/editorial-policy"),
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "editorial",
      email: siteMetadata.correctionsEmail,
      url: absoluteUrl("/contact"),
      availableLanguage: ["en", "hi"],
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteMetadata.email,
      url: absoluteUrl("/advertise"),
      availableLanguage: ["en", "hi"],
    },
  ],
  sameAs: [
    siteMetadata.youtube,
    siteMetadata.instagram,
    siteMetadata.twitter,
    siteMetadata.facebook,
    siteMetadata.linkedin,
  ].filter(Boolean),
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
