import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { editorialCases } from "../data/portfolio-evidence";
import { useLanguage } from "../i18n/LanguageContext";
import { CapabilityIntro } from "./CapabilityIntro";
import { FeaturedCaseStudies } from "./FeaturedCaseStudies";
import { ImageDirectionGallery } from "./ImageDirectionGallery";
import { WritingSystems } from "./WritingSystems";
import { VideoSection } from "./VideoSection";

type FilterKey = "All" | "Video" | "Image" | "Writing" | "Character";

const filters: Array<{ key: FilterKey; en: string; ko: string }> = [
  { key: "All", en: "All", ko: "전체" },
  { key: "Video", en: "Video", ko: "영상" },
  { key: "Image", en: "Image", ko: "이미지" },
  { key: "Writing", en: "Writing & Systems", ko: "글과 시스템" },
  { key: "Character", en: "Character IP", ko: "캐릭터 IP" },
];

export function WorkGallery() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [active, setActive] = useState<FilterKey>("All");

  const selectFilter = (filter: FilterKey) => {
    if (filter === "Video") return navigate("/work/videos");
    if (filter === "Character") return navigate("/work/videos?tab=character");
    if (filter === "Image") return navigate("/work/images");
    setActive(filter);
  };

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
              onClick={() => selectFilter(filter.key)}
              aria-pressed={active === filter.key}
              className={`shrink-0 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[.1em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${active === filter.key ? "bg-black text-white" : "border border-black/15 bg-transparent text-black/55 hover:border-black hover:text-black"}`}
            >
              {language === "ko" ? filter.ko : filter.en}
            </button>
          ))}
        </div>
      </nav>

      {active === "All" && <FeaturedCaseStudies />}

      {active === "All" && <VideoSection compact />}

      {active === "All" && <ImageDirectionGallery compact />}
      {(active === "All" || active === "Writing") && <WritingSystems compact={active === "All"} />}

      {active === "Writing" && (
        <section className="bg-white px-5 pb-20 sm:px-8 lg:px-12"><div className="mx-auto max-w-[1800px] border-t border-black/15 py-8 font-mono text-[10px] uppercase tracking-[.1em] text-black/45">{editorialCases.length} documented writing systems</div></section>
      )}
    </main>
  );
}
