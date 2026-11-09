// page.js here is a client component, so it cannot export metadata of its
// own - without this layout the page inherited the root default title
// ("EVGyan.com | EV Sales Data, News & Honest Analysis") and the root
// `index, follow` robots directive.
//
// The paid consultation is not currently offered: /consultation shows only
// the two free options and nothing on the site links here. This page is
// kept so any old link (e.g. a YouTube description) still resolves, but it
// is explicitly noindex so Google doesn't surface a product that isn't on
// sale. It is already excluded from sitemap.js.
export const metadata = {
  title: 'EV Consultation Booking',
  robots: { index: false, follow: true },
};

export default function ConsultationPayLayout({ children }) {
  return children;
}
