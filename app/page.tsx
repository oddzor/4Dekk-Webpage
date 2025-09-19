'use client'

import dynamic from 'next/dynamic'
import { Suspense, useDeferredValue, useState, useEffect } from 'react'
import HeroSection from '@/components/HeroSection'
import DynamicMetadata from '@/components/DynamicMetadata'

const ServicesSection = dynamic(() => import('@/components/ServicesSection'), {
  loading: () => <div className="bg-gray-800 h-96 animate-pulse" />
})
const PricingSection = dynamic(() => import('@/components/PricingSection'), {
  loading: () => <div className="bg-gray-800 h-96 animate-pulse" />
})
const GoogleReviewsSection = dynamic(() => import('@/components/GoogleReviews'), {
  loading: () => <div className="bg-gray-800 h-96 animate-pulse" />
})
const FloatingPriceButton = dynamic(() => import('@/components/FloatingPriceButton'), {
  ssr: false
})

export default function Home() {
  const [showContent, setShowContent] = useState(false)
  const deferredShowContent = useDeferredValue(showContent)

  useEffect(() => {
    const timer1 = setTimeout(() => {
      interface SchedulerPostTaskOptions {
        priority?: 'user-blocking' | 'user-visible' | 'background';
      }
      
      interface Scheduler {
        postTask(callback: () => void, options?: SchedulerPostTaskOptions): void;
      }
      
      interface WindowWithScheduler extends Window {
        scheduler?: Scheduler;
      }
      
      const windowWithScheduler = window as WindowWithScheduler;
      
      if ('scheduler' in window && windowWithScheduler.scheduler?.postTask) {
        windowWithScheduler.scheduler.postTask(() => setShowContent(true), { priority: 'background' });
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
        <Suspense fallback={<div className="bg-gray-800 h-96 animate-pulse" />}>
          <ServicesSection />
        </Suspense>
      )}
      {deferredShowContent && (
        <Suspense fallback={<div className="bg-gray-800 h-96 animate-pulse" />}>
          <PricingSection />
        </Suspense>
      )}
      {deferredShowContent && (
        <Suspense fallback={<div className="bg-gray-800 h-96 animate-pulse" />}>
          <GoogleReviewsSection />
        </Suspense>
      )}
      <FloatingPriceButton />
    </div>
  )
}