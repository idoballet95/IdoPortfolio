import { motion } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";

const capabilities = [
  {
    index: "01",
    title: "Image",
    ko: "콘셉트 이미지, 캐릭터와 제품의 비주얼 시스템",
    en: "Concept imagery and visual systems for characters and products",
  },
  {
    index: "02",
    title: "Video",
    ko: "기획, 생성, 연출, 편집과 사운드",
    en: "Concept, generation, direction, edit and sound",
  },
  {
    index: "03",
    title: "Writing",
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
          <div className="lg:col-span-7">
            <p className="editorial-kicker">AI CONTENT CREATOR · 2026</p>
            <h1 id="capability-heading" className="mt-6 max-w-[12ch] text-[clamp(3.1rem,7.2vw,8rem)] font-black leading-[.88] tracking-[-.075em] text-balance">
              {language === "ko" ? "이미지·영상·글을 하나의 브랜드 언어로 만듭니다." : "i.do.aiworks"}
            </h1>
          </div>
          <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
            <p className="max-w-[34rem] text-lg leading-8 text-black/66 sm:text-xl">
              {language === "ko"
                ? "콘셉트를 세우고, 생성하고, 비교하고, 다시 만듭니다. 첫 결과보다 최종 선택의 이유가 보이는 작업을 남깁니다."
                : "I set the concept, generate, compare and rebuild. The work shows not only the final result, but why it became the final choice."}
            </p>
            <div className="mt-10 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[.12em] text-black/45">
              <span>33 PROJECTS</span><span aria-hidden="true">/</span><span>CONCEPT → DELIVERY</span>
            </div>
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
              className="group border-b border-black/20 py-7 lg:border-b-0 lg:border-r lg:px-7 first:lg:pl-0 last:lg:border-r-0"
            >
              <div className="flex items-baseline justify-between gap-6">
                <h2 className="text-3xl font-black tracking-[-.055em] sm:text-4xl">{item.title}</h2>
                <span className="font-mono text-[11px] text-black/40">{item.index}</span>
              </div>
              <p className="mt-12 max-w-sm text-sm font-medium leading-7 text-black/58">{language === "ko" ? item.ko : item.en}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
