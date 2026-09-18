import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { MoreButton } from "./MoreButton";
import { imageCategories, imageWorks, type ImageCategory, type ImageWork } from "../data/image-works";
import { pick } from "../data/portfolio-evidence";
import { useLanguage } from "../i18n/LanguageContext";

const PREVIEW_LIMIT = 4;
// Sort mode only exists on the local dev server, where /__image-order can write to disk.
const SORT_AVAILABLE = import.meta.env.DEV;

function moveItem<T>(list: T[], from: number, to: number) {
  if (from === to) return list;
  const next = [...list];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

export function ImageDirectionGallery({ compact = false, initialTab = "experiment" }: { compact?: boolean; initialTab?: ImageCategory }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [tab, setTab] = useState<ImageCategory>(initialTab);
  const [sorting, setSorting] = useState(false);
  const [draft, setDraft] = useState<ImageWork[]>(imageWorks[tab]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    setDraft(imageWorks[tab]);
    setSaveState("idle");
  }, [tab]);

  // Pointer-based reorder: track the figure under the pointer while dragging, move on release.
  useEffect(() => {
    if (dragIndex === null) return;
    const indexAt = (x: number, y: number) => {
      const target = document.elementFromPoint(x, y)?.closest<HTMLElement>("[data-sort-index]");
      return target ? Number(target.dataset.sortIndex) : null;
    };
    const onMove = (event: PointerEvent) => {
      const index = indexAt(event.clientX, event.clientY);
      if (index !== null) setOverIndex(index);
    };
    const onUp = (event: PointerEvent) => {
      const index = indexAt(event.clientX, event.clientY);
      if (index !== null) {
        setDraft((list) => moveItem(list, dragIndex, index));
        setSaveState("idle");
      }
      setDragIndex(null);
      setOverIndex(null);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragIndex]);

  const all = sorting ? draft : imageWorks[tab];
  const items = compact && !sorting ? all.slice(0, PREVIEW_LIMIT) : all;
  const remaining = all.length - items.length;
  const dirty = sorting && draft.some((item, index) => item.src !== imageWorks[tab][index]?.src);

  const save = async () => {
    setSaveState("saving");
    const payload = Object.fromEntries(
      imageCategories.map((cat) => [cat.key, (cat.key === tab ? draft : imageWorks[cat.key]).map((item) => item.src)]),
    );
    try {
      const response = await fetch("/__image-order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      setSaveState(response.ok ? "saved" : "error");
    } catch {
      setSaveState("error");
    }
  };

  const ko = language === "ko";

  return (
    <section id="images" className="scroll-mt-[8.5rem] bg-[#181914] px-5 py-20 text-[#f7f4eb] sm:px-8 lg:px-12 lg:py-28" aria-labelledby="image-direction-heading">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid gap-8 border-b border-white/18 pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="editorial-kicker text-[#d8e65b]">IMAGE DIRECTION</p>
            <h2 id="image-direction-heading" className="mt-4 text-[clamp(2.8rem,5vw,6rem)] font-black leading-[.9] tracking-[-.07em]">
              Images
            </h2>
          </div>

          {SORT_AVAILABLE && !compact && (
            <div className="flex flex-wrap items-center gap-2 lg:col-span-5 lg:justify-end">
              {sorting && (
                <span className="mr-2 font-mono text-[10px] uppercase tracking-[.12em] text-white/45">
                  {saveState === "saving" ? (ko ? "저장 중…" : "Saving…") : saveState === "saved" ? (ko ? "저장됨" : "Saved") : saveState === "error" ? (ko ? "저장 실패" : "Save failed") : ko ? "드래그해서 순서 변경" : "Drag to reorder"}
                </span>
              )}
              {sorting && (
                <button
                  type="button"
                  disabled={!dirty || saveState === "saving"}
                  onClick={save}
                  className="border border-[#d8e65b] bg-[#d8e65b] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[.14em] text-black transition-opacity disabled:opacity-40"
                >
                  {ko ? "저장" : "Save"}
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  if (sorting) setDraft(imageWorks[tab]);
                  setSorting((value) => !value);
                  setSaveState("idle");
                }}
                className="border border-white/30 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[.14em] text-white/80 transition-colors hover:border-white hover:text-white"
              >
                {sorting ? (ko ? "정렬 종료" : "Done") : ko ? "순서 정렬" : "Reorder"}
              </button>
            </div>
          )}
        </div>

        <div role="tablist" aria-label={ko ? "이미지 분류" : "Image category"} className="mt-8 grid grid-cols-3 border border-white/25">
          {imageCategories.map((cat) => {
            const selected = tab === cat.key;
            const count = imageWorks[cat.key].length;
            return (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setTab(cat.key)}
                className={`flex min-h-14 items-center justify-between gap-4 px-4 text-left transition-colors focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-6 ${selected ? "bg-[#d8e65b] text-black" : "text-white/80 hover:bg-white/8 [&:not(:last-child)]:border-r border-white/25"}`}
              >
                <span className="whitespace-nowrap text-base font-black tracking-[-.035em] sm:text-xl lg:text-2xl">{ko ? cat.ko : cat.en}</span>
                <span className={`font-mono text-[9px] tabular-nums ${selected ? "text-black/55" : "text-white/40"}`}>{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        {items.length === 0 ? (
          <p className="mt-10 border-t border-white/12 py-16 text-center font-mono text-[10px] uppercase tracking-[.14em] text-white/40">
            {ko ? "준비 중" : "Coming soon"}
          </p>
        ) : (
          <motion.div
            key={`${tab}-${sorting}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`mt-8 grid grid-cols-2 gap-3 ${compact && !sorting ? "" : "sm:grid-cols-3 lg:grid-cols-4"}`}
          >
            {items.map((item, index) => {
              const shape = compact && !sorting ? "aspect-[4/3]" : item.orientation === "landscape" ? "col-span-2 aspect-[16/9]" : "aspect-[4/5]";
              if (sorting) {
                const isDragging = dragIndex === index;
                const isOver = overIndex === index && dragIndex !== null && dragIndex !== index;
                return (
                  <figure
                    key={item.src}
                    data-sort-index={index}
                    onPointerDown={(event) => {
                      event.preventDefault();
                      setDragIndex(index);
                      setOverIndex(index);
                    }}
                    className={`relative touch-none select-none overflow-hidden bg-white/5 outline-2 outline-offset-2 transition-opacity ${dragIndex === null ? "cursor-grab" : "cursor-grabbing"} ${shape} ${isDragging ? "opacity-30" : ""} ${isOver ? "outline outline-[#d8e65b]" : ""}`}
                  >
                    <img src={item.src} alt={pick(item.alt, language)} loading="lazy" draggable={false} className="pointer-events-none h-full w-full select-none object-cover" />
                    <span className="absolute left-2 top-2 bg-black/70 px-2 py-1 font-mono text-[10px] font-bold tabular-nums text-[#d8e65b]">{String(index + 1).padStart(2, "0")}</span>
                  </figure>
                );
              }
              return (
                <motion.figure
                  key={item.src}
                  initial={{ opacity: 0, scale: 0.985 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: (index % 4) * 0.05 }}
                  className={`group relative overflow-hidden bg-white/5 ${shape}`}
                >
                  <img src={item.src} alt={pick(item.alt, language)} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/85 to-transparent p-4 pt-10 transition-transform duration-300 group-hover:translate-y-0">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#d8e65b]">{pick(item.alt, language)}</p>
                  </figcaption>
                </motion.figure>
              );
            })}
          </motion.div>
        )}

        {compact && remaining > 0 && (
          <MoreButton
            dark
            onClick={() => navigate(`/work/images?tab=${tab}`)}
            label={ko ? "이미지 더 보기" : "See more images"}
          />
        )}
      </div>
    </section>
  );
}
