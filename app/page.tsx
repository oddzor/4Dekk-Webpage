'use client'

import dynamic from 'next/dynamic'
import { Suspense, useDeferredValue, useState, useEffect } from 'react'
import HeroSection from '@/components/HeroSection'
import DynamicMetadata from '@/components/DynamicMetadata'

const ServicesSection = dynamic(() => import('@/components/ServicesSection'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-800" />
})
const PricingSection = dynamic(() => import('@/components/PricingSection'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-800" />
})
const GoogleReviewsSection = dynamic(() => import('@/components/GoogleReviews'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-800" />
})
const FloatingPriceButton = dynamic(() => import('@/components/FloatingPriceButton'), {
  ssr: false
})

export default function Home() {
  const [showContent, setShowContent] = useState(false)
  const deferredShowContent = useDeferredValue(showContent)

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if ((window as unknown as { scheduleTask?: Function }).scheduleTask) {
        ((window as unknown as { scheduleTask: Function }).scheduleTask)(() => setShowContent(true), 'background');
      } else {
        setShowContent(true);
      }
    }, 200);
    
    return () => clearTimeout(timer1);
  }, [])

  return (
    <div>
      <DynamicMetadata page="home" />
      <HeroSection />
      {deferredShowContent && (
        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-800" />}>
          <ServicesSection />
        </Suspense>
      )}
      {deferredShowContent && (
        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-800" />}>
          <PricingSection />
        </Suspense>
      )}
      {deferredShowContent && (
        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-800" />}>
          <GoogleReviewsSection />
        </Suspense>
      )}
      <FloatingPriceButton />
    </div>
  )
}