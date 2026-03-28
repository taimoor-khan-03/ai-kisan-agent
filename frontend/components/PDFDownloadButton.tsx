"use client";

import { useCallback, useState } from "react";
import type { CropAdvice, WeatherSnapshot } from "@/types";

function sanitizePdfText(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function wrapPdfText(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) {
      current = next;
      continue;
    }

    if (current) {
      lines.push(current);
    }
    current = word;
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function createSimplePdf(title: string, lines: string[]): Blob {
  const contentLines: string[] = ["BT", "/F1 20 Tf", `1 0 0 1 50 790 Tm (${sanitizePdfText(title)}) Tj`];

  let y = 760;
  for (const line of lines) {
    contentLines.push("/F1 11 Tf");
    contentLines.push(`1 0 0 1 50 ${y} Tm (${sanitizePdfText(line)}) Tj`);
    y -= 16;
  }

  contentLines.push("ET");
  const stream = `${contentLines.join("\n")}\n`;

  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>\nendobj",
    `4 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}endstream\nendobj`,
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [0];

  for (const object of objects) {
    offsets.push(pdf.length);
    pdf += `${object}\n`;
  }

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";

  for (let i = 1; i < offsets.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

function buildReportLines(weather?: WeatherSnapshot, advice?: CropAdvice): string[] {
  const lines: string[] = [
    "Generated from the live AI Crop Advisory app.",
    `Created: ${new Date().toLocaleString()}`,
    "",
  ];

  if (weather) {
    lines.push("Weather summary");
    lines.push(`Location: ${weather.locationLabel}`);
    lines.push(`Condition: ${weather.condition}`);
    lines.push(`Temperature: ${weather.temperatureC} C`);
    lines.push(`Humidity: ${weather.humidityPercent}%`);
    lines.push("");
  }

  if (advice) {
    lines.push(`Crop advice: ${advice.title}`);
    for (const item of advice.bestPractices) {
      lines.push(...wrapPdfText(`- ${item}`, 78));
    }
  }

  return lines;
}

/**
 * Client-side PDF export for Vercel deployments.
 * Generates a lightweight PDF in the browser, so no server route is required.
 */
export type PDFDownloadButtonProps = {
  label?: string;
  className?: string;
  weather?: WeatherSnapshot;
  advice?: CropAdvice;
  fileName?: string;
};

export function PDFDownloadButton({
  label = "Download advisory PDF",
  className = "",
  weather,
  advice,
  fileName = "crop-advisory-report.pdf",
}: PDFDownloadButtonProps) {
  const [pending, setPending] = useState(false);

  const onClick = useCallback(() => {
    setPending(true);

    try {
      const lines = buildReportLines(weather, advice);
      const blob = createSimplePdf("AI Crop Advisory Report", lines);
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");

      anchor.href = url;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);
    } finally {
      setPending(false);
    }
  }, [advice, fileName, weather]);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className={`inline-flex min-h-[3.25rem] items-center justify-center rounded-full border border-earth-300 bg-white px-6 text-sm font-bold text-earth-900 shadow-sm disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {pending ? "Preparing PDF..." : label}
    </button>
  );
}
