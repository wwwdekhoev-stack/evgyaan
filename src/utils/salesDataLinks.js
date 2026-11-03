import { MONTHS, BY_STATE, SEGMENT_BY_SLUG } from "@/src/data/salesData";

// Reverse lookup: given an article's slug, is it one of the monthly data
// reports registered in salesData.js? If so, return where its "see the full
// data hub" link should point. This is what makes the monthly-article ->
// segment-page link (Phase 5.3) automatic for every article, past and
// future, with no per-article edit - only salesData.js needs the new
// month's entry.
export function getSegmentLinkForArticle(slug) {
  for (const m of MONTHS) {
    for (const [segSlug, info] of Object.entries(m.segments)) {
      if (info.articleSlug === slug) {
        return {
          href: `/ev-sales-data/${segSlug}`,
          label: `${SEGMENT_BY_SLUG[segSlug]?.label || segSlug} Sales Data`,
        };
      }
    }
    if (m.totalArticleSlug === slug || m.shareArticleSlug === slug) {
      return { href: "/ev-sales-data", label: "India EV Sales Data" };
    }
  }
  for (const row of BY_STATE) {
    if (row.articleSlug === slug) {
      return { href: "/ev-sales-data/by-state", label: "EV Sales by State" };
    }
  }
  return null;
}
