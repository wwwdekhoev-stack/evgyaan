import { notFound } from "next/navigation";
import Image from "next/image";
import ArticleRow from "@/src/components/Blog/ArticleRow";
import JsonLd from "@/src/components/Seo/JsonLd";
import Breadcrumbs from "@/src/components/Blog/Breadcrumbs";
import { getAuthor } from "@/src/utils/authors";
import { absoluteUrl, getPublishedBlogs, publisherSchema } from "@/src/utils/seo";

function postsByAuthorSlug(slug) {
  return getPublishedBlogs().filter((b) => getAuthor(b.author).slug === slug);
}

export async function generateStaticParams() {
  const slugs = new Set(getPublishedBlogs().map((b) => getAuthor(b.author).slug));
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const posts = postsByAuthorSlug(slug);
  if (posts.length === 0) return {};
  const author = getAuthor(posts[0].author);
  return {
    title: `${author.name} – Author`,
    description: author.bio,
    alternates: { canonical: author.path },
  };
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const posts = postsByAuthorSlug(slug);
  if (posts.length === 0) notFound();
  const author = getAuthor(posts[0].author);

  const personLd = {
    "@context": "https://schema.org",
    "@type": author.type,
    "@id": `${absoluteUrl(author.path)}#author`,
    name: author.name,
    url: absoluteUrl(author.path),
    description: author.bio,
    ...(author.image ? { image: absoluteUrl(author.image) } : {}),
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
          <h1 className="text-[28px] md:text-[34px] leading-[1.3] font-semibold text-dark">
            {author.name}
          </h1>
        </div>
        <p className="mt-3 text-base text-gray max-w-2xl">{author.bio}</p>
        <p className="mt-2 text-sm text-gray">
          {posts.length} {posts.length === 1 ? "story" : "stories"} on EVGyan
        </p>
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
