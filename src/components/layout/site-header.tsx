"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/atlas", label: "Atlas" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/digitize", label: "Digitize" },
  { href: "/dss", label: "Schemes" },
  { href: "/research", label: "Research" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-paper-raised font-display text-sm">
            त्र
          </span>
          <span className="font-display text-lg tracking-tight text-ink">
            TRINETRA
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-wider text-ink-soft transition-colors hover:text-forest"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/atlas"
            className="hidden rounded-full bg-clay px-4 py-2 font-mono text-xs uppercase tracking-wider text-paper-raised transition-colors hover:bg-clay-deep sm:inline-block"
          >
            Open Atlas
          </Link>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-line bg-paper md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-6 py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-line/60 py-3 font-mono text-xs uppercase tracking-wider text-ink-soft last:border-b-0 hover:text-forest"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/atlas"
              onClick={() => setMenuOpen(false)}
              className="my-3 rounded-full bg-clay px-4 py-2.5 text-center font-mono text-xs uppercase tracking-wider text-paper-raised sm:hidden"
            >
              Open Atlas
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
