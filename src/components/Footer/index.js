import Link from "next/link";
import { YoutubeIcon, InstagramIcon, FacebookIcon, LinkedinIcon, XIcon } from "../Icons";
import siteMetadata from "@/src/utils/siteMetaData";

const CHANNELS = [
  { label: "YouTube", href: siteMetadata.youtube, Icon: YoutubeIcon },
  { label: "Instagram", href: siteMetadata.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteMetadata.facebook, Icon: FacebookIcon },
  { label: "LinkedIn", href: siteMetadata.linkedin, Icon: LinkedinIcon },
  { label: "X / Twitter", href: siteMetadata.twitter, Icon: XIcon },
];

const Footer = () => {
  return (
    <footer className="mt-16 bg-dark text-light">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1.5fr] gap-8">
          <div>
            <Link href="/" className="font-bold text-xl">
              EV<span className="text-accent">Gyan</span>
            </Link>
            <p className="mt-3 text-sm text-light/60 leading-relaxed max-w-xs">
              India&apos;s most trusted EV channel — honest reviews, real-world
              data, with zero pressure from brands.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-light/50 uppercase tracking-wide mb-3">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/two-wheeler" className="hover:text-accent transition-colors">
                  2-Wheeler EV
                </Link>
              </li>
              <li>
                <Link href="/categories/four-wheeler" className="hover:text-accent transition-colors">
                  4-Wheeler EV
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-light/50 uppercase tracking-wide mb-3">
              Contact
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${siteMetadata.email}`} className="hover:text-accent transition-colors break-all">
                  {siteMetadata.email}
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact page
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-light/50 uppercase tracking-wide mb-3">
              Channels
            </h3>
            <div className="flex flex-wrap gap-2">
              {CHANNELS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-light/20 text-xs font-medium hover:border-accent hover:text-accent transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-light/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-light/50">
          <span>&copy; {new Date().getFullYear()} EVGyan. All rights reserved.</span>
          <span>India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
