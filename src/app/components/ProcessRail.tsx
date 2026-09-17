import type { ProcessAsset } from "../data/portfolio-evidence";
import { pick } from "../data/portfolio-evidence";
import type { Language } from "../i18n/LanguageContext";

export function ProcessRail({ assets, language }: { assets: ProcessAsset[]; language: Language }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {assets.map((asset, index) => (
        <figure key={`${asset.src}-${index}`} className="border-t border-black/20 pt-3">
          <div className="aspect-[4/3] overflow-hidden bg-[#dedcca]">
            {asset.kind === "video" ? (
              <video src={asset.src} controls muted playsInline preload="metadata" aria-label={pick(asset.alt, language)} className="h-full w-full object-cover" />
            ) : (
              <img src={asset.src} alt={pick(asset.alt, language)} loading="lazy" className="h-full w-full object-cover" />
            )}
          </div>
          <figcaption className="pt-4">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.13em] text-black/45">{pick(asset.label, language)}</p>
            <p className="mt-2 text-sm leading-6 text-black/62">{pick(asset.note, language)}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
