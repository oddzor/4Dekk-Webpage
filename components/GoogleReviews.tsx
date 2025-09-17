'use client'

import { useState, useEffect } from 'react'
import TestimonialCard from './TestimonialCard'
import { useLanguage } from '@/contexts/LanguageContext'

interface GoogleReview {
  name: string
  rating: number
  text: {
    text: string
    languageCode: string
  }
  relativePublishTimeDescription: string
  authorAttribution: {
    displayName: string
    photoUri?: string
  }
  publishTime: string
}

interface GoogleReviewsResponse {
  success: boolean
  reviews: GoogleReview[]
  rating: number
  totalRatings: number
  cached?: boolean
  lastUpdated?: string
}

export default function GoogleReviewsSection() {
  const { language } = useLanguage()
  const [reviews, setReviews] = useState<GoogleReview[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [overallRating, setOverallRating] = useState(0)
  const [totalRatings, setTotalRatings] = useState(0)

  const content = {
    no: {
      title: "Hva Våre Kunder Sier",
      description: "Her er hva våre fornøyde kunder har å si om våre tjenester.",
      loading: "Laster Google anmeldelser...",
      error: "Kunne ikke laste Google anmeldelser. Vennligst prøv igjen senere.",
      noReviews: "Ingen Google anmeldelser funnet for øyeblikket.",
      basedOn: "Basert på {totalRatings} anmeldelser på Google",
      reviewTitle: "Google Anmeldelse - {time}"
    },
    en: {
      title: "What Our Customers Say",
      description: "Here's what our satisfied customers have to say about our services.",
      loading: "Loading Google reviews...",
      error: "Could not load Google reviews. Please try again later.",
      noReviews: "No Google reviews found at the moment.",
      basedOn: "Based on {totalRatings} reviews on Google",
      reviewTitle: "Google Review - {time}"
    }
  }
  
  const t = content[language]

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/reviews-cached`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: GoogleReviewsResponse = await response.json()
        
        if (data.success && data.reviews) {
          setReviews(data.reviews)
          setOverallRating(data.rating)
          setTotalRatings(data.totalRatings)
          console.log(`Loaded ${data.reviews.length} reviews (cached: ${data.cached})`)
        } else {
          throw new Error('Failed to fetch reviews')
        }
      } catch (err) {
        console.error('Error fetching reviews:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch reviews')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  useEffect(() => {
    if (reviews.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        )
      }, 5000)

      return () => clearInterval(timer)
    }
  }, [reviews.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    )
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex justify-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <section className="text-white section-padding bg-primary">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl font-headings">
              {t.title}
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-200">
              {t.loading}
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="text-white section-padding bg-primary">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl font-headings">
              {t.title}
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-200">
              {t.error}
            </p>
            <p className="mt-4 text-sm text-gray-300">
              {language === 'no' ? 'Feil:' : 'Error:'} {error}
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (!reviews || reviews.length === 0) {
    return (
      <section className="text-white section-padding bg-primary">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl font-headings">
              {t.title}
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-200">
              {t.noReviews}
            </p>
          </div>
        </div>
      </section>
    )
  }

  const currentReview = reviews[currentIndex]

  return (
    <section className="text-white section-padding bg-primary">
      <div className="container-custom">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl font-headings">
            {t.title}
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-200">
           {t.description}
          </p>
          
          {overallRating > 0 && (
            <div className="inline-block p-4 mt-6 rounded-lg bg-white/10">
              <div className="flex items-center justify-center mb-2 space-x-2">
                {renderStars(overallRating)}
                <span className="text-2xl font-bold text-accent">{overallRating.toFixed(1)}</span>
              </div>
              <p className="text-sm text-gray-200">
                {t.basedOn.replace('{totalRatings}', totalRatings.toString())}
              </p>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="text-center">
              <TestimonialCard
                quote={currentReview.text.text}
                name={currentReview.authorAttribution.displayName}
                rating={currentReview.rating}
                title={t.reviewTitle.replace('{time}', currentReview.relativePublishTimeDescription)}
              />
            </div>

            {reviews.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-0 p-2 transition-colors duration-200 transform -translate-x-12 -translate-y-1/2 rounded-full top-1/2 bg-white/10 hover:bg-white/20"
                  aria-label={language === 'no' ? 'Forrige anmeldelse' : 'Previous review'}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={goToNext}
                  className="absolute right-0 p-2 transition-colors duration-200 transform translate-x-12 -translate-y-1/2 rounded-full top-1/2 bg-white/20"
                  aria-label={language === 'no' ? 'Neste anmeldelse' : 'Next review'}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="flex justify-center mt-8 space-x-2">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-4 h-4 rounded-full transition-colors duration-200 ${
                        index === currentIndex ? 'bg-accent' : 'bg-white/30'
                      }`}
                      aria-label={language === 'no' ? `Gå til anmeldelse ${index + 1}` : `Go to review ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="mb-6 text-lg text-gray-200">
            {language === 'no' ? 'Bli en av våre fornøyde kunder.' : 'Become one of our satisfied customers.'}
          </p>
          <a href="/booking" className="btn-accent whitespace-nowrap min-w-[180px]">
            {language === 'no' ? 'Bestill Din Time I Dag' : 'Book Your Appointment Today'}
          </a>
        </div>
      </div>
    </section>
  )
}


