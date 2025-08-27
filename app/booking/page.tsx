import type { Metadata } from 'next'
import CalendlyWidget from '@/components/CalendlyWidget'

export const metadata: Metadata = {
  title: 'Bestill en Time - 4Dekk Auto Repair',
  description: 'Bestill din bilreparasjon eller vedlikeholdstime online. Rask og enkel bestilling for alle dine bilservice behov.',
  keywords: 'bestill time, planlegg service, bilreparasjon bestilling, online bestilling, service time',
}

export default function BookingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 text-white bg-gradient-dark">
        <div className="text-center container-custom">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl font-headings">
            Bestill en Time
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-200">
            Bestill din bilreparasjon eller vedlikeholdsservice online. Rask, enkel og praktisk bestilling.
          </p>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="section-dark section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings text-headings">
                Hvordan Bestille Din Service
              </h2>
              <p className="text-lg text-text">
                Følg disse enkle stegene for å bestille din time:
              </p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-3">
              <div className="p-6 text-center card-dark">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-2xl font-bold rounded-full bg-accent text-gray-darker">
                  1
                </div>
                <h3 className="mb-3 text-xl font-semibold font-headings text-headings">
                  Velg Din Service
                </h3>
                <p className="text-text">
                  Velg fra vår omfattende liste over bilreparasjon og vedlikeholdstjenester.
                </p>
              </div>
              <div className="p-6 text-center card-dark">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-2xl font-bold rounded-full bg-accent text-gray-darker">
                  2
                </div>
                <h3 className="mb-3 text-xl font-semibold font-headings text-headings">
                  Velg Ditt Tidspunkt
                </h3>
                <p className="text-text">
                  Velg et passende dato og tidspunkt som passer best for din timeplan.
                </p>
              </div>
              <div className="p-6 text-center card-dark">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-2xl font-bold rounded-full bg-accent text-gray-darker">
                  3
                </div>
                <h3 className="mb-3 text-xl font-semibold font-headings text-headings">
                  Bekreft & Kom
                </h3>
                <p className="text-text">
                  Motta bekreftelse og ta med kjøretøyet ditt for service.
                </p>
              </div>
            </div>

            {/* Calendly Booking Widget */}
            <div className="p-8 card-dark">
              <h3 className="mb-6 text-2xl font-semibold text-center font-headings text-headings">
                Bestill Din Time
              </h3>
              
              {/* Calendly Widget */}
              <CalendlyWidget url="https://calendly.com/4dekk" />
            </div>
          </div>
        </div>
      </section>

      {/* Service Types Section */}
      <section className="section-light section-padding">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings text-headings">
              Våre Servicetyper
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-text">
              Vi tilbyr ulike servicetyper med forskjellige varigheter for å imøtekomme dine behov.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 card-dark">
              <div className="mb-4 text-3xl">🔍</div>
              <h3 className="mb-2 text-xl font-semibold font-headings text-headings">EU Kontroll</h3>
              <p className="mb-3 text-text">Årlig kjøretøyinspeksjon og sikkerhetskontroll</p>
              <div className="font-semibold text-accent">Varighet: 60 minutter</div>
            </div>
            
            <div className="p-6 card-dark">
              <div className="mb-4 text-3xl">🛞</div>
              <h3 className="mb-2 text-xl font-semibold font-headings text-headings">Dekkskifte</h3>
              <p className="mb-3 text-text">Rask dekkerskift service</p>
              <div className="font-semibold text-accent">Varighet: 15-30 minutter</div>
            </div>
            
            <div className="p-6 card-dark">
              <div className="mb-4 text-3xl">🛢️</div>
              <h3 className="mb-2 text-xl font-semibold font-headings text-headings">Oljeskifte</h3>
              <p className="mb-3 text-text">Komplett olje og filter erstatning</p>
              <div className="font-semibold text-accent">Varighet: 30 minutter</div>
            </div>
            
            <div className="p-6 card-dark">
              <div className="mb-4 text-3xl">🛑</div>
              <h3 className="mb-2 text-xl font-semibold font-headings text-headings">Bremseservice</h3>
              <p className="mb-3 text-text">Bremseinspeksjon og reparasjon</p>
              <div className="font-semibold text-accent">Varighet: 90 minutter</div>
            </div>
            
            <div className="p-6 card-dark">
              <div className="mb-4 text-3xl">🔧</div>
              <h3 className="mb-2 text-xl font-semibold font-headings text-headings">Motordiagnostikk</h3>
              <p className="mb-3 text-text">Datamaskin diagnostikk og feilsøking</p>
              <div className="font-semibold text-accent">Varighet: 45 minutter</div>
            </div>
            
            <div className="p-6 card-dark">
              <div className="mb-4 text-3xl">🚨</div>
              <h3 className="mb-2 text-xl font-semibold font-headings text-headings">Akutt Service</h3>
              <p className="mb-3 text-text">Haste reparasjoner og veihjelp</p>
              <div className="font-semibold text-accent">Varighet: 120 minutter</div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Contact Section */}
      <section className="section-light section-padding">
        <div className="text-center container-custom">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings text-headings">
            Foretrekker å Ringe?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-text">
            Hvis du foretrekker å bestille din time over telefon eller har spørsmål om våre tjenester, 
            er vi her for å hjelpe.
          </p>
          <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-2">
            <div className="p-6 card-dark">
              <div className="mb-4 text-4xl">📞</div>
              <h3 className="mb-3 text-xl font-semibold font-headings text-headings">
                Ring Oss
              </h3>
              <p className="mb-4 text-text">
                Snakk direkte med våre servicerådgivere
              </p>
              <a href="tel:+15551234567" className="text-xl font-semibold text-accent hover:text-accent-dark">
                (555) 123-4567
              </a>
            </div>
            <div className="p-6 card-dark">
              <div className="mb-4 text-4xl">✉️</div>
              <h3 className="mb-3 text-xl font-semibold font-headings text-headings">
                E-post Oss
              </h3>
              <p className="mb-4 text-text">
                Send oss en melding for henvendelser
              </p>
              <a href="mailto:service@4dekk.com" className="text-xl font-semibold text-accent hover:text-accent-dark">
                service@4dekk.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hours & Location */}
      <section className="text-white section-padding bg-gradient-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings">
                Åpningstider
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Mandag - Fredag</span>
                  <span>08:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Lørdag</span>
                  <span>09:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Søndag</span>
                  <span>Stengt</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings">
                Plassering
              </h2>
              <p className="mb-4 text-gray-200">
                123 Hovedgaten<br />
                By, Fylke 12345
              </p>
              <p className="text-gray-200">
                Enkel tilgang fra hovedveier med god parkering tilgjengelig.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 