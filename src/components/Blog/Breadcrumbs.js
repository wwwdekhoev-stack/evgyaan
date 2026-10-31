import Link from "next/link";

// Visible breadcrumb trail. `items` = [{ label, href? }]; the last item is the
// current page (no link). Mirrors the BreadcrumbList JSON-LD on the page.
const Breadcrumbs = ({ items }) => (
  <nav aria-label="Breadcrumb">
    <ol className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs font-bold text-gray uppercase tracking-wide">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <li key={item.label} className="flex items-center gap-2 min-w-0">
            {item.href && !last ? (
              <Link href={item.href} className="hover:text-dark hover:underline decoration-accent decoration-2 underline-offset-2">
                {item.label}
              </Link>
            ) : (
              <span aria-current={last ? "page" : undefined} className="truncate max-w-[60vw] sm:max-w-md normal-case font-semibold">
                {item.label}
              </span>
            )}
            {!last && <span aria-hidden="true" className="text-borderSoft">&rsaquo;</span>}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
