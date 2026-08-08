"use client";

import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import type { ClaimMapRow } from "@/lib/types";
import { STATUS_COLORS } from "@/lib/types";
import { AssetDetectionLayer } from "@/components/atlas/asset-detection-layer";
import assetData from "@/data/asset-detection-demo.json";

// Rough center of the four-state study area (central-eastern India)
const DEFAULT_CENTER: [number, number] = [21.0, 84.0];
const DEFAULT_ZOOM = 5;

// Bounds of the demo land-use grid (see scripts/generate-asset-layer.js),
// used to fly the map there when the layer is toggled on.
const ASSET_LAYER_BOUNDS: [[number, number], [number, number]] = (() => {
  const bbox = (assetData as { properties: { bbox: { latMin: number; latMax: number; lonMin: number; lonMax: number } } })
    .properties.bbox;
  return [
    [bbox.latMin, bbox.lonMin],
    [bbox.latMax, bbox.lonMax],
  ];
})();

function FlyToAssetLayer({ active }: { active: boolean }) {
  const map = useMap();
  useEffect(() => {
    if (active) {
      map.flyToBounds(ASSET_LAYER_BOUNDS, { padding: [40, 40], duration: 1.2 });
    }
  }, [active, map]);
  return null;
}

export function MapView({
  claims,
  selectedClaimId,
  onSelect,
  showAssetLayer,
}: {
  claims: ClaimMapRow[];
  selectedClaimId: string | null;
  onSelect: (claimId: string) => void;
  showAssetLayer: boolean;
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

      {showAssetLayer && <AssetDetectionLayer />}
      <FlyToAssetLayer active={showAssetLayer} />

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
