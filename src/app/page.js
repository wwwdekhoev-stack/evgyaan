import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/.velite/generated";

export const metadata = {
  title: { absolute: "EVGyan.com | EV Sales Data, News & Honest Analysis" },
  description:
    "EVGyan brings you simple, honest EV news and monthly sales data for electric cars and electric two-wheelers in India.",
};

const FEATURED_SLUGS = [
  "electric-two-wheeler-sales-september-2026",
  "electric-car-sales-september-2026",
];

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Home() {
  const articles = FEATURED_SLUGS.map((slug) =>
    blogs.find((blog) => blog.slug === slug)
  ).filter(Boolean);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f0f0f",
        color: "#ffffff",
        fontFamily: "'Inter', 'Manrope', sans-serif",
      }}
    >
      <header
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          padding: "28px 20px",
          textAlign: "center",
          background:
            "linear-gradient(180deg, rgba(46,125,82,0.18) 0%, rgba(15,15,15,0) 100%)",
        }}
      >
        <Link
          href="/"
          style={{
            color: "#ffffff",
            textDecoration: "none",
            fontWeight: 900,
            letterSpacing: "0.12em",
            fontSize: "clamp(28px, 6vw, 52px)",
          }}
        >
          EVGYAN<span style={{ color: "#facc15" }}>.COM</span>
        </Link>
        <p
          style={{
            margin: "8px 0 0",
            color: "rgba(255,255,255,0.55)",
            fontSize: "clamp(12px, 2vw, 14px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Honest EV News &amp; Sales Data
        </p>
      </header>

      <section
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px 60px" }}
      >
        <h2
          style={{
            fontSize: "clamp(20px, 3vw, 28px)",
            fontWeight: 800,
            margin: "0 0 24px",
          }}
        >
          Latest Articles
        </h2>

        <div className="evg-grid">
          {articles.map((blog) => (
            <Link key={blog.slug} href={blog.url} className="evg-card">
              <div className="evg-img">
                <Image
                  src={blog.image.src}
                  placeholder="blur"
                  blurDataURL={blog.image.blurDataURL}
                  alt={blog.title}
                  width={blog.image.width}
                  height={blog.image.height}
                  sizes="(max-width: 800px) 100vw, 540px"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "18px 20px 22px" }}>
                <h3
                  style={{
                    fontSize: "clamp(18px, 2.4vw, 22px)",
                    lineHeight: 1.35,
                    fontWeight: 800,
                    margin: "0 0 10px",
                  }}
                >
                  {blog.title}
                </h3>
                <p
                  style={{
                    margin: "0 0 14px",
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "15px",
                    lineHeight: 1.6,
                  }}
                >
                  {blog.description}
                </p>
                <p
                  style={{
                    margin: 0,
                    color: "#facc15",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  {blog.author} &middot; {formatDate(blog.publishedAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.12)",
          padding: "22px 20px",
          textAlign: "center",
          color: "rgba(255,255,255,0.45)",
          fontSize: "13px",
        }}
      >
        &copy; EVGyan.com
      </footer>

      <style>{`
        .evg-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .evg-card { display: block; background: #1a1a1a; border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; overflow: hidden; color: #fff; text-decoration: none; }
        .evg-img { aspect-ratio: 16 / 9; overflow: hidden; background: #000; }
        @media (max-width: 800px) { .evg-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
