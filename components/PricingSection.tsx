"use client";

import Icon from "./Icon";
import { getPricingData } from "@/utils/dataLoader";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PricingSection() {
  const { language } = useLanguage();
  const pricingItems = getPricingData(language);

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
          {pricingItems.map((item, index) => (
            <div
              key={index}
              className="p-4 md:p-6 card-modern card-modern-interactive"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center">
                  <div className="flex items-center justify-center mr-3 rounded-lg shrink-0 h-9 w-9 bg-accent/10 text-accent">
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-lg font-semibold font-headings text-headings">
                    {item.service}
                  </h3>
                </div>
                <div className="inline-flex items-center rounded-lg bg-accent/10 px-2.5 py-1 text-base font-bold text-right text-accent md:text-lg">
                  {item.price}
                </div>
              </div>
              <p className="text-sm text-text">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="max-w-2xl p-6 mx-auto card-modern">
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
              className="btn-modern-accent whitespace-nowrap min-w-[200px]"
            >
              {t.bookButton}
            </a>
            <a
              href="/contact"
              className="btn-modern-secondary whitespace-nowrap min-w-[120px]"
            >
              {t.contactButton}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
