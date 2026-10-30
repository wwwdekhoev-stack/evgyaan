import { compareDesc, parseISO } from "date-fns";

export const cx = (...classNames) => classNames.filter(Boolean).join(" ");

export const sortBlogs = (blogs) => {
  return blogs
    .slice()
    .sort((a, b) =>
      compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt))
    );
};

// Groups an article under our two top-level nav categories based on its tags.
// Existing content tags aren't a strict controlled taxonomy (e.g. "two wheeler"
// vs "electric two-wheeler"), so this matches on keywords rather than an exact tag.
export const getCategory = (tags = []) => {
  const joined = tags.join(" ").toLowerCase();
  if (joined.includes("two wheel") || joined.includes("two-wheel")) {
    return { label: "2-Wheeler EV", slug: "two-wheeler" };
  }
  return { label: "4-Wheeler EV", slug: "four-wheeler" };
};
