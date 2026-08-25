import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";
import { works } from "../data/works";
import { getWorkCopy } from "../data/work-copy";
import { useLanguage } from "../i18n/LanguageContext";

export function AIWorks() {
  const navigate = useNavigate();
  const featured = works.filter((work) => work.featured).slice(0, 4);
  const { language } = useLanguage();

  return (
    <section id="ai-works" className="bg-white px-5 py-24 sm:px-8 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-[#333333]/55">Selected work · 2026</p>
            <h2 className="max-w-4xl text-[clamp(3.25rem,8vw,7.5rem)] font-semibold leading-[0.82] tracking-[-0.065em]">
              AI Works
            </h2>
          </div>
          <button onClick={() => navigate("/work")} className="group inline-flex w-fit items-center gap-3 border-b border-[#333333] pb-2 text-sm font-semibold tracking-wide focus-visible:outline-2 focus-visible:outline-offset-4">
            {language === "en" ? `Explore all ${works.length} projects` : `전체 ${works.length}개 프로젝트 보기`}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          {featured.map((work, index) => (
            <motion.article
              key={work.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className={`group cursor-pointer ${index === 0 ? "lg:col-span-7" : "lg:col-span-5"}`}
              onClick={() => navigate(`/work/${work.slug}`)}
              onKeyDown={(event) => event.key === "Enter" && navigate(`/work/${work.slug}`)}
              role="link"
              tabIndex={0}
            >
              <div className={`relative overflow-hidden bg-[#DDDCC5] ${index === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
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
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#333333]/65">{getWorkCopy(work.slug, language)?.description ?? work.description}</p>
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
