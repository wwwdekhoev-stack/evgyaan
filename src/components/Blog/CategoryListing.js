import { notFound } from "next/navigation";
import { blogs as allBlogs } from "@/.velite/generated";
import { sortBlogs, getCategory, getListPage } from "@/src/utils";
import ArticleRow from "@/src/components/Blog/ArticleRow";
import Pagination from "@/src/components/Blog/Pagination";

export const CATEGORY_META = {
  "two-wheeler": { label: "EV Scooters/Bikes" },
  "four-wheeler": { label: "EV Cars/4W" },
  "battery-charging": { label: "EV Battery & Charging" },
};

export function getCategoryPosts(slug) {
  return sortBlogs(
    allBlogs.filter(
      (blog) => blog.isPublished && getCategory(blog.tags).slug === slug
    )
  );
}

// Shared by page 1 (/categories/[slug]) and page N (/categories/[slug]/page/[page]).
export function CategoryListing({ slug, page }) {
  const meta = CATEGORY_META[slug];
  const posts = getCategoryPosts(slug);
  const { items, totalPages } = getListPage(posts, page);
  if (page > totalPages) notFound();

  return (
    <main className="bg-light text-dark">
      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-dark" />
          Category
        </span>
        <h1 className="mt-3 text-[28px] md:text-[34px] leading-[1.3] font-semibold text-dark">
          {meta.label} News
        </h1>
        <p className="mt-2 text-base text-gray">
          {posts.length} {posts.length === 1 ? "story" : "stories"}
          {totalPages > 1 && <> &middot; Page {page} of {totalPages}</>}
        </p>
      </section>

      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-8 pb-16">
        {posts.length === 0 && (
          <p className="py-6 text-gray text-sm">No stories here yet &mdash; check back soon.</p>
        )}
        <div className="flex flex-col divide-y divide-borderSoft">
          {items.map((blog) => (
            <ArticleRow key={blog.slug} blog={blog} showCategory={false} />
          ))}
        </div>
        <Pagination basePath={`/categories/${slug}`} current={page} total={totalPages} />
      </section>
    </main>
  );
}

