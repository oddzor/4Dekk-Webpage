'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center h-screen overflow-hidden bg-gradient-dark">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-black/70" />
        <Image
          src="/images/hero-bg.webp"
          alt="Bilverksted med teknikere som arbeider"
          fill
          className="object-cover"
          priority
          onError={(e) => {
            // Fallback to a solid color if image fails to load
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            target.parentElement!.style.backgroundColor = '#1a1a2e'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 px-4 text-center text-white">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/4dekk-logo.png"
            alt="4Dekk Logo"
            width={300}
            height={100}
            className="w-auto h-24 md:h-32 lg:h-40"
            priority
          />
        </div>
        <h1 className="mb-6 text-4xl font-bold md:text-6xl lg:text-7xl font-headings text-shadow-lg">
          Bilverksted og Dekkservice
        </h1>

        <p className="max-w-2xl mx-auto mb-12 text-lg text-gray-200 md:text-xl text-shadow">
          Kvalitetsarbeid, konkurransedyktig prising og utmerket kundeservice. 
          Din pålitelige partner for alle dine bilbehov.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/booking" className="px-8 py-4 text-lg btn-accent border-glow">
            Bestill Time Nå
          </Link>
          <Link href="/services" className="px-8 py-4 text-lg btn-secondary">
            Se Våre Tjenester
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto mt-16 md:grid-cols-3">
          <div className="p-6 text-center card-dark">
            <div className="mb-2 text-3xl font-bold text-accent">10</div>
            <div className="text-gray-300">Års Erfaring</div>
          </div>
          <div className="p-6 text-center card-dark">
            <div className="mb-2 text-3xl font-bold text-accent">1000+</div>
            <div className="text-gray-300">Fornøyde Kunder</div>
          </div>
          <div className="p-6 text-center card-dark">
            <div className="mb-2 text-3xl font-bold text-accent">08-16</div>
            <div className="text-gray-300">Mandag-Fredag</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute z-20 transform -translate-x-1/2 bottom-8 left-1/2">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
} 