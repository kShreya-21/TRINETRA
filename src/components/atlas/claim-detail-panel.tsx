import type { ClaimMapRow } from "@/lib/types";
import { CLAIM_TYPE_LABELS, STATUS_LABELS } from "@/lib/types";

const STATUS_BADGE_CLASSES: Record<ClaimMapRow["status"], string> = {
  approved: "bg-approved/15 text-approved",
  pending: "bg-pending/15 text-pending",
  rejected: "bg-rejected/15 text-rejected",
};

export function ClaimDetailPanel({ claim }: { claim: ClaimMapRow | null }) {
  if (!claim) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-6 text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
          No claim selected
        </p>
        <p className="mt-2 max-w-xs text-sm text-ink-soft">
          Click any point on the map to see the claimant, land details, and
          current status.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <span
        className={`inline-block rounded-full px-3 py-1 font-mono text-xs uppercase tracking-wider ${STATUS_BADGE_CLASSES[claim.status]}`}
      >
        {STATUS_LABELS[claim.status]}
      </span>
      <h3 className="mt-3 font-display text-2xl text-ink">
        {claim.full_name}
      </h3>
      <p className="mt-1 text-sm text-ink-soft">
        {claim.village}, {claim.district} — {claim.state_name}
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-line pt-6">
        <div>
          <dt className="text-xs uppercase tracking-wider text-ink-soft">
            Claim type
          </dt>
          <dd className="mt-1 text-sm text-ink">
            {CLAIM_TYPE_LABELS[claim.claim_type]}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-ink-soft">
            Area claimed
          </dt>
          <dd className="mt-1 font-mono text-sm text-ink">
            {claim.area_claimed_hectares} ha
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-ink-soft">
            Category
          </dt>
          <dd className="mt-1 text-sm text-ink">
            {claim.category === "ST"
              ? "Scheduled Tribe"
              : "Other Traditional Forest Dweller"}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-ink-soft">
            Household size
          </dt>
          <dd className="mt-1 text-sm text-ink">{claim.household_size}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-ink-soft">
            Submitted
          </dt>
          <dd className="mt-1 font-mono text-sm text-ink">
            {claim.submitted_on}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-ink-soft">
            Decided
          </dt>
          <dd className="mt-1 font-mono text-sm text-ink">
            {claim.decided_on ?? "—"}
          </dd>
        </div>
      </dl>

      {claim.rejection_reason && (
        <div className="mt-6 rounded-lg border border-rejected/30 bg-rejected/5 p-4">
          <p className="text-xs uppercase tracking-wider text-rejected">
            Rejection reason
          </p>
          <p className="mt-1 text-sm text-ink">{claim.rejection_reason}</p>
        </div>
      )}

      <div className="mt-6 flex items-center gap-2 border-t border-line pt-4">
        <span
          className={`h-2 w-2 rounded-full ${claim.digitized ? "bg-approved" : "bg-line"}`}
        />
        <span className="text-xs text-ink-soft">
          {claim.digitized
            ? "Record digitized"
            : "Not yet digitized"}
        </span>
      </div>
    </div>
  );
}
