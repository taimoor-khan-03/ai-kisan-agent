import Link from "next/link";

/**
 * Hero: high-impact title, short pitch, and a primary CTA for hackathon demos.
 */
export type HeroProps = {
  /** Main heading shown above the fold. */
  title: string;
  /** Supporting line explaining value for farmers / judges. */
  subtitle: string;
  /** Visible label for the primary button. */
  ctaLabel: string;
  /** In-page anchor (e.g. #scan) for smooth scroll on mobile. */
  ctaHref: string;
  /** Optional badge for live demo / hackathon context. */
  badge?: string;
};

export function Hero({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  badge = "Hackathon build · Mock APIs",
}: HeroProps) {
  return (
    <header className="animate-fade-in relative overflow-hidden rounded-[2rem] border border-leaf-200 bg-gradient-to-br from-white/95 to-leaf-50 p-6 shadow-card sm:p-10">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-leaf-300/30 blur-3xl"
        aria-hidden
      />
      <div className="relative flex flex-col gap-5">
        {badge ? (
          <span className="inline-flex w-fit items-center rounded-full bg-leaf-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-leaf-800">
            {badge}
          </span>
        ) : null}
        <div className="space-y-3">
          <h1 className="text-balance text-3xl font-extrabold leading-tight text-leaf-900 sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-lg text-earth-700 sm:text-xl">{subtitle}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={ctaHref}
            className="inline-flex min-h-[3.5rem] items-center justify-center rounded-full bg-gradient-to-r from-leaf-600 to-leaf-800 px-8 text-base font-bold text-white shadow-lift"
          >
            {ctaLabel}
          </Link>
          <p className="text-sm text-earth-600">
            Mobile-first · Urdu support · Medicine cost focus (no crop market prices)
          </p>
        </div>
      </div>
    </header>
  );
}
