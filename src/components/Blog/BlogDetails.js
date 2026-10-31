import { formatDateIST } from "@/src/utils";
import React from "react";
import Link from "next/link";
import { getAuthor } from "@/src/utils/authors";

const BlogDetails = ({ blog }) => {
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
      <time>{formatDateIST(blog.publishedAt, { month: "long", day: "numeric", year: "numeric" }, "en-US")}</time>
      <span className="text-borderSoft">•</span>
      <span>{blog.readingTime.text}</span>
    </div>
  );
};

export default BlogDetails;
