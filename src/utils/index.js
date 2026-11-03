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
    joined.includes("goods carrier")
  ) {
    return { label: "Commercial EVs", slug: "commercial-evs" };
  }
  if (
    joined.includes("three-wheeler") ||
    joined.includes("three wheeler") ||
    joined.includes("e-rickshaw")
  ) {
    return { label: "Three-Wheeler", slug: "three-wheeler" };
  }
  if (joined.includes("two wheel") || joined.includes("two-wheel")) {
    return { label: "EV Scooters/Bikes", slug: "two-wheeler" };
  }
  return { label: "EV Cars/4W", slug: "four-wheeler" };
};
