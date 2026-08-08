import { supabase } from "@/lib/supabase";
import type { ClaimMapRow } from "@/lib/types";
import type { SchemeRow } from "@/lib/dss";

/**
 * Fetches every claim with its joined claimant/state info and parcel
 * centroid, via the `claims_map` view (see supabase/day3_atlas_view.sql).
 * The dataset is small (~430 rows) so we fetch it all client-side and
 * filter in the browser rather than paginating.
 */
export async function fetchClaimsForMap(): Promise<ClaimMapRow[]> {
  const { data, error } = await supabase
    .from("claims_map")
    .select("*")
    .order("submitted_on", { ascending: false });

  if (error) throw error;
  return (data ?? []) as ClaimMapRow[];
}

/** Fetches the government scheme reference data used by the DSS. */
export async function fetchSchemes(): Promise<SchemeRow[]> {
  const { data, error } = await supabase
    .from("schemes")
    .select("code, name, description, eligibility_json");

  if (error) throw error;
  return (data ?? []) as SchemeRow[];
}
