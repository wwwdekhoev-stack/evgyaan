import Link from "next/link";
import { withYouTubeUtm } from "@/src/utils/youtube";

// Links written inside an article's markdown.
//
// Two things happen here that are easy to forget by hand on every article:
// a link to the channel gets UTM parameters so YouTube Analytics can show
// which articles actually send viewers, and any off-site link opens in a
// new tab with rel="noopener". Internal links go through next/link so they
// navigate without a full page load.
const MdxLink = ({ href = "", children, ...props }) => {
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={withYouTubeUtm(href, "article")}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
};

export default MdxLink;
