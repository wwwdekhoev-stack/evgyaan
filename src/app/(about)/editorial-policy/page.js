import Link from "next/link";
import siteMetadata from "@/src/utils/siteMetaData";

export const metadata = {
  title: "Editorial Policy",
  description:
    "How EVGyan sources, checks, corrects and funds its EV news and sales-data coverage.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicy() {
  return (
    <section className="max-w-[1280px] mx-auto px-5 sm:px-10 py-12">
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray uppercase tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-dark" />
        Trust
      </span>
      <h1 className="mt-3 text-[28px] md:text-[34px] leading-[1.3] font-semibold text-dark">
        Editorial Policy
      </h1>
      <p className="mt-2 text-sm text-gray">Last updated: 31 October 2026</p>

      <div className="mt-8 prose max-w-3xl prose-headings:text-dark prose-a:text-dark prose-a:decoration-accent">
        <p>
          EVGyan.com is the news and data site of EVGyan, the EV channel on
          YouTube founded by Tarun Pal. We cover electric cars, electric
          two-wheelers, charging, batteries and EV policy in India. This page
          explains the rules we hold our coverage to.
        </p>

        <h2>What we publish</h2>
        <p>
          EV news, monthly sales and registration data, launches, price and
          policy changes, and explainers that help buyers understand what a
          story means for them. Every article is labelled with its category, its
          author and its publication date.
        </p>

        <h2>Sources and accuracy</h2>
        <ul>
          <li>
            We rely on primary sources wherever they exist: official
            registration data (such as VAHAN), company announcements and
            filings, government notifications and on-record statements.
          </li>
          <li>
            Figures are checked before publication. When a number is an
            estimate, a company claim or a rumour, we say so in the article
            instead of presenting it as fact.
          </li>
          <li>
            We write our own copy. We do not reproduce other publishers&rsquo;
            articles.
          </li>
          <li>
            Where we use an illustration instead of a real photograph, it is
            labelled (for example, &ldquo;Representative image
            (AI-generated)&rdquo;).
          </li>
        </ul>

        <h2>Independence</h2>
        <p>
          Brands do not get to approve, edit or pay for the conclusions of our
          news coverage. If an article or page involves a commercial
          relationship &mdash; for example an affiliate link or a sponsored
          collaboration &mdash; we disclose it where it appears.
        </p>

        <h2>Corrections and updates</h2>
        <p>
          If we get something wrong, we fix it. Send the page link and what
          needs correcting to{" "}
          <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>. We
          correct factual errors as soon as we can verify them, and for
          significant changes we add a note to the article.
        </p>

        <h2>Authors</h2>
        <p>
          Each article names its author and links to an author page listing
          their other stories. Questions about a specific piece can be sent to
          the same address above or through our{" "}
          <Link href="/contact">contact page</Link>.
        </p>

        <h2>Related pages</h2>
        <p>
          <Link href="/about">About EVGyan</Link> &middot;{" "}
          <Link href="/privacy-policy">Privacy policy</Link> &middot;{" "}
          <Link href="/contact">Contact</Link>
        </p>
      </div>
    </section>
  );
}
