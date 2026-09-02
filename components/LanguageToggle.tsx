"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="px-2 py-1 text-sm font-semibold border rounded text-text border-gray-600 hover:text-accent hover:border-accent transition-colors duration-200"
      aria-label={
        language === "no" ? "Switch to English" : "Bytt til norsk"
      }
    >
      {language === "no" ? "EN" : "NO"}
    </button>
  );
}
