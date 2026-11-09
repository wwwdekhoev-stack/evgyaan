"use client";

import { useState } from "react";
import { XIcon } from "../Icons";

// WhatsApp is the share channel that matters most for an Indian audience,
// so it leads. No third-party share SDK here on purpose - these are plain
// links plus one clipboard call, so nothing extra loads and nothing tracks
// the reader.

function WhatsAppIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.371-.025-.52c-.075-.149-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a12 12 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.999-3.648l-.235-.374a9.86 9.86 0 0 1-1.511-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.8 11.8 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"
      />
    </svg>
  );
}

function LinkIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

const btn =
  "inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-borderSoft text-sm font-semibold text-dark hover:border-dark transition-colors";

const ShareButtons = ({ url, title }) => {
  const [copied, setCopied] = useState(false);

  const shareText = `${title} — ${url}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API needs a secure context and can be blocked outright.
      // Rather than fail silently, fall back to selecting the URL so the
      // reader can copy it by hand.
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <div className="mt-10 pt-6 border-t border-borderSoft flex flex-wrap items-center gap-3">
      <span className="text-sm font-bold uppercase tracking-wide text-gray mr-1">Share</span>

      <a
        href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
      >
        <WhatsAppIcon className="w-4 h-4" />
        WhatsApp
      </a>

      <a
        href={`https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
      >
        <XIcon className="w-3.5 h-3.5" />
        Post
      </a>

      <button type="button" onClick={copyLink} className={btn} aria-live="polite">
        <LinkIcon className="w-4 h-4" />
        {copied ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
};

export default ShareButtons;
