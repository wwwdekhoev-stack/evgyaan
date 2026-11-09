import { blogs as allBlogs } from "@/.velite/generated";
import { sortBlogs, getCategory } from "@/src/utils";

// Picks the articles to show under a post.
//
// The article page used to end with a "Trending" rail that was really just
// the newest 7 posts, so someone reading about an Ather scooter got
// yesterday's bus-registration data. This scores actual relatedness
// instead: same category counts, shared tags count more (they're the
// specific signal - "ather", "ola-electric", "sales-data"), and recency
// only breaks ties so an older-but-on-topic piece can still win.
//
// It always returns `limit` articles when the site has them: anything left
// over after the scored matches is filled with the newest posts, because
// an empty "Read next" block is worse than a loosely related one.
export function getRelatedBlogs(current, limit = 3) {
  if (!current) return [];

  const currentCategory = getCategory(current.tags).slug;
  const currentTags = new Set((current.tags || []).map((t) => t.toLowerCase()));

  const candidates = allBlogs.filter(
    (b) => b.isPublished && b.slug !== current.slug
  );

  const scored = candidates
    .map((b) => {
      let score = 0;
      if (getCategory(b.tags).slug === currentCategory) score += 3;
      for (const tag of b.tags || []) {
        if (currentTags.has(tag.toLowerCase())) score += 2;
      }
      return { blog: b, score };
    })
    .filter((x) => x.score > 0);

  // Sort by score, then by recency within the same score.
  const byRecency = new Map(
    sortBlogs(candidates).map((b, i) => [b.slug, i])
  );
  scored.sort(
    (a, b) =>
      b.score - a.score ||
      byRecency.get(a.blog.slug) - byRecency.get(b.blog.slug)
  );

  const picked = scored.slice(0, limit).map((x) => x.blog);

  if (picked.length < limit) {
    const taken = new Set(picked.map((b) => b.slug));
    for (const b of sortBlogs(candidates)) {
      if (picked.length >= limit) break;
      if (!taken.has(b.slug)) picked.push(b);
    }
  }

  return picked;
}
