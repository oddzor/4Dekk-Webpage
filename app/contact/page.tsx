"use client";

import Icon from "../../components/Icon";
import { getBusinessData } from "../../utils/dataLoader";
import { useLanguage } from "../../contexts/LanguageContext";
import ContactForm from "../../components/ContactForm";
import DynamicMetadata from "../../components/DynamicMetadata";

export default function ContactPage() {
  const { language } = useLanguage();
  const businessData = getBusinessData(language);

  const content = {
    no: {
      title: "Kontakt Oss",
      description:
        "Ta kontakt med oss for spørsmål, tilbud eller for å bestille din neste service.",
      contactFormTitle: "Kontakt Oss",
      contactFormDescription:
        "Fyll ut skjemaet nedenfor og vi kommer tilbake til deg så raskt som mulig.",
      emailNote: "Merk at eposten ikke bemannes utenfor åpningstider.",
      contactInfoTitle: "Kontaktinformasjon",
      contactInfoDescription:
        "Du kan også kontakte oss direkte via telefon eller besøke vårt verksted.",
      phone: "Telefon",
      email: "E-post",
      address: "Adresse",
      hours: "Åpningstider",
      monday: "Mandag",
      tuesday: "Tirsdag",
      wednesday: "Onsdag",
      thursday: "Torsdag",
      friday: "Fredag",
      saturday: "Lørdag",
      sunday: "Søndag",
      mapTitle: "4Dekk Larvik Plassering",
      ctaTitle: "Klar til å Komme I Gang?",
      ctaDescription:
        "Ikke vent til det er for sent. Kontakt oss eller bestill din neste vedlikehold, reparasjon eller dekkservice idag.",
      bookButton: "Bestill Time",
    },
    en: {
      title: "Contact Us",
      description:
        "Contact us for questions, quotes or to book your next service.",
      contactFormTitle: "Contact Us",
      contactFormDescription:
        "Fill out the form below and we'll get back to you as soon as possible.",
      emailNote: "Note that email is not monitored outside opening hours.",
      contactInfoTitle: "Contact Information",
      contactInfoDescription:
        "You can also contact us directly by phone or visit our workshop.",
      phone: "Phone",
      email: "Email",
      address: "Address",
      hours: "Opening Hours",
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      mapTitle: "4Dekk Larvik Location",
      ctaTitle: "Ready to Get Started?",
      ctaDescription:
        "Don't wait until it's too late. Contact us or book your next maintenance, repair or tire service today.",
      bookButton: "Book Appointment",
    },
  };

  const t = content[language];
  return (
    <div>
      <DynamicMetadata page="contact" />
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

      <section className="section-padding section-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings text-headings">
                {t.contactFormTitle}
              </h2>
              <div className="mb-8 text-lg text-text">
                {t.contactFormDescription}
                <p className="text-accent">{t.emailNote}</p>
              </div>
              <ContactForm />
            </div>

            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings text-headings">
                {t.contactInfoTitle}
              </h2>
              <p className="mb-8 text-lg text-text">
                {t.contactInfoDescription}
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-accent">
                    <Icon name="phone" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold font-headings text-headings">
                      {t.phone}
                    </h3>
                    <a
                      href={`tel:${businessData.contact.phone}`}
                      className="transition-colors duration-200 text-accent hover:text-accent-dark"
                    >
                      {businessData.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-accent">
                    <Icon name="email" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold font-headings text-headings">
                      {t.email}
                    </h3>
                    <a
                      href={`mailto:${businessData.contact.email}`}
                      className="transition-colors duration-200 text-accent hover:text-accent-dark"
                    >
                      {businessData.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-accent">
                    <Icon name="map" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold font-headings text-headings">
                      {t.address}
                    </h3>
                    <p className="text-text">
                      {businessData.address.street}
                      <br />
                      {businessData.address.postalCode}{" "}
                      {businessData.address.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-accent">
                    <Icon name="clock" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold font-headings text-headings">
                      {t.hours}
                    </h3>
                    <div className="space-y-1 text-text">
                      <div className="flex justify-between">
                        <span className="min-w-[100px]">{t.monday}:</span>
                        <span className="text-accent font-medium">
                          {businessData.hours.monday}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="min-w-[100px]">{t.tuesday}:</span>
                        <span className="text-accent font-medium">
                          {businessData.hours.tuesday}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="min-w-[100px]">{t.wednesday}:</span>
                        <span className="text-accent font-medium">
                          {businessData.hours.wednesday}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="min-w-[100px]">{t.thursday}:</span>
                        <span className="text-accent font-medium">
                          {businessData.hours.thursday}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="min-w-[100px]">{t.friday}:</span>
                        <span className="text-accent font-medium">
                          {businessData.hours.friday}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="min-w-[100px]">{t.saturday}:</span>
                        <span className="text-accent font-medium">
                          {businessData.hours.saturday}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="min-w-[100px]">{t.sunday}:</span>
                        <span className="text-accent font-medium">
                          {businessData.hours.sunday}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="overflow-hidden card-dark">
                  <div className="h-[500px] lg:h-[600px] relative">
                    <iframe
                      src={businessData.location.googleMapsEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={t.mapTitle}
                    />
                  </div>
                </div>
              </div>
            </div>
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
            <a href="/booking" className="btn-accent">
              {t.bookButton}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
