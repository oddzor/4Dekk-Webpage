'use client'

import Link from 'next/link'
import Icon from './Icon'
import businessData from '../data/business.json'

export default function ContactSection() {
  return (
    <section className="section-padding section-light">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl font-headings text-headings">
              Ta Kontakt
            </h2>
            <p className="mb-8 text-lg text-text">
              Klar til å bestille din neste service? Kontakt oss i dag  eller bestill time på nettet.
            </p>

            <div className="mb-8 space-y-6">
              <div className="flex items-start">
                <div className="mt-1 mr-4 text-accent">
                  <Icon name="map" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold font-headings text-headings">Adresse</h3>
                  <p className="text-text">
                    {businessData.address.street}<br />
                    {businessData.address.postalCode} {businessData.address.city}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 mr-4 text-accent">
                  <Icon name="phone" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold font-headings text-headings">Telefon</h3>
                  <a href={`tel:${businessData.contact.phone}`} className="transition-colors duration-200 text-accent hover:text-accent-dark">
                    {businessData.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 mr-4 text-accent">
                  <Icon name="email" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold font-headings text-headings">E-post</h3>
                  <a href={`mailto:${businessData.contact.email}`} className="transition-colors duration-200 text-accent hover:text-accent-dark">
                    {businessData.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 mr-4 text-accent">
                  <Icon name="clock" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold font-headings text-headings">Åpningstider</h3>
                  <p className="text-text">
                    Mandag: {businessData.hours.monday}<br />
                    Tirsdag: {businessData.hours.tuesday}<br />
                    Onsdag: {businessData.hours.wednesday}<br />
                    Torsdag: {businessData.hours.thursday}<br />
                    Fredag: {businessData.hours.friday}<br />
                    Lørdag: {businessData.hours.saturday}<br />
                    Søndag: {businessData.hours.sunday}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="btn-secondary whitespace-nowrap min-w-[120px]">
                Kontakt Oss
              </Link>
              <Link href="/booking" className="btn-accent whitespace-nowrap min-w-[200px]">
                Bestill Time
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden card-dark">
              <div className="h-96 lg:h-[500px] relative">
                <iframe
                  src={businessData.location.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="4Dekk Larvik Plassering"
                />
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  )
} 