"use client";

import { useState } from "react";
import Icon from "./Icon";
import { getPricingData } from "@/utils/dataLoader";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PricingSection() {
  const { language } = useLanguage();
  const pricingItems = getPricingData(language);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const content = {
    no: {
      title: "Våre Priser",
      description:
        "Transparente og konkurransedyktige priser for alle våre tjenester. Alle priser er inkludert mva og materialer.",
      importantInfo: "Viktig Informasjon",
      info1:
        "Dersom du ikke finner det du leter etter, kontakt oss gjerne for et uforpliktende pristilbud",
      info2:
        "Deler til service som bremsedeler, filtere o.l. må ofte bestilles i forveien grunnet begrenset delelager",
      bookButton: "Bestill Time",
      contactButton: "Kontakt Oss",
    },
    en: {
      title: "Our Prices",
      description:
        "Transparent and competitive prices for all our services. All prices include VAT and materials.",
      importantInfo: "Important Information",
      info1:
        "If you don't find what you're looking for, please contact us for a non-binding price quote",
      info2:
        "Service parts such as brake parts, filters etc. often need to be ordered in advance due to limited parts inventory",
      bookButton: "Book Appointment",
      contactButton: "Contact Us",
    },
  };

  const t = content[language];
  const getIcon = (iconType: string) => {
    return <Icon name={iconType} className="w-6 h-6" />;
  };

  return (
    <section id="pricing" className="section-padding section-light">
      <div className="container-custom">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl font-headings text-headings">
            {t.title}
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-text">{t.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pricingItems.map((item, index) => {
            const isExpanded = expandedItems.has(index);

            return (
              <div
                key={index}
                className="overflow-hidden transition-all duration-300 border border-gray-600 rounded-lg card-dark hover:border-accent hover:shadow-lg"
              >
                <div className="md:hidden">
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="w-full p-4 text-left transition-all duration-200 hover:bg-gray-dark/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3 text-accent">
                          {getIcon(item.icon)}
                        </div>
                        <h3 className="text-lg font-semibold font-headings text-headings">
                          {item.service}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-bold text-accent">
                          {item.price}
                        </div>
                        <Icon
                          name="chevron"
                          className={`w-5 h-5 text-text transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-4 pb-4">
                      <p className="text-sm text-text">{item.description}</p>
                    </div>
                  </div>
                </div>

                <div className="hidden p-6 md:block">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="mr-3 text-accent">
                        {getIcon(item.icon)}
                      </div>
                      <h3 className="text-lg font-semibold font-headings text-headings">
                        {item.service}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-accent">
                        {item.price}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-text">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="max-w-2xl p-6 mx-auto card-dark">
            <h3 className="mb-4 text-xl font-semibold font-headings text-accent">
              {t.importantInfo}
            </h3>
            <div className="space-y-2 text-sm text-text">
              <p>• {t.info1}</p>
              <p>• {t.info2}</p>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/booking"
              className="btn-accent whitespace-nowrap min-w-[200px]"
            >
              {t.bookButton}
            </a>
            <a
              href="/contact"
              className="btn-secondary whitespace-nowrap min-w-[120px]"
            >
              {t.contactButton}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
