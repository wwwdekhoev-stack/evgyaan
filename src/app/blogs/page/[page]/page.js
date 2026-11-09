import { notFound, redirect } from "next/navigation";
import { getListPage } from "@/src/utils";
import { getPublishedBlogs } from "@/src/utils/seo";
import { ArchiveListing } from "@/src/components/Blog/ArchiveListing";
import siteMetadata from "@/src/utils/siteMetaData";
import { absoluteUrl } from "@/src/utils/seo";

export async function generateStaticParams() {
  const { totalPages } = getListPage(getPublishedBlogs(), 1);
  const params = [];
  for (let p = 2; p <= totalPages; p++) params.push({ page: String(p) });
  return params;
}

export async function generateMetadata({ params }) {
  const { page } = await params;
  const title = `All Articles – Page ${page}`;
  const description = `Older EV news, sales-data reports and analysis from EVGyan (page ${page}).`;
  const url = absoluteUrl(`/blogs/page/${page}`);
  return {
    title,
    description,
    alternates: { canonical: `/blogs/page/${page}` },
    openGraph: {
      title,
      description,
      url,
      siteName: siteMetadata.headerTitle,
      locale: "en_IN",
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

export default async function BlogsArchivePagedPage({ params }) {
  const { page } = await params;
  if (!/^\d+$/.test(page)) notFound();
  const n = parseInt(page, 10);
  if (n <= 1) redirect("/blogs");
  return <ArchiveListing page={n} />;
}
