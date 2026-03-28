"use client";

import type { DiseasePrediction } from "@/types";

export type DiseaseResultCardProps = {
  prediction: DiseasePrediction;
};

function formatPercent(confidence: number): string {
  const pct = Math.round(Math.min(1, Math.max(0, confidence)) * 1000) / 10;
  return `${pct}%`;
}

export function DiseaseResultCard({ prediction }: DiseaseResultCardProps) {
  function speakText(text: string, lang: string = "en-US") {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => v.lang.startsWith(lang.split("-")[0]));

    if (voice) {
      utterance.voice = voice;
    }

    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeech() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
  }

  return (
    <article className="animate-fade-in space-y-4 rounded-2xl border border-leaf-200 bg-gradient-to-br from-white to-leaf-50 p-5 shadow-inner sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-leaf-900">Diagnostic Report</h3>
          <p className="text-sm text-earth-600">
            Medicine-focused guidance (no crop market prices)
          </p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full bg-leaf-600 px-4 py-2 text-sm font-bold text-white">
          Match Probability {formatPercent(prediction.confidence)}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-white/90 p-4 shadow-sm ring-1 ring-earth-100">
          <p className="text-xs font-bold uppercase tracking-wide text-earth-500">
            Disease
          </p>
          <p className="mt-1 text-lg font-semibold text-earth-900">
            {prediction.diseaseName}
          </p>
        </div>

        <div className="rounded-xl bg-white/90 p-4 shadow-sm ring-1 ring-earth-100">
          <p className="text-xs font-bold uppercase tracking-wide text-earth-500">
            Est. medicine cost
          </p>
          <p className="mt-1 text-lg font-semibold text-earth-900">
            PKR {prediction.estimatedMedicineCostPkr.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-earth-600">
            Sprays / fungicides only (demo estimate)
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-white/90 p-4 shadow-sm ring-1 ring-earth-100">
        <p className="text-xs font-bold uppercase tracking-wide text-earth-500">
          Treatment instructions
        </p>

        <p className="mt-2 leading-relaxed text-earth-800">
          {prediction.treatmentInstructions}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => speakText(prediction.treatmentInstructions, "en-US")}
            className="rounded-lg bg-leaf-600 px-4 py-2 text-sm text-white hover:bg-leaf-700"
          >
            Listen
          </button>

          <button
            type="button"
            onClick={stopSpeech}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
          >
            Stop
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-leaf-100/80 p-4 ring-1 ring-leaf-200">
        <p className="text-xs font-bold uppercase tracking-wide text-leaf-800">
          Spray suggestion
        </p>
        <p className="mt-2 font-semibold text-leaf-950">
          {prediction.spraySuggestion}
        </p>
      </div>

      <div className="rounded-xl border border-earth-200 bg-earth-50/90 p-4" dir="rtl">
        <p
          className="text-left text-xs font-bold uppercase tracking-wide text-earth-600"
          dir="ltr"
        >
          Treatment (Urdu)
        </p>

        <p
          className="mt-2 font-urdu text-right text-lg leading-relaxed text-earth-900"
          lang="ur"
        >
          {prediction.treatmentUrdu}
        </p>

        <div className="mt-3 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={() => speakText(prediction.treatmentUrdu, "ur")}
            className="rounded-lg bg-earth-700 px-4 py-2 text-sm text-white hover:bg-earth-800"
          >
            Speak Urdu
          </button>

          <button
            type="button"
            onClick={stopSpeech}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
          >
            Stop
          </button>
        </div>
      </div>
    </article>
  );
}
