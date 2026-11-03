import Link from "next/link";
import JsonLd from "@/src/components/Seo/JsonLd";
import siteMetadata from "@/src/utils/siteMetaData";
import { absoluteUrl, getBlogBySlug, publisherSchema } from "@/src/utils/seo";
import { formatIN } from "@/src/utils";
import { BY_STATE, getLatestByStateMonth } from "@/src/data/salesData";

export const metadata = {
  title: "India EV Sales by State",
  description:
    "Which Indian state leads EV registrations each month, by segment - electric two-wheelers, cars, three-wheelers, buses and LCVs - sourced from Vahan.",
  alternates: { canonical: "/ev-sales-data/by-state" },
  openGraph: {
    title: "India EV Sales by State | EVGyan",
    description: "Which Indian state leads EV registrations each month, by segment.",
    url: absoluteUrl("/ev-sales-data/by-state"),
    siteName: siteMetadata.headerTitle,
    locale: "en_US",
    type: "website",
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    card: "summary_large_image",
    title: "India EV Sales by State | EVGyan",
    description: "Which Indian state leads EV registrations each month, by segment.",
    images: [siteMetadata.socialBanner],
  },
};

export default function ByStatePage() {
  const latestMonth = getLatestByStateMonth();
  const latestRows = BY_STATE.filter((r) => r.month === latestMonth);
  const olderRows = BY_STATE.filter((r) => r.month !== latestMonth);

  const reports = BY_STATE
    .map((r) => {
      const article = getBlogBySlug(r.articleSlug);
      return article ? { name: article.title, url: absoluteUrl(article.url) } : null;
    })
    .filter(Boolean);

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "India EV Sales by State - Monthly Reports",
    itemListElement: reports.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: r.url,
      name: r.name,
    })),
  };

  const datasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${absoluteUrl("/ev-sales-data/by-state")}#dataset`,
    name: "India EV Sales by State",
    description: "State-wise electric-vehicle registration leaders for India, by segment, sourced from the Vahan portal.",
    url: absoluteUrl("/ev-sales-data/by-state"),
    creator: publisherSchema(),
  };

  const Row = ({ row }) => {
    const article = getBlogBySlug(row.articleSlug);
    return (
      <div className="rounded-lg border border-borderSoft p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-gray">{row.segmentLabel}</p>
        <p className="mt-2 text-lg font-bold text-dark">
          {row.leader} &middot; {formatIN(row.leaderTotal)}
        </p>
        <p className="mt-1 text-sm text-gray">{row.note}</p>
        {article && (
          <Link
            href={article.url}
            className="mt-2 inline-block text-sm font-semibold underline decoration-accent decoration-2 underline-offset-2"
          >
            Full state breakdown &rarr;
          </Link>
        )}
      </div>
    );
  };

  return (
    <main className="bg-light text-dark">
      <JsonLd data={datasetLd} />
      <JsonLd data={itemListLd} />

      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-10">
        <Link href="/ev-sales-data" className="text-xs font-bold text-gray uppercase tracking-wide hover:underline">
          &larr; India EV Sales Data
        </Link>
        <h1 className="mt-3 text-[28px] md:text-[34px] leading-[1.3] font-semibold text-dark">
          India EV Sales by State
        </h1>
        <p className="mt-3 max-w-2xl text-base text-gray leading-relaxed">
          Which state leads EV registrations each month, by segment - updated as new state-wise
          reports are published.
        </p>
      </section>

      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-8 pb-16">
        <h2 className="text-lg font-bold text-dark mb-4">Latest - {latestRows[0]?.label}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {latestRows.map((row) => (
            <Row key={row.segment} row={row} />
          ))}
        </div>

        {olderRows.length > 0 && (
          <>
            <h2 className="text-lg font-bold text-dark mb-4 mt-10">Earlier months</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {olderRows.map((row) => (
                <Row key={`${row.segment}-${row.month}`} row={row} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
