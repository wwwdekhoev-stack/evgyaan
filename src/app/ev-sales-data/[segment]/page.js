import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/src/components/Seo/JsonLd";
import MoMBars from "@/src/components/SalesData/MoMBars";
import siteMetadata from "@/src/utils/siteMetaData";
import { absoluteUrl, getBlogBySlug, publisherSchema } from "@/src/utils/seo";
import { formatIN } from "@/src/utils";
import { SEGMENTS, SEGMENT_BY_SLUG, MONTHS, BY_STATE, getSegmentHistory } from "@/src/data/salesData";

export function generateStaticParams() {
  return SEGMENTS.map((s) => ({ segment: s.slug }));
}

export function generateMetadata({ params }) {
  const seg = SEGMENT_BY_SLUG[params.segment];
  if (!seg) return {};
  const title = `${seg.label} Sales Data (India)`;
  const description = `Month-by-month ${seg.label.toLowerCase()} registration numbers for India, sourced from Vahan, with links to the full monthly reports.`;
  return {
    title,
    description,
    alternates: { canonical: `/ev-sales-data/${seg.slug}` },
    openGraph: {
      title: `${title} | EVGyan`,
      description,
      url: absoluteUrl(`/ev-sales-data/${seg.slug}`),
      siteName: siteMetadata.headerTitle,
      locale: "en_IN",
      type: "website",
      images: [siteMetadata.socialBanner],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | EVGyan`,
      description,
      images: [siteMetadata.socialBanner],
    },
  };
}

export default function SegmentPage({ params }) {
  const seg = SEGMENT_BY_SLUG[params.segment];
  if (!seg) notFound();

  const history = getSegmentHistory(seg.slug);
  if (history.length === 0) notFound();
  const latest = history[history.length - 1];
  const latestArticle = getBlogBySlug(latest.articleSlug);

  const reports = history
    .map((h) => {
      const article = getBlogBySlug(h.articleSlug);
      return article
        ? { name: article.title, url: absoluteUrl(article.url), month: h.month, label: h.label }
        : null;
    })
    .filter(Boolean);

  const stateRow = BY_STATE.find((r) => r.segment === seg.slug && r.month === latest.month);
  const stateArticle = stateRow ? getBlogBySlug(stateRow.articleSlug) : null;

  const datasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${absoluteUrl(`/ev-sales-data/${seg.slug}`)}#dataset`,
    name: `India ${seg.label} Sales & Registration Data`,
    description: `Monthly ${seg.label.toLowerCase()} registration data for India, sourced from the Vahan portal.`,
    url: absoluteUrl(`/ev-sales-data/${seg.slug}`),
    temporalCoverage: `${history[0].month}/${latest.month}`,
    creator: publisherSchema(),
    distribution: reports.map((r) => ({
      "@type": "DataDownload",
      contentUrl: r.url,
      encodingFormat: "text/html",
    })),
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: reports.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: r.url,
      name: r.name,
    })),
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
          {seg.label} Sales Data
        </h1>
        <p className="mt-3 max-w-2xl text-base text-gray leading-relaxed">
          Month-by-month {seg.label.toLowerCase()} registrations in India, from Vahan. This page keeps
          one URL - only the numbers below change each month.
        </p>

        <div className="mt-6 inline-flex flex-wrap items-baseline gap-2 rounded-lg bg-bgSoft px-5 py-4">
          <span className="text-3xl font-bold text-dark">{formatIN(latest.total)}</span>
          <span className="text-sm text-gray">
            {seg.label.toLowerCase()} registered in {latest.label} &middot; {latest.yoy} YoY
          </span>
          {latestArticle && (
            <Link
              href={latestArticle.url}
              className="ml-2 text-sm font-semibold underline decoration-accent decoration-2 underline-offset-2"
            >
              Full report &rarr;
            </Link>
          )}
        </div>
        {stateArticle && (
          <p className="mt-2 text-sm text-gray">
            State-wise: <strong className="text-dark">{stateRow.leader}</strong> leads with{" "}
            {formatIN(stateRow.leaderTotal)}.{" "}
            <Link href={stateArticle.url} className="underline decoration-accent decoration-2 underline-offset-2">
              See the state breakdown &rarr;
            </Link>
          </p>
        )}
      </section>

      {history.length > 1 && (
        <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-10">
          <h2 className="text-lg font-bold text-dark mb-2">Month-over-month</h2>
          <div className="rounded-lg border border-borderSoft p-5">
            <MoMBars label={seg.label} points={history} />
          </div>
        </section>
      )}

      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-10">
        <h2 className="text-lg font-bold text-dark mb-3">History</h2>
        <div className="overflow-x-auto rounded-lg border border-borderSoft">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-bgSoft text-left">
                <th className="px-4 py-2.5 font-semibold text-dark">Month</th>
                <th className="px-4 py-2.5 font-semibold text-dark">Registrations</th>
                <th className="px-4 py-2.5 font-semibold text-dark">YoY</th>
                <th className="px-4 py-2.5 font-semibold text-dark">Report</th>
              </tr>
            </thead>
            <tbody>
              {history
                .slice()
                .reverse()
                .map((h) => {
                  const article = getBlogBySlug(h.articleSlug);
                  return (
                    <tr key={h.month} className="border-t border-borderSoft">
                      <td className="px-4 py-2.5 text-dark">{h.label}</td>
                      <td className="px-4 py-2.5 text-dark">{formatIN(h.total)}</td>
                      <td className="px-4 py-2.5 text-gray">{h.yoy}</td>
                      <td className="px-4 py-2.5">
                        {article && (
                          <Link href={article.url} className="underline decoration-accent decoration-2 underline-offset-2">
                            Read &rarr;
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-10 pb-16">
        <h2 className="text-lg font-bold text-dark mb-3">Other segments</h2>
        <div className="flex flex-wrap gap-2">
          {SEGMENTS.filter((s) => s.slug !== seg.slug).map((s) => (
            <Link
              key={s.slug}
              href={`/ev-sales-data/${s.slug}`}
              className="rounded-full border border-borderSoft px-4 py-1.5 text-sm text-dark hover:border-dark transition-colors"
            >
              {s.label}
            </Link>
          ))}
          <Link
            href="/ev-sales-data/by-state"
            className="rounded-full border border-borderSoft px-4 py-1.5 text-sm text-dark hover:border-dark transition-colors"
          >
            By State
          </Link>
        </div>
      </section>
    </main>
  );
}
