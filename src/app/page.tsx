import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="font-mono text-xs uppercase tracking-wider text-clay">
        Team Nyxora — SIH25108
      </p>
      <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] text-ink md:text-6xl">
        51 lakh forest rights claims. Scattered across four states, paper
        files, and no shared map.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-ink-soft">
        TRINETRA is a live system for mapping, digitizing, and resolving
        Forest Rights Act claims across Madhya Pradesh, Odisha, Telangana,
        and Tripura — built on the findings of our published research.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/atlas"
          className="rounded-full bg-forest px-6 py-3 font-mono text-xs uppercase tracking-wider text-paper-raised transition-colors hover:bg-forest-deep"
        >
          Open the Atlas
        </Link>
        <Link
          href="/research"
          className="rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-forest hover:text-forest"
        >
          Read the research
        </Link>
      </div>
      <p className="mt-16 max-w-2xl border-l-2 border-clay pl-4 text-sm text-ink-soft">
        Day 0 scaffold — the full problem framing, live statistics, and
        interactive map arrive over the next build days. This page updates
        daily; track progress on GitHub.
      </p>
    </div>
  );
}
