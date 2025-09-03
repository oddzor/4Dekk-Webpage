import type { Metadata } from 'next'
import { PhoneIcon, MapPinIcon, TruckIcon, BoltIcon, TagIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import businessData from '../../data/business.json'

export const metadata: Metadata = {
  title: 'Kontakt Oss - 4Dekk Larvik',
  description: 'Ta kontakt med 4Dekk Larvik. Kontakt oss for spørsmål, tilbud eller for å bestille din neste service.',
  keywords: 'kontakt 4Dekk, bilreparasjon kontakt, service tilbud, timebestilling, kundeservice',
}

const contactMethods = [
  {
    title: "Generelle Henvendelser",
    description: "Spørsmål om våre tjenester, prising eller generell informasjon",
    email: "4dekk4@gmail.com",
    icon: "📧",
    color: "bg-gradient-to-r from-blue-600 to-blue-700"
  },
  {
    title: "Service Timer",
    description: "Bestill reparasjoner, vedlikehold eller diagnostiske tjenester",
    email: "4dekk4@gmail.com",
    icon: "🔧",
    color: "bg-gradient-to-r from-green-600 to-green-700"
  },
  {
    title: "Akutte Reparasjoner",
    description: "Haste reparasjoner, veihjelp eller akutte situasjoner",
    email: "4dekk4@gmail.com",
    icon: "🚨",
    color: "bg-gradient-to-r from-red-600 to-red-700"
  },
  {
    title: "Deler & Utstyr",
    description: "Dekksalg, delesøk eller utstyrsspørsmål",
    email: "4dekk4@gmail.com",
    icon: "🛞",
    color: "bg-gradient-to-r from-purple-600 to-purple-700"
  },
  {
    title: "Kommersielle Flåtetjenester",
    description: "Flåtevedlikehold, kommersielle kontoer eller forretningspartnerskap",
    email: "4dekk4@gmail.com",
    icon: "🚛",
    color: "bg-gradient-to-r from-orange-600 to-orange-700"
  },
  {
    title: "Kundestøtte",
    description: "Klager, tilbakemeldinger eller kundeservice problemer",
    email: "4dekk4@gmail.com",
    icon: "💬",
    color: "bg-gradient-to-r from-teal-600 to-teal-700"
  }
]

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 text-white bg-gradient-dark">
        <div className="text-center container-custom">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl font-headings">
            Kontakt Oss
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-200">
            Ta kontakt med oss for spørsmål, tilbud eller for å bestille din neste service.
          </p>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="section-dark section-padding">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings text-headings">
              Hvordan Kan Vi Hjelpe Deg?
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-text">
              Velg den passende kontaktmetoden basert på dine behov. Vi har dedikerte e-postadresser 
              for ulike typer henvendelser for å sikre at du får det raskeste svaret.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {contactMethods.map((method, index) => (
              <div key={index} className="p-6 transition-all duration-300 card-dark hover:border-glow">
                                  <div className={`${method.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto`}>
                    {method.icon === '📧' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                    {method.icon === '🔧' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                    {method.icon === '🚨' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    )}
                    {method.icon === '🛞' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                    {method.icon === '🚛' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                    {method.icon === '💬' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    )}
                  </div>
                <h3 className="mb-3 text-xl font-semibold text-center font-headings text-headings">
                  {method.title}
                </h3>
                <p className="mb-4 text-center text-text">
                  {method.description}
                </p>
                <div className="text-center">
                  <a 
                    href={`mailto:${method.email}`}
                    className="font-semibold transition-colors duration-200 text-accent hover:text-accent-dark"
                  >
                    {method.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phone & Address Section */}
      <section className="section-light section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Phone Contact */}
            <div className="p-8 card-dark">
              <h2 className="mb-6 text-3xl font-bold font-headings text-headings">
                Ring Oss Direkte
              </h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="mr-4 text-accent">
                    <PhoneIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold font-headings text-headings">Hovedkontor</h3>
                    <a href={`tel:${businessData.contact.phone}`} className="text-xl font-semibold text-accent hover:text-accent-dark">
                      {businessData.contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 text-accent">
                    <PhoneIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold font-headings text-headings">Telefon</h3>
                    <a href={`tel:${businessData.contact.phone}`} className="text-xl font-semibold text-accent hover:text-accent-dark">
                      {businessData.contact.phone}
                    </a>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-600">
                  <h3 className="mb-2 font-semibold font-headings text-headings">Åpningstider</h3>
                  <div className="space-y-1 text-text">
                    <div>Mandag: {businessData.hours.monday}</div>
                    <div>Tirsdag: {businessData.hours.tuesday}</div>
                    <div>Onsdag: {businessData.hours.wednesday}</div>
                    <div>Torsdag: {businessData.hours.thursday}</div>
                    <div>Fredag: {businessData.hours.friday}</div>
                    <div>Lørdag: {businessData.hours.saturday}</div>
                    <div>Søndag: {businessData.hours.sunday}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address & Location */}
            <div className="p-8 card-dark">
              <h2 className="mb-6 text-3xl font-bold font-headings text-headings">
                Besøk Vårt Verksted
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-accent">
                    <MapPinIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold font-headings text-headings">Adresse</h3>
                    <p className="text-text">
                      {businessData.address.street}<br />
                      {businessData.address.postalCode} {businessData.address.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-accent">
                    <TruckIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold font-headings text-headings">Parkering</h3>
                    <p className="text-text">
                      Gratis parkering tilgjengelig på stedet med enkel tilgang fra hovedveier.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-accent">
                    <TruckIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold font-headings text-headings">Kollektivtransport</h3>
                    <p className="text-text">
                      Praktisk tilgang via buss og tog ruter.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time Section */}
      <section className="section-dark section-padding">
        <div className="text-center container-custom">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings text-headings">
            Hva Du Kan Forvente
          </h2>
          <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
            <div className="p-6 card-dark">
              <div className="mb-4 text-accent">
                <BoltIcon className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="mb-3 text-xl font-semibold font-headings text-headings">Raskt Svar</h3>
              <p className="text-text">
                Vi svarer vanligvis på e-post innen 2-4 timer i åpningstiden.
              </p>
            </div>
            <div className="p-6 card-dark">
              <div className="mb-4 text-accent">
                <TagIcon className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="mb-3 text-xl font-semibold font-headings text-headings">Spesialisert Støtte</h3>
              <p className="text-text">
                Hver e-postadresse overvåkes av eksperter innen det spesifikke serviceområdet.
              </p>
            </div>
            <div className="p-6 card-dark">
              <div className="mb-4 text-accent">
                <ClipboardDocumentIcon className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="mb-3 text-xl font-semibold font-headings text-headings">Detaljert Informasjon</h3>
              <p className="text-text">
                Inkluder kjøretøyets detaljer og servicebehov for raskere, mer nøyaktige svar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-white section-padding bg-gradient-dark">
        <div className="text-center container-custom">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings">
            Klar til å Komme I Gang?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-200">
            Ikke vent til det er for sent. Kontakt oss i dag for å bestille din neste vedlikehold eller reparasjonsservice.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a href="/booking" className="btn-accent">
              Bestill Time
            </a>
            <a href={`tel:${businessData.contact.phone}`} className="btn-secondary">
              Ring Nå
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 