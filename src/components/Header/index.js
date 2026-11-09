"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { SearchIcon, CloseIcon } from "../Icons";
import { useState } from "react";
import { cx } from "@/src/utils";
import { CATEGORY_META } from "@/src/components/Blog/CategoryListing";

// Every category shows up here automatically - this used to be a hardcoded
// 3-item list that silently fell out of sync once Phase 4 added
// Three-Wheeler, Commercial EVs and Policy & Industry (they were only
// reachable from the footer, not the main nav anyone actually looks at).
const NAV_LINKS = Object.entries(CATEGORY_META).map(([slug, meta]) => ({
  label: meta.label,
  href: `/categories/${slug}`,
}));

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="w-full bg-dark sticky top-0 z-40">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 h-[64px] md:h-[84px] flex items-center justify-between gap-6">
        <Logo />

        <nav className="hidden md:flex items-center gap-5 lg:gap-7 flex-1 justify-center overflow-x-auto no-scrollbar">
          {NAV_LINKS.map((link) => {
            const active = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cx(
                  "shrink-0 whitespace-nowrap text-sm lg:text-base font-bold text-light/90 hover:text-light transition-colors pb-1 border-b-2",
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
            {/* GET form to /search. This deliberately has NO live dropdown:
                an inline preview meant importing the whole Velite dataset into
                this client component, which shipped every article's compiled
                body to every visitor on every page (~474KB raw / 132KB gzip,
                growing with each new article). /search itself matches titles,
                descriptions AND tags, so it was also the weaker search. */}
            <form action="/search" method="GET" className="flex items-center gap-3">
              <SearchIcon className="w-4 h-4 text-light/60 shrink-0" />
              <input
                autoFocus
                type="text"
                name="q"
                placeholder="Search EVGyan…"
                className="w-full bg-transparent text-light placeholder:text-light/50 border-0 focus:ring-0 text-base py-1"
              />
            </form>
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
