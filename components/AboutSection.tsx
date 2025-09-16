'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutSection() {
  const { language } = useLanguage()

  const content = {
    no: {
      title: "Om 4Dekk AS",
      description1: "I 10 år har 4Dekk AS vært det pålitelige valget for bil og dekk-service i Larvik. Det startet som en dekk og felg bedrift, men har nå vokst til et godkjent bilverksted med godkjenning fra Statens Vegvesen.",
      description2: "I dag har vi to bukker for verkstedet, èn for dekkservice og kan tilby alt fra EU kontroll, full service, bremseservice, girkasseservice, diagnostikk og masse annet.",
      experience: "10+ Års Erfaring",
      certified: "Godkjent Verksted",
      modern: "Moderne Utstyr",
      service: "Utmerket Service",
      learnMore: "Les Mer Om Oss",
      contactUs: "Kontakt Oss",
      feature1: "Erfarne Teknikere",
      feature2: "Kvalitetsgaranti",
      feature3: "Konkurransedyktige Priser",
      feature4: "Rask Service"
    },
    en: {
      title: "About 4Dekk AS",
      description1: "For 10 years, 4Dekk AS has been the reliable choice for car and tire service in Larvik. It started as a tire and rim business, but has now grown into an approved car workshop with approval from the Norwegian Public Roads Administration.",
      description2: "Today we have two lifts for the workshop, one for tire service and can offer everything from EU inspection, full service, brake service, transmission service, diagnostics and much more.",
      experience: "10+ Years Experience",
      certified: "Certified Workshop",
      modern: "Modern Equipment",
      service: "Excellent Service",
      learnMore: "Learn More About Us",
      contactUs: "Contact Us",
      feature1: "Experienced Technicians",
      feature2: "Quality Guarantee",
      feature3: "Competitive Prices",
      feature4: "Fast Service"
    }
  }
  
  const t = content[language]
  return (
    <section className="section-padding section-light">
      <div className="container-custom">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl font-headings text-headings">
              {t.title}
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-text">
              {t.description1}
            </p>
            <p className="mb-8 text-lg leading-relaxed text-text">
              {t.description2}
            </p>
            
            <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2">
              <div className="flex items-center">
                <div className="mr-3 text-2xl text-accent">✅</div>
                <span className="text-text">{t.feature1}</span>
              </div>
              <div className="flex items-center">
                <div className="mr-3 text-2xl text-accent">✅</div>
                <span className="text-text">{t.feature2}</span>
              </div>
              <div className="flex items-center">
                <div className="mr-3 text-2xl text-accent">✅</div>
                <span className="text-text">{t.feature3}</span>
              </div>
              <div className="flex items-center">
                <div className="mr-3 text-2xl text-accent">✅</div>
                <span className="text-text">{t.feature4}</span>
              </div>
            </div>
            
                   <div className="flex flex-col gap-4 sm:flex-row">
                     <Link href="/about" className="btn-primary whitespace-nowrap min-w-[180px]">
                       {t.learnMore}
                     </Link>
                     <Link href="/contact" className="btn-secondary whitespace-nowrap min-w-[120px]">
                       {t.contactUs}
                     </Link>
                   </div>
          </div>

          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl card-dark">
              <Image
                src="/images/om-4dekk.webp"
                alt="4Dekk Auto Repair verksted interiør"
                fill
                className="object-cover"
                onError={(e) => {
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