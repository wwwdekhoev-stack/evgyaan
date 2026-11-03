// Brand hub pages (/brands/<slug>) — the cheapest long-tail SEO win per the
// Phase 4 taxonomy audit: brand-name queries are high-volume and the site
// otherwise has no page targeting them. Matching is on tags + title
// substrings since that's structured data every article already has;
// aliases cover the real tag/title variants seen in the content so far.
export const BRANDS = [
  {
    slug: "tata",
    label: "Tata",
    aliases: ["tata motors", "tata ev", "tata safari", "tata curvv", "tata nexon", "tata punch", "tata harrier", "tata kuno", " tata "],
    intro:
      "Tata Motors is India's largest electric-car maker by volume, with the Nexon EV, Punch EV, Curvv EV and Harrier EV spanning most price points in the market. Tata was also the first mainstream Indian carmaker to commit seriously to EVs, well before most rivals.",
  },
  {
    slug: "ather",
    label: "Ather Energy",
    aliases: ["ather", "ather energy", "ather rizta", "ather 450"],
    intro:
      "Ather Energy is one of India's pioneering electric-scooter makers, known for the 450 series and the family-focused Rizta, plus its own charging network (Ather Grid). It's consistently one of the top handful of brands by electric-scooter sales.",
  },
  {
    slug: "ola-electric",
    label: "Ola Electric",
    aliases: ["ola electric", "ola s1"],
    intro:
      "Ola Electric is one of India's highest-volume electric-scooter brands, built around its own Futurefactory and a direct-to-consumer sales model. The S1 series has been central to the rapid growth of electric two-wheelers in India.",
  },
  {
    slug: "tvs",
    label: "TVS",
    aliases: ["tvs motor", "tvs iqube", "tvs vs bajaj", " tvs"],
    intro:
      "TVS Motor is one of the top electric-scooter sellers in India with the iQube range, and part of the small set of brands that together account for the vast majority of electric-scooter sales in the country.",
  },
  {
    slug: "bajaj",
    label: "Bajaj",
    aliases: ["bajaj chetak", "bajaj auto"],
    intro:
      "Bajaj Auto makes the Chetak electric scooter, one of India's best-selling electric two-wheelers, and has been steadily expanding Chetak production capacity to meet demand.",
  },
  {
    slug: "hero-vida",
    label: "Hero Vida",
    aliases: ["hero vida", "vida vx2"],
    intro:
      "Vida is Hero MotoCorp's electric-scooter brand, built on the legacy of India's largest two-wheeler maker. The VX2 and related models compete directly in the fast-growing mainstream electric-scooter segment.",
  },
  {
    slug: "mahindra",
    label: "Mahindra",
    aliases: ["mahindra", "mahindra be 6", "xuv400"],
    intro:
      "Mahindra & Mahindra is one of India's major electric-car makers, with a dedicated EV platform underpinning models like the BE 6 and XUV400 aimed at buyers wanting a more premium electric SUV experience.",
  },
  {
    slug: "mg",
    label: "MG",
    aliases: ["mg windsor", "mg motor", " mg "],
    intro:
      "MG Motor India has been one of the more aggressive electric-car brands on pricing and features, with the Windsor EV in particular aimed squarely at making electric cars more affordable and accessible.",
  },
  {
    slug: "river",
    label: "River",
    aliases: ["river mobility", "river indie"],
    intro:
      "River Mobility is a newer Indian electric-scooter brand built around the Indie, positioned as a practical, storage-focused scooter for everyday riders and families.",
  },
  {
    slug: "ultraviolette",
    label: "Ultraviolette",
    aliases: ["ultraviolette"],
    intro:
      "Ultraviolette is an Indian electric-motorcycle brand best known for the performance-focused F77, aimed at riders who want EV tech without giving up the feel of a proper motorcycle.",
  },
];

export const BRAND_BY_SLUG = Object.fromEntries(BRANDS.map((b) => [b.slug, b]));

function matchesBrand(blog, brand) {
  const haystack = `${blog.title} ${blog.tags.join(" ")}`.toLowerCase();
  return brand.aliases.some((a) => haystack.includes(a));
}

// All brands an article mentions - used to render the brand-tag row under
// the byline on article pages.
export function getArticleBrands(blog) {
  return BRANDS.filter((b) => matchesBrand(blog, b));
}

export function getBrandArticles(slug, allBlogs) {
  const brand = BRAND_BY_SLUG[slug];
  if (!brand) return [];
  return allBlogs.filter((b) => b.isPublished && matchesBrand(b, brand));
}
