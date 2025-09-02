import { CheckCircleIcon, CogIcon, WrenchScrewdriverIcon, BuildingOfficeIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import services from '@/data/services.json'

// Filter services that have pricing information
const pricingItems = services.filter(service => service.pricing && service.pricingDescription).map(service => ({
  service: service.title,
  price: service.pricing,
  icon: service.icon,
  description: service.pricingDescription
}))

export default function PricingSection() {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'check':
        return <CheckCircleIcon className="w-6 h-6" />
      case 'tire':
        return <CogIcon className="w-6 h-6" />
      case 'hotel':
        return <BuildingOfficeIcon className="w-6 h-6" />
      case 'clock':
        return <ClockIcon className="w-6 h-6" />
      default:
        return <CurrencyDollarIcon className="w-6 h-6" />
    }
  }

  return (
    <section id="pricing" className="section-padding section-light">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl font-headings text-headings">
            Våre Priser
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-text">
            Transparente og konkurransedyktige priser for alle våre tjenester. 
            Alle priser er inkludert mva og materialer.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pricingItems.map((item, index) => (
            <div key={index} className="p-6 transition-all duration-300 border border-gray-600 rounded-lg card-dark hover:border-accent hover:shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="mr-3 text-accent">
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-lg font-semibold font-headings text-headings">
                    {item.service}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-accent">
                    {item.price}
                  </div>
                </div>
              </div>
              <p className="text-sm text-text">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="p-6 mx-auto max-w-2xl card-dark">
            <h3 className="mb-4 text-xl font-semibold font-headings text-headings">
              Viktig Informasjon
            </h3>
            <div className="space-y-2 text-sm text-text">
              <p>• Alle priser er inkludert mva og materialer</p>
              <p>• Priser kan variere avhengig av kjøretøytype og kompleksitet</p>
              <p>• Kontakt oss for spesialtilbud på større oppdrag</p>
              <p>• Gratis kostnadsoverslag på forespørsel</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="mb-6 text-lg text-text">
            Usikker på hvilken tjeneste du trenger? Kontakt oss for en gratis konsultasjon.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a href="/booking" className="btn-primary">
              Bestill Time
            </a>
            <a href="/contact" className="btn-secondary">
              Kontakt Oss
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
