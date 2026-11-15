"use client";

import { useEffect, useRef } from "react";
import { track, trackOutbound, EVENTS } from "@/src/utils/analytics";
import siteMetadata from "@/src/utils/siteMetaData";

const DOMAIN = siteMetadata.siteUrl.replace(/^https?:\/\//, "");
const DEEPLINK = `https://www.google.com/preferences/source?q=${DOMAIN}`;

/**
 * Google's "Add to Preferred Sources" button.
 *
 * A 16-day-old site cannot win Top Stories on authority. A creator with
 * 400K subscribers can ask readers for it directly, and a reader who marks
 * EVGyan as preferred sees its stories more often in Top Stories and badged
 * in AI Overviews and AI Mode. It is the fastest distribution lever
 * available here, and it costs two lines of HTML.
 *
 * Google renders the button itself, inside an iframe, from publisher.js
 * (loaded once in the root layout). Two details that otherwise waste an
 * afternoon:
 *
 * 1. Google sets width:100% on its slot and absolutely positions the
 *    iframe inside it, so a shrink-to-fit parent collapses to zero width
 *    and the button never appears. Hence the explicit width below.
 * 2. The click happens inside Google's iframe, so it does not bubble into
 *    our document and cannot be handled directly. The window-blur check
 *    below is the standard way to infer it: when the iframe takes focus,
 *    the parent window blurs and document.activeElement becomes that
 *    iframe. It is an inference, not a certainty - treat the count as a
 *    floor with some noise, not an exact figure. The text link underneath
 *    is a plain anchor and is measured properly.
 */
export default function PreferredSource({ placement = "article" }) {
  const ref = useRef(null);

  useEffect(() => {
    const onBlur = () => {
      const el = document.activeElement;
      if (el && el.tagName === "IFRAME" && ref.current?.contains(el)) {
        track(EVENTS.PREFERRED_SOURCE_CLICK, {
          placement,
          method: "google_button",
        });
      }
    };
    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, [placement]);

  return (
    <aside className="mt-10 rounded-lg border border-borderSoft bg-bgSoft p-5 sm:p-6">
      <h2 className="text-base font-bold text-dark">
        See more EVGyan in your Google results
      </h2>
      <p className="mt-1.5 text-sm text-gray">
        Add EVGyan as a preferred source and our EV coverage shows up more
        often in Top Stories when you search. It takes one tap and you come
        straight back here.
      </p>

      <div ref={ref} className="mt-4" style={{ width: 260, maxWidth: "100%" }}>
        <div google-add-preferred-source-btn="" data-theme="light" />
      </div>

      <p className="mt-3 text-xs text-gray">
        Button not loading?{" "}
        <a
          href={DEEPLINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackOutbound(EVENTS.PREFERRED_SOURCE_CLICK, {
              placement,
              method: "deeplink",
            })
          }
          className="font-semibold text-dark underline decoration-accent decoration-2 underline-offset-2"
        >
          Open Google&rsquo;s source settings
        </a>{" "}
        and add {DOMAIN}.
      </p>
    </aside>
  );
}
