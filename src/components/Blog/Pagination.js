import Link from "next/link";

// Which page numbers to show: always first, last, and a window around the
// current page; gaps become "…". e.g. 1 … 4 5 6 … 20
function pageList(current, total) {
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("gap-" + p);
    out.push(p);
  });
  return out;
}

// basePath: "" for the homepage, "/categories/two-wheeler" for a category.
// Page 1 lives at basePath itself ("/" for home); page N at basePath + "/page/N".
export function pageHref(basePath, page) {
  if (page <= 1) return basePath || "/";
  return `${basePath}/page/${page}`;
}

const btn =
  "min-w-[40px] h-10 px-3 inline-flex items-center justify-center rounded border text-sm font-semibold transition-colors";

const Pagination = ({ basePath = "", current, total }) => {
  if (total <= 1) return null;
  return (
    <nav aria-label="Pagination" className="mt-8 pt-6 border-t border-borderSoft">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {current > 1 ? (
          <Link href={pageHref(basePath, current - 1)} rel="prev" aria-label="Previous page" className={`${btn} border-borderSoft text-dark hover:border-dark`}>
            &larr;<span className="hidden sm:inline ml-1">Previous</span>
          </Link>
        ) : (
          <span className={`${btn} border-borderSoft text-gray/50 cursor-not-allowed`}>&larr;<span className="hidden sm:inline ml-1">Previous</span></span>
        )}

        {pageList(current, total).map((p) =>
          typeof p === "string" ? (
            <span key={p} className="px-1 text-gray">&hellip;</span>
          ) : p === current ? (
            <span key={p} aria-current="page" className={`${btn} bg-accent border-accent text-dark`}>
              {p}
            </span>
          ) : (
            <Link key={p} href={pageHref(basePath, p)} className={`${btn} border-borderSoft text-dark hover:border-dark`}>
              {p}
            </Link>
          )
        )}

        {current < total ? (
          <Link href={pageHref(basePath, current + 1)} rel="next" aria-label="Next page" className={`${btn} border-borderSoft text-dark hover:border-dark`}>
            <span className="hidden sm:inline mr-1">Next</span>&rarr;
          </Link>
        ) : (
          <span className={`${btn} border-borderSoft text-gray/50 cursor-not-allowed`}><span className="hidden sm:inline mr-1">Next</span>&rarr;</span>
        )}
      </div>
      <p className="mt-3 text-center text-xs text-gray">
        Page {current} of {total}
      </p>
    </nav>
  );
};

export default Pagination;
