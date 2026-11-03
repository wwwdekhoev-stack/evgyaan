import { notFound } from "next/navigation";
import { getPublishedBlogs } from "@/src/utils/seo";
import { getListPage } from "@/src/utils";
import ArticleRow from "@/src/components/Blog/ArticleRow";
import Pagination from "@/src/components/Blog/Pagination";

// Shared by /blogs (page 1) and /blogs/page/[page] (page N) - every
// published article, newest first, so the archive is never an orphan page
// and every article is reachable without search.
export function ArchiveListing({ page }) {
  const posts = getPublishedBlogs();
  const { items, totalPages } = getListPage(posts, page);
  if (page > totalPages) notFound();

  return (
    <main className="bg-light text-dark">
      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-dark" />
          Archive
        </span>
        <h1 className="mt-3 text-[28px] md:text-[34px] leading-[1.3] font-semibold text-dark">
          All Articles
        </h1>
        <p className="mt-2 text-base text-gray">
          {posts.length} {posts.length === 1 ? "story" : "stories"}
          {totalPages > 1 && <> &middot; Page {page} of {totalPages}</>}
        </p>
      </section>

      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-8 pb-16">
        <div className="flex flex-col divide-y divide-borderSoft">
          {items.map((blog) => (
            <ArticleRow key={blog.slug} blog={blog} />
          ))}
        </div>
        <Pagination basePath="/blogs" current={page} total={totalPages} />
      </section>
    </main>
  );
}
