import Link from "next/link";

const categories = [
  { label: "EV Scooters/Bikes", href: "/categories/two-wheeler" },
  { label: "EV Cars/4W", href: "/categories/four-wheeler" },
  { label: "EV Battery & Charging", href: "/categories/battery-charging" },
];

const Skills = () => {
  return (
    <section className="max-w-[1280px] mx-auto px-5 sm:px-10 py-10 border-t border-borderSoft">
      <h2 className="text-xl sm:text-2xl font-semibold text-dark">
        Want to see more content on...
      </h2>
      <ul className="flex flex-wrap gap-3 mt-5">
        {categories.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-block font-semibold text-sm sm:text-base py-2.5 px-5 sm:px-6 rounded-full bg-bgSoft text-dark border border-borderSoft hover:bg-accent hover:border-accent transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
