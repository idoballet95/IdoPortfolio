import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, FileText, Instagram, Mail, X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const instagramProfiles = [
  { name: "i.do.eats", description: { en: "Food finds", ko: "맛집 기록" }, url: "https://www.instagram.com/i.do.eats/" },
  { name: "i.do.picks", description: { en: "Sports AI creatives", ko: "Sports AI creatives" }, url: "https://www.instagram.com/i.do.picks" },
];

export function Contact() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isInstagramOpen, setIsInstagramOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="bg-white px-8 py-24 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[800px] text-center">
        <motion.header initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-12">
          <h2 className="tracking-[-.055em]" style={{ fontSize: "clamp(2.75rem, 6vw, 4.75rem)", fontWeight: 700 }}>Open to Collaborations</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-8 text-black/60">
            {language === "en" ? "Interesting collaborations and projects are always welcome." : "재미있는 협업과 프로젝트는 언제나 환영입니다."}
          </p>
        </motion.header>

        <motion.a href="mailto:idoballet95@gmail.com" initial={{ opacity: 0, y: 24 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="group mx-auto inline-flex items-center gap-3 rounded-full border border-black/12 px-6 py-3.5 text-base font-semibold transition-colors hover:border-black hover:bg-black hover:text-white sm:text-lg">
          <Mail className="h-5 w-5" /> idoballet95@gmail.com
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </motion.a>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="mb-16 mt-12 flex items-start justify-center gap-5">
          <div className="relative">
            <button type="button" onClick={() => setIsInstagramOpen((open) => !open)} aria-expanded={isInstagramOpen} aria-haspopup="dialog" className="grid h-12 w-12 place-items-center rounded-full border border-black/10 text-[#E4405F] transition-all hover:-translate-y-1 hover:border-black/25 hover:shadow-lg" aria-label="Choose Instagram profile">
              <Instagram className="h-5 w-5" />
            </button>
            {isInstagramOpen && (
              <motion.div initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} role="dialog" aria-label="Instagram profiles" onKeyDown={(event) => event.key === "Escape" && setIsInstagramOpen(false)} className="absolute left-1/2 top-full z-20 mt-3 w-[min(22rem,calc(100vw-3rem))] -translate-x-1/2 rounded-2xl border border-black/10 bg-white p-2 text-left shadow-[0_20px_60px_rgba(0,0,0,.14)]">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-black/45">Choose Instagram</span>
                  <button type="button" onClick={() => setIsInstagramOpen(false)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-black/5" aria-label="Close"><X className="h-3.5 w-3.5" /></button>
                </div>
                {instagramProfiles.map((profile) => (
                  <a key={profile.name} href={profile.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-[#F5F5DC]">
                    <span><strong className="block text-sm">{profile.name}</strong><span className="mt-0.5 block text-xs text-black/50">{profile.description[language]}</span></span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </motion.div>
            )}
          </div>
          <a href="https://blog.naver.com/idohere" target="_blank" rel="noopener noreferrer" className="grid h-12 w-12 place-items-center rounded-full border border-black/10 text-[#03C75A] transition-all hover:-translate-y-1 hover:border-black/25 hover:shadow-lg" aria-label="Naver Blog"><FileText className="h-5 w-5" /></a>
        </motion.div>

        <motion.footer initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.45 }} className="border-t border-black/10 pt-8">
          <p className="text-sm font-light text-black/45">© {new Date().getFullYear()} i.do All rights reserved.</p>
        </motion.footer>
      </div>
    </section>
  );
}
