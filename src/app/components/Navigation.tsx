import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useLanguage } from "../i18n/LanguageContext";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

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
        isScrolled ? "bg-[#F5F5DC]/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
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

        <div className="flex items-center gap-4 sm:gap-8 lg:gap-12">
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
