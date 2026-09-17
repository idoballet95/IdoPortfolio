import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { getWork, works } from "../data/works";
import { getWorkCopy } from "../data/work-copy";
import { getEditorialCase, pick, workEvidence } from "../data/portfolio-evidence";
import { useLanguage } from "../i18n/LanguageContext";
import { EditorialCaseDetail } from "./EditorialCaseDetail";
import { IterationCompare } from "./IterationCompare";
import { ProcessRail } from "./ProcessRail";
import { PromptDisclosure } from "./PromptDisclosure";

function cleanPrompt(source: string) {
  const blocks = [...source.matchAll(/```(?:text|markdown)?\s*([\s\S]*?)```/gi)].map((match) => match[1].trim());
  return blocks.sort((a, b) => b.length - a.length)[0] || source.trim();
}

export function WorkDetail() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const work = getWork(slug);
  const editorial = getEditorialCase(slug);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    setPrompt("");
    if (!work?.promptFile) return;
    fetch(work.promptFile)
      .then((response) => {
        if (!response.ok) throw new Error("Prompt request failed");
        return response.text();
      })
      .then((text) => setPrompt(cleanPrompt(text)))
      .catch(() => setPrompt(""));
  }, [work?.promptFile]);

  if (editorial) return <EditorialCaseDetail item={editorial} />;

  if (!work) {
    return (
      <main id="main-content" className="flex min-h-screen flex-col items-center justify-center bg-[#f7f4eb] px-6">
        <p className="font-mono text-xs">404 · WORK NOT FOUND</p>
        <button onClick={() => navigate("/work")} className="mt-7 border-b border-black pb-1 font-bold">{language === "en" ? "Back to works" : "작품 목록으로"}</button>
      </main>
    );
  }

  const copy = getWorkCopy(work.slug, language);
  const evidence = workEvidence[work.slug];
  const currentIndex = works.findIndex((item) => item.slug === work.slug);
  const nextWork = works[(currentIndex + 1) % works.length];

  return (
    <main id="main-content" className="min-h-screen bg-[#f7f4eb] pb-20 pt-28 text-[#151510]">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-12">
        <button onClick={() => navigate("/work")} className="mb-9 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[.12em] transition-opacity hover:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4"><ArrowLeft className="h-4 w-4" /> AI WORKS</button>

        <section className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="editorial-kicker">{work.eyebrow} · {work.duration}</p>
            <h1 className="mt-5 max-w-[13ch] text-[clamp(3.3rem,7vw,8rem)] font-black leading-[.85] tracking-[-.075em]">{work.title}</h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-lg leading-8 text-black/65">{copy?.description ?? work.description}</p>
            <p className="mt-6 text-sm leading-7"><strong>ROLE</strong><br />{copy?.role ?? work.role}</p>
          </div>
        </section>

        <section className="mt-12 overflow-hidden bg-black">
          <video src={work.video} poster={work.poster} controls playsInline className="aspect-video w-full bg-black object-contain" />
        </section>

        {evidence ? (
          <>
            <section className="grid gap-8 border-b border-black/15 py-14 lg:grid-cols-12">
              <div className="lg:col-span-3"><p className="editorial-kicker">BRIEF</p><p className="mt-4 text-lg font-semibold leading-8">{pick(evidence.brief, language)}</p></div>
              <div className="lg:col-span-5 lg:col-start-5"><p className="editorial-kicker">CREATIVE DECISION</p><p className="mt-4 text-lg leading-8 text-black/66">{pick(evidence.creativeDecision, language)}</p></div>
              <div className="lg:col-span-3 lg:col-start-10"><p className="editorial-kicker">FINAL DELIVERY</p><p className="mt-4 text-sm leading-7 text-black/60">{pick(evidence.delivery, language)}</p><div className="mt-6 flex flex-wrap gap-2">{work.tools.map((tool) => <span key={tool} className="border border-black/15 px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[.08em]">{tool}</span>)}</div></div>
            </section>

            {evidence.processAssets && (
              <section className="py-14">
                <div className="mb-8 grid gap-5 lg:grid-cols-12"><div className="lg:col-span-4"><p className="editorial-kicker">PROCESS</p><h2 className="mt-4 text-4xl font-black tracking-[-.055em]">{language === "ko" ? "결과가 되기 전의 작업" : "The work before the result"}</h2></div><p className="text-sm leading-7 text-black/58 lg:col-span-5 lg:col-start-7">{language === "ko" ? "기획, 레퍼런스, 후보 비교와 QC 자료를 최종 결과와 함께 봅니다." : "Concept, references, candidate comparison and QC are shown beside the final result."}</p></div>
                <ProcessRail assets={evidence.processAssets} language={language} />
              </section>
            )}

            {evidence.iterations?.map((pair, index) => (
              <section key={`${work.slug}-iteration-${index}`} className="py-14">
                <div className="mb-8"><p className="editorial-kicker">ITERATION</p><h2 className="mt-4 text-4xl font-black tracking-[-.055em]">{language === "ko" ? "초안에서 최종까지" : "From first pass to final"}</h2></div>
                <IterationCompare pair={pair} language={language} />
              </section>
            ))}
          </>
        ) : (
          <section className="grid gap-12 py-14 lg:grid-cols-12">
            <div className="lg:col-span-4"><p className="editorial-kicker">PRODUCTION PROCESS</p><h2 className="mt-4 text-4xl font-black tracking-[-.055em]">{language === "en" ? "Production process" : "제작 과정"}</h2></div>
            <div className="lg:col-span-7 lg:col-start-6"><ol>{(copy?.process ?? work.process).map((step, index) => <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-black/10 py-5"><span className="font-mono text-xs text-black/40">0{index + 1}</span><p className="leading-7">{step}</p></li>)}</ol><div className="mt-8 grid gap-7 sm:grid-cols-2"><div><p className="editorial-kicker">CHALLENGE</p><p className="mt-3 text-sm leading-7 text-black/60">{copy?.challenge ?? work.challenge}</p></div><div><p className="editorial-kicker">OUTCOME</p><p className="mt-3 text-sm leading-7 text-black/60">{copy?.outcome ?? work.outcome}</p></div></div></div>
          </section>
        )}

        {work.promptFile && <PromptDisclosure prompt={prompt} language={language} />}

        <button onClick={() => navigate(`/work/${nextWork.slug}`)} className="group flex w-full items-end justify-between border-t border-black/15 py-10 text-left focus-visible:outline-2 focus-visible:outline-offset-4"><div><p className="editorial-kicker">NEXT PROJECT</p><p className="mt-3 text-3xl font-black tracking-[-.05em] sm:text-5xl">{nextWork.title}</p></div><ArrowRight className="h-7 w-7 transition-transform group-hover:translate-x-2" /></button>
      </div>
    </main>
  );
}
