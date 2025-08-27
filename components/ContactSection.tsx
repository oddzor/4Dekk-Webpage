'use client'

import Link from 'next/link'
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline'
import businessData from '../data/business.json'

export default function ContactSection() {
  return (
    <section className="section-padding section-light">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl font-headings text-headings">
              Ta Kontakt
            </h2>
            <p className="mb-8 text-lg text-text">
              Klar til å bestille din neste service? Kontakt oss i dag  eller bestill time på nettet.
            </p>

            {/* Contact Details */}
            <div className="mb-8 space-y-6">
              <div className="flex items-start">
                <div className="mt-1 mr-4 text-accent">
                  <MapPinIcon className="w-6 h-6" />
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
                  <PhoneIcon className="w-6 h-6" />
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
                  <EnvelopeIcon className="w-6 h-6" />
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
                  <ClockIcon className="w-6 h-6" />
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

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Kontakt Oss
              </Link>
              <Link href="/booking" className="btn-secondary">
                Bestill Time
              </Link>
            </div>
          </div>

          {/* Map */}
          <div className="relative">
            <div className="overflow-hidden card-dark">
              <div className="h-96 lg:h-[500px] relative">
                {/* Google Maps Embed */}
                <iframe
                  src={businessData.location.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="4Dekk Larvik Plassering"
                  onError={(e) => {
                    // Fallback if map fails to load
                    const target = e.target as HTMLIFrameElement
                    target.style.display = 'none'
                    target.parentElement!.innerHTML = `
                      <div class="flex items-center justify-center h-full bg-gray-800 text-gray-400">
                        <div class="text-center">
                          <svg class="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"></path>
                          </svg>
                          <div class="text-lg">Kart Laster...</div>
                          <div class="text-sm mt-2">${businessData.address.street}, ${businessData.address.postalCode} ${businessData.address.city}</div>
                        </div>
                      </div>
                    `
                  }}
                />
              </div>
            </div>

            {/* Map Overlay Info */}
            <div className="absolute p-4 border border-gray-600 rounded-lg shadow-lg top-4 left-4 bg-gray-darker/90 backdrop-blur-sm">
              <div className="text-sm">
                <div className="font-semibold font-headings text-headings">{businessData.name}</div>
                <div className="text-text">{businessData.address.street}</div>
                <div className="text-text">{businessData.address.postalCode} {businessData.address.city}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 