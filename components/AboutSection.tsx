'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BuildingOfficeIcon, WrenchScrewdriverIcon, UserGroupIcon, HeartIcon } from '@heroicons/react/24/outline'

export default function AboutSection() {
  return (
    <section className="section-padding section-light">
      <div className="container-custom">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Content */}
          <div>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl font-headings text-headings">
              Om 4Dekk Auto Repair
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-text">
              I over 20 år har 4Dekk Auto Repair vært det pålitelige valget for bilservice i vårt samfunn. 
              Vi startet som et lite familieeid verksted med et enkelt oppdrag: å tilby ærlig, pålitelig og rimelig 
              bilreparasjon til våre naboer.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-text">
              I dag har vi vokst til et fullservice bilreparasjonsanlegg, men vi har aldri mistet synet på våre røtter. 
              Vårt team av sertifiserte teknikere kombinerer tiår med erfaring med det nyeste diagnostiske utstyret for 
              å sikre at kjøretøyet ditt får den beste omsorgen mulig.
            </p>
            
            {/* Key Features */}
            <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2">
              <div className="flex items-center">
                <div className="mr-3 text-2xl text-accent">✅</div>
                <span className="text-text">Sertifiserte Teknikere</span>
              </div>
              <div className="flex items-center">
                <div className="mr-3 text-2xl text-accent">✅</div>
                <span className="text-text">Kvalitetsgaranti</span>
              </div>
              <div className="flex items-center">
                <div className="mr-3 text-2xl text-accent">✅</div>
                <span className="text-text">Konkurransedyktig Prising</span>
              </div>
              <div className="flex items-center">
                <div className="mr-3 text-2xl text-accent">✅</div>
                <span className="text-text">Akutt Service</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/about" className="btn-primary">
                Lær Mer
              </Link>
              <Link href="/contact" className="btn-secondary">
                Kontakt Oss
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl card-dark">
              <Image
                src="/images/about-shop.jpg"
                alt="4Dekk Auto Repair verksted interiør"
                fill
                className="object-cover"
                onError={(e) => {
                  // Fallback to a placeholder if image fails to load
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.parentElement!.style.backgroundColor = '#1a1a1a'
                  target.parentElement!.innerHTML = `
                    <div class="flex items-center justify-center h-full text-gray-400">
                      <div class="text-center">
                        <svg class="w-24 h-24 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                        <div class="text-lg">Verksted Bilde</div>
                      </div>
                    </div>
                  `
                }}
              />
            </div>
            
            {/* Experience Badge */}
            <div className="absolute px-6 py-4 rounded-lg shadow-lg -bottom-6 -left-6 bg-accent text-gray-darker">
              <div className="text-2xl font-bold font-headings">10</div>
              <div className="text-sm">Års Erfaring</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 