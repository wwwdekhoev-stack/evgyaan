import Link from "next/link";
import { blogs } from "@/.velite/generated";
import { sortBlogs } from "@/src/utils";
import ArticleRow from "@/src/components/Blog/ArticleRow";
import Breadcrumbs from "@/src/components/Blog/Breadcrumbs";

// Search result pages are thin, duplicate-ish content by nature (the same
// article can show up under any number of queries) - noindex, follow is the
// standard pattern Google recommends for on-site search. This has no effect
// on the homepage's SearchAction sitelinks box, which just needs this URL to
// resolve, not to be indexed itself.
export const metadata = {
  title: "Search",
  robots: { index: false, follow: true },
  alternates: { canonical: "/search" },
};

function searchBlogs(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  return sortBlogs(
    blogs.filter((b) => {
      if (!b.isPublished) return false;
      const haystack = `${b.title} ${b.description} ${b.tags.join(" ")}`.toLowerCase();
      return terms.every((t) => haystack.includes(t));
    })
  );
}

export default async function SearchPage({ searchParams }) {
  const { q = "" } = await searchParams;
  const results = searchBlogs(q);

  return (
    <main className="bg-light text-dark">
      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
        <h1 className="mt-3 text-[28px] md:text-[34px] leading-[1.3] font-semibold text-dark">
          Search
        </h1>

        <form action="/search" method="GET" className="mt-5 max-w-xl">
          <div className="flex items-center gap-3 rounded-lg border border-borderSoft px-4 py-3 focus-within:border-dark">
            <input
              type="text"
              name="q"
              defaultValue={q}
              autoFocus
              placeholder="Search EVGyan articles…"
              className="w-full bg-transparent border-0 focus:ring-0 text-base p-0"
            />
            <button type="submit" className="text-sm font-semibold text-dark shrink-0">
              Search
            </button>
          </div>
        </form>

        {q && (
          <p className="mt-4 text-sm text-gray">
            {results.length} {results.length === 1 ? "result" : "results"} for &ldquo;{q}&rdquo;
          </p>
        )}
      </section>

      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-6 pb-16">
        {!q && (
          <p className="py-6 text-gray text-sm">
            Type a model, brand or topic above - e.g. &ldquo;Ather&rdquo;, &ldquo;charging&rdquo;,
            or &ldquo;October registrations&rdquo;.
          </p>
        )}
        {q && results.length === 0 && (
          <p className="py-6 text-gray text-sm">
            No articles found for &ldquo;{q}&rdquo;. Try a shorter or different term, or browse{" "}
            <Link href="/blogs" className="underline decoration-accent decoration-2 underline-offset-2">
              all articles
            </Link>
            .
          </p>
        )}
        <div className="flex flex-col divide-y divide-borderSoft">
          {results.map((blog) => (
            <ArticleRow key={blog.slug} blog={blog} />
          ))}
        </div>
      </section>
    </main>
  );
}
