import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs as allBlogs } from "@/.velite/generated";
import { sortBlogs, getCategory, formatDateIST } from "@/src/utils";

const CATEGORY_META = {
  "two-wheeler": { label: "EV Scooters/Bikes" },
  "four-wheeler": { label: "EV Cars/4W" },
  "battery-charging": { label: "EV Battery & Charging" },
};

function formatDate(value) {
  return formatDateIST(value);
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const meta = CATEGORY_META[params.slug];
  if (!meta) return {};
  return {
    title: `${meta.label} News`,
    description: `All ${meta.label} news, reviews and sales data from EVGyan.`,
  };
}

export default function CategoryPage({ params }) {
  const meta = CATEGORY_META[params.slug];
  if (!meta) {
    notFound();
  }

  const posts = sortBlogs(
    allBlogs.filter(
      (blog) => blog.isPublished && getCategory(blog.tags).slug === params.slug
    )
  );

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
        </p>
      </section>

      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-8 pb-16">
        {posts.length === 0 && (
          <p className="py-6 text-gray text-sm">No stories here yet &mdash; check back soon.</p>
        )}
        <div className="flex flex-col divide-y divide-borderSoft">
          {posts.map((blog) => (
            <Link
              key={blog.slug}
              href={blog.url}
              className="group py-5 first:pt-0 flex gap-4 sm:gap-6"
            >
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
                <h2 className="text-lg sm:text-xl font-semibold leading-snug text-dark group-hover:underline decoration-accent decoration-2 underline-offset-2">
                  {blog.title}
                </h2>
                <p className="mt-1.5 hidden sm:block text-sm text-gray leading-relaxed line-clamp-2">
                  {blog.description}
                </p>
                <span className="mt-auto pt-2 text-xs text-gray font-medium">
                  {formatDate(blog.publishedAt)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
