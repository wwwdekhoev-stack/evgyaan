import EVBuyingGuideForm from './EVBuyingGuideForm';
import JsonLd from '@/src/components/Seo/JsonLd';
import siteMetadata from '@/src/utils/siteMetaData';
import { absoluteUrl, publisherSchema } from '@/src/utils/seo';

export const metadata = {
  title: 'Free EV Buying Decision Guide',
  description:
    "Should you buy an electric car or scooter right now, or wait? A free, honest EV buying decision guide covering real range, running costs, charging access and resale — from EVGyan.",
  alternates: { canonical: '/ev-buying-guide' },
  openGraph: {
    title: 'Free EV Buying Decision Guide | EVGyan',
    description:
      'Real range vs claimed range, running costs, charging access and resale — a clear, honest answer on whether an EV makes sense for you right now.',
    url: absoluteUrl('/ev-buying-guide'),
    siteName: siteMetadata.headerTitle,
    locale: 'en_US',
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free EV Buying Decision Guide | EVGyan',
    description:
      'Real range vs claimed range, running costs, charging access and resale — a clear, honest EV buying decision guide.',
    images: [siteMetadata.socialBanner],
  },
};

const articleLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${absoluteUrl('/ev-buying-guide')}#article`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl('/ev-buying-guide') },
  headline: 'EV Buying Decision Guide: Should You Buy an Electric Vehicle Now?',
  description:
    'A practical, India-focused guide to deciding whether an electric car or scooter is right for you right now — covering real-world range, running costs, home charging access, battery warranty and resale.',
  inLanguage: 'en-IN',
  author: { '@type': 'Organization', name: 'EVGyan', url: siteMetadata.siteUrl },
  publisher: publisherSchema(),
  image: absoluteUrl(siteMetadata.socialBanner),
};

export default function EVBuyingDecisionGuidePage() {
  return (
    <main className="min-h-screen bg-white font-in antialiased">
      <JsonLd data={articleLd} />
      <div className="px-5 py-12">
        <EVBuyingGuideForm />
      </div>

      <article className="max-w-[640px] mx-auto px-5 pb-16 text-[#222]">
        <h2 className="text-xl font-bold text-[#111] mb-3">
          How to actually decide if an EV is right for you
        </h2>
        <p className="text-[15px] leading-relaxed mb-5">
          Every EV ad promises a range number and a low running cost. Neither
          tells you whether an electric scooter or car fits <em>your</em> life.
          This page covers the five things that actually decide that answer —
          the same five we walk through for free in the guide above.
        </p>

        <h3 className="text-[17px] font-bold text-[#111] mt-7 mb-2">
          1. Real range vs claimed range
        </h3>
        <p className="text-[15px] leading-relaxed mb-5">
          The range on the spec sheet is measured in lab conditions (IDC or
          similar test cycles) at a steady, gentle speed with no AC, no
          pillion, and a flat road. In everyday Indian traffic — stop-start
          city riding, full AC in summer, two-up on a scooter, or highway
          speeds above 80 km/h in a car — real-world range typically comes in
          20–35% lower than the claimed figure. Before you buy, work out your
          actual daily distance (commute + errands, round trip) and check
          whether the EV's <em>real</em> range comfortably covers it with
          margin for a bad day, not just on paper.
        </p>

        <h3 className="text-[17px] font-bold text-[#111] mt-7 mb-2">
          2. Charging access — not just charging speed
        </h3>
        <p className="text-[15px] leading-relaxed mb-5">
          Fast-charging numbers get the attention, but the real question is
          simpler: where will you charge most nights? A home or society
          socket you can plug into overnight makes almost any EV workable,
          because you're never relying on a public charger being free, fast,
          or even working. If you don't have that, map the public chargers
          genuinely close to your home and workplace before you buy — not the
          ones that show up on an app but are usually occupied, offline, or
          behind a locked gate.
        </p>

        <h3 className="text-[17px] font-bold text-[#111] mt-7 mb-2">
          3. Running costs vs total cost of ownership
        </h3>
        <p className="text-[15px] leading-relaxed mb-5">
          Per-km running cost on electricity is genuinely low — often a
          fraction of petrol. But total cost of ownership also includes the
          higher upfront price (even after subsidy), insurance, and the
          battery's expected life. Add these up over 3–5 years against the
          petrol equivalent you're comparing it to, rather than judging the
          decision on the running-cost number alone.
        </p>

        <h3 className="text-[17px] font-bold text-[#111] mt-7 mb-2">
          4. Battery warranty and resale
        </h3>
        <p className="text-[15px] leading-relaxed mb-5">
          The battery is the single most expensive part to replace, so its
          warranty (years and km, and whether it's prorated) matters more
          than almost any other spec. Resale values for EVs in India are
          still settling as the used market is young — go in expecting
          resale to be a bigger unknown than it is for a comparable petrol
          vehicle today, and weigh that against how long you actually plan to
          keep it.
        </p>

        <h3 className="text-[17px] font-bold text-[#111] mt-7 mb-2">
          5. Scooter vs car: different decisions
        </h3>
        <p className="text-[15px] leading-relaxed mb-5">
          An electric scooter is usually the easier "yes" — lower cost, home
          charging on a normal socket overnight, and a shorter typical daily
          distance that fits most real-world ranges comfortably. An electric
          car is a bigger commitment: it only makes full sense if you have
          reliable home/society charging or a short, predictable commute,
          since public charging is still thinner on highways and in many
          cities than petrol/CNG stations.
        </p>

        <p className="text-[15px] leading-relaxed mt-7">
          None of this means "buy now" or "wait" universally — it genuinely
          depends on your distance, your charging access, and your budget.
          That's exactly what the free guide above walks through for your own
          situation, in plain language, with no brand bias.
        </p>
      </article>
    </main>
  );
}
