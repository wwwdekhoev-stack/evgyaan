import { notFound, redirect } from "next/navigation";
import { blogs } from "@/.velite/generated";
import { sortBlogs, getHomePage } from "@/src/utils";
import ArticleRow from "@/src/components/Blog/ArticleRow";
import Pagination from "@/src/components/Blog/Pagination";

function published() {
  return sortBlogs(blogs.filter((b) => b.isPublished));
}

// Pre-build /page/2 .. /page/N of the homepage feed.
export async function generateStaticParams() {
  const { totalPages } = getHomePage(published(), 1);
  const params = [];
  for (let p = 2; p <= totalPages; p++) params.push({ page: String(p) });
  return params;
}

export async function generateMetadata({ params }) {
  const { page } = await params;
  return {
    title: `Latest EV News – Page ${page}`,
    description: `Older EV news, sales data and analysis from EVGyan (page ${page}).`,
    alternates: { canonical: `/page/${page}` },
  };
}

export default async function HomePagedPage({ params }) {
  const { page } = await params;
  if (!/^\d+$/.test(page)) notFound();
  const n = parseInt(page, 10);
  if (n <= 1) redirect("/");

  const { items, totalPages } = getHomePage(published(), n);
  if (n > totalPages) notFound();

  return (
    <main className="bg-light text-dark">
      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-dark" />
          All Stories
        </span>
        <h1 className="mt-3 text-[28px] md:text-[34px] leading-[1.3] font-semibold text-dark">
          Latest EV News
        </h1>
        <p className="mt-2 text-base text-gray">
          Page {n} of {totalPages}
        </p>
      </section>

      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-8 pb-16">
        <div className="flex flex-col divide-y divide-borderSoft">
          {items.map((blog) => (
            <ArticleRow key={blog.slug} blog={blog} />
          ))}
        </div>
        <Pagination basePath="" current={n} total={totalPages} />
      </section>
    </main>
  );
}
