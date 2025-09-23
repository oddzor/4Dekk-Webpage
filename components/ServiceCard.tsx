"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Icon from "./Icon";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  longDescription?: string;
  features?: string[];
  isExpanded: boolean;
  onExpand: (cardId: string) => void;
  bookingLink?: string;
  bookingLinks?: { label: string; url: string }[];
  showContactButton?: boolean;
  language?: "no" | "en";
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
  language = "no",
}: ServiceCardProps) {
  const content = {
    no: {
      readMore: "Les Mer",
      bookButton: "Bestill Time",
      contactButton: "Kontakt Oss",
      description: "Beskrivelse",
      overview: "Oversikt",
    },
    en: {
      readMore: "Read More",
      bookButton: "Book Appointment",
      contactButton: "Contact Us",
      description: "Description",
      overview: "Overview",
    },
  };

  const t = content[language];
  const [isFlipping, setIsFlipping] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleToggle = () => {
    if (isExpanded) {
      onExpand(id);
      setShowModal(false);
      setIsFlipping(false);
    } else {
      setIsFlipping(true);
      setTimeout(() => {
        setShowModal(true);
        onExpand(id);
      }, 150);
    }
  };

  useEffect(() => {
    if (!isExpanded) {
      setShowModal(false);
      setIsFlipping(false);
    }
  }, [isExpanded]);

  return (
    <>
      <div className="relative w-full h-96 perspective-1000">
        <div
          className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-300 ${
            isFlipping ? "rotate-y-180" : ""
          }`}
        >
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div
              className="flex flex-col h-full overflow-hidden cursor-pointer card-dark border-glow sm:hover:border-glow-strong sm:active:border-glow"
              onClick={handleToggle}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleToggle();
                }
              }}
              aria-label={`${t.readMore} ${title}`}
            >
              <div className="relative flex-shrink-0 w-full overflow-hidden h-52 bg-gray-dark">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 12vw"
                  className="object-cover object-center"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="flex flex-col flex-grow p-6">
                <h3 className="mb-3 text-xl font-semibold font-headings text-headings line-clamp-2">
                  {title}
                </h3>
                <p className="flex-grow mb-4 text-sm leading-relaxed text-text line-clamp-3">
                  {description}
                </p>
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
            <div className="flex flex-col h-full overflow-hidden card-dark border-glow-strong">
              <div className="relative w-full overflow-hidden h-52 bg-gray-dark">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 12vw"
                  className="object-cover object-center"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="flex items-center justify-center flex-grow p-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold font-headings text-headings">
                    {title}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 bg-black/50 backdrop-blur-sm"
          style={{ animation: "fadeIn 0.3s ease-out" }}
          onClick={handleToggle}
        >
          <div
            className="relative w-full max-w-6xl max-h-[95vh] overflow-hidden card-dark border-glow-strong service-modal-mobile"
            style={{ animation: "slideUpZoom 0.5s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full lg:flex-row">
              <div className="relative w-full h-32 sm:h-40 md:h-48 lg:w-1/2 lg:h-auto lg:min-h-0 lg:flex-1 bg-gray-dark">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="flex flex-col flex-1 lg:flex-[2] min-h-0 p-4 sm:p-6 lg:p-8">
                <div className="flex items-center justify-between flex-shrink-0 mb-4 sm:mb-6">
                  <h3 className="pr-2 text-xl font-semibold sm:text-2xl lg:text-3xl font-headings text-headings">
                    {title}
                  </h3>
                  <button
                    onClick={handleToggle}
                    className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 transition-all duration-200 rounded-full sm:w-10 sm:h-10 bg-accent/10 hover:bg-accent/20 text-accent hover:text-accent-dark hover:scale-105"
                    aria-label={
                      language === "no"
                        ? "Lukk tjeneste detaljer"
                        : "Close service details"
                    }
                  >
                    <Icon name="close" className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
                <div className="flex-1 min-h-0 pr-1 space-y-4 overflow-y-auto sm:space-y-6 service-card-scroll">
                  <p className="text-base leading-relaxed sm:text-lg text-text">
                    {description}
                  </p>
                  {longDescription && (
                    <div className="p-3 border rounded-lg sm:p-4 bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                      <h4 className="mb-2 text-sm font-semibold tracking-wide uppercase sm:mb-3 text-accent">
                        {t.description}
                      </h4>
                      <p className="text-sm leading-relaxed text-text">
                        {longDescription}
                      </p>
                    </div>
                  )}
                  {features && features.length > 0 && (
                    <div className="p-3 border rounded-lg sm:p-4 bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                      <h4 className="mb-2 text-sm font-semibold tracking-wide uppercase sm:mb-3 text-accent">
                        {t.overview}
                      </h4>
                      <ul className="space-y-2">
                        {features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start text-sm text-text"
                          >
                            <span className="text-accent mr-3 mt-0.5 flex-shrink-0">
                              ✓
                            </span>
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {(bookingLink || bookingLinks || showContactButton) && (
                  <div className="flex justify-end flex-shrink-0 pt-4 mt-4 border-t sm:pt-6 sm:mt-6 border-gray-700/50">
                    {bookingLinks && bookingLinks.length > 0 ? (
                      <div className="grid w-full grid-cols-1 gap-2 sm:gap-3 sm:w-auto sm:grid-cols-2">
                        {bookingLinks.map((booking, index) => (
                          <a
                            key={index}
                            href={booking.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 text-sm font-medium text-center text-black transition-all duration-200 rounded-md sm:px-4 sm:py-3 bg-accent hover:bg-accent-dark hover:shadow-md"
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
                        className="inline-block w-full sm:w-auto sm:min-w-[200px] px-3 py-2 sm:px-4 sm:py-3 text-sm font-medium text-center text-black transition-all duration-200 rounded-md bg-accent hover:bg-accent-dark hover:shadow-md"
                      >
                        {t.bookButton}
                      </a>
                    ) : showContactButton ? (
                      <a
                        href="/contact"
                        className="inline-block w-full sm:w-auto sm:min-w-[200px] px-3 py-2 sm:px-4 sm:py-3 text-sm font-medium text-center text-white transition-all duration-200 bg-red-500 rounded-md hover:bg-red-600 hover:shadow-md"
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
      )}
    </>
  );
}
