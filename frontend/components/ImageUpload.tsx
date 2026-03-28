"use client";

import { useCallback, useEffect, useId, useState } from "react";
import type { DiseasePrediction } from "@/types";
import { simulateDiseasePrediction } from "@/lib/simulate-api";
import { DiseaseResultCard } from "@/components/DiseaseResultCard";

/**
 * Image picker with live preview and a simulated disease prediction call.
 * No files are uploaded to a real backend in this hackathon build.
 */
export type ImageUploadProps = {
  /** Optional className for layout composition. */
  className?: string;
};

export function ImageUpload({ className = "" }: ImageUploadProps) {
  const inputId = useId();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiseasePrediction | null>(null);

  // Revoke object URLs to avoid memory leaks when the file changes.
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
    try {
      const prediction = await simulateDiseasePrediction();
      setResult(prediction);
    } catch {
      setError("Could not complete analysis. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [file]);

  const clear = useCallback(() => {
    setFile(null);
    setResult(null);
    setError(null);
  }, []);

  return (
    <section
      id="scan"
      className={`animate-fade-in-delay space-y-6 rounded-[2rem] border border-leaf-200 bg-white/90 p-6 shadow-card backdrop-blur sm:p-8 ${className}`}
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-leaf-900">Crop photo · disease check</h2>
        <p className="text-earth-700">
          Upload a clear leaf or fruit photo. The demo uses sample JSON — wire your model URL later.
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
              {loading ? "Analyzing…" : "Run AI analysis"}
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
            // Native <img> keeps blob previews simple without remotePatterns in next.config.
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

      {result ? <DiseaseResultCard prediction={result} /> : null}
    </section>
  );
}
