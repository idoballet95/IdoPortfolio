import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";
import { editorialCases, pick } from "../data/portfolio-evidence";
import { useLanguage } from "../i18n/LanguageContext";

export function WritingSystems({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <section className="bg-[#f7f4eb] px-5 py-20 sm:px-8 lg:px-12 lg:py-28" aria-labelledby="writing-systems-heading">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid gap-8 border-b border-black/15 pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="editorial-kicker">WRITING &amp; SYSTEMS</p>
            <h2 id="writing-systems-heading" className="mt-4 text-[clamp(2.8rem,5vw,6rem)] font-black leading-[.9] tracking-[-.07em]">
              Beyond voice
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-black/58 lg:col-span-4 lg:col-start-9">
            {language === "ko"
              ? "보이스를 정의하고, 사실을 확인하고, 사진과 글의 순서를 맞추고, 사람 말투가 남을 때까지 수정합니다."
              : "Define the voice, verify the facts, align image and copy, then revise until the writing still sounds human."}
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {editorialCases.map((item, index) => (
            <article key={item.slug} className="group relative overflow-hidden border-t border-black bg-[#efefc9] p-6 sm:p-9">
              <button onClick={() => navigate(`/work/${item.slug}`)} className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4">
                <div className="flex items-start justify-between gap-6">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[.14em] text-black/45">0{index + 1} · {pick(item.eyebrow, language)}</p>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <h3 className="mt-16 max-w-[12ch] text-[clamp(2.3rem,4vw,4.8rem)] font-black leading-[.88] tracking-[-.065em]">{pick(item.title, language)}</h3>
                <p className="mt-8 max-w-xl text-sm leading-7 text-black/60 sm:text-base">{pick(item.summary, language)}</p>
                {!compact && (
                  <div className="mt-10 grid gap-4 border-t border-black/15 pt-5 sm:grid-cols-2">
                    <blockquote className="text-sm leading-6 text-black/45 line-through decoration-black/30">“{pick(item.before, language)}”</blockquote>
                    <blockquote className="text-sm font-semibold leading-6">“{pick(item.after, language)}”</blockquote>
                  </div>
                )}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
