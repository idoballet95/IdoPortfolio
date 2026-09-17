import { Check, ChevronDown, Copy } from "lucide-react";
import { useState } from "react";
import type { Language } from "../i18n/LanguageContext";

export function PromptDisclosure({ prompt, language }: { prompt: string; language: Language }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!prompt) return;
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="border-t border-black/20 py-8">
      <button onClick={() => setOpen((value) => !value)} aria-expanded={open} className="flex w-full items-center justify-between gap-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4">
        <div>
          <p className="editorial-kicker">PROMPT ARCHIVE</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-.045em]">{language === "ko" ? "전체 프롬프트 보기" : "View the full prompt"}</h2>
        </div>
        <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="mt-6 border border-black/12 bg-[#f2f0e6]">
          <div className="flex justify-end border-b border-black/10 p-3">
            <button onClick={copy} className="inline-flex items-center gap-2 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[.1em] hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2">
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{copied ? "COPIED" : "COPY"}
            </button>
          </div>
          <pre className="max-h-[34rem] overflow-auto whitespace-pre-wrap break-words p-5 font-mono text-[12px] leading-6 text-black/72 sm:p-7">{prompt || (language === "ko" ? "프롬프트를 불러오지 못했습니다." : "The prompt could not be loaded.")}</pre>
        </div>
      )}
    </section>
  );
}
