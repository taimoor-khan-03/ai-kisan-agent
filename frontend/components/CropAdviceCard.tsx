import type { CropAdvice } from "@/types";

/**
 * Best-practice checklist with parallel Urdu lines for accessibility.
 */
export type CropAdviceCardProps = {
  advice: CropAdvice;
};

export function CropAdviceCard({ advice }: CropAdviceCardProps) {
  return (
    <article className="animate-fade-in space-y-5 rounded-[2rem] border border-leaf-200 bg-white/95 p-6 shadow-card sm:p-8">
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-widest text-leaf-700">Crop advice</p>
        <h3 className="text-2xl font-bold text-earth-900">{advice.title}</h3>
        <p className="text-earth-600">English tips with Urdu translation for field use.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ul className="space-y-3">
          {advice.bestPractices.map((line) => (
            <li
              key={line}
              className="flex gap-3 rounded-2xl bg-leaf-50/90 px-4 py-3 text-earth-800 ring-1 ring-leaf-100"
            >
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-leaf-500" aria-hidden />
              <span className="leading-relaxed">{line}</span>
            </li>
          ))}
        </ul>
        <ul className="space-y-3" dir="rtl">
          {advice.bestPracticesUrdu.map((line) => (
            <li
              key={line}
              className="font-urdu flex gap-3 rounded-2xl bg-earth-50 px-4 py-3 text-earth-900 ring-1 ring-earth-100"
              lang="ur"
            >
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-earth-500" aria-hidden />
              <span className="text-right text-lg leading-relaxed">{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
