// Build guard: no article may claim to have been published in the future.
//
// Why this exists: the auto-publish pipeline used to round the publish
// minute up to the next slot (:00 / :05). Round up near the top of an hour
// and the stamp lands after the moment it is written - a future-dated
// article. Google's guidance is explicit that a page should not carry a
// future date, and news surfaces treat it as a signal that the date cannot
// be trusted. This fails the build instead of shipping it.
//
// Runs automatically before `next build` via the `prebuild` npm script.

import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const BLOGS = join(process.cwd(), "content", "blogs");

// Frontmatter is hand-written YAML; we only need two scalar keys, so a
// regex beats pulling in a parser that the build does not otherwise use.
const field = (text, key) => {
  const m = text.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, "m"));
  return m ? m[1].replace(/^["']|["']$/g, "") : null;
};

const fmt = (d) =>
  d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false });

const run = async () => {
  const now = Date.now();
  // One minute of slack: a build that starts in the same minute an article
  // was stamped is not an error, just a race.
  const limit = now + 60 * 1000;
  const problems = [];

  const dirs = await readdir(BLOGS, { withFileTypes: true });

  for (const dir of dirs) {
    if (!dir.isDirectory()) continue;
    const path = join(BLOGS, dir.name, "index.mdx");

    let raw;
    try {
      raw = await readFile(path, "utf8");
    } catch {
      continue;
    }

    const head = raw.split(/^---$/m)[1] ?? raw.slice(0, 2000);

    for (const key of ["publishedAt", "updatedAt"]) {
      const value = field(head, key);
      if (!value) {
        problems.push(`${dir.name}: ${key} is missing`);
        continue;
      }

      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        problems.push(`${dir.name}: ${key} is not a valid date (${value})`);
        continue;
      }

      if (date.getTime() > limit) {
        problems.push(
          `${dir.name}: ${key} is in the future - ${fmt(date)} IST (now ${fmt(new Date(now))} IST)`
        );
      }
    }

    const published = new Date(field(head, "publishedAt"));
    const updated = new Date(field(head, "updatedAt"));
    if (
      !Number.isNaN(published.getTime()) &&
      !Number.isNaN(updated.getTime()) &&
      updated.getTime() < published.getTime()
    ) {
      problems.push(
        `${dir.name}: updatedAt (${fmt(updated)} IST) is earlier than publishedAt (${fmt(published)} IST)`
      );
    }
  }

  if (problems.length) {
    console.error("\nArticle dates failed the build check:\n");
    problems.forEach((p) => console.error(`  - ${p}`));
    console.error(
      "\nStamp the real IST minute in frontmatter - never round up, never post-date.\n"
    );
    process.exit(1);
  }

  console.log(`Date check passed: ${dirs.length} articles, none future-dated.`);
};

run().catch((err) => {
  console.error("Date check could not run:", err);
  process.exit(1);
});
