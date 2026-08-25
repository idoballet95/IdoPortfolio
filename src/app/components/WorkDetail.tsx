import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { getWork, works } from "../data/works";
import { getWorkCopy } from "../data/work-copy";
import { useLanguage } from "../i18n/LanguageContext";

function cleanPrompt(source: string) {
  const blocks = [...source.matchAll(/```(?:text|markdown)?\s*([\s\S]*?)```/gi)].map((match) => match[1].trim());
  return blocks.sort((a, b) => b.length - a.length)[0] || source.trim();
}

export function WorkDetail() {
  const { slug = "" } = useParams(); const navigate = useNavigate(); const work = getWork(slug);
  const { language } = useLanguage();
  const [prompt, setPrompt] = useState(""); const [copied, setCopied] = useState(false);
  useEffect(() => { setPrompt(""); if (!work?.promptFile) return; fetch(work.promptFile).then((r) => r.text()).then((text) => setPrompt(cleanPrompt(text))).catch(() => setPrompt(language === "en" ? "Unable to load the prompt file." : "프롬프트 파일을 불러오지 못했습니다.")); }, [work?.promptFile, language]);
  if (!work) return <main id="main-content" className="flex min-h-screen flex-col items-center justify-center bg-white px-6"><p className="font-mono text-xs">404 · WORK NOT FOUND</p><button onClick={() => navigate("/work")} className="mt-7 border-b border-black pb-1 font-bold">{language === "en" ? "Back to works" : "작품 목록으로"}</button></main>;
  const copy = getWorkCopy(work.slug, language);
  const currentIndex = works.findIndex((item) => item.slug === work.slug); const nextWork = works[(currentIndex + 1) % works.length];
  const copyPrompt = async () => { if (!prompt) return; await navigator.clipboard.writeText(prompt); setCopied(true); window.setTimeout(() => setCopied(false), 1600); };
  return (
    <main id="main-content" className="min-h-screen bg-white pb-20 pt-24 text-[#111]">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-5">
        <button onClick={() => navigate("/work")} className="mb-7 inline-flex items-center gap-2 text-sm font-bold transition-opacity hover:opacity-50"><ArrowLeft className="h-4 w-4" /> ALL WORKS</button>
        <section className="grid gap-8 xl:grid-cols-[minmax(0,1.55fr)_minmax(24rem,.95fr)] xl:items-start">
          <div className="overflow-hidden rounded-[1.1rem] bg-black"><video src={work.video} poster={work.poster} controls playsInline className="aspect-video w-full bg-black object-contain" /></div>
          <aside><div className="mb-6 flex flex-wrap items-center gap-4"><strong className="text-sm">@i.do</strong><span className="font-mono text-xs text-black/45">{work.year}</span><span className="ml-auto rounded-full border border-black/10 px-4 py-2 font-mono text-[11px] font-bold">{work.tools[0].toUpperCase()}</span></div>
            <div className="flex h-[min(66vh,46rem)] flex-col rounded-[1.1rem] border border-black/10 bg-white"><div className="flex items-center gap-3 border-b border-black/10 px-5 py-4"><span className="font-mono text-xs font-bold tracking-[.12em]">PROMPT</span><span className="ml-auto rounded-lg bg-[#f4f4f4] px-3 py-2 text-xs font-bold">{language === "en" ? "ORIGINAL" : "원문"}</span><button onClick={copyPrompt} disabled={!prompt} className="inline-flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2 text-xs font-bold hover:bg-black hover:text-white disabled:opacity-35">{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{copied ? "COPIED" : "COPY"}</button></div>
              <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">{work.promptFile ? <pre className="whitespace-pre-wrap break-words font-mono text-[13px] leading-7 text-black/80">{prompt || (language === "en" ? "Loading final prompt…" : "최종 프롬프트를 불러오는 중…")}</pre> : <div className="grid h-full place-items-center text-center"><div><p className="font-mono text-xs font-bold">ARCHIVE IN PROGRESS</p><p className="mt-3 max-w-sm text-sm leading-6 text-black/50">{language === "en" ? "The final generation prompt is being recovered from the original project folder." : "최종 생성 프롬프트 기록을 원본 작업 폴더에서 복구 중입니다."}</p></div></div>}</div></div>
          </aside>
        </section>
        <header className="grid gap-8 border-b border-black/10 py-12 lg:grid-cols-12"><div className="lg:col-span-7"><p className="font-mono text-xs uppercase tracking-[.14em] text-black/45">{work.eyebrow} · {work.duration}</p><h1 className="mt-4 text-[clamp(3rem,7vw,7.5rem)] font-black leading-[.86] tracking-[-.075em]">{work.title}</h1></div><div className="lg:col-span-4 lg:col-start-9"><p className="text-lg leading-8 text-black/65">{copy?.description ?? work.description}</p><p className="mt-6 text-sm leading-7"><b>ROLE</b><br />{copy?.role ?? work.role}</p></div></header>
        <section className="grid gap-12 py-14 lg:grid-cols-12"><div className="lg:col-span-4"><p className="font-mono text-xs font-bold tracking-[.14em]">PRODUCTION PROCESS</p><h2 className="mt-4 text-4xl font-black tracking-[-.055em]">{language === "en" ? "Production process" : "제작 과정"}</h2></div><div className="lg:col-span-7 lg:col-start-6"><ol>{(copy?.process ?? work.process).map((step, index) => <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-black/10 py-5"><span className="font-mono text-xs text-black/40">0{index + 1}</span><p className="leading-7">{step}</p></li>)}</ol><div className="mt-8 grid gap-7 sm:grid-cols-2"><div><p className="font-mono text-xs font-bold">CHALLENGE</p><p className="mt-3 text-sm leading-7 text-black/60">{copy?.challenge ?? work.challenge}</p></div><div><p className="font-mono text-xs font-bold">OUTCOME</p><p className="mt-3 text-sm leading-7 text-black/60">{copy?.outcome ?? work.outcome}</p></div></div></div></section>
        <button onClick={() => navigate(`/work/${nextWork.slug}`)} className="group flex w-full items-end justify-between border-t border-black/15 py-10 text-left"><div><p className="font-mono text-xs text-black/45">NEXT PROJECT</p><p className="mt-3 text-3xl font-black tracking-[-.05em] sm:text-5xl">{nextWork.title}</p></div><ArrowRight className="h-7 w-7 transition-transform group-hover:translate-x-2" /></button>
      </div>
    </main>
  );
}
