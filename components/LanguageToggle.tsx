'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg text-text hover:text-accent hover:bg-gray-800/50"
      aria-label={`Switch to ${language === 'no' ? 'English' : 'Norwegian'}`}
    >
      <div className="flex items-center gap-1">
        <span className="text-lg">
          {language === 'no' ? '🇬🇧' : '🇳🇴'}
        </span>
        <span className="text-xs font-semibold">
          {language === 'no' ? 'EN' : 'NO'}
        </span>
      </div>
    </button>
  )
}
