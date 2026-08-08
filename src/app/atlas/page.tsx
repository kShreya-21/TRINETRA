"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { fetchClaimsForMap } from "@/lib/queries";
import type { ClaimMapRow, ClaimStatus, StateCode } from "@/lib/types";
import { AtlasFilters } from "@/components/atlas/atlas-filters";
import { ClaimDetailPanel } from "@/components/atlas/claim-detail-panel";

// Leaflet touches `window`, so it can only render on the client.
const MapView = dynamic(
  () => import("@/components/atlas/map-view").then((m) => m.MapView),
  { ssr: false }
);

export default function AtlasPage() {
  const [claims, setClaims] = useState<ClaimMapRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedState, setSelectedState] = useState<StateCode | "ALL">(
    "ALL"
  );
  const [activeStatuses, setActiveStatuses] = useState<Set<ClaimStatus>>(
    new Set(["approved", "pending", "rejected"])
  );
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetchClaimsForMap()
      .then(setClaims)
      .catch((err) => {
        console.error(err);
        setError(
          "Couldn't load claims. Make sure schema.sql, seed.sql, and day3_atlas_view.sql have all been run in Supabase, and your .env.local keys are set."
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return claims.filter((c) => {
      if (selectedState !== "ALL" && c.state_code !== selectedState)
        return false;
      if (!activeStatuses.has(c.status)) return false;
      return true;
    });
  }, [claims, selectedState, activeStatuses]);

  const selectedClaim = useMemo(
    () => filtered.find((c) => c.claim_id === selectedClaimId) ?? null,
    [filtered, selectedClaimId]
  );

  const toggleStatus = (status: ClaimStatus) => {
    setActiveStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {error && (
        <div className="mb-4 rounded-lg border border-rejected/30 bg-rejected/5 p-4 text-sm text-rejected">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-xl border border-line lg:grid-cols-[280px_1fr_320px]">
        <div className="border-b border-line lg:border-b-0 lg:border-r">
          <AtlasFilters
            selectedState={selectedState}
            onStateChange={setSelectedState}
            activeStatuses={activeStatuses}
            onToggleStatus={toggleStatus}
            total={claims.length}
            visibleCount={filtered.length}
          />
        </div>

        <div className="relative h-[70vh] min-h-105">
          {loading ? (
            <div className="flex h-full items-center justify-center bg-paper-raised">
              <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
                Loading claims…
              </p>
            </div>
          ) : (
            <MapView
              claims={filtered}
              selectedClaimId={selectedClaimId}
              onSelect={setSelectedClaimId}
            />
          )}
        </div>

        <div className="border-t border-line lg:border-t-0 lg:border-l">
          <ClaimDetailPanel claim={selectedClaim} />
        </div>
      </div>
    </div>
  );
}
