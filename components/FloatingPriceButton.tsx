"use client";

import { useState, useEffect } from "react";

export default function FloatingPriceButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAbovePricing, setIsAbovePricing] = useState(true);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const servicesSection = document.getElementById("services");
      const pricingSection = document.getElementById("pricing");
      if (servicesSection && pricingSection) {
        const servicesRect = servicesSection.getBoundingClientRect();
        const pricingRect = pricingSection.getBoundingClientRect();
        const hasScrolledIntoServices =
          servicesRect.top < window.innerHeight && servicesRect.bottom > 0;
        const isPricingVisible =
          pricingRect.top > window.innerHeight || pricingRect.bottom < 0;
        const isAbove = pricingRect.top > window.innerHeight / 2;
        setIsVisible(hasScrolledIntoServices && isPricingVisible);
        setIsAbovePricing(isAbove);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToPricing}
      className="fixed z-50 flex items-center gap-1 px-4 py-2.5 text-xs font-medium text-black transition-all duration-300 ease-in-out transform border rounded-full shadow-lg opacity-75 bottom-6 right-4 sm:right-6 bg-accent/80 hover:bg-accent hover:shadow-xl hover:-translate-y-0.5 hover:scale-105 backdrop-blur-sm border-accent/20 hover:opacity-100"
      aria-label="Se våre priser"
    >
      Priser
      <svg
        className="w-3 h-3 transition-transform duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {isAbovePricing ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        )}
      </svg>
    </button>
  );
}
