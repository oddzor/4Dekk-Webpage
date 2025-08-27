'use client'

import { useState, useEffect } from 'react'
import TestimonialCard from './TestimonialCard'

const testimonials = [
  {
    quote: "4Dekk Auto Repair sparte meg hundrevis av kroner på bremsereparasjonen min. Deres ærlige vurdering og kvalitetsarbeid gjorde meg til en kunde for livet.",
    name: "Sarah Johnson",
    rating: 5,
    title: "Regelmessig Kunde"
  },
  {
    quote: "Rask, profesjonell service og rettferdig prising. De diagnostiserte motorproblemet mitt raskt og hadde meg tilbake på veien samme dag.",
    name: "Mike Rodriguez",
    rating: 5,
    title: "Førstegangs Kunde"
  },
  {
    quote: "Den beste dekk-service i byen! De har alle store merker og deres montering og balansering er førsteklasses.",
    name: "Jennifer Davis",
    rating: 5,
    title: "Tilbakevendende Kunde"
  },
  {
    quote: "Jeg setter pris på deres åpenhet og oppmerksomhet på detaljer. De forklarte alt tydelig og prøvde ikke å selge unødvendige tjenester.",
    name: "Robert Wilson",
    rating: 5,
    title: "Fornøyd Kunde"
  }
]

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <section className="text-white section-padding bg-primary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl font-headings">
            Hva Våre Kunder Sier
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-200">
            Ikke bare ta vårt ord for det. Her er hva våre fornøyde kunder har å si om våre tjenester.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial */}
          <div className="text-center">
            <TestimonialCard
              quote={testimonials[currentIndex].quote}
              name={testimonials[currentIndex].name}
              rating={testimonials[currentIndex].rating}
              title={testimonials[currentIndex].title}
            />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 p-2 transition-colors duration-200 transform -translate-x-12 -translate-y-1/2 rounded-full top-1/2 bg-white/10 hover:bg-white/20"
            aria-label="Forrige anmeldelse"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-0 p-2 transition-colors duration-200 transform translate-x-12 -translate-y-1/2 rounded-full top-1/2 bg-white/10 hover:bg-white/20"
            aria-label="Neste anmeldelse"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-accent' : 'bg-white/30'
                }`}
                aria-label={`Gå til anmeldelse ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-lg text-gray-200">
            Bli med våre fornøyde kunder og opplev 4Dekk-forskjellen.
          </p>
          <a href="/booking" className="btn-accent">
            Bestill Din Service I Dag
          </a>
        </div>
      </div>
    </section>
  )
} 