import type { WeatherSnapshot } from "@/types";

/**
 * Compact weather snapshot for irrigation and spray-window context.
 */
export type WeatherCardProps = {
  weather: WeatherSnapshot;
};

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <article className="animate-fade-in flex flex-col gap-4 rounded-[2rem] border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-sky-700">Weather (sample)</p>
        <h3 className="mt-2 text-2xl font-bold text-earth-900">{weather.locationLabel}</h3>
        <p className="text-earth-600">{weather.condition}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="rounded-2xl bg-white/90 px-4 py-3 text-center shadow-sm ring-1 ring-sky-100">
          <p className="text-xs font-semibold text-earth-500">Temp</p>
          <p className="text-2xl font-extrabold text-sky-800">{weather.temperatureC}°C</p>
        </div>
        <div className="rounded-2xl bg-white/90 px-4 py-3 text-center shadow-sm ring-1 ring-sky-100">
          <p className="text-xs font-semibold text-earth-500">Humidity</p>
          <p className="text-2xl font-extrabold text-sky-800">{weather.humidityPercent}%</p>
        </div>
      </div>
    </article>
  );
}