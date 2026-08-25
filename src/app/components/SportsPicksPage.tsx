import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Footprints, Grid2X2, HeartPulse, Sparkles, Volleyball } from "lucide-react";
import { useNavigate } from "react-router";
import { PickCategory, sportsPicks } from "../data/sports-picks";
import { useLanguage } from "../i18n/LanguageContext";
import { categoryLabels, SportsPickCard } from "./SportsPickCard";

const categories = [
  { key: "All", category: null, icon: Grid2X2, iconBg: "#e7e1ff", iconColor: "#6747e8" },
  { key: "Futsal", category: "풋살", icon: Volleyball, iconBg: "#e7f7a8", iconColor: "#4f7300" },
  { key: "Running", category: "러닝", icon: Footprints, iconBg: "#ffe0d6", iconColor: "#df4a2b" },
  { key: "Recovery", category: "회복", icon: HeartPulse, iconBg: "#ddeeff", iconColor: "#2873c8" },
  { key: "Lifestyle", category: "라이프", icon: Sparkles, iconBg: "#f1dfff", iconColor: "#9950d0" },
] as const;

export function SportsPicksPage() {
  const navigate = useNavigate(); const { language } = useLanguage();
  const [active, setActive] = useState<(typeof categories)[number]["key"]>("All");
  const current = categories.find((item) => item.key === active) ?? categories[0];
  const filtered = useMemo(() => current.category ? sportsPicks.filter((pick) => pick.category === current.category as PickCategory) : sportsPicks, [current]);
  const label = (item: (typeof categories)[number]) => item.category ? categoryLabels[language][item.category] : language === "en" ? "All" : "전체";
  return <main id="main-content" className="min-h-screen bg-white pb-24 pt-20 text-[#111]">
    <section className="bg-[#F5F5DC] px-5 pb-9 pt-8 sm:px-8 lg:px-5"><div className="mx-auto max-w-[1800px]">
      <button onClick={() => navigate("/")} className="mb-12 inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-50"><ArrowLeft className="h-4 w-4" /> HOME</button>
      <header className="mb-10"><h1 className="text-[clamp(3.5rem,8vw,7.25rem)] font-extrabold leading-[.78] tracking-[-.075em]">Sports Picks</h1><p className="mt-9 max-w-[54rem] text-sm font-medium leading-7 text-black/50 sm:text-base">{language === "en" ? "A curated archive of sports gear—personally tested favorites, practical reviews, and noteworthy finds." : "직접 사용한 추천 제품부터 솔직한 후기, 눈여겨본 스포츠 용품까지 함께 모은 아카이브입니다."}</p></header>
      <nav aria-label={language === "en" ? "Sports review categories" : "용품 후기 분류"} className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{categories.map((item) => { const Icon = item.icon; const count = item.category ? sportsPicks.filter((pick) => pick.category === item.category).length : sportsPicks.length; const selected = active === item.key; return <button key={item.key} onClick={() => setActive(item.key)} aria-pressed={selected} className={`flex min-h-[4.5rem] items-center gap-3 rounded-2xl border p-3 text-left transition-all active:scale-[.99] ${selected ? "border-black bg-black text-white" : "border-black/10 bg-white hover:border-black/35"}`}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full" style={{ backgroundColor: item.iconBg, color: item.iconColor }}><Icon className="h-[18px] w-[18px]" /></span><span><strong className="block text-base font-black tracking-[-.035em] sm:text-lg">{label(item)}</strong><span className={`mt-0.5 block font-mono text-[11px] ${selected ? "text-white/65" : "text-black/45"}`}>{count} {language === "en" ? "picks" : "개"}</span></span></button>; })}</nav>
    </div></section>
    <section className="mx-auto max-w-[1800px] px-5 pt-8 sm:px-8 lg:px-5"><div className="mb-7 flex items-center justify-between"><span className="rounded-full bg-black px-5 py-2.5 font-mono text-xs font-bold text-white">LATEST</span><span className="font-mono text-xs tabular-nums text-black/45">{String(filtered.length).padStart(2, "0")} RESULTS</span></div><motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((pick, index) => <SportsPickCard key={pick.id} pick={pick} language={language} index={index} />)}</motion.div></section>
  </main>;
}
