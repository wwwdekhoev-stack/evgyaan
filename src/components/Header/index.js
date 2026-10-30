"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { SearchIcon, CloseIcon } from "../Icons";
import { useMemo, useState } from "react";
import { cx } from "@/src/utils";
import { blogs } from "@/.velite/generated";

const NAV_LINKS = [
  { label: "EV Scooters/Bikes", href: "/categories/two-wheeler" },
  { label: "EV Cars/4W", href: "/categories/four-wheeler" },
  { label: "EV Battery & Charging", href: "/categories/battery-charging" },
];

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return blogs
      .filter((b) => b.isPublished && b.title.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query]);

  return (
    <header className="w-full bg-dark sticky top-0 z-40">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 h-[64px] md:h-[84px] flex items-center justify-between gap-6">
        <Logo />

        <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {NAV_LINKS.map((link) => {
            const active = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cx(
                  "text-base font-bold text-light/90 hover:text-light transition-colors pb-1 border-b-2",
                  active ? "border-accent text-light" : "border-transparent"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-light/30 text-light hover:bg-light/10 transition-colors"
          >
            <SearchIcon className="w-4 h-4" />
          </button>

          <button
            className="inline-block md:hidden w-9 h-9 flex items-center justify-center text-light"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <CloseIcon className="w-5 h-5" />
            ) : (
              <div className="w-5">
                <span className="block w-full h-0.5 bg-light mb-1.5"></span>
                <span className="block w-full h-0.5 bg-light mb-1.5"></span>
                <span className="block w-full h-0.5 bg-light"></span>
              </div>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-light/10 bg-dark">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-10 py-3">
            <div className="flex items-center gap-3">
              <SearchIcon className="w-4 h-4 text-light/60 shrink-0" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search EVGyan…"
                className="w-full bg-transparent text-light placeholder:text-light/50 border-0 focus:ring-0 text-base py-1"
              />
            </div>
            {results.length > 0 && (
              <ul className="mt-2 border-t border-light/10 pt-2 pb-1">
                {results.map((b) => (
                  <li key={b.slug}>
                    <Link
                      href={b.url}
                      onClick={() => {
                        setSearchOpen(false);
                        setQuery("");
                      }}
                      className="block py-2 text-light/90 hover:text-accent text-sm"
                    >
                      {b.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {query.trim() && results.length === 0 && (
              <p className="mt-2 pt-2 border-t border-light/10 text-light/50 text-sm">
                No articles found for &ldquo;{query}&rdquo;
              </p>
            )}
          </div>
        </div>
      )}

      {menuOpen && (
        <nav className="md:hidden border-t border-light/10 bg-dark px-5 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-bold text-light"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Header;
