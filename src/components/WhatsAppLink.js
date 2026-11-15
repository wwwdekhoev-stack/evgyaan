"use client";

import { trackOutbound, EVENTS } from "@/src/utils/analytics";

// /consultation and /contact are server components, so the WhatsApp links
// on them cannot carry an onClick of their own. This is the thinnest
// possible client wrapper: the same anchor, plus one GA4 event so there is
// a record of which page produced a conversation. Without it, the most
// common way a reader actually reaches EVGyan is invisible in analytics.
export default function WhatsAppLink({ href, source, className, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackOutbound(EVENTS.WHATSAPP_CLICK, { source })}
    >
      {children}
    </a>
  );
}
