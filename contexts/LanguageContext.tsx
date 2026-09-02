"use client";

import { createContext, useContext } from "react";

// Nettstedet er norsk-only. Konteksten beholdes så eksisterende komponenter
// som kaller useLanguage() fortsatt fungerer uten endring; den returnerer
// alltid "no".
type Language = "no" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const noop = () => {};

const VALUE: LanguageContextType = {
  language: "no",
  setLanguage: noop,
  toggleLanguage: noop,
};

const LanguageContext = createContext<LanguageContextType>(VALUE);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <LanguageContext.Provider value={VALUE}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
