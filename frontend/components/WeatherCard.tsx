import type { WeatherSnapshot } from "@/types";

export type WeatherCardProps = {
  weather: WeatherSnapshot;
};

export function WeatherCard({ weather }: WeatherCardProps) {
  // Pakistan-specific thresholds
  const isHighHumidity = weather.humidityPercent > 70; // Common in Monsoon/Coastal areas
  const isExtremeHeat = weather.temperatureC > 38;    // Heatwave threshold for crops like cotton/wheat

  return (
    <article className="animate-fade-in flex flex-col gap-6 rounded-[2rem] border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-6 shadow-card">

      {/* Top Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-sky-700">
            Regional Crop Risk Assessment
          </p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">
             {weather.locationLabel} Monitoring
          </h3>
          <p className="text-slate-600 capitalize">{weather.condition}</p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:gap-4">
          <div className="rounded-2xl bg-white/90 px-6 py-3 text-center shadow-sm ring-1 ring-sky-100">
            <p className="text-xs font-semibold text-slate-500">Temp</p>
            <p className="text-xl font-extrabold text-sky-800">
              {weather.temperatureC}°C
            </p>
          </div>

          <div className="rounded-2xl bg-white/90 px-6 py-3 text-center shadow-sm ring-1 ring-sky-100">
            <p className="text-xs font-semibold text-slate-500">Humidity</p>
            <p className="text-xl font-extrabold text-sky-800">
              {weather.humidityPercent}%
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="grid gap-4 md:grid-cols-2">

        {/* Local Best Practices */}
        <div className="rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-200">
          <h4 className="text-sm font-bold text-emerald-800 mb-2">
            ✅ Expert Recommendations
          </h4>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li>• Best time for irrigation: <strong>4:00 AM - 7:00 AM</strong></li>
            <li>• Use mulching to retain soil moisture</li>
            <li>• Check for pests after high humidity periods</li>
          </ul>
        </div>

        {/* Localized Warnings */}
        <div
          className={`rounded-2xl p-4 ring-1 ${
            isExtremeHeat || isHighHumidity
              ? "bg-amber-50 ring-amber-200"
              : "bg-blue-50 ring-blue-200"
          }`}
        >
          <h4
            className={`text-sm font-bold mb-2 ${
              isExtremeHeat || isHighHumidity ? "text-amber-800" : "text-blue-800"
            }`}
          >
            ⚠️ Local Alerts
          </h4>

          <p
            className={`text-sm ${
              isExtremeHeat || isHighHumidity ? "text-amber-700" : "text-blue-700"
            }`}
          >
            {isExtremeHeat 
              ? "Extreme Heat Warning: Risk of wilting. Increase water frequency and avoid fertilizers today."
              : isHighHumidity 
                ? "Monsoon-like humidity: High risk of fungal infections (Rust/Blight). Monitor leaves closely."
                : "Weather is optimal for field work and harvesting."}
          </p>
        </div>
      </div>
    </article>
  );
}