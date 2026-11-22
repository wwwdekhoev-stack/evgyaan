import siteMetadata from "@/src/utils/siteMetaData";
import { getCategory } from "@/src/utils";
import { absoluteUrl, getPublishedBlogs, blogModifiedAt, xmlEscape } from "@/src/utils/seo";

// RSS 2.0 feed of the 30 newest published articles.
export function buildRssResponse() {
  const posts = getPublishedBlogs().slice(0, 30);
  const lastBuild = posts.length ? blogModifiedAt(posts[0]) : new Date();

  const items = posts
    .map((b) => {
      const url = absoluteUrl(b.url);
      // The 16:9 WebP share image (velite.config.js), same as og:image.
      const share = b.shareImage || b.image;
      const image = absoluteUrl(share.src);
      const type = share.type ? ` type="${share.type}"` : "";
      return `    <item>
      <title>${xmlEscape(b.title)}</title>
      <link>${xmlEscape(url)}</link>
      <guid isPermaLink="true">${xmlEscape(url)}</guid>
      <pubDate>${new Date(b.publishedAt).toUTCString()}</pubDate>
      <dc:creator>${xmlEscape(b.author || siteMetadata.author)}</dc:creator>
      <category>${xmlEscape(getCategory(b.tags).label)}</category>
      <description>${xmlEscape(b.description)}</description>
      <media:content url="${xmlEscape(image)}"${type} medium="image" width="${share.width}" height="${share.height}" />
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${xmlEscape(siteMetadata.headerTitle)}</title>
    <link>${xmlEscape(siteMetadata.siteUrl)}</link>
    <description>${xmlEscape(siteMetadata.description)}</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>
    <atom:link href="${xmlEscape(absoluteUrl("/rss.xml"))}" rel="self" type="application/rss+xml" />
    <image>
      <url>${xmlEscape(absoluteUrl(siteMetadata.siteLogo))}</url>
      <title>${xmlEscape(siteMetadata.headerTitle)}</title>
      <link>${xmlEscape(siteMetadata.siteUrl)}</link>
    </image>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=600",
    },
  });
}
