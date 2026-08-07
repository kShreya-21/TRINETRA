import Link from "next/link";

const NAV_LINKS = [
  { href: "/atlas", label: "Atlas" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/digitize", label: "Digitize" },
  { href: "/dss", label: "Schemes" },
  { href: "/research", label: "Research" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
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
        <Link
          href="/atlas"
          className="rounded-full bg-clay px-4 py-2 font-mono text-xs uppercase tracking-wider text-paper-raised transition-colors hover:bg-clay-deep"
        >
          Open Atlas
        </Link>
      </div>
    </header>
  );
}
