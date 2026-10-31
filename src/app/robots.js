import siteMetadata from "@/src/utils/siteMetaData";

export default function robots() {
  const base = siteMetadata.siteUrl;
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: [`${base}/sitemap.xml`, `${base}/news-sitemap.xml`],
  };
}
