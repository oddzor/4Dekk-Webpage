'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'no' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('no')

  // Initialize language from URL parameter on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const langParam = urlParams.get('lang') as Language
      
      if (langParam === 'en' || langParam === 'no') {
        setLanguageState(langParam)
      } else {
        // Default to Norwegian if no language parameter
        setLanguageState('no')
      }
    }
  }, [])

  // Update language when URL changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleUrlChange = () => {
        const urlParams = new URLSearchParams(window.location.search)
        const langParam = urlParams.get('lang') as Language
        
        if (langParam === 'en' || langParam === 'no') {
          setLanguageState(langParam)
        } else {
          setLanguageState('no')
        }
      }

      // Listen for URL changes
      window.addEventListener('popstate', handleUrlChange)
      
      return () => {
        window.removeEventListener('popstate', handleUrlChange)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    
    // Update URL parameter
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      if (lang === 'no') {
        url.searchParams.delete('lang')
      } else {
        url.searchParams.set('lang', lang)
      }
      
      // Update URL without page reload
      window.history.pushState({}, '', url.toString())
    }
  }

  const toggleLanguage = () => {
    const newLang = language === 'no' ? 'en' : 'no'
    setLanguage(newLang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
