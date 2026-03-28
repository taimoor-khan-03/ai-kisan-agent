import type { CropAdvice, WeatherSnapshot } from "@/types";
import cropAdviceSample from "@/data/crop-advice-sample.json";
import weatherSample from "@/data/weather-sample.json";

/**
 * Simulated latency for demo sections that still use static JSON on the client.
 * Disease detection is handled by POST `/api/detect` (see `ImageUpload`).
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Mock weather — replace with OpenWeatherMap using env keys. */
export async function simulateWeather(): Promise<WeatherSnapshot> {
  await delay(400);
  return weatherSample as WeatherSnapshot;
}

/** Mock agronomy tips — optional enrichment via LLM / translation APIs. */
export async function simulateCropAdvice(): Promise<CropAdvice> {
  await delay(350);
  return cropAdviceSample as CropAdvice;
}
