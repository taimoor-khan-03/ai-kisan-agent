import {
  CropAdviceCard,
  Hero,
  ImageUpload,
  OfflineBanner,
  PDFDownloadButton,
  WeatherCard,
} from "@/components";
import cropAdviceSample from "@/data/crop-advice-sample.json";
import weatherSample from "@/data/weather-sample.json";
import type { CropAdvice, WeatherSnapshot } from "@/types";

/**
 * Landing experience: hero, disease scan, weather, agronomy tips, and export placeholder.
 * Data is imported JSON today - swap for live APIs using `.env.local` URLs.
 */
export default function HomePage() {
  const weather = weatherSample as WeatherSnapshot;
  const advice = cropAdviceSample as CropAdvice;

  return (
    <div className="min-h-screen">
      <OfflineBanner className="sticky top-0 z-50" />

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-8 pb-16 sm:px-6 lg:gap-12 lg:py-12">
        <Hero
          title="AI Crop Advisory"
          subtitle="Upload a crop photo, review disease guidance with Urdu support, and plan sprays using medicine-only cost estimates - built for farmers and hackathon judges."
          ctaLabel="Start crop scan"
          ctaHref="#scan"
        />

        <ImageUpload />

        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-leaf-700">Field context</p>
              <h2 className="text-2xl font-bold text-earth-900">Weather & best practices</h2>
              {/* <p className="text-earth-600">.</p> */}
            </div>
            <PDFDownloadButton />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <WeatherCard weather={weather} />
            <CropAdviceCard advice={advice} />
          </div>
        </section>

        <footer className="animate-fade-in rounded-2xl border border-earth-200 bg-white/80 px-4 py-6 text-center text-sm text-earth-600">
          Built by Team @InfinityTK · BS Computational mathematics, University of Karachi · Powered by Next.js, AI & Smart Agriculture Solutions
        </footer>
      </main>
    </div>
  );
}
