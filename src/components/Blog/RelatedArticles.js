import Image from "next/image";
import Link from "next/link";
import { getCategory, formatDateIST } from "@/src/utils";
import { getRelatedBlogs } from "@/src/utils/related";

// Three genuinely-related articles under the post. Scoring lives in
// utils/related.js. Server component - no client JS for any of this.
const RelatedArticles = ({ current, limit = 3 }) => {
  const related = getRelatedBlogs(current, limit);
  if (related.length === 0) return null;

  return (
    <section className="mt-10 pt-6 border-t border-borderSoft">
      <h2 className="text-sm font-bold uppercase tracking-wide text-dark border-b-2 border-accent pb-2 inline-block">
        Read next
      </h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        {related.map((blog) => (
          <Link key={blog.slug} href={blog.url} className="group flex sm:flex-col gap-4 sm:gap-0">
            <div className="w-[120px] sm:w-full aspect-[16/9] rounded-md overflow-hidden bg-bgSoft shrink-0">
              <Image
                src={blog.image.src}
                placeholder="blur"
                blurDataURL={blog.image.blurDataURL}
                alt={blog.imageAlt}
                width={blog.image.width}
                height={blog.image.height}
                sizes="(max-width: 640px) 120px, 280px"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="min-w-0 sm:mt-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-gray" />
                {getCategory(blog.tags).label}
              </span>
              <h3 className="mt-1.5 text-base font-semibold leading-snug text-dark group-hover:underline decoration-accent decoration-2 underline-offset-2">
                {blog.title}
              </h3>
              <span className="mt-1.5 block text-xs text-gray font-medium">
                {formatDateIST(blog.publishedAt)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
