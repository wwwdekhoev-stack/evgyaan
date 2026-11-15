// page.js here is a client component, so it cannot export metadata of its
// own - it was inheriting the root default title and `index, follow`, and
// a post-payment confirmation screen has no business in search results.
export const metadata = {
  title: 'Booking Confirmed',
  robots: { index: false, follow: false },
};

export default function ConsultationSuccessLayout({ children }) {
  return children;
}
