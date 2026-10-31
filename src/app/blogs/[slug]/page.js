import BlogDetails from "@/src/components/Blog/BlogDetails";
import RenderMdx from "@/src/components/Blog/RenderMdx";
import siteMetadata from "@/src/utils/siteMetaData";
import { blogs } from '@/.velite/generated'
import { sortBlogs, getCategory } from "@/src/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/src/components/Seo/JsonLd";
import Breadcrumbs from "@/src/components/Blog/Breadcrumbs";
import { getAuthor } from "@/src/utils/authors";
import { absoluteUrl, publisherSchema } from "@/src/utils/seo";

export async function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }) {
  const {slug} = await params
  const blog = blogs.find((blog) => blog.slug === slug);
  if (!blog) {
    return;
  }

  const publishedAt = new Date(blog.publishedAt).toISOString();
  const modifiedAt = new Date(blog.updatedAt || blog.publishedAt).toISOString();

  let imageList = [siteMetadata.socialBanner];
  if (blog.image) {
    imageList =
      typeof blog.image.src === "string"
        ? [siteMetadata.siteUrl + blog.image.src]
        : blog.image;
  }
  const ogImages = imageList.map((img) => {
    return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
  });

  const authors = blog?.author ? [blog.author] : siteMetadata.author;

  const author = getAuthor(blog.author);

  return {
    title: blog.title,
    description: blog.description,
    alternates: { canonical: blog.url },
    authors: [{ name: author.name, url: absoluteUrl(author.path) }],
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: siteMetadata.siteUrl + blog.url,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: ogImages,
    },
  };
}


function TableOfContentsItem({ item, level = "two" }){
  return (
    <li className="py-1.5">
      <a
        href={item.url}
        data-level={level}
        className="data-[level=three]:pl-4
                  sm:data-[level=three]:pl-6
                  flex items-center justify-start text-sm text-dark"
      >
        {level === "three" && (
          <span className="flex w-1 h-1 rounded-full bg-gray mr-2 shrink-0">&nbsp;</span>
        )}
        <span className="hover:underline decoration-accent decoration-2 underline-offset-2">{item.title}</span>
      </a>
      {item.items.length > 0 && (
        <ul className="mt-1">
          {item.items.map((subItem) => (
            <TableOfContentsItem
              key={subItem.url}
              item={subItem}
              level="three"
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default async function BlogPage({ params }) {
  const {slug} = await params
  const blog = blogs.find((blog) => {
    return blog.slug === slug
  });

  if(!blog){
    notFound()
  }

  const trending = sortBlogs(blogs.filter((b) => b.isPublished && b.slug !== blog.slug)).slice(0, 7);
  const category = getCategory(blog.tags);

  let imageList = [siteMetadata.socialBanner];
  if (blog.image) {
    imageList =
      typeof blog.image.src === "string"
        ? [siteMetadata.siteUrl + blog.image.src]
        : blog.image;
  }

  const articleUrl = absoluteUrl(blog.url);
  const author = getAuthor(blog.author);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${articleUrl}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    url: articleUrl,
    headline: blog.title,
    description: blog.description,
    image: imageList,
    datePublished: new Date(blog.publishedAt).toISOString(),
    dateModified: new Date(blog.updatedAt || blog.publishedAt).toISOString(),
    inLanguage: "en-IN",
    articleSection: category.label,
    author: {
      "@type": author.type,
      name: author.name,
      url: absoluteUrl(author.path),
    },
    publisher: publisherSchema(),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: category.label,
        item: absoluteUrl(`/categories/${category.slug}`),
      },
      { "@type": "ListItem", position: 3, name: blog.title, item: articleUrl },
    ],
  };

  return (
    <>
    <JsonLd data={articleLd} />
    <JsonLd data={breadcrumbLd} />
       <article className="bg-light">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: category.label, href: `/categories/${category.slug}` },
            { label: blog.title },
          ]}
        />
        <h1 className="mt-3 font-semibold text-dark text-2xl sm:text-3xl md:text-[40px] leading-[1.25] max-w-4xl">
          {blog.title}
        </h1>
        <BlogDetails blog={blog} slug={slug} />
      </div>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-6">
        <div className="aspect-[16/9] rounded-lg overflow-hidden bg-bgSoft">
          <Image
            src={blog.image.src}
            placeholder="blur"
            blurDataURL={blog.image.blurDataURL}
            alt={blog.title}
            width={blog.image.width}
            height={blog.image.height}
            className="w-full h-full object-cover object-center"
            priority
            fetchPriority="high"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 grid grid-cols-12 gap-y-8 lg:gap-10 mt-10 pb-16">
        <RenderMdx blog={blog} />

        <div className="col-span-12 lg:col-span-4 order-2">
          <div className="lg:sticky lg:top-[100px] flex flex-col gap-6">
            {blog.toc.length > 0 && (
              <div className="bg-bgSoft rounded-lg p-5 max-h-[60vh] overflow-y-auto">
                <h3 className="text-sm font-bold uppercase tracking-wide text-dark border-b-2 border-accent pb-2 mb-3">
                  On This Page
                </h3>
                <ul className="font-in">
                  {blog.toc.map((item) => (
                    <TableOfContentsItem key={item.url} item={item} />
                  ))}
                </ul>
              </div>
            )}

            {trending.length > 0 && (
              <div className="bg-bgSoft rounded-lg p-5">
                <h3 className="text-sm font-bold uppercase tracking-wide text-dark border-b-2 border-accent pb-2 mb-3">
                  Trending
                </h3>
                <ol className="flex flex-col divide-y divide-borderSoft">
                  {trending.map((t, i) => (
                    <li key={t.slug} className="py-3 first:pt-0">
                      <Link href={t.url} className="flex items-start gap-3 group">
                        <span className="shrink-0 w-5 h-5 flex items-center justify-center rounded bg-dark text-light text-xs font-bold mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-sm font-semibold leading-snug text-dark group-hover:underline decoration-accent decoration-2 underline-offset-2">
                          {t.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
