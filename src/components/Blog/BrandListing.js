import { notFound } from "next/navigation";
import { blogs as allBlogs } from "@/.velite/generated";
import { sortBlogs } from "@/src/utils";
import { BRAND_BY_SLUG, getBrandArticles } from "@/src/utils/brands";
import ArticleRow from "@/src/components/Blog/ArticleRow";

export function BrandListing({ slug }) {
  const brand = BRAND_BY_SLUG[slug];
  if (!brand) notFound();

  const posts = sortBlogs(getBrandArticles(slug, allBlogs));

  return (
    <main className="bg-light text-dark">
      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-dark" />
          Brand
        </span>
        <h1 className="mt-3 text-[28px] md:text-[34px] leading-[1.3] font-semibold text-dark">
          {brand.label} EV News &amp; Sales Data
        </h1>
        <p className="mt-4 max-w-2xl text-base text-gray leading-relaxed">
          {brand.intro}
        </p>
        <p className="mt-3 text-sm text-gray">
          {posts.length} {posts.length === 1 ? "story" : "stories"} mentioning {brand.label}
        </p>
      </section>

      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-8 pb-16">
        {posts.length === 0 && (
          <p className="py-6 text-gray text-sm">
            No {brand.label} stories yet &mdash; check back soon.
          </p>
        )}
        <div className="flex flex-col divide-y divide-borderSoft">
          {posts.map((blog) => (
            <ArticleRow key={blog.slug} blog={blog} />
          ))}
        </div>
      </section>
    </main>
  );
}
