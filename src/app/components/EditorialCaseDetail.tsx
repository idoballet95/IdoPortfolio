import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import type { EditorialCase } from "../data/portfolio-evidence";
import { pick } from "../data/portfolio-evidence";
import { useLanguage } from "../i18n/LanguageContext";

export function EditorialCaseDetail({ item }: { item: EditorialCase }) {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <main id="main-content" className="min-h-screen bg-[#f7f4eb] pb-24 pt-28 text-[#151510]">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <button onClick={() => navigate("/work")} className="mb-10 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[.12em] hover:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4"><ArrowLeft className="h-4 w-4" /> {language === "ko" ? "AI WORKS" : "AI WORKS"}</button>

        <header className="grid gap-10 border-b border-black/15 pb-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="editorial-kicker">{pick(item.eyebrow, language)}</p>
            <h1 className="mt-6 max-w-[12ch] text-[clamp(3.4rem,7vw,7.5rem)] font-black leading-[.86] tracking-[-.075em]">{pick(item.title, language)}</h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-lg leading-8 text-black/66">{pick(item.summary, language)}</p>
            <p className="mt-6 text-sm leading-7"><strong>ROLE</strong><br />{pick(item.role, language)}</p>
          </div>
        </header>

        <section className="grid gap-10 py-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img src={item.heroImage} alt={pick(item.heroAlt, language)} className="w-full bg-[#dedcca] object-cover" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="editorial-kicker">PRODUCTION FLOW</p>
            <ol className="mt-6">
              {item.steps.map((step, index) => (
                <li key={pick(step.title, language)} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-black/15 py-5">
                  <span className="font-mono text-[10px] text-black/38">0{index + 1}</span>
                  <div><h2 className="text-lg font-black tracking-[-.025em]">{pick(step.title, language)}</h2><p className="mt-2 text-sm leading-7 text-black/60">{pick(step.body, language)}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-y border-black/15 py-14">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3"><p className="editorial-kicker">BEFORE → AFTER</p><h2 className="mt-4 text-4xl font-black tracking-[-.055em]">{language === "ko" ? "문장의 기준을 바꿉니다." : "Change the standard of the sentence."}</h2></div>
            <div className="grid gap-5 lg:col-span-8 lg:col-start-5 sm:grid-cols-2">
              <blockquote className="bg-[#e8e4d8] p-6 text-lg leading-8 text-black/46"><span className="mb-8 block font-mono text-[10px] font-bold uppercase tracking-[.12em]">BEFORE</span>“{pick(item.before, language)}”</blockquote>
              <blockquote className="bg-[#d8e65b] p-6 text-lg font-semibold leading-8"><span className="mb-8 block font-mono text-[10px] font-bold uppercase tracking-[.12em]">AFTER</span>“{pick(item.after, language)}”</blockquote>
              <p className="text-sm leading-7 text-black/60 sm:col-span-2">{pick(item.decision, language)}</p>
            </div>
          </div>
        </section>

        {item.images && (
          <section className="py-14">
            <p className="editorial-kicker">IMAGE PACKAGE</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {item.images.map((image) => <figure key={image.src}><img src={image.src} alt={pick(image.alt, language)} loading="lazy" className="aspect-square w-full object-cover" /><figcaption className="mt-3 text-sm leading-6 text-black/58">{pick(image.note, language)}</figcaption></figure>)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
