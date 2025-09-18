'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import ReactCountryFlag from 'react-country-flag'

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg text-text hover:text-accent hover:bg-gray-800/50"
      aria-label={`Switch to ${language === 'no' ? 'English' : 'Norwegian'}`}
    >
      <div className="flex items-center gap-1">
        <ReactCountryFlag
          countryCode={language === 'no' ? 'GB' : 'NO'}
          svg
          style={{
            width: '20px',
            height: '15px',
          }}
          title={language === 'no' ? 'English' : 'Norwegian'}
        />
        <span className="text-xs font-semibold">
          {language === 'no' ? 'EN' : 'NO'}
        </span>
      </div>
    </button>
  )
}
