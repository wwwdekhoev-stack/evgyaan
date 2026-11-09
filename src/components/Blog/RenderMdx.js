"use client"
import React from 'react'
import MDXContent from './MdxContent'
import RelatedTool from './RelatedTool'
import SegmentLink from './SegmentLink'
import YouTubeEmbed from './YouTubeEmbed'

const mdxComponents = {
  // Available to every article's MDX.
  YouTubeEmbed,
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
