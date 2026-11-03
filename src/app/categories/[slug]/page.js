import { notFound } from "next/navigation";
import { CATEGORY_META, CategoryListing } from "@/src/components/Blog/CategoryListing";
import siteMetadata from "@/src/utils/siteMetaData";
import { absoluteUrl } from "@/src/utils/seo";

export async function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = CATEGORY_META[slug];
  if (!meta) return {};
  const title = `${meta.label} News`;
  const description = meta.intro
    ? meta.intro.split(". ").slice(0, 2).join(". ") + "."
    : `All ${meta.label} news, reviews and sales data from EVGyan.`;
  const url = absoluteUrl(`/categories/${slug}`);
  return {
    title,
    description,
    alternates: { canonical: `/categories/${slug}` },
    openGraph: {
      title,
      description,
      url,
      siteName: siteMetadata.headerTitle,
      locale: "en_US",
      type: "website",
      images: [siteMetadata.socialBanner],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteMetadata.socialBanner],
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  if (!CATEGORY_META[slug]) {
    notFound();
  }
  return <CategoryListing slug={slug} page={1} />;
}
