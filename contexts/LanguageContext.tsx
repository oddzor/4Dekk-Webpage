"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Norsk er standard og alt SEO-relevant serveres på norsk. Engelsk er kun en
// klient-side visning for besøkende – ingen URL-endring, ingen hreflang, så
// søkemotorer ser alltid den norske versjonen.
type Language = "no" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "no",
  setLanguage: () => {},
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("no");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("language");
      if (stored === "en") {
        setLanguageState("en");
        document.documentElement.lang = "en";
      }
    } catch {
      // localStorage utilgjengelig – behold norsk
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("language", lang);
    } catch {
      // ignorer
    }
    document.documentElement.lang = lang === "en" ? "en" : "no";
  };

  const toggleLanguage = () => setLanguage(language === "no" ? "en" : "no");

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
