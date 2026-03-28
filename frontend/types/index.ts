/**
 * Shared TypeScript contracts for the AI Crop Advisory UI.
 * All components import from here to keep props and mock data aligned.
 */

/** Simulated disease detection API payload (medicine cost only — no crop market prices). */
export type DiseasePrediction = {
  diseaseName: string;
  /** Model confidence as a fraction 0–1; UI shows as percent. */
  confidence: number;
  treatmentInstructions: string;
  spraySuggestion: string;
  /** Estimated cost for medicines/sprays only (PKR for demo). */
  estimatedMedicineCostPkr: number;
  treatmentUrdu: string;
};

/** Sample weather payload (replace with OpenWeatherMap when wired). */
export type WeatherSnapshot = {
  temperatureC: number;
  humidityPercent: number;
  condition: string;
  locationLabel: string;
};

/** Crop best-practices card with bilingual copy. */
export type CropAdvice = {
  title: string;
  bestPractices: string[];
  bestPracticesUrdu: string[];
};

/** Successful JSON body from POST `/api/detect` (extends UI model with debug fields). */
export type DetectApiResponse = DiseasePrediction & {
  rawLabel: string;
  cleanedLabel: string;
  matchedSeedDisease: string;
  topCandidates: Array<{ label: string; score: number; cleaned: string }>;
};
