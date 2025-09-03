'use client';

import { useState } from 'react';
import ServiceCard from './ServiceCard'
import services from '@/data/services.json'
import Link from 'next/link'

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
    title: 'Dekkservice',
    description: 'Komplett dekk-service inkludert salg, montering, balansering, rotasjon og reparasjon. Alle store merker tilgjengelig.',
    image: '/images/tire-service.webp',
    serviceId: 'tires'
  },
  {
    title: 'Dekkhotell',
    description: 'Sikker lagring av sommer- og vinterdekk når de ikke er i bruk.',
    image: '/images/dekkhotell.webp',
    serviceId: 'tire-hotel'
  }
]

export default function ServicesSection() {
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

  // Filter out services that are already in featuredServices to avoid duplicates
  const featuredServiceIds = featuredServices.map(service => service.serviceId)
  const remainingServices = services.filter(service => !featuredServiceIds.includes(service.id))

  return (
    <section id="services" className="section-padding section-dark">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl font-headings text-headings">
            Våre Tjenester
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-text">
            Vi tilbyr omfattende bilreparasjon og vedlikeholdstjenester for å holde kjøretøyet ditt i god stand og sikkert.
          </p>
        </div>

        {/* Featured Services Grid */}
        <div className="mb-16">
          <h3 className="mb-8 text-2xl font-bold text-center font-headings text-headings">
            Populære Tjenester
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
                />
              )
            })}
          </div>
        </div>

        {/* All Services Grid */}
        <div className="mb-16">
          <h3 className="mb-8 text-2xl font-bold text-center font-headings text-headings">
            Alle Våre Tjenester
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
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="mb-6 text-lg text-text">
            Ser du ikke tjenesten du trenger? Kontakt oss for et tilpasset tilbud.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/booking" className="btn-primary">
              Bestill Time
            </Link>
            <Link href="/contact" className="btn-secondary">
              Kontakt Oss
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 