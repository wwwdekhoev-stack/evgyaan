import Link from "next/link";
import { YoutubeIcon, InstagramIcon, FacebookIcon, LinkedinIcon, XIcon } from "@/src/components/Icons";
import siteMetadata from "@/src/utils/siteMetaData";

export const metadata = {
  title: "Contact Us",
  description: `Get in touch with the EVGyan team by email, WhatsApp, or on social media.`,
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  { label: "YouTube", href: siteMetadata.youtube, Icon: YoutubeIcon },
  { label: "Instagram", href: siteMetadata.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteMetadata.facebook, Icon: FacebookIcon },
  { label: "LinkedIn", href: siteMetadata.linkedin, Icon: LinkedinIcon },
  { label: "X / Twitter", href: siteMetadata.twitter, Icon: XIcon },
];

export default function Contact() {
  return (
    <section className="max-w-[1280px] mx-auto px-5 sm:px-10 py-12">
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray uppercase tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-dark" />
        Contact
      </span>
      <h1 className="mt-3 text-[28px] md:text-[34px] leading-[1.3] font-semibold text-dark">
        Let&rsquo;s Connect
      </h1>
      <p className="mt-3 text-base text-gray max-w-xl">
        Got a question, a tip, or a brand enquiry? Reach the EVGyan team
        directly &mdash; whichever way works best for you.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 gap-5 max-w-2xl">
        <a
          href={`mailto:${siteMetadata.email}`}
          className="bg-bgSoft rounded-lg p-6 hover:bg-accent/20 transition-colors"
        >
          <div className="text-2xl">✉️</div>
          <div className="mt-3 font-semibold text-dark">Email</div>
          <div className="mt-1 text-sm text-gray break-all">{siteMetadata.email}</div>
        </a>

        <a
          href="https://wa.me/918178043697"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-bgSoft rounded-lg p-6 hover:bg-accent/20 transition-colors"
        >
          <div className="text-2xl">💬</div>
          <div className="mt-3 font-semibold text-dark">WhatsApp</div>
          <div className="mt-1 text-sm text-gray">Chat with the EVGyan team</div>
        </a>
      </div>

      <div className="mt-10">
        <h3 className="text-sm font-bold uppercase tracking-wide text-dark border-b-2 border-accent pb-2 mb-4 inline-block">
          Follow EVGyan
        </h3>
        <div className="flex flex-wrap gap-2">
          {CHANNELS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-borderSoft text-sm font-medium text-dark hover:border-dark transition-colors"
            >
              <Icon className="w-4 h-4" />
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Who you are actually writing to. A news site that names no legal
          entity, no editor and no corrections route is one a sponsor's
          diligence and Google's news surfaces both mark down. The postal
          address still has to be added here - see the 60-day plan. */}
      <div className="mt-12 border-t border-borderSoft pt-6 max-w-2xl">
        <h3 className="text-sm font-bold uppercase tracking-wide text-dark">
          Publisher
        </h3>
        <dl className="mt-3 space-y-2 text-sm text-gray">
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-semibold text-dark">Published by</dt>
            <dd>{siteMetadata.legalName}, a sole proprietorship</dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-semibold text-dark">Founder and editor</dt>
            <dd>{siteMetadata.founder}</dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-semibold text-dark">Corrections</dt>
            <dd>
              <a
                href={`mailto:${siteMetadata.correctionsEmail}?subject=Correction`}
                className="text-dark underline decoration-accent decoration-2 underline-offset-2 break-all"
              >
                {siteMetadata.correctionsEmail}
              </a>
              {" "}&mdash; we correct errors of fact and say what changed, see our{" "}
              <Link
                href="/editorial-policy"
                className="text-dark underline decoration-accent decoration-2 underline-offset-2"
              >
                editorial policy
              </Link>
              .
            </dd>
          </div>
        </dl>
      </div>

      <p className="mt-10 text-sm text-gray">
        Prefer to browse first?{" "}
        <Link href="/about" className="text-dark font-semibold underline decoration-accent decoration-2 underline-offset-2">
          Learn more about EVGyan
        </Link>
        .
      </p>
    </section>
  );
}
