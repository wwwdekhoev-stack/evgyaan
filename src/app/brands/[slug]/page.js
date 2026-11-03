import { BRANDS, BRAND_BY_SLUG } from "@/src/utils/brands";
import { BrandListing } from "@/src/components/Blog/BrandListing";
import siteMetadata from "@/src/utils/siteMetaData";
import { absoluteUrl } from "@/src/utils/seo";

export async function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const brand = BRAND_BY_SLUG[slug];
  if (!brand) return {};
  const title = `${brand.label} EV News & Sales Data`;
  const description = `${brand.label} EV news, launches and monthly sales data, tracked by EVGyan.`;
  const url = absoluteUrl(`/brands/${slug}`);
  return {
    title,
    description,
    alternates: { canonical: `/brands/${slug}` },
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

export default async function BrandPage({ params }) {
  const { slug } = await params;
  return <BrandListing slug={slug} />;
}
