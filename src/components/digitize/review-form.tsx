"use client";

import { useState } from "react";
import type { ExtractedFields } from "@/lib/ner";

const FIELD_LABELS: Record<keyof ExtractedFields, string> = {
  fullName: "Full name",
  village: "Village",
  district: "District",
  state: "State",
  category: "Category (ST / OTFD)",
  claimType: "Claim type (IFR / CR / CFR)",
  areaClaimedHectares: "Area claimed (ha)",
  householdSize: "Household size",
};

export function ReviewForm({
  initialFields,
  rawText,
}: {
  initialFields: ExtractedFields;
  rawText: string;
}) {
  const [fields, setFields] = useState(initialFields);
  const [showRaw, setShowRaw] = useState(false);
  const [saved, setSaved] = useState(false);

  const filledCount = Object.values(fields).filter((v) => v.trim()).length;
  const totalFields = Object.keys(fields).length;

  return (
    <div className="rounded-xl border border-line bg-paper-raised p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-clay">
            Step 3
          </p>
          <h2 className="mt-2 font-display text-xl text-ink">
            Review and correct
          </h2>
        </div>
        <span className="rounded-full bg-forest/10 px-3 py-1 font-mono text-xs text-forest">
          {filledCount}/{totalFields} fields extracted
        </span>
      </div>
      <p className="mt-1 text-sm text-ink-soft">
        Auto-extracted fields are editable — a human reviewer confirms every
        record before it's considered digitized.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {(Object.keys(fields) as (keyof ExtractedFields)[]).map((key) => (
          <div key={key}>
            <label className="text-xs uppercase tracking-wider text-ink-soft">
              {FIELD_LABELS[key]}
            </label>
            <input
              type="text"
              value={fields[key]}
              onChange={(e) =>
                setFields((prev) => ({ ...prev, [key]: e.target.value }))
              }
              placeholder="Not detected — enter manually"
              className="mt-1.5 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft/50 focus:border-forest focus:outline-none"
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowRaw((s) => !s)}
        className="mt-5 font-mono text-xs uppercase tracking-wider text-ink-soft underline decoration-line underline-offset-4 hover:text-forest"
      >
        {showRaw ? "Hide" : "Show"} raw OCR text
      </button>
      {showRaw && (
        <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap rounded-lg border border-line bg-paper p-3 font-mono text-xs text-ink-soft">
          {rawText || "(no text detected)"}
        </pre>
      )}

      <div className="mt-6 border-t border-line pt-5">
        {saved ? (
          <p className="text-sm text-approved">
            ✓ Record confirmed and queued for digitization.
          </p>
        ) : (
          <button
            onClick={() => setSaved(true)}
            className="rounded-full bg-forest px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-paper-raised transition-colors hover:bg-forest-deep"
          >
            Confirm record
          </button>
        )}
        <p className="mt-3 text-xs text-ink-soft">
          Demo note: this confirms locally in your browser only. The public
          demo doesn't write new records to the database — the Atlas and
          Dashboard reflect the seeded dataset, not submissions from here.
        </p>
      </div>
    </div>
  );
}
