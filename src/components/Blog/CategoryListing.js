import { notFound } from "next/navigation";
import { blogs as allBlogs } from "@/.velite/generated";
import { sortBlogs, getCategory, getListPage } from "@/src/utils";
import ArticleRow from "@/src/components/Blog/ArticleRow";
import Pagination from "@/src/components/Blog/Pagination";
import Breadcrumbs from "@/src/components/Blog/Breadcrumbs";
import JsonLd from "@/src/components/Seo/JsonLd";
import { absoluteUrl } from "@/src/utils/seo";

// label = nav/H1 text (unchanged). intro = a 100-150 word evergreen summary
// shown under the H1 on page 1 only - it's what gives these otherwise-bare
// listing pages real crawlable text (Phase 6.2), not boilerplate that
// changes with the article list.
export const CATEGORY_META = {
  "two-wheeler": {
    label: "EV Scooters/Bikes",
    intro:
      "Electric two-wheelers are where EV adoption in India is actually happening at scale - scooters and bikes from Ola Electric, Ather, TVS, Bajaj, Hero Vida and others now outsell many petrol models in several cities. This section tracks the segment the way EVGyan covers everything else: real-world range instead of brochure claims, service-network reports from actual owners, and the monthly Vahan registration numbers state by state, not just the headline all-India total. You'll find new-model reviews, software-update changelogs, price-cut and variant news, and recurring complaint patterns (battery degradation, waiting periods, service turnaround) alongside the good news. If you're deciding between a scooter and a bike, or between two models in the same price band, start with the comparison and sales-data pieces below - they're written to help you decide, not to sell you one brand over another.",
  },
  "four-wheeler": {
    label: "EV Cars/4W",
    intro:
      "India's electric-car market is smaller than two-wheelers but growing fast, led by Tata, MG, Mahindra and a widening set of Chinese- and Korean-backed entrants. This section covers new launches, real-world range and charging-time tests, ownership-cost breakdowns versus comparable petrol or diesel cars, and the monthly Vahan registration data by state and by model. EVGyan's approach here is the same skeptic-first one it applies everywhere: claimed range gets checked against what owners actually report, and a car doesn't get called \"the best EV under X lakh\" without the math to back it up. Expect coverage of charging-infrastructure gaps on highways, resale-value trends as the used-EV market matures, and policy changes (FAME subsidies, state road-tax waivers, import duty) that directly move prices. If you're cross-shopping EVs against each other or against a petrol car, the comparison and sales-data articles below are the place to start.",
  },
  "battery-charging": {
    label: "EV Battery & Charging",
    intro:
      "Battery health and charging access are the two things that actually decide whether owning an EV in India works day to day - and they're the two topics brochures say the least about. This section covers battery-swap infrastructure rollouts, public and home charger availability and pricing, degradation and warranty terms across brands, fast-charging network expansion (and where it's still thin), and running-cost math so you can work out what a full charge or a swap actually costs versus petrol. EVGyan also tracks the less-flattering stories here: charger downtime, warranty disputes, and battery-swap pricing changes that get quietly rolled out without much notice. If you're trying to decide whether your city or your daily commute actually supports an EV right now, rather than in theory, this is the section built to answer that honestly.",
  },
  "three-wheeler": {
    label: "Three-Wheeler",
    intro:
      "Electric three-wheelers - e-rickshaws, e-autos and last-mile delivery three-wheelers - are one of the quietest EV success stories in India, often outselling electric cars by volume in the commercial-vehicle space. This section tracks monthly Vahan registration data for the segment by state, new-model launches from established and newer manufacturers, financing and loan schemes aimed at drivers and fleet operators, and the running-cost economics that matter most to someone using the vehicle for a livelihood rather than a weekend drive. Because this segment is driven by total cost of ownership more than by brand loyalty or feature lists, the coverage here leans heavily on real numbers: registration counts, state-wise adoption, and financing terms, so operators and prospective buyers can compare options on the basis that actually affects their earnings.",
  },
  "commercial-evs": {
    label: "Commercial EVs",
    intro:
      "Electric buses, trucks and light commercial vehicles (LCVs) are the part of India's EV transition most people never see, even though it's where some of the biggest fleet and policy decisions are happening - state transport corporations buying hundreds of e-buses at a time, logistics companies piloting electric LCVs, and battery-swap infrastructure built specifically for commercial routes. This section covers fleet procurement news, state-wise registration data for buses and goods carriers, charging and battery-swap infrastructure built for commercial duty cycles, and the policy and subsidy schemes that make or break large fleet orders. It's written for the same audience as the rest of EVGyan - people who want the real numbers and the real constraints, whether that's a fleet operator weighing the economics or anyone curious about how India's public transport and logistics networks are actually going electric.",
  },
  "policy-industry": {
    label: "Policy & Industry",
    intro:
      "Government policy moves the EV market in India more directly than almost anywhere else - FAME subsidies, state-level tax waivers, PLI scheme approvals and import-duty changes can shift a model's price by tens of thousands of rupees overnight. This section tracks those policy changes as they happen, along with the industry-side stories that don't fit neatly into a single vehicle segment: EV conclaves and industry events, technician and service-workforce shortages as the market scales faster than trained staff, state EV policies and their actual on-ground implementation (not just the announcement), and manufacturer-level news like new factories, partnerships and investment. If you want to understand why EV prices or availability suddenly changed in your state, or what's coming next from policymakers, this is the section that explains the why behind the news covered everywhere else on the site.",
  },
};

export function getCategoryPosts(slug) {
  return sortBlogs(
    allBlogs.filter(
      (blog) => blog.isPublished && getCategory(blog.tags).slug === slug
    )
  );
}

// Shared by page 1 (/categories/[slug]) and page N (/categories/[slug]/page/[page]).
export function CategoryListing({ slug, page }) {
  const meta = CATEGORY_META[slug];
  const posts = getCategoryPosts(slug);
  const { items, totalPages } = getListPage(posts, page);
  if (page > totalPages) notFound();

  const pageUrl =
    page > 1 ? absoluteUrl(`/categories/${slug}/page/${page}`) : absoluteUrl(`/categories/${slug}`);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: `${meta.label} News`, item: pageUrl },
    ],
  };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collectionpage`,
    url: pageUrl,
    name: `${meta.label} News`,
    description: meta.intro,
    isPartOf: { "@id": `${absoluteUrl("/")}#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((blog, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(blog.url),
        name: blog.title,
      })),
    },
  };

  return (
    <main className="bg-light text-dark">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={collectionLd} />
      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: `${meta.label} News` },
          ]}
        />
        <h1 className="mt-3 text-[28px] md:text-[34px] leading-[1.3] font-semibold text-dark">
          {meta.label} News
        </h1>
        <p className="mt-2 text-base text-gray">
          {posts.length} {posts.length === 1 ? "story" : "stories"}
          {totalPages > 1 && <> &middot; Page {page} of {totalPages}</>}
        </p>
        {page === 1 && meta.intro && (
          <p className="mt-4 max-w-3xl text-base text-gray leading-relaxed">{meta.intro}</p>
        )}
      </section>

      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-8 pb-16">
        {posts.length === 0 && (
          <p className="py-6 text-gray text-sm">No stories here yet &mdash; check back soon.</p>
        )}
        <div className="flex flex-col divide-y divide-borderSoft">
          {items.map((blog) => (
            <ArticleRow key={blog.slug} blog={blog} showCategory={false} />
          ))}
        </div>
        <Pagination basePath={`/categories/${slug}`} current={page} total={totalPages} />
      </section>
    </main>
  );
}

