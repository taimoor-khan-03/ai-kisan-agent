/**
 * Normalizes Hugging Face / PlantVillage-style class names for display and lookup.
 * Order matters: replace triple underscores first so single-underscore pass does not corrupt `___`.
 */
export function cleanDiseaseLabel(raw: string): string {
  return raw
    .trim()
    .replace(/___/g, " ")
    .replace(/_/g, " ")
    .replace(/,/g, " ")
    .replace(/[()]/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}
