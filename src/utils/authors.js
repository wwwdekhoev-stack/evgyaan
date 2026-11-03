import siteMetadata from "@/src/utils/siteMetaData";
import { getPublishedBlogs } from "@/src/utils/seo";

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
    credential: "Editorial team of EVGyan.com, founded by Tarun Pal — India's largest dedicated EV YouTube channel (400K+ subscribers), covering Indian EVs for over four years.",
    // These are EVGyan's own channels (the desk IS the channel), not a
    // stand-in for any one person's accounts — fine to show here.
    socials: [
      { label: "YouTube", href: siteMetadata.youtube },
      { label: "Instagram", href: siteMetadata.instagram },
      { label: "LinkedIn", href: siteMetadata.linkedin },
      { label: "X / Twitter", href: siteMetadata.twitter },
    ],
    // Phase 7.2: Google's E-E-A-T guidance wants NewsArticle.author to be a
    // real, named individual rather than a generic desk/org. Tarun's call
    // (asked, not assumed) was to fix this at the structured-data layer
    // only — the visible byline, the /authors/evgyan-desk page, and its own
    // schema all stay "EVGyan Desk" exactly as published. This object is
    // read only when building the per-article NewsArticle JSON-LD (see
    // blogs/[slug]/page.js) and never touches anything rendered on screen.
    // No `url` on purpose: pointing a Person node at a page titled
    // "EVGyan Desk" would be its own mismatch, and `sameAs` is the signal
    // that actually matters for E-E-A-T.
    schemaAuthor: {
      type: "Person",
      name: "Tarun Pal",
      jobTitle: "Founder, EVGyan",
      sameAs: [siteMetadata.youtube, siteMetadata.linkedin, siteMetadata.twitter],
    },
  },
  "vishal-kumar": {
    type: "Person",
    bio: "Vishal Kumar writes EV news and sales-data stories for EVGyan, covering electric cars and two-wheelers in India. A certified car and bike enthusiast, he's usually got an opinion on torque figures ready before you've finished asking. Off the clock he's probably planning a ride or stuck three reviews deep on a bike he has no intention of buying.",
    image: "/vishal.jpg",
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
    // Present only for authors with a Phase-7.2-style schema override
    // (currently just evgyan-desk); everyone else uses type/name/path above
    // as before - see blogs/[slug]/page.js for how this is consumed.
    schemaAuthor: known.schemaAuthor || null,
    credential: known.credential || null,
    socials: known.socials?.filter((s) => s.href) || [],
  };
}

// Every distinct byline currently in use, for the footer's author list
// (Phase 7.3) - so a new author in content automatically gets a link with
// no footer edit required.
export function getAllAuthors() {
  const bySlug = new Map();
  for (const blog of getPublishedBlogs()) {
    const author = getAuthor(blog.author);
    if (!bySlug.has(author.slug)) bySlug.set(author.slug, author);
  }
  return [...bySlug.values()].sort((a, b) => a.name.localeCompare(b.name));
}
