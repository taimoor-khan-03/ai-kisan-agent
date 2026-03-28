/**
 * Turns a cleaned lowercase disease string into readable title case for the UI.
 */
export function formatDiseaseTitle(cleanedLowercase: string): string {
  return cleanedLowercase.replace(/\b\w/g, (ch) => ch.toUpperCase());
}
