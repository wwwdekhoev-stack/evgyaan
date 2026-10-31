import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/.velite/generated";
import { sortBlogs, getCategory, formatDateIST, getHomePage } from "@/src/utils";
import ArticleRow from "@/src/components/Blog/ArticleRow";
import Pagination from "@/src/components/Blog/Pagination";
import JsonLd from "@/src/components/Seo/JsonLd";
import siteMetadata from "@/src/utils/siteMetaData";
import { absoluteUrl, publisherSchema } from "@/src/utils/seo";

export const metadata = {
  title: { absolute: "EVGyan.com | EV Sales Data, News & Honest Analysis" },
  description:
    "EVGyan brings you simple, honest EV news and monthly sales data for electric cars and electric two-wheelers in India.",
  alternates: { canonical: "/" },
};

// Organization + WebSite structured data (homepage only).
const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      ...publisherSchema(),
      description: siteMetadata.description,
      email: siteMetadata.email,
      sameAs: [
        siteMetadata.youtube,
        siteMetadata.instagram,
        siteMetadata.facebook,
        siteMetadata.linkedin,
        siteMetadata.twitter,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteMetadata.siteUrl}/#website`,
      url: absoluteUrl("/"),
      name: siteMetadata.headerTitle,
      description: siteMetadata.description,
      inLanguage: "en-IN",
      publisher: { "@id": `${siteMetadata.siteUrl}/#organization` },
    },
  ],
};

function formatDate(value) {
  return formatDateIST(value);
}

export default function Home() {
  const published = sortBlogs(blogs.filter((b) => b.isPublished));
  const { hero, items: feed, totalPages } = getHomePage(published, 1);
  const trending = published.slice(0, 7);

  if (!hero) {
    return (
      <main className="min-h-[50vh] flex items-center justify-center text-dark">
        <p>No articles published yet.</p>
      </main>
    );
  }

  const heroCategory = getCategory(hero.tags);

  return (
    <main className="bg-light text-dark">
      <JsonLd data={homeJsonLd} />
      {/* Hero */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-8">
        <Link href={hero.url} className="group grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div className="aspect-[16/10] rounded-lg overflow-hidden bg-bgSoft">
            <Image
              src={hero.image.src}
              placeholder="blur"
              blurDataURL={hero.image.blurDataURL}
              alt={hero.title}
              width={hero.image.width}
              height={hero.image.height}
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-dark" />
              {heroCategory.label}
            </span>
            <h1 className="mt-3 text-[28px] md:text-[34px] leading-[1.3] font-semibold text-dark">
              {hero.title}
            </h1>
            <p className="mt-3 text-base leading-[1.625] text-gray">
              {hero.description}
            </p>
            <div className="mt-4 text-sm text-gray font-medium">
              {hero.author} &middot; {formatDate(hero.publishedAt)} &middot; {hero.readingTime.text}
            </div>
            <span className="inline-block mt-5 px-6 py-2.5 rounded bg-accent text-dark text-base font-semibold">
              Read Full Story
            </span>
          </div>
        </Link>
      </section>

      {/* Feed + Trending */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-10 pb-16 grid lg:grid-cols-[1fr_320px] gap-8">
        <div className="flex flex-col divide-y divide-borderSoft">
          {feed.length === 0 && (
            <p className="py-6 text-gray text-sm">More stories coming soon.</p>
          )}
          {feed.map((blog) => (
            <ArticleRow key={blog.slug} blog={blog} />
          ))}
          <Pagination basePath="" current={1} total={totalPages} />
        </div>

        <aside className="bg-bgSoft rounded-lg p-5 h-fit lg:sticky lg:top-[100px]">
          <h3 className="text-sm font-bold uppercase tracking-wide text-dark border-b-2 border-accent pb-2 mb-3">
            Trending
          </h3>
          <ol className="flex flex-col divide-y divide-borderSoft">
            {trending.map((blog, i) => (
              <li key={blog.slug} className="py-3 first:pt-0">
                <Link href={blog.url} className="flex items-start gap-3 group">
                  <span className="shrink-0 w-5 h-5 flex items-center justify-center rounded bg-dark text-light text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm font-semibold leading-snug text-dark group-hover:underline decoration-accent decoration-2 underline-offset-2">
                    {blog.title}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </aside>
      </section>
    </main>
  );
}
