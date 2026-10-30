import "./globals.css";
import { cx } from "@/src/utils";
import { Roboto } from "next/font/google";
import Header from "@/src/components/Header";
import Footer from "../components/Footer";
import siteMetadata from "../utils/siteMetaData";
import Script from "next/script";

const robotoBody = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-in",
});

const robotoDisplay = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-mr",
});

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title, // a default is required when creating a template
  },
  description: siteMetadata.description,
  // EVGyan logo icons. The ?v= query forces browsers to drop the old cached
  // template avatar — bump it whenever the icon changes.
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon-32x32.png?v=2", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png?v=2", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/favicon.ico?v=2",
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cx(
          robotoBody.variable,
          robotoDisplay.variable,
          "font-mr bg-light dark:bg-light"
        )}
      >
        {/*
          EVGyan has no dark-mode toggle — it is a light-theme site only.
          We used to auto-add a `dark` class here based on the visitor's
          OS/browser color-scheme preference. Many phones default to system
          dark mode, so most mobile visitors silently got that class, which
          flipped the article body text to Tailwind Typography's
          dark:prose-invert colors (light grey, meant for a dark background)
          while the page background stayed forced white (bg-light). That
          mismatch is what made article text look washed-out/grey and hard
          to read on mobile. Since there is no real dark theme to switch to,
          we now always force light mode instead of reading the OS preference.
        */}
        <Script id="theme-switcher" strategy="beforeInteractive">
          {`document.documentElement.classList.remove('dark')`}
        </Script>

        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3VRLREJJJQ"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3VRLREJJJQ');
          `}
        </Script>

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
