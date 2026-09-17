import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { featuredSlugs, workEvidence, pick } from "../data/portfolio-evidence";
import { getWork } from "../data/works";
import { useLanguage } from "../i18n/LanguageContext";

export function FeaturedCaseStudies() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const cases = featuredSlugs.map((slug) => getWork(slug)).filter(Boolean);

  return (
    <section className="bg-[#f7f4eb] px-5 py-20 sm:px-8 lg:px-12 lg:py-28" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid gap-8 border-b border-black/15 pb-9 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="editorial-kicker">SELECTED CASE STUDIES</p>
            <h2 id="featured-heading" className="mt-4 text-[clamp(2.8rem,5vw,6rem)] font-black leading-[.9] tracking-[-.07em]">
              {language === "ko" ? "결과보다 판단이 보이는 작업" : "work"}
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-black/58 lg:col-span-4 lg:col-start-9">
            {language === "ko"
              ? "브랜드 해석, 이미지 시스템, 움직임 레퍼런스와 제품 일관성. 서로 다른 문제를 어떤 기준으로 풀었는지 확인할 수 있습니다."
              : "Brand interpretation, image systems, movement references and product consistency — each case makes its selection criteria visible."}
          </p>
        </div>

        <div className="mt-8 grid gap-x-5 gap-y-14 lg:grid-cols-12">
          {cases.map((work, index) => {
            if (!work) return null;
            const evidence = workEvidence[work.slug];
            const wide = index === 0 || index === 3;
            return (
              <motion.article
                key={work.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
                className={`group ${wide ? "lg:col-span-7" : "lg:col-span-5"}`}
              >
                <button onClick={() => navigate(`/work/${work.slug}`)} className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4">
                  <div className={`relative overflow-hidden bg-[#d9d7c6] ${wide ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                    <video
                      src={work.video}
                      poster={work.poster}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      onMouseEnter={(event) => event.currentTarget.play().catch(() => undefined)}
                      onMouseLeave={(event) => { event.currentTarget.pause(); event.currentTarget.currentTime = 0; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[.15em]">{work.tools.slice(0, 2).join(" · ")}</span>
                      <span className="font-mono text-[10px] tabular-nums">{work.duration}</span>
                    </div>
                  </div>
                  <div className="grid gap-4 border-b border-black/15 py-5 sm:grid-cols-[1fr_auto]">
                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[.14em] text-black/40">0{index + 1} · VIDEO CASE</p>
                      <h3 className="mt-2 text-2xl font-black tracking-[-.045em] sm:text-3xl">{work.title}</h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-black/60">{pick(evidence.creativeDecision, language)}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
