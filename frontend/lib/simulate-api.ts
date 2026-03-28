import type { CropAdvice, DiseasePrediction, WeatherSnapshot } from "@/types";
import cropAdviceSample from "@/data/crop-advice-sample.json";
import diseaseSample from "@/data/disease-sample.json";
import weatherSample from "@/data/weather-sample.json";

/**
 * Simulated network latency so the UI feels like a real inference round-trip.
 * Swap these functions for real fetch() calls using env URLs from `.env.local`.
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Mock disease detection — in production, POST the image to `DISEASE_DETECTION_API_URL`. */
export async function simulateDiseasePrediction(): Promise<DiseasePrediction> {
  await delay(1100);
  return diseaseSample as DiseasePrediction;
}

/** Mock weather — in production, call OpenWeatherMap with `OPENWEATHERMAP_API_KEY`. */
export async function simulateWeather(): Promise<WeatherSnapshot> {
  await delay(400);
  return weatherSample as WeatherSnapshot;
}

/** Mock agronomy tips — in production, optionally enrich via HuggingFace / Urdu API. */
export async function simulateCropAdvice(): Promise<CropAdvice> {
  await delay(350);
  return cropAdviceSample as CropAdvice;
}
