'use client'

import Icon from '../../components/Icon'
import { useLanguage } from '../../contexts/LanguageContext'
import DynamicMetadata from '../../components/DynamicMetadata'

export default function BookingPage() {
  const { language } = useLanguage()

  const content = {
    no: {
      title: "Bestill en Time",
      description: "Bestill din bilreparasjon eller vedlikeholdsservice online. Rask, enkel og praktisk bestilling.",
      bookingTypesTitle: "Våre Bookingtyper",
      bookingTypesDescription: "Velg den servicen som passer best for dine behov. Klikk på en service for å bestille time.",
      euControl: "EU Kontroll",
      euControlDesc: "Årlig kjøretøyinspeksjon og sikkerhetskontroll",
      diagnostics: "Diagnose av Bilproblemer",
      diagnosticsDesc: "Avansert diagnostikk for identifisering av bilproblemer",
      oilChange: "Oljeskift",
      oilChangeDesc: "Oljeskift med valgfritt bytte av luftfilter",
      tireChangeHotel: "Hjulskift (Dekkhotell)",
      tireChangeHotelDesc: "Hjulskift med lagring av dekk i vårt dekkhotell",
      tireChangeOwn: "Hjulskift (Egne Dekk)",
      tireChangeOwnDesc: "Hjulskift med dine egne dekk som du tar med",
      tireMounting: "Omlegging av Dekk (Nettbestilling)",
      tireMountingDesc: "Omlegging av dekk som du har bestilt på nett",
      afterControl: "EU-Etterkontroll",
      afterControlDesc: "Etterkontroll av reparasjoner og service ifbm ikke-godkjent EU Kontroll",
      wheelAlignment: "4Hjulskontroll",
      wheelAlignmentDesc: "Kontroll og justering av hjulgeometri",
      bookTime: "Bestill time →",
      priceVaries: "Pris varierer med biltype",
      helpTitle: "Finner du ikke det du leter etter?",
      helpDescription: "Noen tjenester egner seg ikke for direkte timebestilling da deler ofte må bestilles fra leverandører. Ta kontakt direkte så skreddersyr vi et tilbud til deg.",
      contactButton: "Kontakt Oss"
    },
    en: {
      title: "Book an Appointment",
      description: "Book your car repair or maintenance service online. Fast, easy and convenient booking.",
      bookingTypesTitle: "Our Booking Types",
      bookingTypesDescription: "Choose the service that best fits your needs. Click on a service to book an appointment.",
      euControl: "EU Inspection",
      euControlDesc: "Annual vehicle inspection and safety check",
      diagnostics: "Car Diagnostics",
      diagnosticsDesc: "Advanced diagnostics for identifying car problems",
      oilChange: "Oil Change",
      oilChangeDesc: "Oil change and optional air filter change",
      tireChangeHotel: "Tire Change (Tire Hotel)",
      tireChangeHotelDesc: "Tire change with tire storage in our tire hotel",
      tireChangeOwn: "Tire Change (Own Tires)",
      tireChangeOwnDesc: "Tire change with your own tires that you bring",
      tireMounting: "Tire Fitting (Online Order)",
      tireMountingDesc: "Tire fitting for tires you ordered online",
      afterControl: "EU Reinspection",
      afterControlDesc: "Reinspection after repairs and service related to non-approved EU inspection",
      wheelAlignment: "Wheel Alignment",
      wheelAlignmentDesc: "Control and adjustment of wheel geometry",
      bookTime: "Book appointment →",
      priceVaries: "Price varies with car type",
      helpTitle: "Can't find what you're looking for?",
      helpDescription: "Some services are not suitable for direct appointment booking as parts often need to be ordered from suppliers. Contact us directly and we'll customize an offer for you.",
      contactButton: "Contact Us"
    }
  }
  
  const t = content[language]
  const getIcon = (iconType: string) => {
    return <Icon name={iconType} className="w-6 h-6" />
  }

  return (
    <div>
      <DynamicMetadata page="booking" />
      <section className="py-20 text-white bg-gradient-dark">
        <div className="text-center container-custom">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl font-headings">
            {t.title}
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-200">
            {t.description}
          </p>
        </div>
      </section>

      <section className="section-light section-padding">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings text-headings">
              {t.bookingTypesTitle}
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-text">
              {t.bookingTypesDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <a 
              href={language === 'no' ? "https://calendly.com/4dekk-service2/eu-kontroll" : "https://calendly.com/4dekk-service2/eu-kontroll-clone"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-6 transition-all duration-300 border border-gray-600 rounded-lg card-dark hover:border-accent hover:shadow-lg group"
            >
              <div className="flex items-start mb-4">
                <div className="flex items-center">
                  <div className="mr-3 text-accent">
                    {getIcon('check')}
                  </div>
                  <h3 className="text-lg font-semibold transition-colors duration-200 font-headings text-headings group-hover:text-accent">
                    {t.euControl}
                  </h3>
                </div>
              </div>
              <p className="mb-4 text-sm text-text">
                {t.euControlDesc}
              </p>
              <div className="flex items-center justify-between">
                <div className="font-semibold text-accent">{t.bookTime}</div>
                <div className="text-sm font-semibold text-accent">1150,-</div>
              </div>
            </a>
            
            <a 
              href={language === 'no' ? "https://calendly.com/d/cr7j-wcf-8qy/diagnose-av-bilproblemer" : "https://calendly.com/d/cwby-hk5-8d4/car-issue-diagnostics"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-6 transition-all duration-300 border border-gray-600 rounded-lg card-dark hover:border-accent hover:shadow-lg group"
            >
              <div className="flex items-start mb-4">
                <div className="flex items-center">
                  <div className="mr-3 text-accent">
                    {getIcon('wrench')}
                  </div>
                  <h3 className="text-lg font-semibold transition-colors duration-200 font-headings text-headings group-hover:text-accent">
                    {t.diagnostics}
                  </h3>
                </div>
              </div>
              <p className="mb-4 text-sm text-text">
                {t.diagnosticsDesc}
              </p>
              <div className="flex items-center justify-between">
                <div className="font-semibold text-accent">{t.bookTime}</div>
                <div className="text-sm font-semibold text-accent">Fra 700,-</div>
              </div>
            </a>
            
            <a 
              href={language === 'no' ? "https://calendly.com/d/cw8m-3w4-8yy/oljeskift" : "https://calendly.com/d/csmh-bdz-qwd/oil-change"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-6 transition-all duration-300 border border-gray-600 rounded-lg card-dark hover:border-accent hover:shadow-lg group"
            >
              <div className="flex items-start mb-4">
                <div className="flex items-center">
                  <div className="mr-3 text-accent">
                    {getIcon('wrench')}
                  </div>
                  <h3 className="text-lg font-semibold transition-colors duration-200 font-headings text-headings group-hover:text-accent">
                    {t.oilChange}
                  </h3>
                </div>
              </div>
              <p className="mb-4 text-sm text-text">
                {t.oilChangeDesc}
              </p>
              <div className="flex items-center justify-between">
                <div className="font-semibold text-accent">{t.bookTime}</div>
                <div className="text-sm font-semibold text-accent">{t.priceVaries}</div>
              </div>
            </a>
            
            <a 
              href={language === 'no' ? "https://calendly.com/4dekk/dekkskift-dekkhotell" : "https://calendly.com/4dekk/hjulskift-dekkhotell-clone"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-6 transition-all duration-300 border border-gray-600 rounded-lg card-dark hover:border-accent hover:shadow-lg group"
            >
              <div className="flex items-start mb-4">
                <div className="flex items-center">
                  <div className="mr-3 text-accent">
                    {getIcon('hotel')}
                  </div>
                  <h3 className="text-lg font-semibold transition-colors duration-200 font-headings text-headings group-hover:text-accent">
                    {t.tireChangeHotel}
                  </h3>
                </div>
              </div>
              <p className="mb-4 text-sm text-text">
                {t.tireChangeHotelDesc}
              </p>
              <div className="flex items-center justify-between">
                <div className="font-semibold text-accent">{t.bookTime}</div>
                <div className="text-sm font-semibold text-accent">{language === 'no' ? '500,- til 600,-' : '500,- to 600,-'}</div>
              </div>
            </a>
            
            <a 
              href={language === 'no' ? "https://calendly.com/4dekk/hjulskift-egne-dekk" : "https://calendly.com/4dekk/hjulskift-egne-dekk-clone"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-6 transition-all duration-300 border border-gray-600 rounded-lg card-dark hover:border-accent hover:shadow-lg group"
            >
              <div className="flex items-start mb-4">
                <div className="flex items-center">
                  <div className="mr-3 text-accent">
                    {getIcon('tire')}
                  </div>
                  <h3 className="text-lg font-semibold transition-colors duration-200 font-headings text-headings group-hover:text-accent">
                    {t.tireChangeOwn}
                  </h3>
                </div>
              </div>
              <p className="mb-4 text-sm text-text">
                {t.tireChangeOwnDesc}
              </p>
              <div className="flex items-center justify-between">
                <div className="font-semibold text-accent">{t.bookTime}</div>
                <div className="text-sm font-semibold text-accent">{language === 'no' ? '500,- til 600,-' : '500,- to 600,-'}</div>
              </div>
            </a>
            
            <a 
              href={language === 'no' ? "https://calendly.com/4dekk/omlegging-av-dekk" : "https://calendly.com/4dekk/omlegging-av-dekk-selvbestilling-via-internet-clone"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-6 transition-all duration-300 border border-gray-600 rounded-lg card-dark hover:border-accent hover:shadow-lg group"
            >
              <div className="flex items-start mb-4">
                <div className="flex items-center">
                  <div className="mr-3 text-accent">
                    {getIcon('tire')}
                  </div>
                  <h3 className="text-lg font-semibold transition-colors duration-200 font-headings text-headings group-hover:text-accent">
                    {t.tireMounting}
                  </h3>
                </div>
              </div>
              <p className="mb-4 text-sm text-text">
                {t.tireMountingDesc}
              </p>
              <div className="flex items-center justify-between">
                <div className="font-semibold text-accent">{t.bookTime}</div>
                <div className="text-sm font-semibold text-accent">1800,-</div>
              </div>
            </a>
            
            <a 
              href={language === 'no' ? "https://calendly.com/4dekk-service2/etterkontroll" : "https://calendly.com/4dekk-service2/etterkontroll-clone"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-6 transition-all duration-300 border border-gray-600 rounded-lg card-dark hover:border-accent hover:shadow-lg group"
            >
              <div className="flex items-start mb-4">
                <div className="flex items-center">
                  <div className="mr-3 text-accent">
                    {getIcon('check')}
                  </div>
                  <h3 className="text-lg font-semibold transition-colors duration-200 font-headings text-headings group-hover:text-accent">
                    {t.afterControl}
                  </h3>
                </div>
              </div>
              <p className="mb-4 text-sm text-text">
                {t.afterControlDesc}
              </p>
              <div className="flex items-center justify-between">
                <div className="font-semibold text-accent">{t.bookTime}</div>
                <div className="text-sm font-semibold text-accent">400,-</div>
              </div>
            </a>
            
            <a 
              href={language === 'no' ? "https://calendly.com/4dekk-service2/4hjulskontroll" : "https://calendly.com/4dekk-service2/4hjulskontroll-clone"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-6 transition-all duration-300 border border-gray-600 rounded-lg card-dark hover:border-accent hover:shadow-lg group"
            >
              <div className="flex items-start mb-4">
                <div className="flex items-center">
                  <div className="mr-3 text-accent">
                    {getIcon('tire')}
                  </div>
                  <h3 className="text-lg font-semibold transition-colors duration-200 font-headings text-headings group-hover:text-accent">
                    {t.wheelAlignment}
                  </h3>
                </div>
              </div>
              <p className="mb-4 text-sm text-text">
                {t.wheelAlignmentDesc}
              </p>
              <div className="flex items-center justify-between">
                <div className="font-semibold text-accent">{t.bookTime}</div>
                <div className="text-sm font-semibold text-accent">1875,-</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="section-light section-padding">
        <div className="text-center container-custom">
          <div className="max-w-2xl mx-auto">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings text-headings">
              {t.helpTitle}
            </h2>
            <p className="mb-8 text-lg text-text">
              {t.helpDescription}
            </p>
            <a href="/contact" className="btn-secondary whitespace-nowrap min-w-[120px]">
              {t.contactButton}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 