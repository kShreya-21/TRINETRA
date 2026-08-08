// Figures sourced directly from the TRINETRA research paper (Team Nyxora).
// Kept as one typed source of truth so landing, dashboard, and DSS pages
// never drift out of sync with the published numbers.

export const NATIONAL_STATS = {
  totalClaimsLakh: 51.23, // ~51.23 lakh claims filed nationally, as of June 1
  titlesDistributedLakh: 25.11,
  approvalRatePct: 49.02,
  asOfDate: "31 May 2025",
};

export type StateStat = {
  state: string;
  metric: string;
  formula: string;
  numerator: number;
  denominator: number;
  resultPct: number;
  note: string;
};

export const STATE_STATS: StateStat[] = [
  {
    state: "Madhya Pradesh",
    metric: "Digitization success",
    formula: "Records digitized / Total claims received",
    numerator: 294877,
    denominator: 627513,
    resultPct: 47.0,
    note: "Largest forest-bearing state — 25% forest cover, 21.1% tribal population",
  },
  {
    state: "Telangana",
    metric: "Conflict rate",
    formula: "Claims rejected / Total claims disposed off",
    numerator: 94426,
    denominator: 325882,
    resultPct: 28.98,
    note: "Semi-arid deciduous forest mixed with e-governance infra (Dharni portal)",
  },
  {
    state: "Tripura",
    metric: "Approval rate",
    formula: "Titles distributed / Total claims disposed off",
    numerator: 128032,
    denominator: 196880,
    resultPct: 65.1,
    note: "60% forest cover, 31% tribal communities — highest approval rate",
  },
  {
    state: "Odisha",
    metric: "Titles distributed",
    formula: "Titles distributed / IFR claims received",
    numerator: 456923,
    denominator: 632326,
    resultPct: 72.3,
    note: "Dense sal forests (e.g. Kandhamal) — rich but slow-moving ecosystem",
  },
];

// Benchmark comparison from the paper: TRINETRA's target system performance
// vs. the existing Chhattisgarh WebGIS FRA platform.
export const BENCHMARK_COMPARISON = [
  { metric: "Digitization success", trinetra: 95, chhattisgarh: 8.5, unit: "%" },
  { metric: "Conflict rate", trinetra: 2, chhattisgarh: 8, unit: "%", lowerIsBetter: true },
  { metric: "Approval rate", trinetra: 93, chhattisgarh: 90, unit: "%" },
  { metric: "Accuracy", trinetra: 96, chhattisgarh: 89, unit: "%" },
];
