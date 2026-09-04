"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const isNo = language === "no";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      role="switch"
      aria-checked={!isNo}
      aria-label={isNo ? "Switch to English" : "Bytt til norsk"}
      className="relative inline-flex items-center p-0.5 text-xs font-semibold rounded-full border border-white/10 bg-white/5 transition-all duration-200 hover:border-accent/50 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
    >
      <span
        aria-hidden="true"
        className={`absolute top-0.5 bottom-0.5 left-0.5 w-8 rounded-full bg-accent shadow-sm transition-transform duration-300 ease-out ${
          isNo ? "translate-x-0" : "translate-x-8"
        }`}
      />
      <span
        className={`relative z-10 w-8 py-1 text-center transition-colors duration-200 ${
          isNo ? "text-gray-darker" : "text-text"
        }`}
      >
        NO
      </span>
      <span
        className={`relative z-10 w-8 py-1 text-center transition-colors duration-200 ${
          isNo ? "text-text" : "text-gray-darker"
        }`}
      >
        EN
      </span>
    </button>
  );
}
