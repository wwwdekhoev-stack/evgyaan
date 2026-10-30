import Image from "next/image";
import siteMetadata from "@/src/utils/siteMetaData";

const STATS = [
  { label: "YouTube subscribers", value: siteMetadata.subscriberCount },
  { label: "Years in EV content", value: "5+" },
  { label: "Brand pressure", value: "Zero" },
];

const AboutCoverSection = () => {
  return (
    <section className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-10 pb-12">
      <div className="grid md:grid-cols-[320px_1fr] gap-8 md:gap-12 items-start">
        <div className="aspect-square rounded-lg overflow-hidden bg-bgSoft mx-auto md:mx-0 w-full max-w-[320px]">
          <Image
            src="/tarun.jpg"
            alt="Tarun Pal, founder of EVGyan"
            width={640}
            height={640}
            priority
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-dark" />
            About EVGyan
          </span>
          <h1 className="mt-3 text-[28px] md:text-[34px] leading-[1.3] font-semibold text-dark">
            Honest EV content, zero pressure from brands
          </h1>

          <div className="mt-5 flex flex-wrap gap-6 sm:gap-10">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-dark">{s.value}</div>
                <div className="text-xs text-gray mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-base leading-[1.7] text-gray space-y-4">
            <p>
              EVGyan started as a YouTube channel to demystify India&rsquo;s
              electric vehicle revolution. It has since grown into one of the
              most trusted voices in the EV space, with{" "}
              {siteMetadata.subscriberCount} subscribers and counting, on a
              mission to help people make smarter, greener choices.
            </p>
            <p>
              From detailed EV reviews and comparisons to breaking news,
              in-depth tech explainers, and policy updates &mdash; EVGyan is a
              one-stop destination for everything electric, whether
              you&rsquo;re a curious first-time EV buyer or a hardcore tech
              enthusiast.
            </p>
            <p>
              The transition to electric mobility isn&rsquo;t just about
              vehicles &mdash; it&rsquo;s about building a cleaner, smarter
              future for everyone. This website is part of that journey:
              simplifying EV knowledge, one video and one article at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCoverSection;
