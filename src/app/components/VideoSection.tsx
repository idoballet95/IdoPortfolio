import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { works, type PortfolioWork } from "../data/works";
import { useLanguage } from "../i18n/LanguageContext";
import { MoreButton } from "./MoreButton";

export type VideoTab = "Ads" | "Character";
export type CharacterTab = "Yena" | "GiaYoonjae";

const ads = works.filter((work) => work.galleryCategory === "Ads");
const yena = works.filter((work) => work.galleryCategory === "Yena");
const giaYoonjae = works.filter((work) => work.galleryCategory === "Yoonjae & Gia");

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

export function CategoryTabs<T extends string>({
  label,
  value,
  items,
  onChange,
  compact = false,
}: {
  label: string;
  value: T;
  items: Array<{ key: T; title: string; count: number }>;
  onChange: (value: T) => void;
  compact?: boolean;
}) {
  return (
    <div role="tablist" aria-label={label} className={`grid grid-cols-2 border border-black ${compact ? "max-w-2xl" : "w-full"}`}>
      {items.map((item) => {
        const selected = value === item.key;
        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(item.key)}
            className={`flex min-h-14 items-center justify-between gap-4 px-4 text-left transition-colors focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-6 ${selected ? "bg-black text-white" : "border-black/20 bg-white text-black hover:bg-[#efefc9] [&:not(:last-child)]:border-r"}`}
          >
            <span className={`${compact ? "text-base sm:text-lg" : "text-lg sm:text-2xl"} font-black tracking-[-.035em]`}>{item.title}</span>
            <span className={`font-mono text-[9px] tabular-nums ${selected ? "text-white/55" : "text-black/38"}`}>{String(item.count).padStart(2, "0")}</span>
          </button>
        );
      })}
    </div>
  );
}

const PREVIEW_LIMIT = 3;

export function VideoSection({
  compact = false,
  initialTab = "Ads",
  initialCharacterTab = "Yena",
}: {
  compact?: boolean;
  initialTab?: VideoTab;
  initialCharacterTab?: CharacterTab;
}) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [videoTab, setVideoTab] = useState<VideoTab>(initialTab);
  const [characterTab, setCharacterTab] = useState<CharacterTab>(initialCharacterTab);

  const all = videoTab === "Ads" ? ads : characterTab === "Yena" ? yena : giaYoonjae;
  const items = compact ? all.slice(0, PREVIEW_LIMIT) : all;
  const remaining = all.length - items.length;

  const moreHref = videoTab === "Ads" ? "/work/videos" : `/work/videos?tab=character&series=${characterTab === "Yena" ? "yena" : "gia"}`;

  return (
    <section id="video" className="scroll-mt-[8.5rem] bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28" aria-labelledby="video-heading">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-8 flex items-end justify-between gap-6 border-b border-black/15 pb-6">
          <h2 id="video-heading" className="text-4xl font-black tracking-[-.06em] sm:text-6xl">Video</h2>
          <span className="font-mono text-[10px] tabular-nums text-black/45">{String(all.length).padStart(2, "0")} VIDEO</span>
        </div>

        <CategoryTabs<VideoTab>
          label="Video category"
          value={videoTab}
          onChange={setVideoTab}
          items={[
            { key: "Ads", title: "Ads", count: ads.length },
            { key: "Character", title: "Character IP", count: yena.length + giaYoonjae.length },
          ]}
        />

        {videoTab === "Character" && (
          <div className="mt-5">
            <CategoryTabs<CharacterTab>
              compact
              label="Character IP series"
              value={characterTab}
              onChange={setCharacterTab}
              items={[
                { key: "Yena", title: "Yena", count: yena.length },
                { key: "GiaYoonjae", title: "Gia & Yoonjae", count: giaYoonjae.length },
              ]}
            />
          </div>
        )}

        <motion.div
          key={`${videoTab}-${characterTab}`}
          role="tabpanel"
          className="mt-10"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .25 }}
        >
          <VideoGrid items={items} />
        </motion.div>

        {compact && remaining > 0 && (
          <MoreButton
            onClick={() => navigate(moreHref)}
            label={language === "ko" ? "영상 더 보기" : "See more videos"}
          />
        )}
      </div>
    </section>
  );
}
