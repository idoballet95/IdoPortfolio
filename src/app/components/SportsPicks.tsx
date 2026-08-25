import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";
import { sportsPicks } from "../data/sports-picks";
import { useLanguage } from "../i18n/LanguageContext";
import { SportsPickCard } from "./SportsPickCard";

export function SportsPicks() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const latest = sportsPicks.slice(0, 3);
  return <section id="sports-picks" className="bg-[#F5F5DC] px-5 py-24 text-[#111] sm:px-8 lg:px-16 lg:py-32"><div className="mx-auto max-w-[1400px]">
    <header className="mb-12 grid gap-8 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><h2 className="text-[clamp(3.5rem,8vw,7.5rem)] font-extrabold leading-[.82] tracking-[-.07em]">Sports Picks</h2></div><div className="lg:col-span-4"><p className="max-w-md text-base leading-7 text-black/60">{language === "en" ? "A curated archive of sports gear—personally tested favorites, practical reviews, and noteworthy finds." : "직접 사용한 추천 제품부터 솔직한 후기, 눈여겨본 스포츠 용품까지 함께 모은 아카이브입니다."}</p><button onClick={() => navigate("/sports-picks")} className="group mt-6 inline-flex items-center gap-3 border-b border-black pb-2 text-sm font-semibold tracking-wide">{language === "en" ? `Explore all ${sportsPicks.length} picks` : `전체 ${sportsPicks.length}개 보기`}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></button></div></header>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{latest.map((pick, index) => <SportsPickCard key={pick.id} pick={pick} language={language} index={index} />)}</div>
  </div></section>;
}
