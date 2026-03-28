"use client";

import { useEffect, useState } from "react";

/**
 * Warns when the device is offline and reminds users about PWA install later.
 * Safe for Vercel: no service worker registration in this demo build.
 */
export type OfflineBannerProps = {
  /** Optional className for sticky positioning from the parent layout. */
  className?: string;
};

export function OfflineBanner({ className = "" }: OfflineBannerProps) {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const sync = () => setOffline(typeof navigator !== "undefined" && !navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  if (!offline) return null;

  return (
    <div
      className={`animate-fade-in border-b border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-semibold text-amber-900 ${className}`}
      role="status"
    >
      You are offline. This demo works with cached UI; connect to sync live weather later. PWA install can
      be enabled.
    </div>
  );
}
