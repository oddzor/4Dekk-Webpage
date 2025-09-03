'use client'

import { useState, useEffect } from 'react'

export default function FloatingPriceButton() {
  const [isVisible, setIsVisible] = useState(true)

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing')
    if (pricingSection) {
      pricingSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const pricingSection = document.getElementById('pricing')
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect()
        setIsVisible(rect.top > window.innerHeight || rect.bottom < 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToPricing}
      className="fixed z-50 px-3 py-2 text-xs font-medium text-black transition-all duration-300 ease-in-out transform border rounded-md shadow-lg opacity-75 bottom-6 right-6 bg-accent/80 hover:bg-accent hover:shadow-xl hover:scale-105 backdrop-blur-sm border-accent/20 hover:opacity-100"
      aria-label="Se våre priser"
    >
      Se Våre Priser
    </button>
  )
}
