import { motion } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";

const capabilities = [
  {
    index: "01",
    title: "Video",
    target: "video",
    ko: "기획, 생성, 연출, 편집과 사운드",
    en: "Concept, generation, direction, edit and sound",
  },
  {
    index: "02",
    title: "Image",
    target: "images",
    ko: "콘셉트 이미지, 캐릭터와 제품의 비주얼 시스템",
    en: "Concept imagery and visual systems for characters and products",
  },
  {
    index: "03",
    title: "Writing",
    target: "writing",
    ko: "보이스 설계, 리서치, 카피와 블로그 제작",
    en: "Voice design, research, copy and blog production",
  },
];

export function CapabilityIntro() {
  const { language } = useLanguage();

  return (
    <section className="border-y border-black/15 bg-[#efefc9]" aria-labelledby="capability-heading">
      <div className="mx-auto max-w-[1800px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-12">
            <p className="editorial-kicker">AI CONTENT CREATOR · 2026</p>
            <h1 id="capability-heading" className="mt-6 max-w-[12ch] text-[clamp(3.1rem,7.2vw,8rem)] font-black leading-[.88] tracking-[-.075em] text-balance">
              Works
            </h1>
          </div>
        </div>

        <div className="mt-16 grid border-t border-black/20 lg:grid-cols-3">
          {capabilities.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group border-b border-black/20 lg:border-b-0 lg:border-r last:lg:border-r-0"
            >
              <a
                href={`#${item.target}`}
                onClick={(event) => {
                  event.preventDefault();
                  document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="block py-7 transition-colors hover:bg-black/[.04] lg:px-7 group-first:lg:pl-0 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <div className="flex items-baseline justify-between gap-6">
                  <h2 className="text-3xl font-black tracking-[-.055em] sm:text-4xl">
                    {item.title}
                    <span className="ml-2 inline-block text-black/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-black">→</span>
                  </h2>
                  <span className="font-mono text-[11px] text-black/40">{item.index}</span>
                </div>
                <p className="mt-12 max-w-sm text-sm font-medium leading-7 text-black/58">{language === "ko" ? item.ko : item.en}</p>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
