'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-dark">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <Image
          src="/images/hero-bg.webp"
          alt="Auto repair shop with technicians working"
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
      <div className="relative z-20 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headings font-bold mb-6 text-shadow-lg">
          4Dekk Auto Repair
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-shadow max-w-3xl mx-auto">
          Professional Auto Repair & Tire Services
        </p>
        <p className="text-lg md:text-xl mb-12 text-gray-200 text-shadow max-w-2xl mx-auto">
          Quality workmanship, competitive pricing, and exceptional customer service. 
          Your trusted partner for all your automotive needs.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/booking" className="btn-accent text-lg px-8 py-4 border-glow">
            Book Appointment Now
          </Link>
          <Link href="/services" className="btn-secondary text-lg px-8 py-4">
            View Our Services
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center card-dark p-6">
            <div className="text-3xl font-bold text-accent mb-2">20+</div>
            <div className="text-gray-300">Years Experience</div>
          </div>
          <div className="text-center card-dark p-6">
            <div className="text-3xl font-bold text-accent mb-2">10K+</div>
            <div className="text-gray-300">Happy Customers</div>
          </div>
          <div className="text-center card-dark p-6">
            <div className="text-3xl font-bold text-accent mb-2">24/7</div>
            <div className="text-gray-300">Emergency Service</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
} 