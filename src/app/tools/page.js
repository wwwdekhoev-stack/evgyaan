import Link from "next/link";
import siteMetadata from "@/src/utils/siteMetaData";
import { absoluteUrl } from "@/src/utils/seo";

export const metadata = {
  title: "EV Tools & Calculators",
  description:
    "Free EV tools from EVGyan: work out what an electric vehicle actually costs you to run against petrol, and find the right EV for your budget and daily running.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "EV Tools & Calculators | EVGyan",
    description:
      "Work out the real running cost of an EV against petrol, and find the right EV for your budget.",
    url: absoluteUrl("/tools"),
    siteName: siteMetadata.headerTitle,
    locale: "en_IN",
    type: "website",
    images: [siteMetadata.socialBanner],
  },
};

// The calculators and the buying guide were only reachable from the footer.
// The header now has a "Tools" link, and it needs somewhere honest to point:
// one page per tool is overkill, and pointing the nav straight at a single
// calculator hides the other one.
const TOOLS = [
  {
    href: "/ev-roi-calculator",
    name: "EV vs Petrol Running Cost Calculator",
    blurb:
      "Put in what you drive in a month and what you pay for petrol and for electricity. It works out what the same running would cost on an EV, how long the price difference takes to pay back, and what you save over five years.",
    cta: "Open the calculator",
  },
  {
    href: "/ev-buying-guide",
    name: "EV Buying Guide",
    blurb:
      "Which electric vehicle actually suits your budget, your daily running and your charging situation - and the questions worth asking a dealer before you book one.",
    cta: "Get the guide",
  },
  {
    href: "/ev-sales-data",
    name: "India EV Sales Data",
    blurb:
      "Every month's registration numbers by segment, straight from Vahan - which makers are growing, which are shrinking, and how the market is splitting by state.",
    cta: "See the numbers",
  },
];

export default function ToolsPage() {
  return (
    <main className="max-w-[1280px] mx-auto px-5 sm:px-10 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-dark">
        EV Tools &amp; Calculators
      </h1>
      <p className="mt-3 max-w-2xl text-gray">
        Free, no sign-up needed. Built from the same numbers we use on the
        channel.
      </p>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => (
          <li
            key={tool.href}
            className="flex flex-col rounded-2xl border border-borderSoft p-6 hover:border-accent transition-colors"
          >
            <h2 className="text-xl font-bold text-dark">{tool.name}</h2>
            <p className="mt-2 flex-1 text-sm text-gray">{tool.blurb}</p>
            <Link
              href={tool.href}
              className="mt-5 inline-block font-semibold text-dark underline decoration-accent decoration-2 underline-offset-4"
            >
              {tool.cta} &rarr;
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
