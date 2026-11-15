import Link from "next/link";
import siteMetadata from "@/src/utils/siteMetaData";
import { absoluteUrl, getPublishedBlogs } from "@/src/utils/seo";
import AdvertiseEnquiry from "./AdvertiseEnquiry";

export const metadata = {
  title: "Advertise with EVGyan",
  description:
    "Reach India's largest dedicated EV audience. YouTube integrations, sponsored articles and newsletter placements with EVGyan - 400K+ subscribers and the monthly EV registration data the industry reads.",
  alternates: { canonical: "/advertise" },
  openGraph: {
    title: "Advertise with EVGyan",
    description:
      "Reach India's largest dedicated EV audience - YouTube integrations, sponsored articles and newsletter placements.",
    url: absoluteUrl("/advertise"),
    siteName: siteMetadata.headerTitle,
    locale: "en_IN",
    type: "website",
    images: [siteMetadata.socialBanner],
  },
};

// Audience figures are Tarun's own, stated as of the month below. They are
// kept in one place and dated on purpose: a sales page with a stale number
// on it is worse than one with a smaller honest number. Update the month
// whenever these change.
const AS_OF = "November 2026";

const AUDIENCE = [
  { value: "400K+", label: "YouTube subscribers", note: "EVGyan, the main channel" },
  { value: "~5.7M", label: "Monthly channel views", note: "across both channels" },
  { value: "~625K", label: "Combined reach", note: "YouTube, Instagram, Facebook, LinkedIn, X" },
  { value: "4+ yrs", label: "Covering Indian EVs", note: "every segment, every month" },
];

const FORMATS = [
  {
    name: "YouTube integration",
    body: "A segment inside a video, written and read in the same voice as the rest of it. Reviews, comparisons and launch coverage reach buyers who are already deciding. This is where most brands start, and where the audience actually is.",
  },
  {
    name: "Sponsored article",
    body: "A full piece on evgyan.com, labelled as sponsored, written to the same standard as our news. It keeps working long after a video has cycled out of the feed, and it is something you can link to from your own site and sales material.",
  },
  {
    name: "Newsletter mention",
    body: "A placement in the monthly EV data email, which goes to a list that asked specifically for the registration numbers - dealers, suppliers, charging companies and analysts rather than casual viewers.",
  },
];

const AUDIENCE_IS = [
  "People actively choosing their first EV, mostly two-wheelers and sub-₹20 lakh cars",
  "Owners comparing running costs against petrol before they switch",
  "Dealers, suppliers, charging operators and analysts who follow the monthly registration data",
  "Overwhelmingly India, with Hindi and English both working",
];

export default function AdvertisePage() {
  const articleCount = getPublishedBlogs().length;

  return (
    <main className="max-w-[1100px] mx-auto px-5 sm:px-10 py-12">
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray uppercase tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-dark" />
        Partner with us
      </span>

      <h1 className="mt-3 text-[30px] md:text-[38px] leading-[1.2] font-semibold text-dark max-w-3xl">
        Reach the people who are actually buying an EV this year
      </h1>

      <p className="mt-4 max-w-2xl text-base leading-[1.7] text-gray">
        EVGyan is India&rsquo;s largest dedicated electric-vehicle channel, and{" "}
        <Link
          href="/"
          className="text-dark font-semibold underline decoration-accent decoration-2 underline-offset-2"
        >
          evgyan.com
        </Link>{" "}
        is where the same work gets written down &mdash; {articleCount} articles
        and the monthly registration data the industry quotes. One brief can run
        across video, the site and the newsletter.
      </p>

      {/* --- Audience --------------------------------------------------- */}
      <section className="mt-10 border-t border-borderSoft pt-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-dark">
          The audience
        </h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCE.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-dark">{s.value}</div>
              <div className="mt-1 text-sm font-semibold text-dark">{s.label}</div>
              <div className="text-xs text-gray">{s.note}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray">Figures as of {AS_OF}.</p>

        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {AUDIENCE_IS.map((line) => (
            <li key={line} className="flex gap-2 text-sm text-gray">
              <span aria-hidden className="text-dark">&bull;</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* --- Formats ---------------------------------------------------- */}
      <section className="mt-12 border-t border-borderSoft pt-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-dark">
          What you can buy
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {FORMATS.map((f) => (
            <div
              key={f.name}
              className="rounded-2xl border border-borderSoft p-6"
            >
              <h3 className="text-lg font-bold text-dark">{f.name}</h3>
              <p className="mt-2 text-sm leading-[1.6] text-gray">{f.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-2xl text-sm text-gray">
          Rates depend on the format and the month. Tell us the brief below and
          you get real numbers back, not a rate card that fits nobody.
        </p>
      </section>

      {/* --- What we won't do ------------------------------------------- */}
      <section className="mt-12 border-t border-borderSoft pt-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-dark">
          What is not for sale
        </h2>
        <div className="mt-4 max-w-2xl space-y-3 text-sm leading-[1.7] text-gray">
          <p>
            Verdicts, headlines and the monthly data. A sponsor buys placement
            and attention, never a conclusion &mdash; and every paid placement
            is labelled as one, in line with our{" "}
            <Link
              href="/editorial-policy"
              className="text-dark font-semibold underline decoration-accent decoration-2 underline-offset-2"
            >
              editorial policy
            </Link>
            .
          </p>
          <p>
            That rule is the reason the recommendation is worth buying in the
            first place. Brands that want copy approval on an opinion are
            better served elsewhere.
          </p>
        </div>
      </section>

      {/* --- Enquiry ---------------------------------------------------- */}
      <section className="mt-12 border-t border-borderSoft pt-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-dark">
          Tell us what you need
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-gray">
          Budget and timeline help more than anything else &mdash; they decide
          what is actually possible. Expect a reply within two working days.
        </p>
        <div className="mt-6 max-w-3xl">
          <AdvertiseEnquiry />
        </div>
      </section>
    </main>
  );
}
