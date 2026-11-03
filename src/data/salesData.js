// Single source of truth for the /ev-sales-data/* evergreen hub + segment
// pages (Phase 5). Numbers are taken from the headline figures in each
// month's own monthly deep-dive article (title/description), which are
// themselves pulled from Vahan.
//
// HOW TO UPDATE EACH MONTH (the "one-step editor action" Phase 5.3 asks
// for): once that month's monthly article(s) are published, add one entry
// per segment to MONTHS below (and one row to BY_STATE if a by-state
// article was published for that segment) with the headline number and the
// article's slug. Everything else - the hub page, the segment pages' tables,
// the MoM comparison, the Dataset/ItemList schema - is generated from this
// file automatically; nothing else needs to change.
//
// Vahan registrations can be revised for a few days after month-end as RTOs
// file late, so a by-state article published a day or two after the
// headline registrations article can show a slightly higher total - that's
// expected, not a data error; prefer the most recently published figure.

export const SEGMENTS = [
  { slug: "electric-two-wheeler", label: "Electric Two-Wheeler", dataKey: "electric-two-wheeler" },
  { slug: "electric-car", label: "Electric Car", dataKey: "electric-car" },
  { slug: "electric-three-wheeler", label: "Electric Three-Wheeler", dataKey: "electric-three-wheeler" },
  { slug: "electric-bus", label: "Electric Bus", dataKey: "electric-bus" },
];

export const SEGMENT_BY_SLUG = Object.fromEntries(SEGMENTS.map((s) => [s.slug, s]));

// Newest month last, so "latest" is always MONTHS[MONTHS.length - 1].
export const MONTHS = [
  {
    month: "2026-09",
    label: "September 2026",
    totalEV: null,
    evShare: null,
    segments: {
      "electric-two-wheeler": { total: 207134, yoy: "+88.5%", articleSlug: "electric-two-wheeler-sales-september-2026" },
      "electric-car": { total: 35940, yoy: "+93.8%", articleSlug: "electric-car-sales-september-2026" },
    },
  },
  {
    month: "2026-10",
    label: "October 2026",
    totalEV: 354137,
    evShare: "11.2%",
    totalArticleSlug: "india-ev-sales-october-2026",
    shareArticleSlug: "ev-share-october-2026-diwali-shift",
    segments: {
      "electric-two-wheeler": { total: 223886, yoy: "+48%", articleSlug: "electric-two-wheeler-registrations-october-2026" },
      "electric-car": { total: 36708, yoy: "+75%", articleSlug: "electric-car-registrations-october-2026" },
      "electric-three-wheeler": { total: 88562, yoy: "+24.8%", articleSlug: "electric-three-wheeler-sales-october-2026" },
      "electric-bus": { total: 785, yoy: "+132%", articleSlug: "electric-bus-sales-by-state-october-2026" },
    },
  },
];

export function getLatestMonth() {
  return MONTHS[MONTHS.length - 1];
}

// All months that have a number for this segment, oldest first.
export function getSegmentHistory(slug) {
  return MONTHS.filter((m) => m.segments[slug]).map((m) => ({
    month: m.month,
    label: m.label,
    ...m.segments[slug],
  }));
}

// State-wise breakdown reports. One row per published by-state article;
// add a new one each month a by-state piece runs for that segment.
export const BY_STATE = [
  {
    month: "2026-10",
    label: "October 2026",
    segment: "electric-two-wheeler",
    segmentLabel: "Electric Two-Wheeler",
    leader: "Maharashtra",
    leaderTotal: 33466,
    note: "Top 5 states hold 50.14% of India's total",
    articleSlug: "electric-two-wheeler-sales-by-state-october-2026",
  },
  {
    month: "2026-10",
    label: "October 2026",
    segment: "electric-car",
    segmentLabel: "Electric Car",
    leader: "Maharashtra",
    leaderTotal: 5332,
    note: "Telangana is No. 2 with 3,636; top 5 states hold 51.70%",
    articleSlug: "electric-car-sales-by-state-october-2026",
  },
  {
    month: "2026-10",
    label: "October 2026",
    segment: "electric-bus",
    segmentLabel: "Electric Bus",
    leader: "Maharashtra",
    leaderTotal: 360,
    note: "360 of 785 nationwide",
    articleSlug: "electric-bus-sales-by-state-october-2026",
  },
  {
    month: "2026-10",
    label: "October 2026",
    segment: "electric-lcv",
    segmentLabel: "Electric LCV",
    leader: "Maharashtra",
    leaderTotal: 868,
    note: "868 of 3,916 nationwide",
    articleSlug: "electric-lcv-sales-by-state-october-2026",
  },
];

export function getLatestByStateMonth() {
  return BY_STATE.length ? BY_STATE[BY_STATE.length - 1].month : null;
}
