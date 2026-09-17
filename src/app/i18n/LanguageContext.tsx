import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "ko";

const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void } | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("ido-language");
      return saved === "en" ? "en" : "ko";
    } catch {
      return "ko";
    }
  });

  useEffect(() => {
    document.documentElement.lang = language;
    try { localStorage.setItem("ido-language", language); } catch { /* storage is optional */ }
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}

export function localized<T>(language: Language, value: { en: T; ko: T }) {
  return value[language] ?? value.en;
}
