import ServiceCard from './ServiceCard'
import services from '@/data/services.json'
import Link from 'next/link'
import { CogIcon, CheckCircleIcon, BeakerIcon, WrenchScrewdriverIcon, BuildingOfficeIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

const featuredServices = [
  {
    title: 'EU Kontroll',
    description: 'EU godkjenning av kjøretøy, direkte koblet til Statens Vegvesen.',
    icon: 'check',
    image: '/images/brake-repair.webp',
    href: '#eu-control'
  },
  {
    title: 'Diagnose av Bilproblemer',
    description: 'Avansert diagnostisktjeneste for å identifisere og løse motorproblemer raskt og nøyaktig.',
    icon: 'wrench',
    image: '/images/engine-diagnostics.webp',
    href: '#diagnostics'
  },
  {
    title: 'Dekkservice',
    description: 'Komplett dekk-service inkludert salg, montering, balansering, rotasjon og reparasjon. Alle store merker tilgjengelig.',
    icon: 'tire',
    image: '/images/tire-service.webp',
    href: '#tires'
  },
  {
    title: 'Dekkhotell',
    description: 'Sikker lagring av sommer- og vinterdekk når de ikke er i bruk.',
    icon: 'hotel',
    image: '/images/tire-service.webp',
    href: '#tire-hotel'
  }
]

export default function ServicesSection() {
  return (
    <section className="section-padding section-dark">
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
            {featuredServices.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                image={service.image}
                href={service.href}
              />
            ))}
          </div>
        </div>

        {/* All Services Grid */}
        <div className="mb-16">
          <h3 className="mb-8 text-2xl font-bold text-center font-headings text-headings">
            Alle Våre Tjenester
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                image={service.image}
                href={`#${service.id}`}
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