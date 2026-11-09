import { ArchiveListing } from "@/src/components/Blog/ArchiveListing";
import siteMetadata from "@/src/utils/siteMetaData";
import { absoluteUrl } from "@/src/utils/seo";

export const metadata = {
  title: "All Articles",
  description:
    "Every EV news story, sales-data report and analysis piece published on EVGyan, newest first.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    title: "All Articles | EVGyan",
    description:
      "Every EV news story, sales-data report and analysis piece published on EVGyan, newest first.",
    url: absoluteUrl("/blogs"),
    siteName: siteMetadata.headerTitle,
    locale: "en_IN",
    type: "website",
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Articles | EVGyan",
    description: "Every EV news story, sales-data report and analysis piece published on EVGyan.",
    images: [siteMetadata.socialBanner],
  },
};

export default function BlogsArchivePage() {
  return <ArchiveListing page={1} />;
}
