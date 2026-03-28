"use client";

import { useCallback, useState } from "react";
import type { CropAdvice, WeatherSnapshot } from "@/types";

/**
 * PDF export button for Vercel deployments.
 * Downloads from a serverless route so the browser receives a real PDF response.
 */
export type PDFDownloadButtonProps = {
  label?: string;
  className?: string;
  fileName?: string;
};

export function PDFDownloadButton({
  label = "Download advisory PDF",
  className = "",
  fileName = "crop-advisory-report.pdf",
}: PDFDownloadButtonProps) {
  const [pending, setPending] = useState(false);

  const onClick = useCallback(async () => {
    setPending(true);

    try {
      const response = await fetch("/api/report", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`PDF download failed (${response.status})`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");

      anchor.href = url;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("[pdf-download]", error);
      alert("Could not generate the PDF on the server. Please try again.");
    } finally {
      setPending(false);
    }
  }, [fileName]);

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
