import Link from "next/link";
import { getArticleBrands } from "@/src/utils/brands";

// A row of brand-hub links under the byline, for every brand this article
// mentions (Phase 4.3) - this is how /brands/<slug> pages get linked from
// the article template.
const BrandTags = ({ blog }) => {
  const brands = getArticleBrands(blog);
  if (brands.length === 0) return null;

  return (
    <div className="mt-2 flex items-center flex-wrap gap-1.5">
      {brands.map((b) => (
        <Link
          key={b.slug}
          href={`/brands/${b.slug}`}
          className="inline-flex items-center px-2.5 py-1 rounded-full border border-borderSoft text-xs font-semibold text-gray hover:border-dark hover:text-dark transition-colors"
        >
          {b.label}
        </Link>
      ))}
    </div>
  );
};

export default BrandTags;
