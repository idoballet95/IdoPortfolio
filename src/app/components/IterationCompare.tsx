import type { IterationPair } from "../data/portfolio-evidence";
import { pick } from "../data/portfolio-evidence";
import type { Language } from "../i18n/LanguageContext";

export function IterationCompare({ pair, language }: { pair: IterationPair; language: Language }) {
  return (
    <article className="border-t border-black/20 pt-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <figure>
          <div className="aspect-video overflow-hidden bg-[#dedcca]"><img src={pair.before} alt={pick(pair.beforeAlt, language)} loading="lazy" className="h-full w-full object-cover" /></div>
          <figcaption className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[.13em] text-black/42">{pick(pair.beforeLabel, language)}</figcaption>
        </figure>
        <figure>
          <div className="aspect-video overflow-hidden bg-[#dedcca]"><img src={pair.after} alt={pick(pair.afterAlt, language)} loading="lazy" className="h-full w-full object-cover" /></div>
          <figcaption className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[.13em] text-black/75">{pick(pair.afterLabel, language)}</figcaption>
        </figure>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-[8rem_1fr]">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[.13em] text-black/42">WHY THIS ONE</p>
        <p className="max-w-3xl text-base leading-7 text-black/68">{pick(pair.decision, language)}</p>
      </div>
    </article>
  );
}
