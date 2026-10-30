import { format, parseISO } from "date-fns";
import React from "react";
import ViewCounter from "./ViewCounter";

const BlogDetails = ({ blog, slug: blogSlug }) => {
  return (
    <div className="mt-4 flex items-center flex-wrap gap-x-3 gap-y-1 text-sm text-gray">
      {blog.author && (
        <>
          <span className="font-semibold text-dark">{blog.author}</span>
          <span className="text-borderSoft">•</span>
        </>
      )}
      <time>{format(parseISO(blog.publishedAt), "LLLL d, yyyy")}</time>
      <span className="text-borderSoft">•</span>
      <span>{blog.readingTime.text}</span>
      <span className="text-borderSoft">•</span>
      <ViewCounter slug={blogSlug} />
    </div>
  );
};

export default BlogDetails;
