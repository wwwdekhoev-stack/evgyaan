// page.js here is a client component (it fires an analytics event, then
// bounces to the partner's cart), so it cannot export metadata of its own.
// Without this layout it inherited the root default title and the root
// `index, follow`, which is why a pure redirect stub was sitting in
// Google's index under the homepage's own title.
//
// It is an affiliate hop, not a page: noindex, but follow so the outbound
// link still behaves normally.
export const metadata = {
  title: 'Redirecting to Bolt.Earth',
  robots: { index: false, follow: true },
};

export default function BoltLayout({ children }) {
  return children;
}
