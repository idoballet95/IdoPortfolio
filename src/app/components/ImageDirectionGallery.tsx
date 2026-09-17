import { motion } from "motion/react";
import { imageDirectionItems, pick } from "../data/portfolio-evidence";
import { useLanguage } from "../i18n/LanguageContext";

export function ImageDirectionGallery({ compact = false }: { compact?: boolean }) {
  const { language } = useLanguage();
  const items = compact ? imageDirectionItems.slice(0, 4) : imageDirectionItems;

  return (
    <section className="bg-[#181914] px-5 py-20 text-[#f7f4eb] sm:px-8 lg:px-12 lg:py-28" aria-labelledby="image-direction-heading">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid gap-8 border-b border-white/18 pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="editorial-kicker text-[#d8e65b]">IMAGE DIRECTION</p>
            <h2 id="image-direction-heading" className="mt-4 text-[clamp(2.8rem,5vw,6rem)] font-black leading-[.9] tracking-[-.07em]">
              {language === "ko" ? "좋은 이미지는 선택 기준이 선명합니다." : "A strong image has clear selection criteria."}
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-white/55 lg:col-span-4 lg:col-start-9">
            {language === "ko"
              ? "같은 인물인지, 제품이 읽히는지, 색이 브랜드 역할을 하는지. 후보를 만들고 비교한 뒤 이유가 남는 이미지만 선택합니다."
              : "Identity, product legibility and the role of colour are checked across candidates. Only images with a defensible reason remain."}
          </p>
        </div>

        <div className="mt-8 grid auto-rows-[8rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] lg:auto-rows-[13rem] lg:grid-cols-12">
          {items.map((item, index) => {
            const classes = [
              "col-span-2 row-span-3 lg:col-span-5",
              "col-span-1 row-span-2 lg:col-span-3",
              "col-span-1 row-span-2 lg:col-span-4",
              "col-span-2 row-span-3 lg:col-span-4",
              "col-span-1 row-span-2 lg:col-span-3",
              "col-span-1 row-span-2 lg:col-span-5",
            ][index % 6];
            return (
              <motion.figure
                key={`${item.src}-${index}`}
                initial={{ opacity: 0, scale: .985 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
                className={`group relative overflow-hidden bg-white/5 ${classes}`}
              >
                <img src={item.src} alt={pick(item.alt, language)} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/92 via-black/70 to-transparent p-4 pt-16 opacity-100 transition-transform duration-300 group-hover:translate-y-0 sm:p-5">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#d8e65b]">{pick(item.label, language)}</p>
                  <p className="mt-2 max-w-md text-xs leading-5 text-white/72 sm:text-sm sm:leading-6">{pick(item.note, language)}</p>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
