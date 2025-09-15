'use client';

import { useState } from 'react';
import ServiceCard from './ServiceCard'
import { getServicesData } from '@/utils/dataLoader'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

// Mapping of services to their booking links
const bookingLinks: { [key: string]: string } = {
  'eu-control': 'https://calendly.com/4dekk-service2/eu-kontroll',
  'after-control': 'https://calendly.com/4dekk-service2/etterkontroll', // Etterkontroll
  'wheel-alignment': 'https://calendly.com/4dekk-service2/4hjulskontroll', // 4Hjulskontroll
  'diagnostics': 'https://calendly.com/4dekk-as/diagnose-av-bilproblemer',
  'workshop-hourly': 'https://calendly.com/d/cw8m-3w4-8yy/oljeskift', // Oljeskift
  'tire-mounting-car': 'https://calendly.com/4dekk/omlegging-av-dekk'
  // Removed 'tire-hotel' to remove button from Dekkhotell
}

// Mapping of services to multiple booking links
const multipleBookingLinks: { [key: string]: { [key: string]: { label: string; url: string }[] } } = {
  'hjulskift': {
    no: [
      { label: 'Hjulskift (Dekkhotell)', url: 'https://calendly.com/4dekk/dekkskift-dekkhotell' },
      { label: 'Hjulskift (Egne Dekk)', url: 'https://calendly.com/4dekk/hjulskift-egne-dekk' }
    ],
    en: [
      { label: 'Tire Change (Tire Hotel)', url: 'https://calendly.com/4dekk/dekkskift-dekkhotell' },
      { label: 'Tire Change (Own Tires)', url: 'https://calendly.com/4dekk/hjulskift-egne-dekk' }
    ]
  }
}

// Mapping of services that should show "Kontakt oss" buttons
const contactServices: { [key: string]: boolean } = {
  'bilreparasjoner': true,
  'generell-service': true
}

const featuredServices = [
  {
    title: 'EU Kontroll',
    description: 'Årlig sikkerhetskontroll av kjøretøy, direkte koblet til Statens Vegvesen.',
    image: '/images/eucontrol.webp',
    serviceId: 'eu-control'
  },
  {
    title: 'Diagnose av Bilproblemer',
    description: 'Avansert diagnostisktjeneste for å identifisere og løse motorproblemer raskt og nøyaktig.',
    image: '/images/engine-diagnostics.webp',
    serviceId: 'diagnostics'
  },
  {
    title: 'Hjulskift',
    description: 'Hjulskift mellom sommer- og vinterdekk med rask service.',
    image: '/images/hjulskift.webp',
    serviceId: 'hjulskift'
  },
  {
    title: 'Oljeskift',
    description: 'Bytte av olje og oljefilter, valgfritt luftfilterbytte.',
    image: '/images/oil-change.webp',
    serviceId: 'workshop-hourly'
  }
]

export default function ServicesSection() {
  const { language } = useLanguage()
  const services = getServicesData(language)
  
  // Global state for which card is currently expanded
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Function to handle card expansion
  const handleCardExpand = (cardId: string) => {
    if (expandedCardId === cardId) {
      // If clicking the same card, close it
      setExpandedCardId(null);
    } else {
      // If clicking a different card, close the previous one and open the new one
      setExpandedCardId(cardId);
    }
  };

  // Content translations
  const content = {
    no: {
      title: "Våre Tjenester",
      description: "Vi tilbyr omfattende bilreparasjon, vedlikehold og dekkservice for å holde kjøretøyet ditt i god og sikker stand.",
      featuredTitle: "Populære Tjenester",
      allServicesTitle: "Alle Våre Tjenester",
      bookButton: "Bestill Time",
      contactButton: "Kontakt Oss",
      notFoundText: "Ser du ikke tjenesten du trenger? Kontakt oss for et tilpasset tilbud.",
      bookTimeButton: "Bestill Time",
      contactUsButton: "Kontakt Oss"
    },
    en: {
      title: "Our Services",
      description: "We offer comprehensive car repair, maintenance and tire service to keep your vehicle in good and safe condition.",
      featuredTitle: "Popular Services",
      allServicesTitle: "All Our Services",
      bookButton: "Book Appointment",
      contactButton: "Contact Us",
      notFoundText: "Don't see the service you need? Contact us for a customized offer.",
      bookTimeButton: "Book Appointment",
      contactUsButton: "Contact Us"
    }
  }
  
  const t = content[language]

  // Filter out services that are already in featuredServices to avoid duplicates
  const featuredServiceIds = featuredServices.map(service => service.serviceId)
  const remainingServices = services.filter(service => !featuredServiceIds.includes(service.id))

  return (
    <section id="services" className="section-padding section-dark">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl font-headings text-headings">
            {t.title}
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-text">
            {t.description}
          </p>
        </div>

        {/* Featured Services Grid */}
        <div className="mb-16">
          <h3 className="mb-8 text-2xl font-bold text-center font-headings text-headings">
            {t.featuredTitle}
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service, index) => {
              // Find the corresponding service data from services.json
              const serviceData = services.find(s => s.id === service.serviceId)
              
              if (!serviceData) {
                console.warn(`Service data not found for: ${service.serviceId}`)
                return null
              }
              
              return (
                <ServiceCard
                  key={index}
                  id={serviceData.id}
                  title={serviceData.title}
                  description={serviceData.description}
                  pricing={serviceData.pricing}
                  longDescription={serviceData.longDescription}
                  features={serviceData.features}
                  image={service.image}
                  href={`#${serviceData.id}`}
                  isExpanded={expandedCardId === serviceData.id}
                  onExpand={handleCardExpand}
                  bookingLink={bookingLinks[serviceData.id]}
                  bookingLinks={multipleBookingLinks[serviceData.id]?.[language]}
                  showContactButton={contactServices[serviceData.id]}
                  language={language}
                />
              )
            })}
          </div>
        </div>

        {/* All Services Grid */}
        <div className="mb-16">
          <h3 className="mb-8 text-2xl font-bold text-center font-headings text-headings">
            {t.allServicesTitle}
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {remainingServices.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                pricing={service.pricing}
                longDescription={service.longDescription}
                features={service.features}
                image={service.image}
                href={`#${service.id}`}
                isExpanded={expandedCardId === service.id}
                onExpand={handleCardExpand}
                bookingLink={bookingLinks[service.id]}
                bookingLinks={multipleBookingLinks[service.id]?.[language]}
                showContactButton={contactServices[service.id]}
                language={language}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="mb-6 text-lg text-text">
            {t.notFoundText}
          </p>
                 <div className="flex flex-col justify-center gap-4 sm:flex-row">
                   <Link href="/booking" className="btn-accent whitespace-nowrap min-w-[200px]">
                     {t.bookTimeButton}
                   </Link>
                   <Link href="/contact" className="btn-secondary whitespace-nowrap min-w-[120px]">
                     {t.contactUsButton}
                   </Link>
                 </div>
        </div>
      </div>
    </section>
  )
} 