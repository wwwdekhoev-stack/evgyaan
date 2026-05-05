import Script from 'next/script';

export const metadata = {
  title: 'EV Decision Guide – EVGYAN',
  description: 'Get a clear answer before you spend money on an EV. Trusted by 370,000+ EV viewers on YouTube.',
};

export default function EvGuidePage() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Inter', sans-serif;
          background: #ffffff;
          color: #111111;
        }

        .evg-wrapper {
          max-width: 560px;
          margin: 0 auto;
          padding: 30px 20px 50px;
          text-align: center;
        }

        .evg-logo {
          text-align: left;
          margin-bottom: 30px;
        }

        .evg-logo-mark {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }

        .evg-logo-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background: #00b34a;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .evg-logo-name {
          font-size: 18px;
          font-weight: 700;
          color: #111111;
          letter-spacing: -0.3px;
        }

        .evg-logo-name span {
          color: #00b34a;
        }

        h1 {
          font-size: 30px;
          line-height: 1.3;
          font-weight: 700;
          margin-bottom: 12px;
          color: #111111;
        }

        .evg-sub {
          font-size: 16px;
          color: #444444;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .evg-bullets {
          text-align: left;
          padding-left: 0;
          margin-bottom: 28px;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .evg-bullets li {
          font-size: 15px;
          color: #111111;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          line-height: 1.5;
        }

        .evg-bullets li::before {
          content: '✓';
          color: #00b34a;
          font-weight: 700;
          font-size: 15px;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .evg-trust {
          font-size: 12px;
          color: #777777;
          margin-top: 8px;
        }

        .evg-authority {
          margin-top: 30px;
          font-weight: 600;
          font-size: 15px;
          color: #111111;
          line-height: 1.6;
        }

        .evg-final {
          margin-top: 14px;
          color: #444444;
          font-size: 15px;
        }

        /* ConvertKit button override */
        .formkit-submit {
          background: #00b34a !important;
          font-family: 'Inter', sans-serif !important;
        }

        @media (max-width: 480px) {
          h1 { font-size: 24px; }
        }
      `}</style>

      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="evg-wrapper">

        {/* LOGO */}
        <div className="evg-logo">
          <span className="evg-logo-mark">
            <span className="evg-logo-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"/>
              </svg>
            </span>
            <span className="evg-logo-name">EV<span>Gyan</span></span>
          </span>
        </div>

        {/* HEADLINE */}
        <h1>Confused About Buying an EV Scooter or Motorcycle?</h1>

        {/* SUBHEADLINE */}
        <div className="evg-sub">
          Get a clear answer before you spend money on an EV.
        </div>

        {/* BULLETS */}
        <ul className="evg-bullets">
          <li>What range you&apos;ll actually get in real use</li>
          <li>What charging is really like (good &amp; bad)</li>
          <li>Clear yes/no: should you buy EV or not</li>
        </ul>

        {/* CONVERTKIT FORM */}
        <Script
          async
          data-uid="cd38925e99"
          src="https://ev-gyan.kit.com/cd38925e99/index.js"
          strategy="afterInteractive"
        />

        {/* TRUST LINE */}
        <div className="evg-trust">
          Takes 10 seconds. No spam. Unsubscribe anytime.
        </div>

        {/* AUTHORITY */}
        <div className="evg-authority">
          Trusted by 370,000+ EV viewers on YouTube<br />
          5+ years of EV insights
        </div>

        {/* FINAL LINE */}
        <div className="evg-final">
          Make the right EV decision before you buy.
        </div>

      </div>
    </>
  );
}
