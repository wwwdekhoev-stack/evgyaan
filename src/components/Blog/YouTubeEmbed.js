"use client"
import React, { useState } from "react";

/**
 * Click-to-play YouTube card for use inside article MDX.
 *
 * Renders the real YouTube thumbnail with a play button. Nothing from
 * youtube.com loads until the reader clicks, so the article stays fast,
 * and the click swaps in the actual player in place.
 *
 * Usage in MDX:
 *   <YouTubeEmbed id="kEFJskSRAWE" title="Oben Rorr EVO Ownership Review" />
 */
const YouTubeEmbed = ({
  id,
  title = "EVGyan video",
  label = "Watch the full review",
  caption,
}) => {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
  );

  if (!id) return null;

  return (
    <div className="not-prose my-8">
      <div className="relative w-full overflow-hidden rounded-xl bg-dark shadow-md aspect-video">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 h-full w-full cursor-pointer border-0 p-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              alt={title}
              loading="lazy"
              onError={() =>
                setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)
              }
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
            <span className="absolute left-1/2 top-1/2 flex h-[48px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-[#212121]/80 transition group-hover:bg-[#ff0000]">
              <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="#fff"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-left text-sm font-semibold text-light sm:text-base">
              {label}
            </span>
          </button>
        )}
      </div>
      {caption ? (
        <p className="mt-2 text-center text-xs italic text-gray-500 dark:text-light/60">
          {caption}
        </p>
      ) : null}
    </div>
  );
};

export default YouTubeEmbed;
