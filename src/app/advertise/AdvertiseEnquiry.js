"use client";

import { useState } from "react";
import siteMetadata from "@/src/utils/siteMetaData";
import { trackOutbound, EVENTS } from "@/src/utils/analytics";

const FORMATS = [
  "YouTube integration",
  "Sponsored article on evgyan.com",
  "Newsletter mention",
  "Instagram / Shorts",
  "Not sure yet — advise me",
];

const BUDGETS = [
  "Under ₹1 lakh",
  "₹1–3 lakh",
  "₹3–7 lakh",
  "₹7 lakh+",
  "Prefer to discuss",
];

const TIMELINES = ["This month", "Next month", "This quarter", "Just exploring"];

// There is no CRM or transactional-email service wired into this site yet,
// and a form that posts into a void loses real money - the existing
// ContactForm does exactly that (its onSubmit is a console.log, which the
// production build strips). So this composes a complete, structured
// enquiry and hands it to the sender's own mail client. Nothing can be
// silently dropped, and Tarun gets every field in one email.
//
// When a proper inbox or CRM endpoint exists, swap the mailto for a POST
// and keep this form markup as-is.
export default function AdvertiseEnquiry() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    format: FORMATS[0],
    budget: BUDGETS[4],
    timeline: TIMELINES[3],
    message: "",
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const subject = `Brand enquiry — ${form.company || form.name || "EVGyan"}`;
    const body = [
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Email: ${form.email}`,
      `Format: ${form.format}`,
      `Budget: ${form.budget}`,
      `Timeline: ${form.timeline}`,
      "",
      "Brief:",
      form.message,
    ].join("\n");
    // Fire before navigating away. Budget and format are the two fields
    // that say whether an enquiry is real, so they go on the event - no
    // name, company or email, which have no business in analytics.
    trackOutbound(EVENTS.LEAD_SUBMIT, {
      form: "advertise",
      ad_format: form.format,
      budget_band: form.budget,
      timeline: form.timeline,
    });

    window.location.href = `mailto:${siteMetadata.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "mt-1 w-full rounded-lg border border-borderSoft bg-white px-3 py-2.5 text-sm text-dark outline-none focus:border-dark focus:ring-0";
  const label = "block text-xs font-bold uppercase tracking-wide text-dark";

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className={label} htmlFor="adv-name">Your name</label>
        <input id="adv-name" required value={form.name} onChange={set("name")} className={field} />
      </div>
      <div>
        <label className={label} htmlFor="adv-company">Company</label>
        <input id="adv-company" required value={form.company} onChange={set("company")} className={field} />
      </div>
      <div>
        <label className={label} htmlFor="adv-email">Work email</label>
        <input id="adv-email" type="email" required value={form.email} onChange={set("email")} className={field} />
      </div>
      <div>
        <label className={label} htmlFor="adv-format">What you have in mind</label>
        <select id="adv-format" value={form.format} onChange={set("format")} className={field}>
          {FORMATS.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label className={label} htmlFor="adv-budget">Budget</label>
        <select id="adv-budget" value={form.budget} onChange={set("budget")} className={field}>
          {BUDGETS.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label className={label} htmlFor="adv-timeline">Timeline</label>
        <select id="adv-timeline" value={form.timeline} onChange={set("timeline")} className={field}>
          {TIMELINES.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className={label} htmlFor="adv-message">The brief</label>
        <textarea
          id="adv-message"
          rows={4}
          value={form.message}
          onChange={set("message")}
          placeholder="Product, launch date, what a good outcome looks like."
          className={field}
        />
      </div>
      <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="rounded-lg bg-dark px-6 py-3 text-sm font-bold text-light hover:opacity-90 transition-opacity"
        >
          Send enquiry
        </button>
        <span className="text-xs text-gray">
          Opens your email app with everything filled in. Or write to{" "}
          <a
            href={`mailto:${siteMetadata.email}`}
            className="font-semibold text-dark underline decoration-accent decoration-2 underline-offset-2"
          >
            {siteMetadata.email}
          </a>
          .
        </span>
      </div>
    </form>
  );
}
