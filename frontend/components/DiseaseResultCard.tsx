import type { DiseasePrediction } from "@/types";

/**
 * Presents model output with bilingual treatment notes and medicine-only pricing.
 */
export type DiseaseResultCardProps = {
  prediction: DiseasePrediction;
};

function formatPercent(confidence: number): string {
  const pct = Math.round(Math.min(1, Math.max(0, confidence)) * 1000) / 10;
  return `${pct}%`;
}

export function DiseaseResultCard({ prediction }: DiseaseResultCardProps) {
  return (
    <article className="animate-fade-in space-y-4 rounded-2xl border border-leaf-200 bg-gradient-to-br from-white to-leaf-50 p-5 shadow-inner sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-leaf-900">Prediction</h3>
          <p className="text-sm text-earth-600">Medicine-focused guidance (no crop market prices)</p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full bg-leaf-600 px-4 py-2 text-sm font-bold text-white">
          Confidence {formatPercent(prediction.confidence)}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-white/90 p-4 shadow-sm ring-1 ring-earth-100">
          <p className="text-xs font-bold uppercase tracking-wide text-earth-500">Disease</p>
          <p className="mt-1 text-lg font-semibold text-earth-900">{prediction.diseaseName}</p>
        </div>
        <div className="rounded-xl bg-white/90 p-4 shadow-sm ring-1 ring-earth-100">
          <p className="text-xs font-bold uppercase tracking-wide text-earth-500">
            Est. medicine cost
          </p>
          <p className="mt-1 text-lg font-semibold text-earth-900">
            PKR {prediction.estimatedMedicineCostPkr.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-earth-600">Sprays / fungicides only (demo estimate)</p>
        </div>
      </div>

      <div className="rounded-xl bg-white/90 p-4 shadow-sm ring-1 ring-earth-100">
        <p className="text-xs font-bold uppercase tracking-wide text-earth-500">Treatment instructions</p>
        <p className="mt-2 text-earth-800 leading-relaxed">{prediction.treatmentInstructions}</p>
      </div>

      <div className="rounded-xl bg-leaf-100/80 p-4 ring-1 ring-leaf-200">
        <p className="text-xs font-bold uppercase tracking-wide text-leaf-800">Spray suggestion</p>
        <p className="mt-2 font-semibold text-leaf-950">{prediction.spraySuggestion}</p>
      </div>

      <div className="rounded-xl border border-earth-200 bg-earth-50/90 p-4" dir="rtl">
        <p className="text-left text-xs font-bold uppercase tracking-wide text-earth-600" dir="ltr">
          Treatment (Urdu)
        </p>
        <p
          className="font-urdu mt-2 text-right text-lg leading-relaxed text-earth-900"
          lang="ur"
        >
          {prediction.treatmentUrdu}
        </p>
      </div>
    </article>
  );
}
