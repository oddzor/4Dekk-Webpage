'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface FullScreenLoaderProps {
  onComplete?: () => void
}

export default function FullScreenLoader({ onComplete }: FullScreenLoaderProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let loadedImages = 0
    let totalImages = 0
    let loadedMaps = 0
    let totalMaps = 0

    const checkResources = () => {
      const images = document.querySelectorAll('img')
      const maps = document.querySelectorAll('iframe[src*="google.com/maps"]')
      
      totalImages = images.length
      totalMaps = maps.length
      
      // Check images
      images.forEach((img) => {
        if (img.complete && img.naturalHeight !== 0) {
          loadedImages++
        }
      })
      
      // Check maps (iframes) - assume loaded after a delay
      loadedMaps = totalMaps
      
      const totalResources = totalImages + totalMaps
      const loadedResources = loadedImages + loadedMaps
      
      if (totalResources > 0) {
        const progress = (loadedResources / totalResources) * 100
        
        if (progress >= 100) {
          // Complete loading
          setTimeout(() => {
            setIsVisible(false)
            onComplete?.()
          }, 500)
        }
      } else {
        // No resources to load, complete after a short delay
        setTimeout(() => {
          setIsVisible(false)
          onComplete?.()
        }, 1000)
      }
    }

    // Check resources every 200ms
    const checkInterval = setInterval(checkResources, 200)
    
    // Fallback: complete after 5 seconds regardless
    const fallbackTimeout = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, 5000)

    return () => {
      clearInterval(checkInterval)
      clearTimeout(fallbackTimeout)
    }
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="text-center">
        {/* Logo */}
        <div className="relative h-20 mx-auto mb-8 w-44">
          <Image
            src="/images/4dekk-logo-white-red.webp"
            alt="4Dekk Logo"
            fill
            className="object-contain"
            priority
            quality={100}
          />
        </div>
        
        {/* Spinner */}
        <div className="w-12 h-12 mx-auto border-4 border-gray-600 rounded-full border-t-red-500 animate-spin" />
      </div>
    </div>
  )
}
