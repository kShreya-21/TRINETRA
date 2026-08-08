# TRINETRA
**Tribal Rights Intelligent Network for Empowerment through Technology, Research & Analysis**
Team Nyxora — SIH25108

## The problem
51 lakh+ Forest Rights Act claims across India sit in fragmented, paper-based
systems. Roughly 49% get approved nationally — with huge variance by state
(Tripura ~65%, Telangana ~29%) — largely driven by poor documentation and no
shared way to track a claim from filing to resolution.

## The solution
TRINETRA is a live demonstration (built on our published research) of:
- **FRA Atlas** — an interactive map of claims by status across MP, Odisha, Telangana, Tripura
- **Digitization** — OCR + NER to turn scanned claim forms into structured records
- **DSS** — a rule engine matching titleholders to eligible government schemes
- **Asset Detection** — satellite-based land-use classification (demo layer)

## The paper
Kesarwani, S., Mishra, S., Sahu, T., Suchitra. "TRINETRA — Tribal Rights
Intelligence Network for Empowerment Through Technology, Research and
Analysis." In *Sustainable Developments in Computer Engineering, Green
Technology and Smart Systems*. CRC Press, 2026.
DOI: [10.1201/9781003743767-47](https://www.taylorfrancis.com/chapters/edit/10.1201/9781003743767-47/trinetra-tribal-rights-intelligence-network-empowerment-technology-research-analysis-shreya-kesarwani-suryansh-mishra-tina-sahu-suchitra)

## Live link
_Added once deployed to Vercel — see below._

## Tech stack
Next.js 14 (App Router) · Tailwind CSS v4 · Supabase (Postgres + PostGIS) ·
Leaflet · Recharts · Tesseract.js · TypeScript

## Running locally
```bash
npm install
cp .env.local.example .env.local   # fill in your Supabase project keys
npm run dev
```

## Roadmap
See [ROADMAP.md](./ROADMAP.md) for the full day-by-day execution plan and
scope boundaries.

## Data
This demo uses a synthetic dataset statistically matched to the figures in
our published research — no real claimant data is used, since that cannot
legally be published on a public link.
