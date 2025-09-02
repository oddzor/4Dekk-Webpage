import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import PricingSection from '@/components/PricingSection'
import GoogleReviewsSection from '@/components/GoogleReviews'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <GoogleReviewsSection />
      <AboutSection />
      <ContactSection />
    </div>
  )
} 