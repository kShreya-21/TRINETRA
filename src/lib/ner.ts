export interface ExtractedFields {
  fullName: string;
  village: string;
  district: string;
  state: string;
  category: string;
  claimType: string;
  areaClaimedHectares: string;
  householdSize: string;
}

export const EMPTY_FIELDS: ExtractedFields = {
  fullName: "",
  village: "",
  district: "",
  state: "",
  category: "",
  claimType: "",
  areaClaimedHectares: "",
  householdSize: "",
};

function matchLine(text: string, label: RegExp): string {
  const match = text.match(label);
  return match?.[1]?.trim() ?? "";
}

/**
 * Rule-based NER over raw OCR text. Looks for "Label: value" patterns —
 * the same structured layout FRA claim forms actually use. This is
 * intentionally simple and transparent rather than a black-box model,
 * which matters for a system whose whole pitch is auditability.
 */
export function extractFields(rawText: string): ExtractedFields {
  return {
    fullName: matchLine(rawText, /name\s*[:\-]\s*([A-Za-z .]+)/i),
    village: matchLine(rawText, /village\s*[:\-]\s*([A-Za-z .]+)/i),
    district: matchLine(rawText, /district\s*[:\-]\s*([A-Za-z .]+)/i),
    state: matchLine(rawText, /state\s*[:\-]\s*([A-Za-z .]+)/i),
    category: matchLine(rawText, /category\s*[:\-]\s*(ST|OTFD)/i),
    claimType: matchLine(rawText, /claim\s*type\s*[:\-]\s*(IFR|CR|CFR)/i),
    areaClaimedHectares: matchLine(
      rawText,
      /area\s*claimed\s*[:\-]\s*([\d.]+)/i
    ),
    householdSize: matchLine(rawText, /household\s*size\s*[:\-]\s*(\d+)/i),
  };
}
