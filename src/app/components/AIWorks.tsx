import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";
import { getWork, works } from "../data/works";
import { featuredSlugs, pick, workEvidence } from "../data/portfolio-evidence";
import { useLanguage } from "../i18n/LanguageContext";

export function AIWorks() {
  const navigate = useNavigate();
  const featured = featuredSlugs.map((slug) => getWork(slug)).filter(Boolean);
  const { language } = useLanguage();

  return (
    <section id="ai-works" className="bg-[#f7f4eb] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 grid gap-10 border-b border-black/15 pb-10 lg:mb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="editorial-kicker">IMAGE · VIDEO · WRITING</p>
            <h2 className="mt-5 max-w-[11ch] text-[clamp(3.25rem,7vw,7.5rem)] font-black leading-[0.86] tracking-[-0.07em] text-balance">
              {language === "ko" ? "첫 생성보다, 최종 선택의 이유." : "Not the first generation. The reason for the final choice."}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-base leading-8 text-black/62">{language === "ko" ? "이미지·영상·글을 하나의 방향으로 설계하고, 비교와 수정 과정을 거쳐 완성합니다." : "I direct image, video and copy as one system, then refine through comparison and iteration."}</p>
            <button onClick={() => navigate("/work")} className="group mt-7 inline-flex w-fit items-center gap-3 border-b border-black pb-2 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-4">
              {language === "en" ? `Explore all ${works.length} projects` : `전체 작업과 제작 과정 보기`}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          {featured.map((work, index) => work && (
            <motion.article
              key={work.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className={`group cursor-pointer ${(index === 0 || index === 3) ? "lg:col-span-7" : "lg:col-span-5"}`}
              onClick={() => navigate(`/work/${work.slug}`)}
              onKeyDown={(event) => event.key === "Enter" && navigate(`/work/${work.slug}`)}
              role="link"
              tabIndex={0}
            >
              <div className={`relative overflow-hidden bg-[#DDDCC5] ${(index === 0 || index === 3) ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                <video
                  src={work.video}
                  poster={work.poster}
                  muted loop playsInline preload="metadata"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  onMouseEnter={(event) => event.currentTarget.play().catch(() => undefined)}
                  onMouseLeave={(event) => { event.currentTarget.pause(); event.currentTarget.currentTime = 0; }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171712]/55 via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em]">{work.eyebrow}</span>
                  <span className="font-mono text-[11px] tabular-nums">{work.duration}</span>
                </div>
              </div>
              <div className="flex items-start justify-between gap-6 py-5">
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.035em] lg:text-3xl">{work.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-black/62">{pick(workEvidence[work.slug].creativeDecision, language)}</p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
