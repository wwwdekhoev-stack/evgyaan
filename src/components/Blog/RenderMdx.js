"use client"
import React from 'react'
import MDXContent from './MdxContent'
import RelatedTool from './RelatedTool'
import SegmentLink from './SegmentLink'
import YouTubeEmbed from './YouTubeEmbed'
import Image from 'next/image'
import MdxTable from './MdxTable'
import MdxLink from './MdxLink'

// Every `![alt](./photo.jpg)` in an article renders through this.
//
// Before, in-body photos were bare <img> tags pointing at the original
// JPEG: no width/height (layout shift), no lazy loading, no AVIF/WebP, and
// React preloaded each one in <head>, so they competed with the hero image
// for bandwidth. One article preloaded 1.4 MB this way and measured a
// 7.8 s mobile LCP.
//
// Now: the size comes from the build (see remarkImageSize in
// velite.config.js) and the image goes through next/image - resized to the
// reader's screen, served as AVIF/WebP, lazy-loaded, with space reserved so
// the text does not jump. The article column is at most ~800px wide on
// desktop and full width on phones, which is what `sizes` says.
//
// If the build could not read a size (remote image, missing file), it falls
// back to a plain lazy <img>, which still avoids the preload.
const MdxImage = ({ src, alt = '', title, width, height }) => {
  const w = Number(width)
  const h = Number(height)
  if (typeof src === 'string' && src.startsWith('/') && w > 0 && h > 0) {
    return (
      <Image
        src={src}
        alt={alt}
        title={title}
        width={w}
        height={h}
        loading="lazy"
        sizes="(max-width: 1024px) 100vw, 800px"
      />
    )
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} title={title} loading="lazy" decoding="async" />
}

const mdxComponents = {
  // Available to every article's MDX.
  YouTubeEmbed,
  img: MdxImage,
  // Markdown tables get a horizontal scroll container so six numeric
  // columns survive a 390px phone - see MdxTable.js.
  table: MdxTable,
  // Internal links go through next/link; outbound ones open in a new tab,
  // and links to the channel carry UTMs - see MdxLink.js.
  a: MdxLink,
}

const RenderMdx = ({blog}) => {
  return (
    // The grid column now lives in blogs/[slug]/page.js so the share bar,
    // author bio, newsletter and related articles can sit in the same
    // column *outside* `prose` - prose would otherwise restyle their
    // headings and links.
    <div className='font-in prose sm:prose-base md:prose-lg max-w-max
    prose-blockquote:bg-accent/20
    prose-blockquote:p-2
    prose-blockquote:px-6
    prose-blockquote:border-accent
    prose-blockquote:not-italic
    prose-blockquote:rounded-r-lg

    prose-figure:relative
    prose-figcaption:mt-1
    prose-figcaption:mb-2

    prose-li:marker:text-accent

    dark:prose-invert
    dark:prose-blockquote:border-accentDark
    dark:prose-blockquote:bg-accentDark/20
    dark:prose-li:marker:text-accentDark

    first-letter:text-3xl
    sm:first-letter:text-5xl'>
        <MDXContent code={blog.body} components={mdxComponents}/>
        {/* At most one related-tool nudge per article, inline with the
            reading content (not a page banner) - see RelatedTool.js. */}
        <RelatedTool tags={blog.tags} />
        {/* Only renders on a registered monthly data-report article. */}
        <SegmentLink slug={blog.slug} />
    </div>
  )
}

export default RenderMdx
