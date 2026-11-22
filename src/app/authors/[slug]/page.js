import { notFound } from "next/navigation";
import Image from "next/image";
import ArticleRow from "@/src/components/Blog/ArticleRow";
import JsonLd from "@/src/components/Seo/JsonLd";
import Breadcrumbs from "@/src/components/Blog/Breadcrumbs";
import { getAuthor, getAuthorBySlug, PROFILE_SLUGS } from "@/src/utils/authors";
import { absoluteUrl, getPublishedBlogs, publisherSchema } from "@/src/utils/seo";

function postsByAuthorSlug(slug) {
  return getPublishedBlogs().filter((b) => getAuthor(b.author).slug === slug);
}

// An author is whoever has a byline, plus the profiles that exist in their
// own right (the founder - see PROFILE_SLUGS in utils/authors.js).
function resolveAuthor(slug, posts) {
  return posts.length > 0 ? getAuthor(posts[0].author) : getAuthorBySlug(slug);
}

export async function generateStaticParams() {
  const slugs = new Set([
    ...getPublishedBlogs().map((b) => getAuthor(b.author).slug),
    ...PROFILE_SLUGS,
  ]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const posts = postsByAuthorSlug(slug);
  const author = resolveAuthor(slug, posts);
  if (!author) return {};
  return {
    title: `${author.name} – Author`,
    description: author.bio,
    alternates: { canonical: author.path },
  };
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const posts = postsByAuthorSlug(slug);
  const author = resolveAuthor(slug, posts);
  if (!author) notFound();

  const personLd = {
    "@context": "https://schema.org",
    "@type": author.type,
    "@id": `${absoluteUrl(author.path)}#author`,
    name: author.name,
    url: absoluteUrl(author.path),
    description: author.bio,
    ...(author.jobTitle ? { jobTitle: author.jobTitle } : {}),
    ...(author.image ? { image: absoluteUrl(author.image) } : {}),
    // sameAs is the clean profile URL; the visible links below may carry
    // tracking parameters, which do not belong in structured data.
    ...(author.socials.length > 0
      ? { sameAs: author.socials.map((s) => s.href.split("?")[0]) }
      : {}),
    worksFor: publisherSchema(),
  };

  return (
    <main className="bg-light text-dark">
      <JsonLd data={personLd} />
      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: author.name }]} />
        <div className="mt-3 flex items-center gap-4">
          {author.image && (
            <div className="w-16 h-16 rounded-full overflow-hidden bg-bgSoft shrink-0">
              <Image
                src={author.image}
                alt={author.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <h1 className="text-[28px] md:text-[34px] leading-[1.3] font-semibold text-dark">
              {author.name}
            </h1>
            {author.jobTitle && (
              <p className="text-sm font-medium text-gray">{author.jobTitle}</p>
            )}
          </div>
        </div>
        <p className="mt-3 text-base text-gray max-w-2xl">{author.bio}</p>
        {author.credential && (
          <p className="mt-2 text-sm font-medium text-dark max-w-2xl">{author.credential}</p>
        )}
        {posts.length > 0 && (
          <p className="mt-2 text-sm text-gray">
            {posts.length} {posts.length === 1 ? "story" : "stories"} on EVGyan
          </p>
        )}
        {author.socials.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {author.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 rounded-full border border-borderSoft text-xs font-medium text-dark hover:border-dark transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-8 pb-16">
        <div className="flex flex-col divide-y divide-borderSoft">
          {posts.map((blog) => (
            <ArticleRow key={blog.slug} blog={blog} />
          ))}
        </div>
      </section>
    </main>
  );
}
