'use client'

import Image from 'next/image'
import Icon from '../../components/Icon'
import { useLanguage } from '../../contexts/LanguageContext'
import DynamicMetadata from '../../components/DynamicMetadata'

export default function AboutPage() {
  const { language } = useLanguage()

  const teamMembers = {
    no: [
      {
        name: "Saulius",
        position: "Eier & Mekaniker",
        bio: "lorem ipsum dolor sit amet.",
        photo: "/images/saulius.webp"
      },
      {
        name: "Henrikas",
        position: "Mekaniker",
        bio: "lorem ipsum dolor sit amet.",
        photo: "/images/henrikas.webp"
      },
      {
        name: "Elidijus",
        position: "Mekaniker",
        bio: "lorem ipsum dolor sit amet.",
        photo: "/images/elidijus.webp"
      },
      {
        name: "Odd",
        position: "Dekk og IT-ansvarlig",
        bio: "lorem ipsum dolor sit amet.",
        photo: "/images/odd.webp"
      }
    ],
    en: [
      {
        name: "Saulius",
        position: "Owner & Technician",
        bio: "lorem ipsum dolor sit amet.",
        photo: "/images/saulius.webp"
      },
      {
        name: "Henrikas",
        position: "Technician",
        bio: "lorem ipsum dolor sit amet.",
        photo: "/images/henrikas.webp"
      },
      {
        name: "Elidijus",
        position: "Technician",
        bio: "lorem ipsum dolor sit amet.",
        photo: "/images/elidijus.webp"
      },
      {
        name: "Odd",
        position: "Tire Technician",
        bio: "lorem ipsum dolor sit amet.",
        photo: "/images/odd.webp"
      }
    ]
  }
  
  const content = {
    no: {
      title: "Om Oss",
      description: "Lær om 4Dekk AS's 10 års erfaring, vårt team av sertifiserte teknikere, og vårt engasjement for kvalitets bilreparasjonstjenester.",
      aboutTitle: "Om 4Dekk AS",
      aboutDescription1: "I 10 år har 4Dekk AS vært det pålitelige valget for bil og dekk-service i Larvik. Det startet som en dekk og felg bedrift, men har nå vokst til et godkjent bilverksted med godkjenning fra Statens Vegvesen.",
      aboutDescription2: "I dag har vi to bukker for verkstedet, èn for dekkservice og kan tilby alt fra EU kontroll, full service, bremseservice, girkasseservice, diagnostikk og masse annet.",
      feature1: "Erfarne Teknikere",
      feature2: "Kvalitetsgaranti",
      feature3: "Konkurransedyktige Priser",
      feature4: "Rask Service",
      teamTitle: "Vårt Team",
      teamDescription: "Møt de erfarne og sertifiserte teknikerne som holder bilen din i perfekt stand.",
      contactButton: "Kontakt Oss",
      bookButton: "Bestill Time",
      ctaTitle: "Velg oss",
      ctaDescription: "Bli en av våre mange fornøyde kunder som stoler på oss med sine kjøretøy. Kontakt oss, eller bestill din neste bil eller dekkservice.",
      valuesTitle: "Våre Verdier",
      honesty: "Ærlighet",
      honestyDesc: "Bil er dyrt, det vet vi. Derfor ønsker vi å kunne gi deg den beste opplevelsen med et transparent forhold der vi gjør vårt ytterste for å holde kostnadene dine ned og sikkerheten din oppe.",
      quality: "Kvalitetsarbeid",
      qualityDesc: "Våre erfarne mekanikere har årevis med erfaring på et hav av ulike produsenter, biltyper og reparasjoner. Derfor garanterer vi deg kvalitet i utføring av arbeidet uten snarveier.",
      customerFocus: "Kundefokus",
      customerFocusDesc: "Kunder som returnerer er livsblodet til bedriften vår, derfor ønsker vi å gjøre det ytterste for at du skulle føle at du er velkommen og ønsker å velge oss igjen neste gang."
    },
    en: {
      title: "About Us",
      description: "Learn about 4Dekk AS's 10 years of experience, our team of certified technicians, and our commitment to quality car repair services.",
      aboutTitle: "About 4Dekk AS",
      aboutDescription1: "For 10 years, 4Dekk AS has been the reliable choice for car and tire service in Larvik. It started as a tire and rim business, but has now grown into an approved car workshop with approval from the Norwegian Public Roads Administration.",
      aboutDescription2: "Today we have two bays for the workshop, one for tire service and can offer everything from EU inspection, full service, brake service, transmission service, diagnostics and much more.",
      feature1: "Experienced Technicians",
      feature2: "Quality Guarantee",
      feature3: "Competitive Prices",
      feature4: "Fast Service",
      teamTitle: "Our Team",
      teamDescription: "Meet the experienced and certified technicians who keep your car in perfect condition.",
      contactButton: "Contact Us",
      bookButton: "Book Appointment",
      ctaTitle: "Choose Us",
      ctaDescription: "Become one of our many satisfied customers who trust us with their vehicles. Contact us, or book your next car or tire service.",
      valuesTitle: "Our Values",
      honesty: "Honesty",
      honestyDesc: "Cars are expensive, we know that. That's why we want to give you the best experience with a transparent relationship where we do our utmost to keep your costs down and your safety up.",
      quality: "Quality Work",
      qualityDesc: "Our experienced mechanics have years of experience with a sea of different manufacturers, car types and repairs. That's why we guarantee you quality in the execution of the work without shortcuts.",
      customerFocus: "Customer Focus",
      customerFocusDesc: "Returning customers are the lifeblood of our business, that's why we want to do our utmost to make you feel welcome and want to choose us again next time."
    }
  }
  
  const t = content[language]
  const currentTeamMembers = teamMembers[language]
  return (
    <div>
      <DynamicMetadata page="about" />
      <section className="py-20 text-white bg-gradient-dark">
        <div className="text-center container-custom">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl font-headings">
            {t.title}
          </h1>
        </div>
      </section>

      <section className="section-light section-padding">
        <div className="container-custom">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl font-headings text-headings">
                {t.aboutTitle}
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-text">
                {t.aboutDescription1}
              </p>
              <p className="mb-8 text-lg leading-relaxed text-text">
                {t.aboutDescription2}
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
            </div>

            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl card-dark">
                <Image
                  src="/images/om-4dekk.webp"
                  alt="4Dekk Auto Repair verksted interiør"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

      <section className="section-dark section-padding">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings text-headings">
             {t.valuesTitle}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-6 text-center card-dark">
              <div className="mb-4 text-accent">
                <Icon name="heart" className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="mb-4 text-xl font-semibold font-headings text-headings">{t.honesty}</h3>
              <p className="text-text">
              {t.honestyDesc}
              </p>
            </div>
            <div className="p-6 text-center card-dark">
              <div className="mb-4 text-accent">
                <Icon name="wrench" className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="mb-4 text-xl font-semibold font-headings text-headings">{t.quality}</h3>
              <p className="text-text">
              {t.qualityDesc}
              </p>
            </div>
            <div className="p-6 text-center card-dark">
              <div className="mb-4 text-accent">
                <Icon name="users" className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="mb-4 text-xl font-semibold font-headings text-headings">{t.customerFocus}</h3>
              <p className="text-text">
              {t.customerFocusDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-light section-padding">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings text-headings">
              {t.teamTitle}
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-text">
              {t.teamDescription}
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {currentTeamMembers.map((member, index) => (
              <div key={index} className="p-6 text-center card-dark">
                <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full bg-gray-dark">
                  <Image
                    src={member.photo}
                    alt={`${member.name} - ${member.position}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.parentElement!.innerHTML = `
                        <div class="absolute inset-0 flex items-center justify-center text-gray-400">
                          <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                        </div>
                      `
                    }}
                  />
                </div>
                <h3 className="mb-2 text-xl font-semibold font-headings text-headings">
                  {member.name}
                </h3>
                <p className="mb-4 font-medium text-accent">
                  {member.position}
                </p>
                <p className="text-sm text-text">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="text-white section-padding bg-gradient-dark">
        <div className="text-center container-custom">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings">
            {t.ctaTitle}
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-200">  
            {t.ctaDescription}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a href="/booking" className="btn-accent whitespace-nowrap min-w-[200px]">
              {t.bookButton}
            </a>
            <a href="/contact" className="btn-secondary whitespace-nowrap min-w-[120px]">
              {t.contactButton}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 