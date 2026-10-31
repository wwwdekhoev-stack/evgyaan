import AboutCoverSection from "@/src/components/About/AboutCoverSection";
import Skills from "@/src/components/About/Skills";
import Link from "next/link";


export const metadata = {
  title: "About Us",
  description: "Learn more about EVGyan — India's trusted source for honest EV news and sales data.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <AboutCoverSection />
      <Skills />
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 pb-16">
        <p className="text-base text-gray">
          Have something to ask the EVGyan team? Reach out{" "}
          <Link href="/contact" className="text-dark font-semibold underline decoration-accent decoration-2 underline-offset-2">
            here
          </Link>{" "}
          and let&rsquo;s make it happen.
        </p>
      </div>
    </>
  );
}
