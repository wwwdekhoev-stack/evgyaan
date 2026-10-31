import siteMetadata from "@/src/utils/siteMetaData";
import { absoluteUrl, getPublishedBlogs, xmlEscape } from "@/src/utils/seo";

// Google News sitemap: only articles published in the last 48 hours.
// Re-generated at most every 10 minutes, so the 48-hour window stays accurate
// between deploys.
export const revalidate = 600;

const WINDOW_MS = 48 * 60 * 60 * 1000;

export function GET() {
  const cutoff = Date.now() - WINDOW_MS;
  const recent = getPublishedBlogs()
    .filter((b) => new Date(b.publishedAt).getTime() >= cutoff)
    .slice(0, 1000);

  const items = recent
    .map(
      (b) => `  <url>
    <loc>${xmlEscape(absoluteUrl(b.url))}</loc>
    <news:news>
      <news:publication>
        <news:name>${xmlEscape(siteMetadata.headerTitle)}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(b.publishedAt).toISOString()}</news:publication_date>
      <news:title>${xmlEscape(b.title)}</news:title>
    </news:news>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${items}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=600",
    },
  });
}
