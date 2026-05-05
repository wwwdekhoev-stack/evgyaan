import FormEmbed from './FormEmbed';

export const metadata = {
  title: 'EV Decision Guide – EVGYAN',
  description: 'Get a clear answer before you spend money on an EV. Trusted by 370,000+ EV viewers on YouTube.',
};

export default function EvGuidePage() {
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
          max-width: 560px;
          margin: 0 auto;
          padding: 32px 24px 60px;
        }

        /* LOGO */
        .evg-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 36px;
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

        /* HEADLINE */
        .evg-h1 {
          font-size: 30px;
          font-weight: 700;
          line-height: 1.3;
          color: #111111;
          margin-bottom: 14px;
        }

        /* SUBHEADLINE */
        .evg-sub {
          font-size: 16px;
          color: #444444;
          line-height: 1.6;
          margin-bottom: 28px;
        }

        /* BULLETS */
        .evg-bullets {
          list-style: none;
          padding: 0;
          margin-bottom: 32px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .evg-bullets li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 15px;
          color: #111111;
          line-height: 1.5;
        }

        .evg-check {
          color: #00b34a;
          font-weight: 700;
          font-size: 16px;
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* DIVIDER above form */
        .evg-divider {
          border: none;
          border-top: 1px solid #eeeeee;
          margin-bottom: 28px;
        }

        /* TRUST */
        .evg-trust {
          font-size: 12px;
          color: #888888;
          margin-top: 10px;
          text-align: center;
        }

        /* AUTHORITY */
        .evg-authority {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #eeeeee;
          font-size: 15px;
          font-weight: 600;
          color: #111111;
          line-height: 1.7;
          text-align: center;
        }

        .evg-authority-dot {
          color: #00b34a;
          margin: 0 6px;
        }

        /* FINAL */
        .evg-final {
          margin-top: 12px;
          font-size: 15px;
          color: #555555;
          text-align: center;
          font-style: italic;
        }

        /* ConvertKit overrides — force white theme */
        #ck-form-container .formkit-form {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }

        #ck-form-container [data-style="full"] {
          background: transparent !important;
        }

        #ck-form-container .formkit-field input,
        #ck-form-container input[type="email"] {
          border: 1.5px solid #dddddd !important;
          border-radius: 6px !important;
          font-size: 15px !important;
          padding: 13px 14px !important;
          color: #111111 !important;
          background: #ffffff !important;
          font-family: 'Inter', sans-serif !important;
          width: 100% !important;
        }

        #ck-form-container .formkit-submit,
        #ck-form-container button[type="submit"] {
          background: #00b34a !important;
          border-radius: 6px !important;
          font-size: 15px !important;
          font-weight: 600 !important;
          padding: 13px !important;
          width: 100% !important;
          font-family: 'Inter', sans-serif !important;
          cursor: pointer !important;
          color: #ffffff !important;
          border: none !important;
          box-shadow: 0 2px 8px rgba(0, 179, 74, 0.25) !important;
          margin-top: 10px !important;
        }

        #ck-form-container .formkit-submit:hover {
          background: #009e42 !important;
        }

        #ck-form-container .formkit-guarantee,
        #ck-form-container .formkit-powered-by-convertkit-container {
          display: none !important;
        }

        @media (max-width: 480px) {
          .evg-h1 { font-size: 24px; }
          .evg-wrapper { padding: 24px 20px 50px; }
        }
      `}</style>

      <div className="evg-page">
        <div className="evg-wrapper">

          {/* LOGO */}
          <div className="evg-logo">
            <div className="evg-logo-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"/>
              </svg>
            </div>
            <div className="evg-logo-text">EV<span>Gyan</span></div>
          </div>

          {/* HEADLINE */}
          <h1 className="evg-h1">
            Confused About Buying an EV Scooter or Motorcycle?
          </h1>

          {/* SUBHEADLINE */}
          <p className="evg-sub">
            Get a clear answer before you spend money on an EV.
          </p>

          {/* BULLETS */}
          <ul className="evg-bullets">
            <li>
              <span className="evg-check">✓</span>
              What range you&apos;ll actually get in real use
            </li>
            <li>
              <span className="evg-check">✓</span>
              What charging is really like (good &amp; bad)
            </li>
            <li>
              <span className="evg-check">✓</span>
              Clear yes/no: should you buy EV or not
            </li>
          </ul>

          <hr className="evg-divider" />

          {/* CONVERTKIT FORM — inline client component */}
          <FormEmbed />

          {/* TRUST LINE */}
          <p className="evg-trust">
            Takes 10 seconds. No spam. Unsubscribe anytime.
          </p>

          {/* AUTHORITY */}
          <div className="evg-authority">
            Trusted by 370,000+ EV viewers on YouTube
            <span className="evg-authority-dot">·</span>
            5+ years of EV insights
          </div>

          {/* FINAL LINE */}
          <p className="evg-final">
            Make the right EV decision before you buy.
          </p>

        </div>
      </div>
    </>
  );
}
