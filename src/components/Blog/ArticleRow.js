import Image from "next/image";
import Link from "next/link";
import { getCategory, formatDateIST } from "@/src/utils";

// One article in a list (homepage feed, archive pages, category pages).
const ArticleRow = ({ blog, showCategory = true }) => {
  const category = getCategory(blog.tags);
  return (
    <Link href={blog.url} className="group py-5 first:pt-0 flex gap-4 sm:gap-6">
      <div className="w-[120px] sm:w-[180px] aspect-[4/3] rounded-md overflow-hidden bg-bgSoft shrink-0">
        <Image
          src={blog.image.src}
          placeholder="blur"
          blurDataURL={blog.image.blurDataURL}
          alt={blog.title}
          width={blog.image.width}
          height={blog.image.height}
          sizes="180px"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="min-w-0 flex flex-col">
        {showCategory && (
          <span className="mb-1.5 inline-flex items-center gap-1.5 text-xs font-bold text-gray uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-gray" />
            {category.label}
          </span>
        )}
        <h2 className="text-lg sm:text-xl font-semibold leading-snug text-dark group-hover:underline decoration-accent decoration-2 underline-offset-2">
          {blog.title}
        </h2>
        <p className="mt-1.5 hidden sm:block text-sm text-gray leading-relaxed line-clamp-2">
          {blog.description}
        </p>
        <span className="mt-auto pt-2 text-xs text-gray font-medium">
          {formatDateIST(blog.publishedAt)}
        </span>
      </div>
    </Link>
  );
};

export default ArticleRow;
