'use client'

import { useEffect } from 'react'

const DESTINATION =
  'https://shop.bolt.earth/cart/42177012269169:1?discount=EVGYANDC'

export default function BoltRedirect() {
  useEffect(() => {
    // Push straight to dataLayer instead of calling window.gtag(...).
    // On a fresh/direct visit (which is how this link is mostly used —
    // from a video description) gtag.js may not have finished loading yet,
    // so `typeof window.gtag === 'function'` can be false and the event
    // silently never fires. dataLayer.push() works even before gtag.js
    // loads — it just queues the event, and gtag.js drains the queue
    // once it initializes.
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(['event', 'bolt_click', {
      event_category: 'affiliate_link',
      event_label: 'Bolt.Earth Blaze DC Dual Gun',
      transport_type: 'beacon',
    }])

    const timer = setTimeout(() => {
      window.location.href = DESTINATION
    }, 400)

    return () => clearTimeout(timer)
  }, [])

  return <p style={{ fontFamily: 'sans-serif', padding: 20 }}>Redirecting to Bolt.Earth…</p>
}
