// GA4 key events.
//
// GA4 has been installed since launch, but nothing told it which page
// produced a subscriber, a guide download or an enquiry - so the pageview
// count was the only thing it could answer. These are the events the day-60
// decision gets judged on, so they are named in one place rather than typed
// out at each call site, where a single typo silently splits a funnel.
//
// Mark these as key events in GA4 -> Admin -> Events once they start
// arriving.
export const EVENTS = {
  NEWSLETTER_SIGNUP: "newsletter_signup",
  GUIDE_DOWNLOAD: "guide_download",
  WHATSAPP_CLICK: "whatsapp_click",
  PARTNER_CLICK: "partner_click",
  CALCULATOR_COMPLETE: "calculator_complete",
  LEAD_SUBMIT: "lead_submit",
  PREFERRED_SOURCE_CLICK: "preferred_source_click",
  YOUTUBE_CLICK: "youtube_click",
  SHARE_CLICK: "share_click",
};

// Why this and not `window.gtag?.(...)`:
//
// On a direct hit - which is how /bolt and most YouTube-description links
// are used - gtag.js has often not finished loading when the handler runs,
// so `typeof window.gtag === 'function'` is false and the event is silently
// dropped. Pushing onto dataLayer instead queues it, and gtag.js drains the
// queue when it initialises.
//
// It has to be an `arguments` object, not a plain array. gtag.js reads
// dataLayer entries as arguments objects; `dataLayer.push(['event', ...])`
// looks similar and does not work. That is the bug this replaces on /bolt.
export function track(name, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag("event", name, params);
}

// For a click that navigates away: GA4's own beacon transport means the
// request survives the page unloading, so there is nothing to await.
export function trackOutbound(name, params = {}) {
  track(name, { transport_type: "beacon", ...params });
}
