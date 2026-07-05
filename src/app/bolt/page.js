'use client'

import { useEffect } from 'react'

const DESTINATION =
  'https://shop.bolt.earth/cart/42177012269169:1?discount=EVGYANDC'

export default function BoltRedirect() {
  useEffect(() => {
    const go = () => { window.location.href = DESTINATION }

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      // GA4 event — yeh "Bolt.Earth" clicks count karega
      window.gtag('event', 'bolt_click', {
        event_category: 'affiliate_link',
        event_label: 'Bolt.Earth Blaze DC Dual Gun',
        event_callback: go,   // event jaate hi redirect
      })
      // safety fallback — GA slow ho toh bhi 500ms mein redirect
      setTimeout(go, 500)
    } else {
      go() // GA na mile toh bhi user ka redirect kabhi na ruke
    }
  }, [])

  return <p style={{ fontFamily: 'sans-serif', padding: 20 }}>Redirecting to Bolt.Earth…</p>
}
