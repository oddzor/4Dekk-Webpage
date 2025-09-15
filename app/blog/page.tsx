'use client'

import React from 'react'
import Icon from '../../components/Icon'
import { useLanguage } from '../../contexts/LanguageContext'
import DynamicMetadata from '../../components/DynamicMetadata'

export default function BlogPage() {
  const { language } = useLanguage()
  
  const content = {
    no: {
      title: "Blogg",
      description: "Tips om vedlikehold, reparasjoner og generell, nyttig kjøretøykunnskap.",
      underConstruction: "Under Utvikling",
      comingSoon: "Vi jobber med å lage nyttig innhold for deg. Sjekk tilbake snart for tips om vedlikehold, reparasjoner og mer!",
      contactButton: "Kontakt Oss",
      bookButton: "Bestill Time"
    },
    en: {
      title: "Blog",
      description: "Tips om vedlikehold, reparasjoner og generell, nyttig kjøretøykunnskap.",
      underConstruction: "Under Development",
      comingSoon: "We're working on creating useful content for you. Check back soon for maintenance tips, repairs and more!",
      contactButton: "Contact Us",
      bookButton: "Book Appointment"
    }
  }
  
  const t = content[language]
  return (
    <div>
      <DynamicMetadata page="blog" />
      {/* Hero Section */}
      <section className="py-20 text-white bg-gradient-dark">
        <div className="text-center container-custom">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl font-headings">
            {t.title}
          </h1>
        </div>
      </section>

      {/* Under Construction Section */}
      <section className="section-dark section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-accent/10">
                <Icon name="wrench" className="w-12 h-12 text-accent" />
              </div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl font-headings text-headings">
                {t.underConstruction}
              </h2>
              <p className="mb-8 text-lg text-text">
              {t.comingSoon}
              </p>
            </div>
            
            <div className="p-8 card-dark">
              <h3 className="mb-4 text-xl font-semibold font-headings text-headings">
                Du kan forvente
              </h3>
              <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
                <div className="flex items-center">
                  <Icon name="check" className="w-5 h-5 mr-3 text-green-400" />
                  <span className="text-text">Tips og råd om vedlikehold av bil</span>
                </div>
                <div className="flex items-center">
                  <Icon name="check" className="w-5 h-5 mr-3 text-green-400" />
                  <span className="text-text">Dekkslitasje</span>
                </div>
                <div className="flex items-center">
                  <Icon name="check" className="w-5 h-5 mr-3 text-green-400" />
                  <span className="text-text">Når bør jeg..?</span>
                </div>
                <div className="flex items-center">
                  <Icon name="check" className="w-5 h-5 mr-3 text-green-400" />
                  <span className="text-text">Ny teknologi</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-6 text-text">
                I mellomtiden, følg med på våre sosiale medier eller kontakt oss direkte for spørsmål om bilvedlikehold.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a href="/contact" className="btn-secondary">
                  {t.contactButton}
                </a>
                <a href="/booking" className="btn-accent">
                  {t.bookButton}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 