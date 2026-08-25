import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Youtube, Instagram, FileText, Send } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export function Contact() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setIsSubmitted(false);
    }, 3000);
  };

  const socialLinks = [
    {
      name: "YouTube",
      icon: Youtube,
      url: "#",
      color: "#FF0000",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "#",
      color: "#E4405F",
    },
    {
      name: "Naver Blog",
      icon: FileText,
      url: "#",
      color: "#03C75A",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-32 px-8 lg:px-16"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-[800px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2
            className="mb-4 tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700 }}
          >
            Get in Touch
          </h2>
          <p className="opacity-70 max-w-xl mx-auto" style={{ fontSize: "1.125rem", fontWeight: 300 }}>
            {language === "en" ? "Stay updated with the latest picks and creative work" : "새로운 추천과 크리에이티브 작업 소식을 받아보세요"}
          </p>
        </motion.div>

        {/* Email Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="mb-16 max-w-md mx-auto"
        >
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === "en" ? "Enter your email" : "이메일을 입력하세요"}
              required
              className="flex-1 px-6 py-4 bg-[#FFFFFF] rounded-2xl border-2 border-transparent focus:border-[#333333] outline-none transition-all"
              style={{ fontWeight: 400 }}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-4 bg-[#333333] text-[#F5F5DC] rounded-2xl transition-all hover:shadow-lg flex items-center gap-2"
              style={{ fontWeight: 500 }}
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
          {isSubmitted && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm opacity-70"
            >
              {language === "en" ? "Thank you for subscribing!" : "구독해 주셔서 감사합니다!"}
            </motion.p>
          )}
        </motion.form>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex justify-center gap-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 bg-[#FFFFFF] rounded-full flex items-center justify-center transition-all hover:shadow-lg"
                  aria-label={social.name}
                >
                  <Icon className="w-6 h-6" style={{ color: social.color }} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="pt-8 border-t border-[#333333]/10"
        >
          <p className="opacity-50 text-sm" style={{ fontWeight: 300 }}>
            © {new Date().getFullYear()} i.do All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
