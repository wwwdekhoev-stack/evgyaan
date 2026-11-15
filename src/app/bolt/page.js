'use client'

import { useEffect } from 'react'
import { trackOutbound, EVENTS } from '@/src/utils/analytics'

const DESTINATION =
  'https://shop.bolt.earth/cart/42177012269169:1?discount=EVGYANDC'

export default function BoltRedirect() {
  useEffect(() => {
    // Queueing onto dataLayer rather than calling window.gtag was the
    // right instinct - on a direct visit, which is how this link is
    // mostly used, gtag.js has usually not finished loading. But the
    // queued entry has to be an `arguments` object, which is what gtag.js
    // reads. Pushing a plain array, as this did, looks almost identical
    // and is never processed: bolt_click has not been reaching GA4 at
    // all. The shared helper gets that detail right.
    trackOutbound(EVENTS.PARTNER_CLICK, {
      partner: 'bolt-earth',
      product: 'Blaze DC Dual Gun',
      link_type: 'affiliate',
    })
    // Original event name kept alongside it, so any report already built
    // on bolt_click keeps working - starting now, since it has in fact
    // never fired.
    trackOutbound('bolt_click', {
      event_category: 'affiliate_link',
      event_label: 'Bolt.Earth Blaze DC Dual Gun',
    })

    const timer = setTimeout(() => {
      window.location.href = DESTINATION
    }, 400)

    return () => clearTimeout(timer)
  }, [])

  return <p style={{ fontFamily: 'sans-serif', padding: 20 }}>Redirecting to Bolt.Earth…</p>
}
