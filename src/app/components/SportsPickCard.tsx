import { motion } from "motion/react";
import { BookOpen, ShoppingBag } from "lucide-react";
import { SportsPick } from "../data/sports-picks";
import { Language } from "../i18n/LanguageContext";

export const categoryLabels = {
  en: { "풋살": "Futsal", "러닝": "Running", "회복": "Recovery", "라이프": "Lifestyle" },
  ko: { "풋살": "풋살", "러닝": "러닝", "회복": "회복", "라이프": "라이프" },
} as const;

const disclosureLabels = {
  en: { sponsored: "Gifted", affiliate: "Affiliate", purchased: "Purchased", unknown: "Review" },
  ko: { sponsored: "제품 제공", affiliate: "제휴 링크", purchased: "내돈내산", unknown: "사용 후기" },
} as const;

export function SportsPickCard({ pick, language, index = 0 }: { pick: SportsPick; language: Language; index?: number }) {
  return (
    <motion.article layout initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .4, delay: index * .04 }} className="flex h-full flex-col rounded-[1.5rem] bg-white p-4 sm:p-5">
      <a href={pick.reviewUrl} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-xl bg-[#efefeb]">
        {pick.coverImage ? <img src={pick.coverImage} alt={`${pick.productName} review cover`} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" /> : <div className="grid aspect-[4/3] place-items-center bg-[#F5F5DC]"><span className="font-mono text-xs font-bold tracking-[.15em] text-black/35">i.do.picks</span></div>}
      </a>
      <div className="flex flex-1 flex-col pt-5">
        <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.12em] text-black/45"><span>{categoryLabels[language][pick.category]}</span><span>·</span><span>{disclosureLabels[language][pick.disclosure]}</span><span className="ml-auto">{pick.publishedAt}</span></div>
        <h3 className="text-2xl font-extrabold leading-tight tracking-[-.04em]">{pick.productName}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/55">{pick.summary}</p>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
          <a href={pick.reviewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-bold text-white transition-transform active:scale-[.98]"><BookOpen className="h-4 w-4" /> {language === "en" ? "Read review" : "후기 보기"}</a>
          {pick.productUrl ? <a href={pick.productUrl} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/15 px-4 py-3 text-sm font-bold transition-colors hover:border-black hover:bg-black hover:text-white"><ShoppingBag className="h-4 w-4" /> {language === "en" ? "View product" : "제품만 보기"}</a> : <span aria-disabled="true" className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-black/10 px-4 py-3 text-center text-xs font-bold text-black/30"><ShoppingBag className="h-4 w-4" /> {language === "en" ? "Link pending" : "링크 준비 중"}</span>}
        </div>
      </div>
    </motion.article>
  );
}
