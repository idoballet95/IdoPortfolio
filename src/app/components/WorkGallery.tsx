import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Beaker, Film, Grid2X2, UserRound } from "lucide-react";
import { useNavigate } from "react-router";
import { works } from "../data/works";
import { useLanguage } from "../i18n/LanguageContext";

const galleryCategories = [
  { key: "All", label: "ALL", icon: Grid2X2, match: () => true },
  { key: "Ads", label: "ADS", icon: Film, match: (slug: string) => ["pink-mercurial-rivalry", "nike-mercurial", "penalty-kick-ad", "world-cup-product-collection"].includes(slug) },
  { key: "Yoonjae", label: "YOONJAE", icon: UserRound, match: (slug: string) => ["golden-ball-chase", "gwangjang-market-vlog", "wifi-blackout", "rainy-track-film", "forest-run"].includes(slug) },
  { key: "Experiments", label: "EXPERIMENTS", icon: Beaker, match: (slug: string) => slug === "apocalypse-football" },
] as const;

export function WorkGallery() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<(typeof galleryCategories)[number]["key"]>("All");
  const { language } = useLanguage();
  const currentCategory = galleryCategories.find((category) => category.key === activeCategory) ?? galleryCategories[0];
  const filtered = works.filter((work) => currentCategory.match(work.slug));
  return (
    <main id="main-content" className="min-h-screen bg-white pb-24 pt-20 text-[#111]">
      <section className="bg-[#F5F5DC] px-5 pb-9 pt-8 sm:px-8 lg:px-5">
      <div className="mx-auto max-w-[1800px]">
        <button onClick={() => navigate("/")} className="mb-12 inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-50"><ArrowLeft className="h-4 w-4" /> HOME</button>
        <header className="mb-10">
          <div className="flex flex-wrap items-end gap-x-5 gap-y-3"><h1 className="font-['Arial','Helvetica_Neue',sans-serif] text-[clamp(3.5rem,8vw,7.25rem)] font-extrabold lowercase leading-[.78] tracking-[-.075em]">i.do.picks</h1><p className="pb-1 font-mono text-xs font-bold uppercase tracking-[.12em] sm:pb-2">● LIVE · {works.length} WORKS</p></div>
          <p className="mt-9 max-w-[54rem] text-sm font-medium leading-7 text-black/50 sm:text-base">{language === "en" ? "An archive of AI commercials and Yoonjae character films with their production prompts. Open a work to watch the film and read the process." : "AI로 만든 광고와 윤재 캐릭터 필름을 제작 프롬프트와 함께 아카이브합니다. 작품을 누르면 영상과 실제 제작 기록을 볼 수 있어요."}</p>
        </header>
        <nav aria-label="작품 분류" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {galleryCategories.map((category) => { const Icon = category.icon; const count = works.filter((work) => category.match(work.slug)).length; const active = activeCategory === category.key; return (
            <button key={category.key} onClick={() => setActiveCategory(category.key)} aria-pressed={active} className={`flex min-h-[5.75rem] items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 active:scale-[.99] ${active ? "border-black bg-black text-white" : "border-black/10 bg-white hover:border-black/35"}`}>
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${active ? "bg-white text-black" : "bg-[#f4f4f4] text-black/55"}`}><Icon className="h-5 w-5" /></span><span><strong className="block text-lg font-black tracking-[-.04em] sm:text-xl">{category.label}</strong><span className={`mt-1 block font-mono text-xs ${active ? "text-white/65" : "text-black/45"}`}>{count} works</span></span>
            </button>); })}
        </nav>
      </div>
      </section>
      <div className="mx-auto max-w-[1800px] px-5 pt-8 sm:px-8 lg:px-5">
        <div className="mb-7 flex items-center justify-between"><span className="rounded-full bg-black px-5 py-2.5 font-mono text-xs font-bold text-white">LATEST</span><span className="font-mono text-xs tabular-nums text-black/45">{String(filtered.length).padStart(2, "0")} RESULTS</span></div>
        <motion.section layout className="columns-1 gap-3 sm:columns-2 lg:columns-3 xl:columns-4" aria-live="polite">
          {filtered.map((work, index) => <motion.article layout key={work.slug} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .32, delay: index * .035 }} className="group relative mb-3 break-inside-avoid cursor-pointer overflow-hidden rounded-xl bg-[#eee]" onClick={() => navigate(`/work/${work.slug}`)} onKeyDown={(event) => event.key === "Enter" && navigate(`/work/${work.slug}`)} role="link" tabIndex={0}>
            <video src={work.video} poster={work.poster} muted loop playsInline preload="metadata" className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" onMouseEnter={(event) => event.currentTarget.play().catch(() => undefined)} onMouseLeave={(event) => { event.currentTarget.pause(); event.currentTarget.currentTime = 0; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-transparent opacity-80" /><div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100"><p className="font-mono text-[10px] uppercase tracking-[.16em] text-white/65">{work.eyebrow} · {work.duration}</p><h2 className="mt-1 text-xl font-bold tracking-[-.035em]">{work.title}</h2></div>
          </motion.article>)}
        </motion.section>
      </div>
    </main>
  );
}
