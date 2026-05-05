import Script from 'next/script';

export const metadata = {
  title: 'EVGyan – Electric Scooter Decision Guide',
  description: 'India ka sabse bada dedicated EV YouTube channel. Honest EV decision-making framework — koi sponsorship nahi, koi bias nahi.',
};

export default function Home() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --green: #22c55e;
          --green-dark: #16a34a;
          --green-light: #dcfce7;
          --text: #1a1a1a;
          --muted: #6b7280;
          --border: #e5e7eb;
          --bg: #f9fafb;
          --white: #ffffff;
          --radius: 16px;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }

        /* HEADER */
        .eg-header {
          background: var(--white);
          border-bottom: 1px solid var(--border);
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .eg-logo-img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }

        .eg-logo-text {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: var(--text);
        }
        .eg-logo-text span { color: var(--green); }

        /* HERO */
        .eg-hero {
          text-align: center;
          padding: 36px 20px 32px;
          max-width: 640px;
          margin: 0 auto;
        }

        .eg-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--green-light);
          color: var(--green-dark);
          font-size: 12px;
          font-weight: 700;
          padding: 5px 13px;
          border-radius: 100px;
          margin-bottom: 20px;
          letter-spacing: 0.2px;
        }

        .eg-hero-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          margin-bottom: 18px;
        }

        .eg-profile-pic {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          object-fit: cover;
          object-position: top center;
          border: 3px solid var(--green);
          flex-shrink: 0;
          background: #ddd;
        }

        .eg-hero h1 {
          font-size: clamp(22px, 5.5vw, 38px);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }
        .eg-hero h1 em {
          color: var(--green);
          font-style: normal;
        }

        .eg-hero-sub {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.65;
          max-width: 480px;
          margin: 10px auto 0;
        }

        /* trust strip */
        .eg-trust-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          flex-wrap: nowrap;
          margin-top: 24px;
          border: 1.5px solid var(--border);
          border-radius: 14px;
          background: var(--white);
          overflow: hidden;
        }

        .eg-trust-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 14px 10px;
          gap: 3px;
          border-right: 1.5px solid var(--border);
        }
        .eg-trust-item:last-child { border-right: none; }

        .eg-trust-item .num {
          font-size: 18px;
          font-weight: 800;
          color: var(--green-dark);
          line-height: 1;
        }
        .eg-trust-item .lbl {
          font-size: 11px;
          color: var(--muted);
          font-weight: 500;
          text-align: center;
          line-height: 1.3;
        }

        /* divider */
        .eg-divider {
          max-width: 680px;
          margin: 28px auto 0;
          border: none;
          border-top: 1px solid var(--border);
        }

        /* SECTION LABEL */
        .eg-section-label {
          text-align: center;
          padding: 28px 20px 4px;
        }
        .eg-section-label h2 {
          font-size: 20px;
          font-weight: 700;
        }
        .eg-section-label p {
          font-size: 14px;
          color: var(--muted);
          margin-top: 5px;
        }

        /* CARDS GRID */
        .eg-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          max-width: 560px;
          margin: 20px auto 0;
          padding: 0 16px 56px;
        }

        @media (min-width: 640px) {
          .eg-cards {
            grid-template-columns: repeat(2, 1fr);
            max-width: 760px;
            gap: 20px;
            padding: 0 20px 64px;
          }
          .eg-card.featured {
            grid-column: 1 / -1;
          }
          .eg-hero-inner {
            flex-direction: row;
            text-align: left;
            gap: 22px;
          }
          .eg-hero { text-align: left; }
          .eg-badge, .eg-trust-strip { margin-left: 0; }
          .eg-hero-sub { margin: 10px 0 0; }
        }

        .eg-card {
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: var(--radius);
          padding: 24px 22px 22px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          overflow: hidden;
        }

        .eg-card.featured {
          border-color: var(--green);
          box-shadow: 0 4px 20px rgba(34,197,94,0.13);
        }
        .eg-card.featured::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--green);
          border-radius: var(--radius) var(--radius) 0 0;
        }

        .eg-card.soon {
          background: #fafafa;
        }

        .eg-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .eg-card-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .eg-card-tag.free { color: var(--green-dark); }
        .eg-card-tag.pro  { color: #6366f1; }

        .eg-soon-badge {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          background: #f3f4f6;
          color: var(--muted);
          padding: 3px 9px;
          border-radius: 100px;
        }

        .eg-card h3 {
          font-size: 18px;
          font-weight: 800;
          line-height: 1.25;
          color: var(--text);
        }
        .eg-card.soon h3 { color: var(--muted); }

        .eg-card .desc {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.6;
        }

        .eg-card .includes {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .eg-card .includes li {
          font-size: 14px;
          color: var(--text);
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .eg-card .includes li::before {
          content: '✓';
          color: var(--green);
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* coming soon placeholder */
        .eg-soon-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 24px 0 8px;
          color: #d1d5db;
          font-size: 13px;
          font-weight: 500;
        }
        .eg-soon-placeholder .lock-icon {
          font-size: 28px;
        }

        /* FOOTER */
        .eg-footer {
          background: var(--white);
          border-top: 1px solid var(--border);
          padding: 24px 20px;
          text-align: center;
        }

        .eg-footer-links {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }

        .eg-footer-links a {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
          padding: 9px 18px;
          border: 1.5px solid var(--border);
          border-radius: 100px;
          transition: border-color 0.2s, color 0.2s;
        }
        .eg-footer-links a:hover { border-color: var(--green); color: var(--green-dark); }

        .eg-footer-note {
          font-size: 12px;
          color: var(--muted);
        }
        .eg-footer-note a { color: var(--green-dark); text-decoration: none; font-weight: 600; }
      `}</style>

      {/* HEADER */}
      <header className="eg-header">
        <img className="eg-logo-img" src="/evgyan-logo.jpg" alt="EVGyan Logo" />
        <div className="eg-logo-text">EV<span>Gyan</span></div>
      </header>

      {/* HERO */}
      <section className="eg-hero">
        <div className="eg-badge">🇮🇳 India ka sabse bada dedicated EV YouTube channel</div>

        <div className="eg-hero-inner">
          <img className="eg-profile-pic" src="/tarun.jpg" alt="Tarun Pal – EVGyan Host" />
          <div>
            <h1>Electric Vehicle leni chahiye<br />ya nahi? <em>Jaano sahi jawab.</em></h1>
            <p className="eg-hero-sub">
              Koi sponsorship, koi bias nahi — sirf honest decision-making framework
              jo tumhare liye kaam kare. 5+ saal ki EV coverage ka nichod.
            </p>
          </div>
        </div>

        {/* trust strip */}
        <div className="eg-trust-strip">
          <div className="eg-trust-item">
            <div className="num">368K+</div>
            <div className="lbl">YouTube<br />Subscribers</div>
          </div>
          <div className="eg-trust-item">
            <div className="num">5+</div>
            <div className="lbl">Saal EV<br />Coverage</div>
          </div>
          <div className="eg-trust-item">
            <div className="num">100%</div>
            <div className="lbl">Unbiased<br />Reviews</div>
          </div>
        </div>
      </section>

      <hr className="eg-divider" />

      {/* SECTION LABEL */}
      <div className="eg-section-label">
        <h2>📋 Apna Guide Chuniye</h2>
        <p>Free se shuru karo — koi payment nahi chahiye</p>
      </div>

      {/* CARDS */}
      <div className="eg-cards">

        {/* CARD 1: Featured — LIVE */}
        <div className="eg-card featured">
          <div className="eg-card-top">
            <div className="eg-card-tag free">⚡ Free · Abhi Available</div>
          </div>
          <h3>Electric Scooter / Motorcycle<br />Decision Guide</h3>
          <p className="desc">
            Yeh guide tumhare liye hai agar tum decide nahi kar pa rahe ki <strong>EV leni chahiye ya nahi.</strong>{' '}
            Apni riding pattern, budget, aur city ke hisaab se sahi decision lo — bina kisi sales pitch ke.
          </p>
          <ul className="includes">
            <li>Kise <em>leni chahiye</em> aur kise <em>nahi</em> — clear criteria</li>
            <li>Daily commute vs weekend use — kya fark padta hai</li>
            <li>Range anxiety myth vs reality check</li>
            <li>Charging setup: ghar mein possible hai kya?</li>
            <li>Total cost comparison: EV vs Petrol (realistic numbers)</li>
            <li>Red flags: in cases mein EV mat lo abhi</li>
          </ul>
          {/* ConvertKit Form */}
          <Script
            async
            data-uid="cd38925e99"
            src="https://ev-gyan.kit.com/cd38925e99/index.js"
            strategy="afterInteractive"
          />
        </div>

        {/* CARD 2: Coming Soon */}
        <div className="eg-card soon">
          <div className="eg-card-top">
            <div className="eg-card-tag pro">💎 2-Wheeler Pro</div>
            <span className="eg-soon-badge">Coming Soon</span>
          </div>
          <h3>2-Wheeler Buying Guide</h3>
          <div className="eg-soon-placeholder">
            <div className="lock-icon">🔒</div>
            <div>Jald aa raha hai</div>
          </div>
        </div>

        {/* CARD 3: Coming Soon */}
        <div className="eg-card soon">
          <div className="eg-card-top">
            <div className="eg-card-tag free">⚡ 4-Wheeler Basic</div>
            <span className="eg-soon-badge">Coming Soon</span>
          </div>
          <h3>4-Wheeler Decision Guide</h3>
          <div className="eg-soon-placeholder">
            <div className="lock-icon">🔒</div>
            <div>Jald aa raha hai</div>
          </div>
        </div>

        {/* CARD 4: Coming Soon */}
        <div className="eg-card soon">
          <div className="eg-card-top">
            <div className="eg-card-tag pro">💎 4-Wheeler Pro</div>
            <span className="eg-soon-badge">Coming Soon</span>
          </div>
          <h3>4-Wheeler Buying Guide</h3>
          <div className="eg-soon-placeholder">
            <div className="lock-icon">🔒</div>
            <div>Jald aa raha hai</div>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="eg-footer">
        <div className="eg-footer-links">
          <a href="https://www.youtube.com/@EVGyan" target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
            </svg>
            YouTube
          </a>
          <a href="https://www.instagram.com/evgyan.in" target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zm0-2.2C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1.1 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24c3.3 0 3.7 0 4.9-.1 4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/>
            </svg>
            Instagram
          </a>
        </div>
        <p className="eg-footer-note">
          © 2026 EVGyan · India&apos;s #1 Dedicated EV Channel ·{' '}
          <a href="https://www.youtube.com/@EVGyan" target="_blank" rel="noopener noreferrer">@EVGyan</a>
        </p>
      </footer>
    </>
  );
}
