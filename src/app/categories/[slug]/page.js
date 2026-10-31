import { notFound } from "next/navigation";
import { CATEGORY_META, CategoryListing } from "@/src/components/Blog/CategoryListing";

export async function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = CATEGORY_META[slug];
  if (!meta) return {};
  return {
    title: `${meta.label} News`,
    description: `All ${meta.label} news, reviews and sales data from EVGyan.`,
    alternates: { canonical: `/categories/${slug}` },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  if (!CATEGORY_META[slug]) {
    notFound();
  }
  return <CategoryListing slug={slug} page={1} />;
}
