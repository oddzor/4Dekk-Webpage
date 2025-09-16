import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import PricingSection from '@/components/PricingSection'
import GoogleReviewsSection from '@/components/GoogleReviews'
import FloatingPriceButton from '@/components/FloatingPriceButton'
import DynamicMetadata from '@/components/DynamicMetadata'

export default function Home() {
  return (
    <div>
      <DynamicMetadata page="home" />
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <GoogleReviewsSection />
      <FloatingPriceButton />
    </div>
  )
}