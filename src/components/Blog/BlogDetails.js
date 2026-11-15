import { formatDateTimeIST, hasRealUpdate } from "@/src/utils";
import React from "react";
import Link from "next/link";
import { getAuthor } from "@/src/utils/authors";

const BlogDetails = ({ blog }) => {
  // 38 articles carry a later dateModified than datePublished in their
  // structured data and none of them showed it on the page. If a story has
  // actually been revised, the reader should be told so without having to
  // read the JSON-LD.
  const updated = hasRealUpdate(blog.publishedAt, blog.updatedAt);

  return (
    <div className="mt-4 flex items-center flex-wrap gap-x-3 gap-y-1 text-sm text-gray">
      {blog.author && (
        <>
          <Link
            href={getAuthor(blog.author).path}
            rel="author"
            className="font-semibold text-dark hover:underline decoration-accent decoration-2 underline-offset-2"
          >
            {blog.author}
          </Link>
          <span className="text-borderSoft">•</span>
        </>
      )}

      {/* Published: full IST date and time, not just the day. */}
      <time dateTime={new Date(blog.publishedAt).toISOString()}>
        {formatDateTimeIST(blog.publishedAt)}
      </time>

      {updated && (
        <>
          <span className="text-borderSoft">•</span>
          <span className="whitespace-nowrap">
            Updated{" "}
            <time dateTime={new Date(blog.updatedAt).toISOString()}>
              {formatDateTimeIST(blog.updatedAt)}
            </time>
          </span>
        </>
      )}

      <span className="text-borderSoft">•</span>
      <span>{blog.readingTime.text}</span>
    </div>
  );
};

export default BlogDetails;
