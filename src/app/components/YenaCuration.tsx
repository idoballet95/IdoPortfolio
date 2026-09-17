import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, Check, Download, Eye, RotateCcw, Search, X } from "lucide-react";
import assets, { duplicateSummary, type YenaCurationAsset } from "virtual:yena-curation-assets";

type Decision = "keep" | "exclude" | "undecided";
type CategoryFilter = "all" | YenaCurationAsset["category"];
type DecisionFilter = "all" | Decision;

const STORAGE_KEY = "ido-yena-curation-v1";
const INITIAL_VISIBLE = 160;
const CATEGORY_LABELS: Record<CategoryFilter, string> = {
  all: "전체",
  daily: "일상사진",
  background: "배경",
  sheet: "대시보드 · 시트",
};
const DECISION_LABELS: Record<DecisionFilter, string> = {
  all: "모든 상태",
  undecided: "미정",
  keep: "유지",
  exclude: "제외",
};

function readDecisions(): Record<string, Decision> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") as Record<string, Decision>;
  } catch {
    return {};
  }
}

function decisionFor(decisions: Record<string, Decision>, asset: YenaCurationAsset): Decision {
  const groupedDecisions = [asset.id, ...asset.duplicateIds].map((id) => decisions[id]);
  if (groupedDecisions.includes("keep")) return "keep";
  if (groupedDecisions.includes("exclude")) return "exclude";
  return "undecided";
}

function CurationCard({
  asset,
  decision,
  onOpen,
  onDecide,
}: {
  asset: YenaCurationAsset;
  decision: Decision;
  onOpen: () => void;
  onDecide: (decision: Decision) => void;
}) {
  return (
    <article
      className={`group relative mb-3 break-inside-avoid overflow-hidden border bg-[#ebe7db] transition-all duration-200 ${
        decision === "keep"
          ? "border-[#b7d62f] shadow-[0_0_0_2px_#b7d62f]"
          : decision === "exclude"
            ? "border-[#ff6a4d] opacity-45 grayscale"
            : "border-black/12 hover:border-black/50"
      }`}
    >
      <button onClick={onOpen} className="relative block w-full cursor-zoom-in text-left" aria-label={`${asset.name} 크게 보기`}>
        <img
          src={asset.url}
          alt=""
          loading="lazy"
          decoding="async"
          className="block min-h-28 w-full bg-[#dfdbcf] object-cover transition-transform duration-500 group-hover:scale-[1.015]"
        />
        <span className="absolute right-2 top-2 grid size-8 place-items-center bg-black/75 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <Eye className="size-4" />
        </span>
      </button>

      <div className="border-t border-black/10 bg-[#f7f4eb] p-2.5">
        <p className="truncate text-[11px] font-bold" title={asset.name}>{asset.name}</p>
        <p className="mt-0.5 truncate font-mono text-[9px] uppercase tracking-[.08em] text-black/45" title={asset.relativePath}>
          {asset.episode} · {asset.collection}
        </p>
        <div className="mt-2 grid grid-cols-3 gap-1">
          <button
            onClick={() => onDecide("keep")}
            className={`grid h-8 place-items-center border transition-colors ${decision === "keep" ? "border-black bg-[#d8e65b] text-black" : "border-black/12 hover:bg-[#d8e65b]"}`}
            title="유지 (K)"
          >
            <Check className="size-3.5" />
          </button>
          <button
            onClick={() => onDecide("undecided")}
            className={`grid h-8 place-items-center border font-mono text-[10px] transition-colors ${decision === "undecided" ? "border-black bg-black text-white" : "border-black/12 hover:bg-black hover:text-white"}`}
            title="미정 (U)"
          >
            U
          </button>
          <button
            onClick={() => onDecide("exclude")}
            className={`grid h-8 place-items-center border transition-colors ${decision === "exclude" ? "border-black bg-[#ff6a4d] text-black" : "border-black/12 hover:bg-[#ff6a4d]"}`}
            title="제외 (X)"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function YenaCuration() {
  const [decisions, setDecisions] = useState<Record<string, Decision>>(() => readDecisions());
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [decisionFilter, setDecisionFilter] = useState<DecisionFilter>("undecided");
  const [episode, setEpisode] = useState("all");
  const [query, setQuery] = useState("");
  const [columns, setColumns] = useState(6);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decisions));
  }, [decisions]);

  const episodes = useMemo(() => Array.from(new Set(assets.map((asset) => asset.episode))).sort((a, b) => a.localeCompare(b, "ko")), []);

  const totals = useMemo(() => {
    const result = { all: assets.length, daily: 0, background: 0, sheet: 0, keep: 0, exclude: 0, undecided: 0 };
    for (const asset of assets) {
      result[asset.category] += 1;
      result[decisionFor(decisions, asset)] += 1;
    }
    return result;
  }, [decisions]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("ko");
    return assets.filter((asset) => {
      if (category !== "all" && asset.category !== category) return false;
      if (episode !== "all" && asset.episode !== episode) return false;
      if (decisionFilter !== "all" && decisionFor(decisions, asset) !== decisionFilter) return false;
      if (needle && !`${asset.name} ${asset.episode} ${asset.collection} ${asset.relativePath}`.toLocaleLowerCase("ko").includes(needle)) return false;
      return true;
    });
  }, [category, decisionFilter, decisions, episode, query]);

  useEffect(() => setVisibleCount(INITIAL_VISIBLE), [category, decisionFilter, episode, query]);

  const visible = filtered.slice(0, visibleCount);
  const activeIndex = activeId ? filtered.findIndex((asset) => asset.id === activeId) : -1;
  const activeAsset = activeIndex >= 0 ? filtered[activeIndex] : null;

  function decide(asset: YenaCurationAsset, nextDecision: Decision) {
    setDecisions((current) => {
      const updated = { ...current };
      for (const id of [asset.id, ...asset.duplicateIds]) updated[id] = nextDecision;
      return updated;
    });
  }

  function step(direction: -1 | 1) {
    if (!filtered.length) return;
    const nextIndex = activeIndex < 0 ? 0 : (activeIndex + direction + filtered.length) % filtered.length;
    setActiveId(filtered[nextIndex].id);
  }

  function reviewActive(nextDecision: Decision) {
    if (!activeAsset) return;
    const nextAsset = filtered.length > 1 ? filtered[(activeIndex + 1) % filtered.length] : null;
    decide(activeAsset, nextDecision);
    setActiveId(nextAsset?.id || null);
  }

  useEffect(() => {
    if (!activeAsset) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveId(null);
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
      if (event.key.toLowerCase() === "k") reviewActive("keep");
      if (event.key.toLowerCase() === "x") reviewActive("exclude");
      if (event.key.toLowerCase() === "u") reviewActive("undecided");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeAsset, activeIndex, filtered]);

  function exportDecisions() {
    const payload = assets
      .filter((asset) => decisionFor(decisions, asset) !== "undecided")
      .map((asset) => ({ ...asset, url: undefined, decision: decisionFor(decisions, asset) }));
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `yena-curation-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main id="main-content" className="min-h-screen bg-[#f7f4eb] text-[#151510]">
      <header className="sticky top-0 z-40 border-b border-white/15 bg-[#151510] text-white shadow-xl">
        <div className="flex flex-wrap items-end justify-between gap-5 px-4 py-5 sm:px-7 lg:px-10">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.22em] text-white/45">Private contact sheet · local only</p>
            <h1 className="mt-1 text-3xl font-black leading-none tracking-[-.055em] sm:text-5xl">YENA IMAGE EDIT</h1>
          </div>
          <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[.1em]">
            <span><b className="text-[#d8e65b]">{totals.keep}</b> 유지</span>
            <span><b className="text-[#ff6a4d]">{totals.exclude}</b> 제외</span>
            <button onClick={exportDecisions} className="inline-flex h-10 items-center gap-2 border border-white/25 px-3 hover:bg-white hover:text-black">
              <Download className="size-3.5" /> 결과 저장
            </button>
          </div>
        </div>

        <div className="grid gap-px border-t border-white/15 bg-white/15 lg:grid-cols-[1.2fr_1fr_1fr_auto]">
          <label className="flex h-12 items-center gap-2 bg-[#151510] px-4">
            <Search className="size-4 text-white/40" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="파일명, 에피소드 검색" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30" />
          </label>
          <select value={episode} onChange={(event) => setEpisode(event.target.value)} className="h-12 min-w-0 bg-[#151510] px-4 text-xs text-white outline-none">
            <option value="all">모든 에피소드 ({episodes.length})</option>
            {episodes.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
          <div className="flex bg-[#151510]">
            {(["all", "undecided", "keep", "exclude"] as DecisionFilter[]).map((value) => (
              <button key={value} onClick={() => setDecisionFilter(value)} className={`flex-1 px-2 font-mono text-[9px] uppercase tracking-[.08em] ${decisionFilter === value ? "bg-white text-black" : "text-white/55 hover:text-white"}`}>
                {DECISION_LABELS[value]}
              </button>
            ))}
          </div>
          <label className="flex h-12 items-center gap-3 bg-[#151510] px-4 font-mono text-[9px] uppercase tracking-wider text-white/50">
            SIZE
            <input type="range" min="3" max="8" value={columns} onChange={(event) => setColumns(Number(event.target.value))} className="w-24 accent-[#d8e65b]" />
          </label>
        </div>
      </header>

      <nav className="flex overflow-x-auto border-b border-black/15 bg-[#ebe7db] px-4 sm:px-7 lg:px-10" aria-label="이미지 종류">
        {(["all", "daily", "background", "sheet"] as CategoryFilter[]).map((value) => (
          <button key={value} onClick={() => setCategory(value)} className={`whitespace-nowrap border-r border-black/15 px-4 py-4 text-left first:border-l ${category === value ? "bg-[#d8e65b]" : "hover:bg-white/60"}`}>
            <span className="block text-sm font-black">{CATEGORY_LABELS[value]}</span>
            <span className="font-mono text-[9px] text-black/45">{totals[value].toLocaleString()} FILES</span>
          </button>
        ))}
        <div className="hidden items-center border-r border-black/15 px-5 font-mono text-[9px] uppercase tracking-[.08em] text-black/45 xl:flex">
          완전 중복 {duplicateSummary.hidden}장 자동 정리 · {duplicateSummary.groups}그룹
        </div>
        <div className="ml-auto hidden items-center px-5 font-mono text-[9px] uppercase tracking-[.12em] text-black/40 md:flex">
          K 유지 · X 제외 · U 미정 · ← → 이동
        </div>
      </nav>

      <section className="px-3 py-5 sm:px-5 lg:px-8">
        <div className="mb-4 flex items-end justify-between gap-4 px-1">
          <div>
            <p className="editorial-kicker text-black/40">CURRENT VIEW</p>
            <p className="mt-1 text-xl font-black tracking-[-.035em]">{filtered.length.toLocaleString()}개의 이미지</p>
          </div>
          <button onClick={() => { setCategory("all"); setDecisionFilter("undecided"); setEpisode("all"); setQuery(""); }} className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-black/50 hover:text-black">
            <RotateCcw className="size-3.5" /> 필터 초기화
          </button>
        </div>

        {assets.length === 0 ? (
          <div className="grid min-h-[60vh] place-items-center border border-dashed border-black/30 text-center">
            <div><p className="text-2xl font-black">Yena 원본 폴더를 찾지 못했습니다.</p><p className="mt-2 font-mono text-xs text-black/45">이 페이지는 로컬 컴퓨터에서만 작동합니다.</p></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="grid min-h-[45vh] place-items-center border border-dashed border-black/25 text-center"><p className="font-bold">현재 조건에 맞는 이미지가 없습니다.</p></div>
        ) : (
          <>
            <div className="curation-masonry gap-3" style={{ "--curation-columns": columns } as CSSProperties}>
              {visible.map((asset) => (
                <CurationCard key={asset.id} asset={asset} decision={decisionFor(decisions, asset)} onOpen={() => setActiveId(asset.id)} onDecide={(next) => decide(asset, next)} />
              ))}
            </div>
            {visibleCount < filtered.length && (
              <button onClick={() => setVisibleCount((count) => count + INITIAL_VISIBLE)} className="mt-6 w-full border border-black bg-[#151510] py-5 font-mono text-xs font-bold uppercase tracking-[.12em] text-white hover:bg-[#d8e65b] hover:text-black">
                다음 {Math.min(INITIAL_VISIBLE, filtered.length - visibleCount)}개 불러오기 · {visibleCount}/{filtered.length}
              </button>
            )}
          </>
        )}
      </section>

      {activeAsset && (
        <div className="fixed inset-0 z-50 grid bg-[#0d0d0b]/96 text-white lg:grid-cols-[1fr_310px]" role="dialog" aria-modal="true" aria-label="이미지 검토">
          <div className="relative grid min-h-0 place-items-center overflow-hidden p-4 lg:p-8">
            <img src={activeAsset.url} alt="" className="max-h-[82vh] max-w-full object-contain shadow-2xl" />
            <button onClick={() => step(-1)} className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center border border-white/25 bg-black/45 hover:bg-white hover:text-black"><ArrowLeft /></button>
            <button onClick={() => step(1)} className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center border border-white/25 bg-black/45 hover:bg-white hover:text-black lg:right-5"><ArrowRight /></button>
            <button onClick={() => setActiveId(null)} className="absolute right-3 top-3 grid size-10 place-items-center border border-white/25 bg-black/45 hover:bg-white hover:text-black lg:right-5"><X /></button>
          </div>
          <aside className="flex flex-col border-t border-white/15 bg-[#151510] p-5 lg:border-l lg:border-t-0 lg:p-7">
            <p className="font-mono text-[9px] uppercase tracking-[.15em] text-white/40">{activeIndex + 1} / {filtered.length}</p>
            <h2 className="mt-3 break-all text-xl font-black leading-tight">{activeAsset.name}</h2>
            <p className="mt-3 break-all font-mono text-[10px] leading-relaxed text-white/45">{activeAsset.relativePath}</p>
            <div className="mt-auto grid gap-2 pt-7">
              <button onClick={() => reviewActive("keep")} className={`flex h-12 items-center justify-between border px-4 font-bold ${decisionFor(decisions, activeAsset) === "keep" ? "border-[#d8e65b] bg-[#d8e65b] text-black" : "border-white/25 hover:bg-[#d8e65b] hover:text-black"}`}><span>유지하고 다음</span><span className="font-mono text-xs">K</span></button>
              <button onClick={() => reviewActive("exclude")} className={`flex h-12 items-center justify-between border px-4 font-bold ${decisionFor(decisions, activeAsset) === "exclude" ? "border-[#ff6a4d] bg-[#ff6a4d] text-black" : "border-white/25 hover:bg-[#ff6a4d] hover:text-black"}`}><span>제외하고 다음</span><span className="font-mono text-xs">X</span></button>
              <button onClick={() => reviewActive("undecided")} className="flex h-11 items-center justify-between border border-white/15 px-4 text-sm text-white/55 hover:text-white"><span>미정 · 다음</span><span className="font-mono text-xs">U</span></button>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
