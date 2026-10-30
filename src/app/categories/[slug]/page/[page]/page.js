import { notFound, redirect } from "next/navigation";
import { getListPage } from "@/src/utils";
import { CATEGORY_META, CategoryListing, getCategoryPosts } from "@/src/components/Blog/CategoryListing";

// Pre-build page 2..N for every category. New pages appear on the next deploy
// (every publish triggers one), and any missing page is rendered on demand.
export async function generateStaticParams() {
  const params = [];
  for (const slug of Object.keys(CATEGORY_META)) {
    const { totalPages } = getListPage(getCategoryPosts(slug), 1);
    for (let p = 2; p <= totalPages; p++) params.push({ slug, page: String(p) });
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug, page } = await params;
  const meta = CATEGORY_META[slug];
  if (!meta) return {};
  return {
    title: `${meta.label} News – Page ${page}`,
    description: `Older ${meta.label} news, reviews and sales data from EVGyan (page ${page}).`,
    alternates: { canonical: `/categories/${slug}/page/${page}` },
  };
}

export default async function CategoryPagedPage({ params }) {
  const { slug, page } = await params;
  if (!CATEGORY_META[slug] || !/^\d+$/.test(page)) notFound();
  const n = parseInt(page, 10);
  if (n <= 1) redirect(`/categories/${slug}`);
  return <CategoryListing slug={slug} page={n} />;
}
