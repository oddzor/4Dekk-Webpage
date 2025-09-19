"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface FullScreenLoaderProps {
  onComplete?: () => void;
}

export default function FullScreenLoader({
  onComplete,
}: FullScreenLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    const checkCriticalResources = () => {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
          const heroImages = document.querySelectorAll(
            'img[src*="hero-image-1"], img[src*="4dekk-logo"]',
          );
          let criticalLoaded = 0;

          heroImages.forEach((img) => {
            const imageElement = img as HTMLImageElement;
            if (imageElement.complete && imageElement.naturalHeight !== 0) {
              criticalLoaded++;
            }
          });

          if (criticalLoaded >= 1 || heroImages.length === 0) {
            setIsVisible(false);
            onComplete?.();
          }
        });
      } else {
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 100);
      }
    };

    checkCriticalResources();
    const checkInterval = setInterval(checkCriticalResources, 200);
    const fallbackTimeout = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(fallbackTimeout);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="relative h-20 mx-auto mb-8 w-44">
          <Image
            src="/images/4dekk-logo-white-red.webp"
            alt="4Dekk Logo"
            fill
            className="object-contain"
            priority
            quality={100}
            sizes="176px"
          />
        </div>

        <div className="w-12 h-12 mx-auto border-4 border-gray-600 rounded-full border-t-red-500 animate-spin" />
      </div>
    </div>
  );
}
