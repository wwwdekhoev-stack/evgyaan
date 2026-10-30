import { notFound } from "next/navigation";
import { CATEGORY_META, CategoryListing } from "@/src/components/Blog/CategoryListing";

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
  if (!CATEGORY_META[params.slug]) {
    notFound();
  }
  return <CategoryListing slug={params.slug} page={1} />;
}
