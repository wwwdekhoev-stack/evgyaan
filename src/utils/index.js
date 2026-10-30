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

// Groups an article under our three top-level nav categories based on its tags.
// Existing content tags aren't a strict controlled taxonomy (e.g. "two wheeler"
// vs "electric two-wheeler"), so this matches on keywords rather than an exact tag.
// Battery/charging is checked first since it's the more specific topic — a
// two-wheeler charging-infra story should land there, not in the generic
// vehicle-type bucket. The keyword list is deliberately narrow (full phrases,
// not a bare "battery" match) so a vehicle article that merely mentions a
// battery-swap station in passing doesn't get swept in here.
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
  if (joined.includes("two wheel") || joined.includes("two-wheel")) {
    return { label: "EV Scooters/Bikes", slug: "two-wheeler" };
  }
  return { label: "EV Cars/4W", slug: "four-wheeler" };
};
