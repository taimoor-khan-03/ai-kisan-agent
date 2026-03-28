import type { WeatherSnapshot } from "@/types";

export type WeatherCardProps = {
  weather: WeatherSnapshot;
};

export function WeatherCard({ weather }: WeatherCardProps) {
  const isHighHumidity = weather.humidityPercent > 75;

  return (
    <article className="animate-fade-in flex flex-col gap-6 rounded-[2rem] border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-6 shadow-card">

      {/* Top Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-sky-700">
            Local Environmental Risk
          </p>
          <h3 className="mt-2 text-2xl font-bold text-earth-900">
            Current Conditions in {weather.locationLabel}
          </h3>
          <p className="text-earth-600 capitalize">{weather.condition}</p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:gap-4">
          <div className="rounded-2xl bg-white/90 px-6 py-3 text-center shadow-sm ring-1 ring-sky-100">
            <p className="text-xs font-semibold text-earth-500 text-center">Temp</p>
            <p className="text-xl font-extrabold text-sky-800">
              {weather.temperatureC}°C
            </p>
          </div>

          <div className="rounded-2xl bg-white/90 px-6 py-3 text-center shadow-sm ring-1 ring-sky-100">
            <p className="text-xs font-semibold text-earth-500">Humidity</p>
            <p className="text-xl font-extrabold text-sky-800">
              {weather.humidityPercent}%
            </p>
          </div>
        </div>
      </div>

      {/* 🔥 NEW SECTION: Recommendations */}
      <div className="grid gap-4 md:grid-cols-2">

        {/* Best Practices */}
        <div className="rounded-2xl bg-green-50 p-4 ring-1 ring-green-200">
          <h4 className="text-sm font-bold text-green-800 mb-2">
            ✅ Best Practices
          </h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Water crops early morning</li>
            <li>• Ensure proper field ventilation</li>
            <li>• Monitor leaf conditions regularly</li>
          </ul>
        </div>

        {/* Warning */}
        <div
          className={`rounded-2xl p-4 ring-1 ${
            isHighHumidity
              ? "bg-red-50 ring-red-200"
              : "bg-yellow-50 ring-yellow-200"
          }`}
        >
          <h4
            className={`text-sm font-bold mb-2 ${
              isHighHumidity ? "text-red-800" : "text-yellow-800"
            }`}
          >
            ⚠️ Warning
          </h4>

          <p
            className={`text-sm ${
              isHighHumidity ? "text-red-700" : "text-yellow-700"
            }`}
          >
            {isHighHumidity
              ? "High humidity detected — disease spread risk is high. Avoid spraying during this time."
              : "Weather is stable, but keep monitoring for sudden changes."}
          </p>
        </div>
      </div>
    </article>
  );
}