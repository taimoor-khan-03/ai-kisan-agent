"use client";

import { useCallback, useEffect, useId, useState } from "react";
import type { DetectApiResponse, DiseasePrediction } from "@/types";
import { DiseaseResultCard } from "@/components/DiseaseResultCard";

/**
 * Sends the selected image to `/api/detect` as multipart form-data (field name `image`).
 */
export type ImageUploadProps = {
  className?: string;
};

export function ImageUpload({ className = "" }: ImageUploadProps) {
  const inputId = useId();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiseasePrediction | null>(null);
  const [debug, setDebug] = useState<Pick<
    DetectApiResponse,
    "rawLabel" | "cleanedLabel" | "matchedSeedDisease"
  > | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setResult(null);
    setDebug(null);
    const next = event.target.files?.[0];

    if (!next) {
      setFile(null);
      return;
    }

    if (!next.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG, or WebP).");
      setFile(null);
      return;
    }

    if (next.size > 6 * 1024 * 1024) {
      setError("Image is too large. Please pick a file under 6 MB.");
      setFile(null);
      return;
    }

    setFile(next);
  }, []);

  const runAnalysis = useCallback(async () => {
    if (!file) {
      setError("Select a crop photo first.");
      return;
    }

    setLoading(true);
    setError(null);
    setDebug(null);

    try {
      const body = new FormData();
      body.append("image", file);

      const res = await fetch("/api/detect", {
        method: "POST",
        body,
      });

      const data = (await res.json()) as DetectApiResponse & {
        error?: string;
        detail?: string;
      };

      if (!res.ok) {
        const msg = [data.error, data.detail].filter(Boolean).join(" - ");
        throw new Error(msg || `Request failed (${res.status})`);
      }

      setResult({
        diseaseName: data.diseaseName,
        confidence: data.confidence,
        treatmentInstructions: data.treatmentInstructions,
        spraySuggestion: data.spraySuggestion,
        estimatedMedicineCostPkr: data.estimatedMedicineCostPkr,
        treatmentUrdu: data.treatmentUrdu,
      });
      setDebug({
        rawLabel: data.rawLabel,
        cleanedLabel: data.cleanedLabel,
        matchedSeedDisease: data.matchedSeedDisease,
      });
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : "Could not complete analysis.");
    } finally {
      setLoading(false);
    }
  }, [file]);

  const clear = useCallback(() => {
    setFile(null);
    setResult(null);
    setError(null);
    setDebug(null);
  }, []);

  return (
    <section
      id="scan"
      className={`animate-fade-in-delay space-y-6 rounded-[2rem] border border-leaf-200 bg-white/90 p-6 shadow-card backdrop-blur sm:p-8 ${className}`}
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-leaf-900">Crop photo · disease check</h2>
        <p className="text-earth-700">
          Upload a clear leaf or fruit photo. The server calls Hugging Face inference and maps
          results to local medicine guidance.
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex w-full flex-col gap-4 lg:max-w-md">
          <label
            htmlFor={inputId}
            className="flex min-h-[3.5rem] cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-leaf-300 bg-leaf-50/80 px-4 text-center text-sm font-semibold text-leaf-800 transition hover:border-leaf-500 hover:bg-leaf-100"
          >
            Tap to choose an image
          </label>
          <input
            id={inputId}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onFileChange}
          />

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={runAnalysis}
              disabled={loading || !file}
              className="inline-flex min-h-[3.5rem] flex-1 items-center justify-center rounded-full bg-gradient-to-r from-leaf-600 to-leaf-800 px-6 text-base font-bold text-white shadow-lift disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Run AI analysis"}
            </button>
            <button
              type="button"
              onClick={clear}
              className="inline-flex min-h-[3.5rem] items-center justify-center rounded-full border border-earth-300 bg-white px-6 text-base font-bold text-earth-800 shadow-sm"
            >
              Clear
            </button>
          </div>

          {error ? (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <div className="relative flex min-h-[220px] w-full flex-1 items-center justify-center overflow-hidden rounded-2xl border border-earth-200 bg-earth-50">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Selected crop preview"
              className="max-h-[320px] w-full object-contain p-3"
            />
          ) : (
            <p className="px-4 text-center text-sm text-earth-600">
              Preview appears here after you select an image.
            </p>
          )}
        </div>
      </div>

      {debug ? (
        <p className="rounded-xl bg-earth-100/80 px-4 py-3 text-xs text-earth-700">
          <span className="font-semibold">Model label:</span> {debug.rawLabel}
          <br />
          <span className="font-semibold">Cleaned:</span> {debug.cleanedLabel}
          <br />
          <span className="font-semibold">Seed match:</span> {debug.matchedSeedDisease}
        </p>
      ) : null}

      {result ? <DiseaseResultCard prediction={result} /> : null}
    </section>
  );
}
