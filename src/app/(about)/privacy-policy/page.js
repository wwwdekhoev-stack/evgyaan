import Link from "next/link";
import siteMetadata from "@/src/utils/siteMetaData";

export const metadata = {
  title: "Privacy Policy",
  description:
    "What personal data EVGyan.com collects, why, which third-party services we use, and how to contact us about your data.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicy() {
  return (
    <section className="max-w-[1280px] mx-auto px-5 sm:px-10 py-12">
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray uppercase tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-dark" />
        Legal
      </span>
      <h1 className="mt-3 text-[28px] md:text-[34px] leading-[1.3] font-semibold text-dark">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-gray">Last updated: 31 October 2026</p>

      <div className="mt-8 prose max-w-3xl prose-headings:text-dark prose-a:text-dark prose-a:decoration-accent">
        <p>
          This policy explains what information EVGyan (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;) collects when you use {siteMetadata.siteUrl.replace("https://", "")}, what we use it
          for, and the choices you have. Reading articles on this site does not
          require an account.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Usage data.</strong> We use Google Analytics 4 to see which
            pages are visited, how visitors arrive and what device and browser
            they use. Google Analytics sets cookies and collects an online
            identifier and approximate location; it does not tell us who you
            are.
          </li>
          <li>
            <strong>Email address.</strong> If you request our free EV guide or
            join a mailing list, you give us your email address. It is stored
            with our email service providers (MailerLite and Kit) so that we
            can send you what you asked for.
          </li>
          <li>
            <strong>Consultation bookings.</strong> If you book an EV
            consultation, you enter your name and WhatsApp number. These are
            kept temporarily in your browser session and shared with us by
            WhatsApp so we can confirm your slot. Payments are handled by
            Razorpay; we never see or store your card or UPI details.
          </li>
          <li>
            <strong>Messages you send us.</strong> If you email us, we keep the
            message and your address to reply to you.
          </li>
        </ul>

        <h2>How we use it</h2>
        <p>
          To run and improve the site, to send you the guides and updates you
          asked for, to deliver paid services you book, and to reply to your
          messages. We do not sell your personal data.
        </p>

        <h2>Third-party links and affiliates</h2>
        <p>
          Some pages link to other websites, including affiliate links to
          products we recommend (for example EV chargers). When you click one,
          that website&rsquo;s own privacy policy applies. We may record that a
          click happened, using Google Analytics, to understand which
          recommendations are useful.
        </p>

        <h2>Cookies</h2>
        <p>
          The site itself uses very few cookies; most come from Google
          Analytics and embedded third-party forms. You can block or delete
          cookies in your browser settings, or install Google&rsquo;s opt-out
          add-on for Google Analytics. The site will still work.
        </p>

        <h2>Your choices</h2>
        <p>
          You can unsubscribe from any email with the link at the bottom of it.
          You can also ask us to show, correct or delete the personal data we
          hold about you, in line with applicable Indian law including the
          Digital Personal Data Protection Act, 2023. Write to{" "}
          <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a> and
          we will respond as soon as we reasonably can.
        </p>

        <h2>Children</h2>
        <p>
          EVGyan is not directed at children under 18, and we do not knowingly
          collect their personal data.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If we change this policy, we will update the date at the top of this
          page.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy:{" "}
          <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a> or
          our <Link href="/contact">contact page</Link>. See also our{" "}
          <Link href="/editorial-policy">editorial policy</Link>.
        </p>
      </div>
    </section>
  );
}
