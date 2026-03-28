import { NextResponse } from "next/server";
import cropAdviceSample from "@/data/crop-advice-sample.json";
import weatherSample from "@/data/weather-sample.json";
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

function createSimplePdf(title: string, lines: string[]): ArrayBuffer {
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

  return new TextEncoder().encode(pdf).buffer;
}

function buildReportLines(weather: WeatherSnapshot, advice: CropAdvice): string[] {
  const lines: string[] = [
    "Generated from the live AI Crop Advisory app.",
    `Created: ${new Date().toLocaleString("en-US", { hour12: false })}`,
    "",
    "Weather summary",
    `Location: ${weather.locationLabel}`,
    `Condition: ${weather.condition}`,
    `Temperature: ${weather.temperatureC} C`,
    `Humidity: ${weather.humidityPercent}%`,
    "",
    `Crop advice: ${advice.title}`,
  ];

  for (const item of advice.bestPractices) {
    lines.push(...wrapPdfText(`- ${item}`, 78));
  }

  return lines;
}

export async function GET() {
  try {
    const weather = weatherSample as WeatherSnapshot;
    const advice = cropAdviceSample as CropAdvice;
    const pdf = createSimplePdf("AI Crop Advisory Report", buildReportLines(weather, advice));

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="crop-advisory-report.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[api/report]", error);
    return NextResponse.json(
      { error: "Failed to generate PDF report." },
      { status: 500 },
    );
  }
}
