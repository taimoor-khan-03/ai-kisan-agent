"use client";

import { useCallback, useState } from "react";

/**
 * Mock PDF export - shows a short delay then confirms download placeholder.
 * Swap implementation for a real PDF kit or server route when backend exists.
 */
export type PDFDownloadButtonProps = {
  /** Accessible label for the button. */
  label?: string;
  className?: string;
};

export function PDFDownloadButton({
  label = "Download advisory PDF (mock)",
  className = "",
}: PDFDownloadButtonProps) {
  const [pending, setPending] = useState(false);

  const onClick = useCallback(() => {
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      // Placeholder only - no file is created in this static demo.
      alert("Mock PDF: connect your report generator or Vercel serverless route.");
    }, 700);
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className={`inline-flex min-h-[3.25rem] items-center justify-center rounded-full border border-earth-300 bg-white px-6 text-sm font-bold text-earth-900 shadow-sm disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {pending ? "Preparing..." : label}
    </button>
  );
}
