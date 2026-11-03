import Calculator from './Calculator';
import JsonLd from '@/src/components/Seo/JsonLd';
import siteMetadata from '@/src/utils/siteMetaData';
import { absoluteUrl } from '@/src/utils/seo';

export const metadata = {
  title: 'EV Charging Station ROI Calculator',
  description:
    'Free Bolt.Earth EV charger ROI calculator. Enter your numbers and instantly see payback period, monthly profit, and investment needed. Trusted by 400,000+ EV viewers on YouTube.',
  alternates: { canonical: '/ev-roi-calculator' },
  openGraph: {
    title: 'EV Charging Station ROI Calculator | EVGyan',
    description:
      'Free Bolt.Earth EV charger ROI calculator — payback period, monthly profit and investment needed, in under a minute.',
    url: absoluteUrl('/ev-roi-calculator'),
    siteName: siteMetadata.headerTitle,
    locale: 'en_US',
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EV Charging Station ROI Calculator | EVGyan',
    description:
      'Free Bolt.Earth EV charger ROI calculator — payback period, monthly profit and investment needed.',
    images: [siteMetadata.socialBanner],
  },
};

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': `${absoluteUrl('/ev-roi-calculator')}#webapp`,
  name: 'EV Charging Station ROI Calculator',
  url: absoluteUrl('/ev-roi-calculator'),
  description:
    'Free calculator for EV charging station payback period, monthly profit and investment needed, built around the Bolt.Earth charger network.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any (web browser)',
  isAccessibleForFree: true,
  provider: { '@type': 'Organization', name: siteMetadata.headerTitle, url: siteMetadata.siteUrl },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
};

export default function EvRoiCalculatorPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background: #ffffff !important;
          color: #111111 !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .evg-page {
          background: #ffffff;
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #111111;
        }

        .evg-wrapper {
          max-width: 640px;
          margin: 0 auto;
          padding: 32px 24px 60px;
        }

        .evg-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 28px;
        }

        .evg-logo-icon {
          width: 28px;
          height: 28px;
          background: #00b34a;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .evg-logo-text {
          font-size: 17px;
          font-weight: 700;
          color: #111111;
          letter-spacing: -0.3px;
        }

        .evg-logo-text span {
          color: #00b34a;
        }

        .evg-h1 {
          font-size: 28px;
          font-weight: 700;
          line-height: 1.3;
          color: #111111;
          margin-bottom: 10px;
        }

        .evg-sub {
          font-size: 15px;
          color: #444444;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .evg-divider {
          border: none;
          border-top: 1px solid #eeeeee;
          margin-bottom: 24px;
        }

        .evg-authority {
          margin-top: 36px;
          padding-top: 22px;
          border-top: 1px solid #eeeeee;
          font-size: 14px;
          font-weight: 600;
          color: #111111;
          line-height: 1.7;
          text-align: center;
        }

        .evg-authority-dot {
          color: #00b34a;
          margin: 0 6px;
        }

        /* CALCULATOR */
        .evg-calc {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .evg-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px 16px;
        }

        .evg-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 12.5px;
          font-weight: 600;
          color: #333333;
        }

        .evg-field input,
        .evg-field select {
          border: 1.5px solid #dddddd;
          border-radius: 6px;
          font-size: 14px;
          padding: 10px 11px;
          color: #111111;
          background: #ffffff;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          width: 100%;
        }

        .evg-field input:focus,
        .evg-field select:focus {
          outline: none;
          border-color: #00b34a;
        }

        .evg-calc-btn {
          background: #00b34a;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 700;
          padding: 14px;
          color: #ffffff;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 179, 74, 0.25);
          font-family: 'Inter', sans-serif;
        }

        .evg-calc-btn:hover {
          background: #009e42;
        }

        .evg-results {
          background: #fafafa;
          border-radius: 10px;
          padding: 20px;
          border: 1px solid #eeeeee;
        }

        .evg-results h2 {
          font-size: 18px;
          margin-bottom: 14px;
        }

        .evg-results h3 {
          font-size: 14px;
          margin: 18px 0 10px;
          color: #333333;
        }

        .evg-result-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 9px 0;
          border-bottom: 1px solid #eeeeee;
          font-size: 14px;
        }

        .evg-result-row:last-of-type {
          border-bottom: none;
        }

        .evg-highlight {
          background: #e8f8ee;
          border-radius: 6px;
          padding: 12px 12px;
          margin-bottom: 8px;
          border-bottom: none;
          font-size: 15px;
        }

        .evg-highlight strong {
          color: #00913c;
          font-size: 17px;
        }

        .evg-table-wrap {
          overflow-x: auto;
        }

        .evg-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12.5px;
        }

        .evg-table th, .evg-table td {
          padding: 8px 6px;
          text-align: center;
          border-bottom: 1px solid #eeeeee;
          white-space: nowrap;
        }

        .evg-table th {
          font-weight: 700;
          color: #333333;
        }

        .evg-table td:first-child, .evg-table th:first-child {
          text-align: left;
        }

        .evg-download-btn {
          display: block;
          text-align: center;
          background: #ffffff;
          border: 1.5px solid #00b34a;
          color: #00b34a;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          padding: 12px;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
        }

        .evg-download-btn:hover {
          background: #f0fbf4;
        }

        .evg-note {
          font-size: 12px;
          color: #888888;
          text-align: center;
          line-height: 1.6;
        }

        .evg-article {
          margin-top: 36px;
          padding-top: 28px;
          border-top: 1px solid #eeeeee;
          color: #222222;
        }

        .evg-article h2 {
          font-size: 19px;
          font-weight: 700;
          color: #111111;
          margin-bottom: 10px;
        }

        .evg-article h3 {
          font-size: 15px;
          font-weight: 700;
          color: #111111;
          margin: 20px 0 8px;
        }

        .evg-article p {
          font-size: 14.5px;
          line-height: 1.7;
          color: #333333;
          margin-bottom: 4px;
        }

        .evg-article strong {
          color: #111111;
        }

        @media (max-width: 480px) {
          .evg-h1 { font-size: 22px; }
          .evg-wrapper { padding: 24px 20px 50px; }
          .evg-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <JsonLd data={webAppLd} />

      <div className="evg-page">
        <div className="evg-wrapper">
          <div className="evg-logo">
            <div className="evg-logo-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
              </svg>
            </div>
            <div className="evg-logo-text">EV<span>Gyan</span></div>
          </div>

          <h1 className="evg-h1">EV Charging Station ROI Calculator</h1>
          <p className="evg-sub">
            Bolt.Earth charger lagane se pehle apna payback period aur monthly profit calculate karo. Sirf apne numbers daalo — baaki sab automatic hai.
          </p>

          <hr className="evg-divider" />

          <Calculator />

          <div className="evg-authority">
            Trusted by 400,000+ EV viewers on YouTube
            <span className="evg-authority-dot">·</span>
            5+ years of EV insights
          </div>

          <article className="evg-article">
            <h2>What "EV charger ROI" actually means</h2>
            <p>
              Return on investment for an EV charging station is simple in
              concept: how long it takes the money you earn from charging
              sessions to pay back what you spent installing the charger,
              and what it earns you every month after that. In practice, it
              depends on a handful of numbers that vary a lot by location —
              which is why a single "charger costs ₹X, earns ₹Y" headline you
              see online rarely matches your actual site.
            </p>

            <h3>The five numbers that decide your payback period</h3>
            <p>
              <strong>Hardware and installation cost</strong> — the charger
              itself plus civil work, wiring and any transformer/load
              upgrade, which varies a lot between a simple AC charger and a
              DC fast charger. <strong>Utilisation</strong> — how many hours
              a day the charger is actually in use, which depends entirely
              on footfall at the location (a highway dhaba or mall sees very
              different usage than a residential society).{' '}
              <strong>Price per unit you charge</strong> — your tariff minus
              the electricity cost you pay, which sets your margin per kWh
              sold. <strong>Electricity cost at that site</strong> —
              commercial tariffs vary by state and by connection type, and
              this is the biggest variable most people underestimate.{' '}
              <strong>Maintenance and network/software fees</strong> — ongoing
              costs that quietly eat into monthly profit if left out of the
              math.
            </p>

            <h3>Why the Bolt.Earth network specifically</h3>
            <p>
              The calculator above is built around Bolt.Earth's charger
              economics because that's the network EVGyan has direct,
              hands-on experience installing and running chargers on. Bolt.Earth
              provides the hardware, the charging app/network, and handles
              discovery for drivers — so your side of the ROI math is mostly
              site cost, electricity cost, and realistic utilisation for your
              specific location.
            </p>

            <h3>How to get an accurate number from the calculator</h3>
            <p>
              Garbage numbers in, garbage payback period out — the single
              biggest mistake is guessing utilisation too optimistically.
              Use your location's actual footfall (or a nearby comparable
              site's) rather than a best-case guess, use your real
              commercial electricity tariff (check your last bill, not a
              rough estimate), and include installation extras like
              civil work and any electrical upgrade in your investment
              number, not just the charger's sticker price. The calculator
              will instantly show you the payback period, monthly profit and
              total investment needed once you've got honest numbers in —
              and you can download the results to compare a few scenarios
              side by side.
            </p>

            <h3>Who this is for</h3>
            <p>
              Property owners, housing societies, highway restaurant/dhaba
              operators, and anyone evaluating whether to add an EV charger
              to a commercial or residential site. If your numbers come back
              marginal, the usual next step is talking to Bolt.Earth or a
              similar network directly about site selection — a few hundred
              metres can change footfall, and footfall is what actually
              drives the return.
            </p>
          </article>
        </div>
      </div>
    </>
  );
}
