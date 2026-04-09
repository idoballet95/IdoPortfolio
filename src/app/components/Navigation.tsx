import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
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
          onClick={() => scrollToSection("hero")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-3xl tracking-tight"
          style={{ fontWeight: 700 }}
        >
          ido.
        </motion.button>

        <div className="flex items-center gap-8 lg:gap-12">
          {["AI Works", "Sports Picks", "Contact"].map((item, index) => (
            <motion.button
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm tracking-wide transition-opacity hover:opacity-70"
              style={{ fontWeight: 500 }}
            >
              {item}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
