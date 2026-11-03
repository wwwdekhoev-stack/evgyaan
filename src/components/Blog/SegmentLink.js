import Link from "next/link";
import { getSegmentLinkForArticle } from "@/src/utils/salesDataLinks";

// Renders only on a monthly data-report article (registered in
// src/data/salesData.js) - links it up to its permanent evergreen hub page,
// per Phase 5.3's "monthly article links up to its segment page" rule.
const SegmentLink = ({ slug }) => {
  const link = getSegmentLinkForArticle(slug);
  if (!link) return null;

  return (
    <div className="my-6 not-prose rounded-lg border border-borderSoft bg-bgSoft p-4 text-sm text-dark">
      This is one month&apos;s numbers. For the full month-over-month trend, see{" "}
      <Link href={link.href} className="font-semibold underline decoration-accent decoration-2 underline-offset-2">
        {link.label}
      </Link>
      .
    </div>
  );
};

export default SegmentLink;
