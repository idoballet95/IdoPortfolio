import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { VideoSection } from "./VideoSection";

export function VideosPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initialTab = params.get("tab") === "character" ? "Character" : "Ads";
  const initialCharacterTab = params.get("series") === "gia" ? "GiaYoonjae" : "Yena";

  return (
    <main id="main-content" className="min-h-screen bg-white pt-20 text-[#151510]">
      <div className="mx-auto max-w-[1800px] px-5 pb-2 pt-8 sm:px-8 lg:px-12">
        <button onClick={() => navigate("/work")} className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[.12em] transition-opacity hover:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4"><ArrowLeft className="h-4 w-4" /> WORKS</button>
      </div>
      <VideoSection initialTab={initialTab} initialCharacterTab={initialCharacterTab} />
    </main>
  );
}
