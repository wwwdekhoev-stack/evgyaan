import { formatDateIST } from "@/src/utils";
import React from "react";

const BlogDetails = ({ blog }) => {
  return (
    <div className="mt-4 flex items-center flex-wrap gap-x-3 gap-y-1 text-sm text-gray">
      {blog.author && (
        <>
          <span className="font-semibold text-dark">{blog.author}</span>
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
