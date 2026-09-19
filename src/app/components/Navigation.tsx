import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { useLanguage } from "../i18n/LanguageContext";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [eatsOpen, setEatsOpen] = useState(false);
  const eatsRef = useRef<HTMLDivElement>(null);

  // Close the i.do.eats menu on outside click or Escape
  useEffect(() => {
    if (!eatsOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!eatsRef.current?.contains(event.target as Node)) setEatsOpen(false);
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setEatsOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [eatsOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-black/[0.06] bg-[#F5F1E7]/96 backdrop-blur-xl shadow-sm"
          : "border-b border-black/[0.06] bg-[#F5F1E7]/82 backdrop-blur-xl"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-6 flex items-center justify-between">
        <motion.button
          onClick={() => {
            if (location.pathname !== "/") {
              navigate("/");
              return;
            }

            scrollToSection("hero");
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-3xl tracking-tight"
          style={{ fontWeight: 700 }}
        >
          i.do
        </motion.button>

        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          {["AI Works", "Sports Picks", "Contact"].map((item, index) => (
            <motion.button
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              onClick={() => item === "AI Works" ? navigate("/work") : item === "Sports Picks" ? navigate("/sports-picks") : scrollToSection("contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`text-xs tracking-wide transition-opacity hover:opacity-70 sm:text-sm ${(item === "AI Works" && location.pathname.startsWith("/work")) || (item === "Sports Picks" && location.pathname === "/sports-picks") ? "border-b border-current" : ""}`}
              style={{ fontWeight: 500 }}
            >
              {item}
            </motion.button>
          ))}
          <a
            href="https://www.instagram.com/yena.inart/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden whitespace-nowrap text-sm font-medium transition-opacity hover:opacity-55 md:inline-flex"
          >
            Yena IG ↗
          </a>
          <div ref={eatsRef} className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setEatsOpen((value) => !value)}
              aria-haspopup="menu"
              aria-expanded={eatsOpen}
              className="whitespace-nowrap text-sm font-medium transition-opacity hover:opacity-55"
            >
              i.do.eats <span className={`inline-block transition-transform duration-200 ${eatsOpen ? "rotate-180" : ""}`}>▾</span>
            </button>
            {eatsOpen && (
              <div role="menu" className="absolute right-0 top-full mt-3 min-w-[11rem] border border-black/15 bg-[#F5F1E7] shadow-lg">
                {[
                  { label: language === "ko" ? "웹사이트" : "Website", href: "https://idoeats.netlify.app" },
                  { label: "Instagram", href: "https://www.instagram.com/i.do.eats/" },
                ].map((item) => (
                  <a
                    key={item.href}
                    role="menuitem"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setEatsOpen(false)}
                    className="flex items-center justify-between gap-6 px-4 py-3 text-sm font-medium transition-colors hover:bg-black hover:text-white [&:not(:last-child)]:border-b [&:not(:last-child)]:border-black/10"
                  >
                    {item.label} <span className="text-xs">↗</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 border-l border-black/15 pl-3 font-mono text-[10px] font-bold tracking-[.08em] sm:pl-5 sm:text-xs" aria-label="Language">
            <button onClick={() => setLanguage("en")} aria-pressed={language === "en"} className={language === "en" ? "text-black" : "text-black/35 hover:text-black/70"}>ENG</button>
            <span className="text-black/20">/</span>
            <button onClick={() => setLanguage("ko")} aria-pressed={language === "ko"} className={language === "ko" ? "text-black" : "text-black/35 hover:text-black/70"}>KOR</button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
