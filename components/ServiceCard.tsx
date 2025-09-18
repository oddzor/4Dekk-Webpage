'use client'

import Image from 'next/image'
import Icon from './Icon'

interface ServiceCardProps {
  id: string
  title: string
  description: string
  image: string
  longDescription?: string
  features?: string[]
  isExpanded: boolean
  onExpand: (cardId: string) => void
  bookingLink?: string
  bookingLinks?: { label: string; url: string }[]
  showContactButton?: boolean
  language?: 'no' | 'en'
}

export default function ServiceCard({
  id,
  title,
  description,
  image,
  longDescription,
  features,
  isExpanded,
  onExpand,
  bookingLink,
  bookingLinks,
  showContactButton,
  language = 'no'
}: ServiceCardProps) {
  const content = {
    no: {
      readMore: "Les Mer",
      bookButton: "Bestill Time",
      contactButton: "Kontakt Oss",
      description: "Beskrivelse",
      overview: "Oversikt"
    },
    en: {
      readMore: "Read More",
      bookButton: "Book Appointment",
      contactButton: "Contact Us",
      description: "Description",
      overview: "Overview"
    }
  }
  
  const t = content[language]
  const handleToggle = () => {
    onExpand(id);
  };

  return (
    <div className="relative w-full h-96 perspective-1000">
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isExpanded ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute inset-0 w-full h-full backface-hidden">
      <div 
            className="flex flex-col h-full overflow-hidden cursor-pointer card-dark border-glow hover:border-glow-strong"
            onClick={handleToggle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle();
              }
            }}
            aria-label={`${t.readMore} ${title}`}
          >
            <div className="relative w-full overflow-hidden h-52 bg-gray-dark">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            
            <div className="flex flex-col flex-grow min-h-0 p-6">
              <h3 className="mb-3 text-xl font-semibold font-headings text-headings line-clamp-2">{title}</h3>
              
              <p className="flex-grow mb-4 text-sm leading-relaxed text-text line-clamp-3">{description}</p>
              
              <div className="pt-2 mt-auto">
                <div className="inline-flex items-center font-medium transition-colors duration-200 text-accent">
                  {t.readMore}
                  <Icon name="chevron" className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="flex flex-col h-full overflow-hidden transition-all duration-500 ease-in-out card-dark border-glow">
            <div className="flex items-center justify-between p-6 pb-4 border-b border-accent/20">
              <h3 className="text-xl font-semibold font-headings text-headings">{title}</h3>
              <button
                onClick={handleToggle}
                className="inline-flex items-center justify-center w-8 h-8 transition-all duration-200 rounded-full bg-accent/10 hover:bg-accent/20 text-accent hover:text-accent-dark hover:scale-105"
                aria-label={language === 'no' ? 'Lukk tjeneste detaljer' : 'Close service details'}
              >
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 p-6 pt-4 space-y-4 overflow-y-auto">
              {longDescription && (
                <div className="p-4 border rounded-lg bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <h4 className="mb-2 text-sm font-semibold tracking-wide uppercase text-accent">{t.description}</h4>
                  <p className="text-sm leading-relaxed text-text">{longDescription}</p>
                </div>
              )}
              
              {features && features.length > 0 && (
                <div className="p-4 border rounded-lg bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <h4 className="mb-3 text-sm font-semibold tracking-wide uppercase text-accent">{t.overview}</h4>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-text">
                        <span className="text-accent mr-3 mt-0.5 flex-shrink-0">✓</span>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {(bookingLink || bookingLinks || showContactButton) && (
              <div className="p-6 pt-4 mt-auto">
                {bookingLinks && bookingLinks.length > 0 ? (
                  <div className="space-y-2">
                    {bookingLinks.map((booking, index) => (
                      <a
                        key={index}
                        href={booking.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full px-3 py-2 text-sm font-medium text-center text-black transition-all duration-200 rounded-md bg-accent hover:bg-accent-dark hover:shadow-md"
                      >
                        {booking.label}
                      </a>
                    ))}
                  </div>
                ) : bookingLink ? (
                         <a
                           href={bookingLink}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="block w-full px-3 py-2 text-sm font-medium text-center text-black transition-all duration-200 rounded-md bg-accent hover:bg-accent-dark hover:shadow-md whitespace-nowrap min-w-[200px]"
                         >
                           {t.bookButton}
                         </a>
                ) : showContactButton ? (
                  <a
                    href="/contact"
                    className="block w-full px-3 py-2 text-sm font-medium text-center text-white transition-all duration-200 rounded-md bg-red-500 hover:bg-red-600 hover:shadow-md whitespace-nowrap min-w-[120px]"
                  >
                    {t.contactButton}
                  </a>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 