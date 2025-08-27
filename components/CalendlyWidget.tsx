'use client'

import { useState } from 'react'

interface CalendlyWidgetProps {
  url: string
  className?: string
}

export default function CalendlyWidget({ url, className = '' }: CalendlyWidgetProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleBookingClick = () => {
    setIsLoading(true)
    // Open Calendly in a new tab
    window.open(url, '_blank', 'noopener,noreferrer')
    // Reset loading state after a short delay
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className={`text-center ${className}`}>
      <div className="mb-8">
        <h3 className="text-2xl font-headings font-semibold text-headings mb-4">
          Klar til å Bestille Din Service?
        </h3>
        <p className="text-text mb-6 max-w-2xl mx-auto">
          Klikk på knappen nedenfor for å åpne vår bestillingskalender i en ny fane. 
          Du vil kunne velge din servicetype, velge et passende tidspunkt, 
          og motta bekreftelse via e-post og SMS.
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleBookingClick}
          disabled={isLoading}
          className={`
            btn-accent text-lg px-8 py-4 font-semibold
            ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105'}
            transition-all duration-300 transform
          `}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-darker" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Åpner Bestillingskalender...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              📅 Bestill Din Time
            </span>
          )}
        </button>

        <div className="text-sm text-gray-400">
          Åpner i ny fane • Sikker bestillingssystem
        </div>
      </div>

      {/* Service Types Preview */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card-dark p-4 text-center">
          <div className="text-2xl mb-2">🔍</div>
          <h4 className="font-headings font-semibold text-headings mb-1">EU Kontroll</h4>
          <p className="text-xs text-text">60 min</p>
        </div>
        <div className="card-dark p-4 text-center">
          <div className="text-2xl mb-2">🛞</div>
          <h4 className="font-headings font-semibold text-headings mb-1">Dekkskifte</h4>
          <p className="text-xs text-text">15-30 min</p>
        </div>
        <div className="card-dark p-4 text-center">
          <div className="text-2xl mb-2">🛢️</div>
          <h4 className="font-headings font-semibold text-headings mb-1">Oljeskifte</h4>
          <p className="text-xs text-text">30 min</p>
        </div>
        <div className="card-dark p-4 text-center">
          <div className="text-2xl mb-2">🛑</div>
          <h4 className="font-headings font-semibold text-headings mb-1">Bremseservice</h4>
          <p className="text-xs text-text">90 min</p>
        </div>
        <div className="card-dark p-4 text-center">
          <div className="text-2xl mb-2">🔧</div>
          <h4 className="font-headings font-semibold text-headings mb-1">Diagnostikk</h4>
          <p className="text-xs text-text">45 min</p>
        </div>
        <div className="card-dark p-4 text-center">
          <div className="text-2xl mb-2">🚨</div>
          <h4 className="font-headings font-semibold text-headings mb-1">Akutt</h4>
          <p className="text-xs text-text">120 min</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 p-6 card-dark">
        <h4 className="font-headings font-semibold text-headings mb-3">Hva Du Kan Forvente</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-text">
          <div className="flex items-start">
            <div className="text-accent mr-2 mt-1">✓</div>
            <span>Velg din servicetype og varighet</span>
          </div>
          <div className="flex items-start">
            <div className="text-accent mr-2 mt-1">✓</div>
            <span>Velg fra tilgjengelige tidsluker</span>
          </div>
          <div className="flex items-start">
            <div className="text-accent mr-2 mt-1">✓</div>
            <span>Skriv inn din kontaktinformasjon</span>
          </div>
          <div className="flex items-start">
            <div className="text-accent mr-2 mt-1">✓</div>
            <span>Motta bekreftelse via e-post & SMS</span>
          </div>
        </div>
      </div>
    </div>
  )
} 