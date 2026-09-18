import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { imageCategories, type ImageCategory } from "../data/image-works";
import { ImageDirectionGallery } from "./ImageDirectionGallery";

export function ImagesPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const requested = params.get("tab");
  const initialTab = imageCategories.some((cat) => cat.key === requested) ? (requested as ImageCategory) : "experiment";

  return (
    <main id="main-content" className="min-h-screen bg-[#181914] pt-20 text-[#f7f4eb]">
      <div className="mx-auto max-w-[1800px] px-5 pb-2 pt-8 sm:px-8 lg:px-12">
        <button onClick={() => navigate("/work")} className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[.12em] text-white/80 transition-opacity hover:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4"><ArrowLeft className="h-4 w-4" /> WORKS</button>
      </div>
      <ImageDirectionGallery initialTab={initialTab} />
    </main>
  );
}
