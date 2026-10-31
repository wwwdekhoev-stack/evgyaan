import { blogs } from "@/.velite/generated";
import { getCategory, getHomePage, getListPage } from "@/src/utils";
import { getAuthor } from "@/src/utils/authors";
import { absoluteUrl, blogModifiedAt, getPublishedBlogs } from "@/src/utils/seo";
import { CATEGORY_META, getCategoryPosts } from "@/src/components/Blog/CategoryListing";

const latest = (posts) =>
  posts.length
    ? new Date(Math.max(...posts.map((b) => new Date(blogModifiedAt(b)).getTime())))
    : undefined;

// Indexable pages only. Redirect/utility URLs (/bolt, /consultation/pay,
// /consultation/success, /api/*) and framework files (apple-icon.png,
// manifest.webmanifest) are deliberately NOT listed.
export default function sitemap() {
  const published = getPublishedBlogs();
  const entries = [];

  // Homepage + its paginated feed (/page/2 ...)
  entries.push({ url: absoluteUrl("/"), lastModified: latest(published) });
  const { totalPages: homePages } = getHomePage(published, 1);
  for (let p = 2; p <= homePages; p++) {
    entries.push({ url: absoluteUrl(`/page/${p}`), lastModified: latest(published) });
  }

  // Categories + their paginated pages
  for (const slug of Object.keys(CATEGORY_META)) {
    const posts = getCategoryPosts(slug);
    const { totalPages } = getListPage(posts, 1);
    entries.push({ url: absoluteUrl(`/categories/${slug}`), lastModified: latest(posts) });
    for (let p = 2; p <= totalPages; p++) {
      entries.push({
        url: absoluteUrl(`/categories/${slug}/page/${p}`),
        lastModified: latest(posts),
      });
    }
  }

  // Every published article
  for (const blog of published) {
    entries.push({
      url: absoluteUrl(blog.url),
      lastModified: new Date(blogModifiedAt(blog)),
    });
  }

  // Author pages
  const authors = new Map();
  for (const blog of published) {
    const a = getAuthor(blog.author);
    if (!authors.has(a.slug)) authors.set(a.slug, []);
    authors.get(a.slug).push(blog);
  }
  for (const [slug, posts] of authors) {
    entries.push({ url: absoluteUrl(`/authors/${slug}`), lastModified: latest(posts) });
  }

  // Static pages
  for (const path of [
    "/about",
    "/contact",
    "/editorial-policy",
    "/privacy-policy",
    "/ev-buying-guide",
    "/ev-roi-calculator",
    "/consultation",
  ]) {
    entries.push({ url: absoluteUrl(path) });
  }

  return entries;
}
