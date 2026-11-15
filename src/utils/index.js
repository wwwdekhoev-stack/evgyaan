import { compareDesc, parseISO } from "date-fns";

// All dates on the site are shown in Indian time (IST), regardless of the
// server's timezone (Vercel builds/renders in UTC).
export const formatDateIST = (
  value,
  options = { day: "numeric", month: "short", year: "numeric" },
  locale = "en-IN"
) =>
  new Date(value).toLocaleDateString(locale, {
    ...options,
    timeZone: "Asia/Kolkata",
  });

// The dateline under a headline: "14 November 2026, 11:30 PM IST".
//
// News surfaces (and readers deciding whether a story is still current)
// expect a visible time, not just a day. Articles carry a real IST minute
// in frontmatter, so showing it costs nothing and is the cheapest proof
// that the timestamp in the structured data is honest.
export const formatDateTimeIST = (value, locale = "en-IN") => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const day = date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

  const time = date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    })
    .replace(/\u202f/g, " ");

  return `${day}, ${time} IST`;
};

// True when an article has genuinely been revised, not merely re-saved.
// A one-minute difference is noise from the publishing pipeline; anything
// past that is a real update worth showing the reader.
export const hasRealUpdate = (publishedAt, updatedAt) => {
  if (!publishedAt || !updatedAt) return false;
  const p = new Date(publishedAt).getTime();
  const u = new Date(updatedAt).getTime();
  if (Number.isNaN(p) || Number.isNaN(u)) return false;
  return u - p > 60 * 1000;
};

// ---- Pagination ----
// How many article rows appear in each list page (homepage feed, category pages).
// Homepage page 1 additionally shows the big hero story above these rows.
export const PER_PAGE = 15;

// Homepage: item 0 is the hero; the feed is everything after it, paged.
export const getHomePage = (published, page) => {
  const feedAll = published.slice(1);
  const totalPages = Math.max(1, Math.ceil(feedAll.length / PER_PAGE));
  const items = feedAll.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  return { hero: published[0], items, totalPages };
};

// Category (or any plain list): straight paging.
export const getListPage = (posts, page) => {
  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const items = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  return { items, totalPages };
};

export const cx = (...classNames) => classNames.filter(Boolean).join(" ");

// Indian digit grouping (2,23,886) rather than the western 223,886.
export const formatIN = (n) => (typeof n === "number" ? n.toLocaleString("en-IN") : n);

export const sortBlogs = (blogs) => {
  return blogs
    .slice()
    .sort((a, b) =>
      compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt))
    );
};

// Groups an article under one of our top-level nav categories based on its
// tags. Existing content tags aren't a strict controlled taxonomy (e.g. "two
// wheeler" vs "electric two-wheeler"), so this matches on keywords rather
// than an exact tag. Order is priority order, most specific first, since a
// story can carry tags for more than one bucket (e.g. a bus-expansion story
// that also mentions three-wheelers) - battery/charging is checked first so
// a two-wheeler charging-infra story lands there, not in the generic
// vehicle-type bucket; policy/industry is checked before commercial-EVs so a
// policy roundup that merely mentions bus financing in passing stays a
// policy story, not a bus story. The keyword lists are deliberately narrow
// (full phrases, not a bare "battery" or "tax" match, which would also
// catch "battery pack" or "robotaxi") so an unrelated article doesn't get
// swept in.
export const getCategory = (tags = []) => {
  const joined = tags.join(" ").toLowerCase();
  if (
    joined.includes("charg") || // covers charging / charger / chargers
    joined.includes("ev battery") ||
    joined.includes("battery tech") ||
    joined.includes("battery chemistry") ||
    joined.includes("battery innovation") ||
    joined.includes("solid-state battery") ||
    joined.includes("battery swap station") ||
    joined.includes("battery swapping network")
  ) {
    return { label: "EV Battery & Charging", slug: "battery-charging" };
  }
  if (
    joined.includes("ev policy") ||
    joined.includes("ev conclave") ||
    joined.includes("technician shortage") ||
    joined.includes("state ev tax") ||
    joined.includes("ev industry")
  ) {
    return { label: "Policy & Industry", slug: "policy-industry" };
  }
  if (
    joined.includes("electric bus") ||
    joined.includes("electric truck") ||
    joined.includes("ev commercial vehicle") ||
    joined.includes("lcv") ||
    joined.includes("goods carrier") ||
    // Three-wheelers (e-rickshaws, e-autos) used to be their own category;
    // folded into Commercial EVs on Tarun's call - one category wasn't
    // worth the extra nav item.
    joined.includes("three-wheeler") ||
    joined.includes("three wheeler") ||
    joined.includes("e-rickshaw")
  ) {
    return { label: "Commercial EVs", slug: "commercial-evs" };
  }
  if (joined.includes("two wheel") || joined.includes("two-wheel")) {
    return { label: "EV Scooters/Bikes", slug: "two-wheeler" };
  }
  return { label: "EV Cars/4W", slug: "four-wheeler" };
};
