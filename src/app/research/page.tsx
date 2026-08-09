import Link from "next/link";

const PAPER_URL =
  "https://www.taylorfrancis.com/chapters/edit/10.1201/9781003743767-47/trinetra-tribal-rights-intelligence-network-empowerment-technology-research-analysis-shreya-kesarwani-suryansh-mishra-tina-sahu-suchitra";
const DOI = "10.1201/9781003743767-47";

const AUTHORS = [
  "Shreya Kesarwani",
  "Suryansh Mishra",
  "Tina Sahu",
  "Suchitra",
];

const KEYWORDS = [
  "Forest Rights Act (FRA)",
  "WebGIS",
  "Artificial Intelligence",
  "Remote Sensing",
  "Land-Use Classification",
  "Participatory Governance",
  "Digital Public Infrastructure",
];

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-wider text-clay">
        Published research
      </p>
      <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">
        The paper behind this build
      </h1>
      <p className="mt-4 text-ink-soft">
        Everything on this site — the statistics, the state comparisons,
        the benchmark numbers — is drawn directly from the published
        research this project is based on, not invented for the demo.
      </p>

      {/* Citation card */}
      <div className="mt-10 rounded-xl border border-line bg-paper-raised p-6">
        <h2 className="font-display text-xl text-ink">
          TRINETRA — Tribal Rights Intelligence Network for Empowerment
          Through Technology, Research and Analysis
        </h2>
        <p className="mt-3 text-sm text-ink">
          Shreya Kesarwani
          <span className="text-ink-soft">
            {" "}
            — with Suryansh Mishra, Tina Sahu, Suchitra
          </span>
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          Published in{" "}
          <em className="text-ink">
            Sustainable Developments in Computer Engineering, Green
            Technology and Smart Systems
          </em>{" "}
          — CRC Press, July 2026. Pages 301–307.
        </p>
        <p className="mt-3 font-mono text-xs text-ink-soft">DOI: {DOI}</p>
        <div className="mt-5">
          <Link
            href={PAPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-forest px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-paper-raised transition-colors hover:bg-forest-deep"
          >
            Read on Taylor & Francis ↗
          </Link>
          <p className="mt-3 text-xs text-ink-soft">
            Full text is available via Taylor & Francis under their access
            terms.
          </p>
        </div>
      </div>

      {/* Abstract, paraphrased */}
      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink">What the paper argues</h2>
        <p className="mt-4 text-ink-soft">
          The Forest Rights Act (2006) was meant to formally recognize the
          land rights of tribal and forest-dwelling communities across
          India. In practice, implementation has been held back by a lack
          of reliable geospatial data, slow verification processes, and
          limited transparency in how claims move through the system.
        </p>
        <p className="mt-4 text-ink-soft">
          The paper proposes an AI-driven WebGIS framework — TRINETRA — for
          Madhya Pradesh, Odisha, Telangana, and Tripura, combining
          participatory GIS input, machine-learning-based land-use and
          settlement detection, and satellite remote sensing in a single
          dashboard. Claims, supporting evidence, and verification status
          are shown on an interactive map with role-based access for
          administrators, verifiers, and community stakeholders.
        </p>
        <p className="mt-4 text-ink-soft">
          Based on the study's estimates, a system like this could cut
          claim verification time by roughly 40–60% and improve geospatial
          accuracy compared to today's manual, paper-based workflows —
          while keeping local communities directly involved in the
          process.
        </p>
      </section>

      {/* This build vs the paper */}
      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink">
          What this demo builds vs. what the paper proposes
        </h2>
        <p className="mt-4 text-ink-soft">
          This live site demonstrates the core ideas end-to-end — the
          Atlas, the digitization pipeline, and the scheme-matching engine
          all run against real (synthetic) data. The full framework
          described in the paper — production-grade satellite inference,
          role-based access for administrators and verifiers, and
          live participatory GIS input from community stakeholders — is
          the roadmap this MVP is built toward, not yet fully implemented
          here. Where a module is illustrative rather than fully live
          (like the asset-detection layer on the Atlas), it's labeled as
          such directly in the interface.
        </p>
      </section>

      {/* Keywords */}
      <section className="mt-12 border-t border-line pt-8">
        <p className="text-xs uppercase tracking-wider text-ink-soft">
          Index terms
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {KEYWORDS.map((kw) => (
            <span
              key={kw}
              className="rounded-full border border-line px-3 py-1 text-xs text-ink-soft"
            >
              {kw}
            </span>
          ))}
        </div>
      </section>

      {/* Builder credit */}
      <section className="mt-12 border-t border-line pt-8 pb-8">
        <p className="text-xs uppercase tracking-wider text-ink-soft">
          About this build
        </p>
        <p className="mt-3 text-ink-soft">
          This live implementation was independently designed and built by
          Shreya Kesarwani, based on the published research above.
        </p>
      </section>
    </div>
  );
}
