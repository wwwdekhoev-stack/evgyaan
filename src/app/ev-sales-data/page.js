import Link from "next/link";
import JsonLd from "@/src/components/Seo/JsonLd";
import MoMBars from "@/src/components/SalesData/MoMBars";
import siteMetadata from "@/src/utils/siteMetaData";
import { absoluteUrl, getBlogBySlug, publisherSchema } from "@/src/utils/seo";
import { formatIN } from "@/src/utils";
import { SEGMENTS, MONTHS, getLatestMonth, getSegmentHistory } from "@/src/data/salesData";

export const metadata = {
  title: "India EV Sales Data",
  description:
    "The latest month's India EV sales and registration numbers by segment - electric two-wheelers, cars, three-wheelers and buses - plus the full month-over-month trend. Updated every month from Vahan data.",
  alternates: { canonical: "/ev-sales-data" },
  openGraph: {
    title: "India EV Sales Data | EVGyan",
    description:
      "The latest India EV sales numbers by segment, plus the month-over-month trend - updated every month from Vahan data.",
    url: absoluteUrl("/ev-sales-data"),
    siteName: siteMetadata.headerTitle,
    locale: "en_IN",
    type: "website",
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    card: "summary_large_image",
    title: "India EV Sales Data | EVGyan",
    description: "The latest India EV sales numbers by segment, plus the month-over-month trend.",
    images: [siteMetadata.socialBanner],
  },
};

export default function EvSalesDataHub() {
  const latest = getLatestMonth();
  const totalArticle = latest.totalArticleSlug ? getBlogBySlug(latest.totalArticleSlug) : null;
  const shareArticle = latest.shareArticleSlug ? getBlogBySlug(latest.shareArticleSlug) : null;

  const monthlyReports = [];
  for (const m of MONTHS) {
    for (const [segSlug, info] of Object.entries(m.segments)) {
      const article = getBlogBySlug(info.articleSlug);
      if (article) {
        monthlyReports.push({
          name: article.title,
          url: absoluteUrl(article.url),
          datePublished: new Date(article.publishedAt).toISOString(),
        });
      }
    }
  }

  const datasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${absoluteUrl("/ev-sales-data")}#dataset`,
    name: "India EV Sales & Registration Data",
    description:
      "Monthly electric-vehicle registration data for India by segment (two-wheelers, cars, three-wheelers, buses), sourced from the Vahan portal.",
    url: absoluteUrl("/ev-sales-data"),
    temporalCoverage: `${MONTHS[0].month}/${latest.month}`,
    creator: publisherSchema(),
    distribution: monthlyReports.map((r) => ({
      "@type": "DataDownload",
      contentUrl: r.url,
      encodingFormat: "text/html",
    })),
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: monthlyReports.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: r.url,
      name: r.name,
    })),
  };

  const twoWheelerHistory = getSegmentHistory("electric-two-wheeler");
  const carHistory = getSegmentHistory("electric-car");

  return (
    <main className="bg-light text-dark">
      <JsonLd data={datasetLd} />
      <JsonLd data={itemListLd} />

      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-dark" />
          Data Hub
        </span>
        <h1 className="mt-3 text-[28px] md:text-[34px] leading-[1.3] font-semibold text-dark">
          India EV Sales Data
        </h1>
        <p className="mt-3 max-w-2xl text-base text-gray leading-relaxed">
          The latest month&apos;s India EV registrations, by segment, in one
          place - updated every month from Vahan data. This page doesn&apos;t
          change its URL; only the numbers do.
        </p>

        {latest.totalEV && (
          <div className="mt-6 inline-flex flex-wrap items-baseline gap-2 rounded-lg bg-bgSoft px-5 py-4">
            <span className="text-3xl font-bold text-dark">{formatIN(latest.totalEV)}</span>
            <span className="text-sm text-gray">
              total EVs registered in {latest.label}
              {latest.evShare && <> &middot; {latest.evShare} of all vehicles</>}
            </span>
            {totalArticle && (
              <Link
                href={totalArticle.url}
                className="ml-2 text-sm font-semibold underline decoration-accent decoration-2 underline-offset-2"
              >
                Full report &rarr;
              </Link>
            )}
          </div>
        )}
        {shareArticle && (
          <p className="mt-2 text-sm text-gray">
            <Link href={shareArticle.url} className="underline decoration-accent decoration-2 underline-offset-2">
              Why EV share moved this month &rarr;
            </Link>
          </p>
        )}
      </section>

      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-10">
        <h2 className="text-lg font-bold text-dark mb-4">By segment - {latest.label}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SEGMENTS.map((seg) => {
            const data = latest.segments[seg.slug];
            return (
              <Link
                key={seg.slug}
                href={`/ev-sales-data/${seg.slug}`}
                className="block rounded-lg border border-borderSoft p-4 hover:border-dark transition-colors"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-gray">{seg.label}</p>
                {data ? (
                  <>
                    <p className="mt-2 text-2xl font-bold text-dark">{formatIN(data.total)}</p>
                    <p className="text-xs text-gray">{data.yoy} YoY</p>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-gray">Coming soon</p>
                )}
              </Link>
            );
          })}
        </div>
        <Link
          href="/ev-sales-data/by-state"
          className="mt-4 inline-block text-sm font-semibold underline decoration-accent decoration-2 underline-offset-2"
        >
          See the state-wise breakdown &rarr;
        </Link>
      </section>

      {(twoWheelerHistory.length > 1 || carHistory.length > 1) && (
        <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-10">
          <h2 className="text-lg font-bold text-dark mb-2">Month-over-month</h2>
          <div className="rounded-lg border border-borderSoft p-5 grid sm:grid-cols-2 gap-4">
            {twoWheelerHistory.length > 1 && <MoMBars label="Electric Two-Wheeler" points={twoWheelerHistory} />}
            {carHistory.length > 1 && <MoMBars label="Electric Car" points={carHistory} />}
          </div>
        </section>
      )}

      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-10 pb-16">
        <h2 className="text-lg font-bold text-dark mb-3">All monthly reports</h2>
        <ul className="flex flex-col divide-y divide-borderSoft text-sm">
          {monthlyReports
            .slice()
            .reverse()
            .map((r) => (
              <li key={r.url} className="py-2.5">
                <Link href={r.url} className="hover:underline decoration-accent decoration-2 underline-offset-2">
                  {r.name}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}
