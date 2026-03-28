import { InferenceClient } from "@huggingface/inference";
import { NextResponse } from "next/server";
import { cleanDiseaseLabel } from "@/lib/clean-disease-label";
import { formatDiseaseTitle } from "@/lib/format-disease-title";
import { findMedicineForCleanedLabel } from "@/seed/medicineSeed";
import type { DiseasePrediction } from "@/types";

/**
 * Serverless route: accepts multipart image, runs HF image classification,
 * maps the cleaned label to `medicineSeed` advisory rows.
 */

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const HF_MODEL =
  "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification" as const;

type ClassificationRow = { label: string; score: number };

export async function POST(request: Request) {
  try {
    const token = (
      process.env.HUGGINGFACE_ACCESS_TOKEN ??
      process.env.HF_TOKEN ??
      process.env.HUGGINGFACE_API_TOKEN ??
      ""
    ).trim();
    if (!token) {
      return NextResponse.json(
        {
          error:
            "Server misconfiguration: set HUGGINGFACE_ACCESS_TOKEN (or HF_TOKEN) in .env.local — never commit secrets.",
        },
        { status: 500 },
      );
    }

    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Content-Type must be multipart/form-data with field image." },
        { status: 400 },
      );
    }

    const formData = await request.formData();
    const entry = formData.get("image");

    if (!entry || typeof entry === "string") {
      return NextResponse.json(
        { error: 'Missing file: use form field name "image".' },
        { status: 400 },
      );
    }

    const arrayBuffer = await entry.arrayBuffer();
    if (arrayBuffer.byteLength === 0) {
      return NextResponse.json({ error: "Empty upload." }, { status: 400 });
    }
    if (arrayBuffer.byteLength > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "Image too large (max 8 MB)." }, { status: 400 });
    }

    /**
     * HF Inference Router rejects raw bytes without a media type ("No content type provided...").
     * The SDK omits `Content-Type` for binary bodies; `fetch` then sets it from `Blob.type`.
     * Avoid Node `Buffer` as `data` (SDK error logging bug with Buffer — use Blob/ArrayBuffer only).
     */
    const mimeFromFile =
      "type" in entry && typeof entry.type === "string" && entry.type.length > 0
        ? entry.type
        : "image/jpeg";
    const imageBody = new Blob([arrayBuffer], { type: mimeFromFile });

    const client = new InferenceClient(token);
    const predictions = await client.imageClassification({
      model: HF_MODEL,
      data: imageBody,
    });

    const rows = predictions as ClassificationRow[];
    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { error: "Model returned no classes." },
        { status: 502 },
      );
    }

    const sorted = [...rows].sort((a, b) => b.score - a.score);
    const top = sorted[0];
    const rawLabel = top.label;
    const cleaned = cleanDiseaseLabel(rawLabel);
    const medicine = findMedicineForCleanedLabel(cleaned);

    const prediction: DiseasePrediction = {
      diseaseName: formatDiseaseTitle(cleaned),
      confidence: Math.min(1, Math.max(0, top.score)),
      treatmentInstructions: [
        `Recommended product: ${medicine.medicine}.`,
        `Dosage / timing: ${medicine.dosage}.`,
        "Follow label rates, safety gear, and pre-harvest interval (PHI).",
      ].join(" "),
      spraySuggestion: medicine.medicine,
      estimatedMedicineCostPkr: medicine.estimatedCostPKR,
      treatmentUrdu: medicine.urdu,
    };

    return NextResponse.json({
      ...prediction,
      rawLabel,
      cleanedLabel: cleaned,
      matchedSeedDisease: medicine.disease,
      topCandidates: sorted.slice(0, 5).map((r) => ({
        label: r.label,
        score: r.score,
        cleaned: cleanDiseaseLabel(r.label),
      })),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[api/detect]", err);
    return NextResponse.json(
      { error: "Detection failed.", detail: message },
      { status: 502 },
    );
  }
}
