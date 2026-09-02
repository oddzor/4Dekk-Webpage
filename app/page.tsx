"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import DynamicMetadata from "@/components/DynamicMetadata";

const ServicesSection = dynamic(() => import("@/components/ServicesSection"), {
  loading: () => <div className="bg-gray-800 h-96 animate-pulse" />,
});
const PricingSection = dynamic(() => import("@/components/PricingSection"), {
  loading: () => <div className="bg-gray-800 h-96 animate-pulse" />,
});
const GoogleReviewsSection = dynamic(
  () => import("@/components/GoogleReviews"),
  {
    loading: () => <div className="bg-gray-800 h-96 animate-pulse" />,
  },
);
const FloatingPriceButton = dynamic(
  () => import("@/components/FloatingPriceButton"),
  {
    ssr: false,
  },
);

export default function Home() {
  useEffect(() => {
    const handleHashScroll = () => {
      if (window.location.hash === "#pricing") {
        setTimeout(() => {
          const pricingSection = document.getElementById("pricing");
          if (pricingSection) {
            pricingSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 1000);
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

  return (
    <div>
      <DynamicMetadata page="home" />
      <HeroSection />
      <Suspense fallback={<div className="bg-gray-800 h-96 animate-pulse" />}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<div className="bg-gray-800 h-96 animate-pulse" />}>
        <PricingSection />
      </Suspense>
      <Suspense fallback={<div className="bg-gray-800 h-96 animate-pulse" />}>
        <GoogleReviewsSection />
      </Suspense>
      <FloatingPriceButton />
    </div>
  );
}
