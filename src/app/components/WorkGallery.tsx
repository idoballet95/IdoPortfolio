import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { works, type PortfolioWork } from "../data/works";
import { editorialCases, featuredSlugs } from "../data/portfolio-evidence";
import { useLanguage } from "../i18n/LanguageContext";
import { CapabilityIntro } from "./CapabilityIntro";
import { FeaturedCaseStudies } from "./FeaturedCaseStudies";
import { ImageDirectionGallery } from "./ImageDirectionGallery";
import { WritingSystems } from "./WritingSystems";

type FilterKey = "All" | "Featured" | "Video" | "Image" | "Writing" | "Character";

const filters: Array<{ key: FilterKey; en: string; ko: string }> = [
  { key: "All", en: "All", ko: "전체" },
  { key: "Featured", en: "Featured", ko: "추천" },
  { key: "Video", en: "Video", ko: "영상" },
  { key: "Image", en: "Image", ko: "이미지" },
  { key: "Writing", en: "Writing & Systems", ko: "글과 시스템" },
  { key: "Character", en: "Character IP", ko: "캐릭터 IP" },
];

const ads = works.filter((work) => work.galleryCategory === "Ads");
const yena = works.filter((work) => work.galleryCategory === "Yena");
const giaYoonjae = works.filter((work) => work.galleryCategory === "Yoonjae & Gia");
const featured = works.filter((work) => featuredSlugs.includes(work.slug as (typeof featuredSlugs)[number]));

function VideoGrid({ items }: { items: PortfolioWork[] }) {
  const navigate = useNavigate();

  return (
    <motion.div layout className="grid gap-x-3 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((work, index) => (
        <motion.article
          layout
          key={work.slug}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .3, delay: Math.min(index, 8) * .025 }}
          className="group cursor-pointer"
          onClick={() => navigate(`/work/${work.slug}`)}
          onKeyDown={(event) => event.key === "Enter" && navigate(`/work/${work.slug}`)}
          role="link"
          tabIndex={0}
        >
          <div className="relative overflow-hidden bg-[#e4e2d5]">
            <video src={work.video} poster={work.poster} muted loop playsInline preload="metadata" className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" onMouseEnter={(event) => event.currentTarget.play().catch(() => undefined)} onMouseLeave={(event) => { event.currentTarget.pause(); event.currentTarget.currentTime = 0; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white"><span className="font-mono text-[9px] font-bold uppercase tracking-[.13em]">{work.eyebrow}</span><span className="font-mono text-[9px]">{work.duration}</span></div>
          </div>
          <div className="border-b border-black/12 py-4">
            <h4 className="text-xl font-black tracking-[-.04em]">{work.title}</h4>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[.1em] text-black/42">{work.tools.slice(0, 3).join(" · ")}</p>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}

function VideoGroup({ title, items, nested = false }: { title: string; items: PortfolioWork[]; nested?: boolean }) {
  return (
    <section className={nested ? "mt-12" : "mt-16"} aria-label={title}>
      <div className="mb-6 flex items-end justify-between gap-6 border-b border-black/15 pb-4">
        <h3 className={nested ? "text-2xl font-black tracking-[-.045em] sm:text-3xl" : "text-4xl font-black tracking-[-.06em] sm:text-5xl"}>{title}</h3>
        <span className="font-mono text-[10px] tabular-nums text-black/45">{String(items.length).padStart(2, "0")} VIDEO</span>
      </div>
      <VideoGrid items={items} />
    </section>
  );
}

export function WorkGallery() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [active, setActive] = useState<FilterKey>("All");

  const showVideo = active === "All" || active === "Featured" || active === "Video" || active === "Character";
  const visibleVideoCount = active === "Featured" ? featured.length : active === "Character" ? yena.length + giaYoonjae.length : ads.length + yena.length + giaYoonjae.length;

  return (
    <main id="main-content" className="min-h-screen bg-[#f7f4eb] pt-20 text-[#151510]">
      <div className="mx-auto max-w-[1800px] px-5 pb-6 pt-8 sm:px-8 lg:px-12">
        <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[.12em] transition-opacity hover:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4"><ArrowLeft className="h-4 w-4" /> HOME</button>
      </div>

      <CapabilityIntro />

      <nav aria-label={language === "ko" ? "작업 역량 분류" : "Work capability filters"} className="sticky top-[79px] z-30 border-y border-black/12 bg-[#f7f4eb]/94 px-5 backdrop-blur-xl sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1800px] gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActive(filter.key)}
              aria-pressed={active === filter.key}
              className={`shrink-0 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[.1em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${active === filter.key ? "bg-black text-white" : "border border-black/15 bg-transparent text-black/55 hover:border-black hover:text-black"}`}
            >
              {language === "ko" ? filter.ko : filter.en}
            </button>
          ))}
        </div>
      </nav>

      {(active === "All" || active === "Featured") && <FeaturedCaseStudies />}
      {(active === "All" || active === "Image") && <ImageDirectionGallery compact={active === "All"} />}
      {(active === "All" || active === "Writing") && <WritingSystems compact={active === "All"} />}

      {showVideo && (
        <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28" aria-labelledby="video-heading">
          <div className="mx-auto max-w-[1800px]">
            <div className="mb-8 flex items-end justify-between gap-6 border-b border-black/15 pb-6">
              <h2 id="video-heading" className="text-4xl font-black tracking-[-.06em] sm:text-6xl">Video</h2>
              <span className="font-mono text-[10px] tabular-nums text-black/45">{String(visibleVideoCount).padStart(2, "0")} VIDEO</span>
            </div>

            {active === "Featured" ? (
              <VideoGrid items={featured} />
            ) : (
              <>
                {active !== "Character" && <VideoGroup title="AD" items={ads} />}
                <section className="mt-24 border-t-2 border-black pt-7" aria-labelledby="character-ip-heading">
                  <div className="flex items-end justify-between gap-6">
                    <h3 id="character-ip-heading" className="text-4xl font-black tracking-[-.06em] sm:text-5xl">Character IP</h3>
                    <span className="font-mono text-[10px] tabular-nums text-black/45">{String(yena.length + giaYoonjae.length).padStart(2, "0")} VIDEO</span>
                  </div>
                  <VideoGroup title="Yena" items={yena} nested />
                  <VideoGroup title="Gia & Yoonjae" items={giaYoonjae} nested />
                </section>
              </>
            )}
          </div>
        </section>
      )}

      {active === "Writing" && (
        <section className="bg-white px-5 pb-20 sm:px-8 lg:px-12"><div className="mx-auto max-w-[1800px] border-t border-black/15 py-8 font-mono text-[10px] uppercase tracking-[.1em] text-black/45">{editorialCases.length} documented writing systems</div></section>
      )}
    </main>
  );
}
