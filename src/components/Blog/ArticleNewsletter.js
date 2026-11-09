"use client";

import { useState } from "react";

// Inline email capture at the end of every article.
//
// Before this, the only signup forms on the site were on /ev-buying-guide
// and /ev-guide - two near-duplicate pages, neither linked from anywhere
// a reader actually lands. Articles are where the organic traffic arrives,
// and they had no capture at all.
//
// The offer is deliberately the monthly Vahan sales data rather than a
// generic "subscribe": it's the thing EVGyan publishes that nobody else
// does, it arrives on a predictable schedule, and it's a real reason to
// hand over an address.
const ArticleNewsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errMsg, setErrMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;

    // Honeypot: a real person never sees or fills this. Bots fill every
    // field they find, so a non-empty value means "drop it" - and we show
    // success anyway so the bot doesn't learn it was caught.
    if (e.target.company?.value) {
      setStatus("success");
      return;
    }

    setStatus("loading");
    setErrMsg("");
    try {
      const res = await fetch("/api/ev-guide-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "article" }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrMsg("Network error. Please try again.");
    }
  }

  return (
    <section className="mt-10 rounded-lg border border-borderSoft p-5 sm:p-6">
      {status === "success" ? (
        <p className="text-dark font-semibold">
          Done — you&apos;re on the list. The next monthly data drop will land in your inbox.
        </p>
      ) : (
        <>
          <h2 className="text-lg font-semibold text-dark leading-snug">
            Get India&apos;s monthly EV sales data by email
          </h2>
          <p className="mt-1.5 text-sm text-gray leading-relaxed">
            Every month we pull the Vahan registration numbers apart — by segment, by state,
            by model — and send you what actually changed. No brand pressure, no hype.
          </p>
          <form onSubmit={handleSubmit} noValidate className="mt-4 flex flex-col sm:flex-row gap-3">
            <label htmlFor="article-newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="article-newsletter-email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="flex-1 min-w-0 h-11 rounded-lg border border-borderSoft px-3.5 text-base text-dark bg-light outline-none focus:border-dark transition-colors placeholder:text-gray/60"
            />
            {/* Honeypot - hidden from people, visible to bots. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="h-11 px-5 rounded-lg bg-accent text-dark font-bold text-sm hover:brightness-95 transition disabled:opacity-70 shrink-0"
            >
              {status === "loading" ? "Sending…" : "Send me the data"}
            </button>
          </form>
          {errMsg && <p className="mt-2 text-sm text-red-600">{errMsg}</p>}
          <p className="mt-2.5 text-xs text-gray">
            One email a month. Unsubscribe anytime. See our{" "}
            <a href="/privacy-policy" className="underline decoration-accent decoration-2 underline-offset-2">
              privacy policy
            </a>
            .
          </p>
        </>
      )}
    </section>
  );
};

export default ArticleNewsletter;
