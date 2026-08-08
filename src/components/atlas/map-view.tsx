"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import type { ClaimMapRow } from "@/lib/types";
import { STATUS_COLORS } from "@/lib/types";

// Rough center of the four-state study area (central-eastern India)
const DEFAULT_CENTER: [number, number] = [21.0, 84.0];
const DEFAULT_ZOOM = 5;

export function MapView({
  claims,
  selectedClaimId,
  onSelect,
}: {
  claims: ClaimMapRow[];
  selectedClaimId: string | null;
  onSelect: (claimId: string) => void;
}) {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {claims.map((claim) => {
        const isSelected = claim.claim_id === selectedClaimId;
        return (
          <CircleMarker
            key={claim.claim_id}
            center={[claim.lat, claim.lng]}
            radius={isSelected ? 9 : 6}
            pathOptions={{
              color: isSelected ? "#1b2420" : STATUS_COLORS[claim.status],
              weight: isSelected ? 2 : 1,
              fillColor: STATUS_COLORS[claim.status],
              fillOpacity: 0.85,
            }}
            eventHandlers={{
              click: () => onSelect(claim.claim_id),
            }}
          >
            <Tooltip direction="top" offset={[0, -6]} opacity={1}>
              <span className="font-sans text-xs">
                {claim.village}, {claim.district} — {claim.status}
              </span>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
