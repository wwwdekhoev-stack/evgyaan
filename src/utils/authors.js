import siteMetadata from "@/src/utils/siteMetaData";

// Article frontmatter only carries an author *name*; this turns it into a
// stable slug (/authors/<slug>) plus the details used on the author page and
// in structured data. Unknown authors still get a working page.
export const slugifyAuthor = (name = "") =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const KNOWN_AUTHORS = {
  "evgyan-desk": {
    type: "Organization",
    bio: "The EVGyan Desk is the editorial team behind EVGyan.com. It covers EV news, monthly sales data and policy changes for electric cars and two-wheelers in India.",
    // It's a team byline, not an individual, so the site logo stands in as
    // its "photo" — that's a real, accurate image, not a placeholder.
    image: siteMetadata.siteLogo,
  },
  "vishal-kumar": {
    type: "Person",
    bio: "Vishal Kumar writes EV news and sales-data stories for EVGyan, covering electric cars and two-wheelers in India.",
    // No real headshot on file for Vishal yet — left blank rather than
    // faked. Add one here (and it'll show on his author page + schema)
    // once you have it.
    image: null,
  },
};

export function getAuthor(name) {
  const display = name || siteMetadata.author;
  const slug = slugifyAuthor(display);
  const known = KNOWN_AUTHORS[slug] || {};
  return {
    name: display,
    slug,
    path: `/authors/${slug}`,
    type: known.type || "Person",
    bio:
      known.bio ||
      `${display} writes for EVGyan, covering EV news and sales data in India.`,
    image: known.image || null,
  };
}
