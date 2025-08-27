'use client'

import { useState, useEffect } from 'react'
import TestimonialCard from './TestimonialCard'

const testimonials = [
  {
    quote: "4Dekk Auto Repair saved me hundreds of dollars on my brake repair. Their honest assessment and quality work made me a customer for life.",
    name: "Sarah Johnson",
    rating: 5,
    title: "Regular Customer"
  },
  {
    quote: "Fast, professional service and fair pricing. They diagnosed my engine problem quickly and had me back on the road the same day.",
    name: "Mike Rodriguez",
    rating: 5,
    title: "First-time Customer"
  },
  {
    quote: "The best tire service in town! They have all the major brands and their mounting and balancing is top-notch.",
    name: "Jennifer Davis",
    rating: 5,
    title: "Returning Customer"
  },
  {
    quote: "I appreciate their transparency and attention to detail. They explained everything clearly and didn't try to upsell unnecessary services.",
    name: "Robert Wilson",
    rating: 5,
    title: "Satisfied Customer"
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
    <section className="section-padding bg-primary text-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-headings font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about our services.
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
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
            aria-label="Next testimonial"
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
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-200 mb-6">
            Join our satisfied customers and experience the 4Dekk difference.
          </p>
          <a href="/booking" className="btn-accent">
            Book Your Service Today
          </a>
        </div>
      </div>
    </section>
  )
} 