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
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden card-dark border-glow-strong"
            style={{ animation: "slideUpZoom 0.5s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full p-6 lg:p-8">
                <div className="flex items-center justify-between flex-shrink-0 mb-6">
                  <h3 className="text-2xl font-semibold lg:text-3xl font-headings text-headings">
                    {title}
                  </h3>
                  <button
                    onClick={handleToggle}
                    className="inline-flex items-center justify-center w-10 h-10 transition-all duration-200 rounded-full bg-accent/10 hover:bg-accent/20 text-accent hover:text-accent-dark hover:scale-105"
                    aria-label={
                      language === "no"
                        ? "Lukk tjeneste detaljer"
                        : "Close service details"
                    }
                  >
                    <Icon name="close" className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex-1 min-h-0 space-y-6 overflow-y-auto">
                  <p className="text-lg leading-relaxed text-text">
                    {description}
                  </p>
                  {longDescription && (
                    <div className="p-4 border rounded-lg bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                      <h4 className="mb-3 text-sm font-semibold tracking-wide uppercase text-accent">
                        {t.description}
                      </h4>
                      <p className="text-sm leading-relaxed text-text">
                        {longDescription}
                      </p>
                    </div>
                  )}
                  {features && features.length > 0 && (
                    <div className="p-4 border rounded-lg bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                      <h4 className="mb-3 text-sm font-semibold tracking-wide uppercase text-accent">
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
                  <div className="flex justify-end flex-shrink-0 pt-6 mt-6 border-t border-gray-700/50">
                    {bookingLinks && bookingLinks.length > 0 ? (
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {bookingLinks.map((booking, index) => (
                          <a
                            key={index}
                            href={booking.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-3 text-sm font-medium text-center text-black transition-all duration-200 rounded-md bg-accent hover:bg-accent-dark hover:shadow-md"
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
                        className="inline-block w-full lg:w-auto lg:min-w-[200px] px-4 py-3 text-sm font-medium text-center text-black transition-all duration-200 rounded-md bg-accent hover:bg-accent-dark hover:shadow-md"
                      >
                        {t.bookButton}
                      </a>
                    ) : showContactButton ? (
                      <a
                        href="/contact"
                        className="inline-block w-full lg:w-auto lg:min-w-[200px] px-4 py-3 text-sm font-medium text-center text-white transition-all duration-200 bg-red-500 rounded-md hover:bg-red-600 hover:shadow-md"
                      >
                        {t.contactButton}
                      </a>
                    ) : null}
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
