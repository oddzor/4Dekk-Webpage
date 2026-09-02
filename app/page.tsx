import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import GoogleReviewsSection from "@/components/GoogleReviews";
import HomeClient from "@/components/HomeClient";
import businessData from "@/data/business.json";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const REVIEW_EXCERPTS = [
  {
    name: "Per Anders Hem",
    when: "Nylig",
    text: "Greit å bestille time, personlig kontakt og 100 kr billigere enn verkstedet jeg har brukt i Sandefjord – for EU-kontroll.",
  },
  {
    name: "Hans Kristian Pedersen",
    when: "Nylig",
    text: "Veldig hyggelige folk, raske og flinke. Avtalt pris ble også holdt, så jeg vil absolutt anbefale å ta kontakt med 4Dekk hvis du skal fikse dekk til bilen din.",
  },
  {
    name: "Svend Kolstad",
    when: "Nylig",
    text: "Er alltid velkommen til 4dekk i Larvik. Topp priser og god jobb! Anbefaler dette firmaet for EU-kontroll og reparasjon av bil.",
  },
  {
    name: "Anders Nevland",
    when: "Nylig",
    text: "Skaffet dekkene innen 24 timer og hadde tid til å legge om samme dag. Perfekt service i en stressa hverdag.",
  },
];

const HOME_FAQ = [
  {
    q: "Hvor ligger 4Dekk Larvik?",
    a: "4Dekk Larvik holder til i Haakon VII's vei 9, 3269 Larvik, på Nanset – få minutter fra E18.",
  },
  {
    q: "Hva er åpningstidene?",
    a: "Vi har åpent mandag til fredag 08:00–16:00, med lunsjstengt 12:00–12:30. Lørdag og søndag er stengt.",
  },
  {
    q: "Må jeg bestille time?",
    a: "Ja, vi anbefaler at du bestiller time på nett eller ringer 93 99 55 55, spesielt i sesongrushet for hjulskift.",
  },
  {
    q: "Tar dere alle bilmerker?",
    a: "Vi utfører service, reparasjon, EU-kontroll og dekkservice på de fleste bilmerker og modeller. Er du usikker, ta kontakt før du bestiller.",
  },
  {
    q: "Hva koster EU-kontroll hos 4Dekk Larvik?",
    a: "EU-kontroll koster 1150,- uansett bilmerke. Etterkontroll etter utbedring koster 400,-. Vi er godkjent kontrollorgan hos Statens vegvesen.",
  },
];

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "nb-NO",
    mainEntity: HOME_FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <GoogleReviewsSection />

      <section className="section-padding section-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-2 text-2xl font-bold md:text-3xl font-headings text-headings">
              Utvalgte omtaler
            </h2>
            <p className="mb-8 text-text">
              4Dekk Larvik har 4,8 av 5 stjerner på 233 Google-anmeldelser.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {REVIEW_EXCERPTS.map((r) => (
                <blockquote
                  key={r.name}
                  className="p-6 border border-gray-600 rounded-lg card-dark"
                >
                  <p className="mb-3 text-accent">★★★★★</p>
                  <p className="mb-3 leading-relaxed text-text">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <footer className="text-sm text-gray-400">
                    – {r.name}, Google-anmeldelse
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-dark">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="mb-4 text-2xl font-bold md:text-3xl font-headings text-headings">
                Finn oss i Larvik
              </h2>
              <dl className="space-y-3 text-text">
                <div>
                  <dt className="text-sm tracking-wide uppercase text-gray-400">
                    Adresse
                  </dt>
                  <dd>
                    {businessData.address.street},{" "}
                    {businessData.address.postalCode} {businessData.address.city}{" "}
                    (Nanset)
                  </dd>
                </div>
                <div>
                  <dt className="text-sm tracking-wide uppercase text-gray-400">
                    Åpningstider
                  </dt>
                  <dd>Mandag–fredag 08:00–16:00 (lunsj 12:00–12:30)</dd>
                </div>
                <div>
                  <dt className="text-sm tracking-wide uppercase text-gray-400">
                    Telefon
                  </dt>
                  <dd>
                    <a
                      href={`tel:${businessData.contact.phoneE164}`}
                      className="hover:text-accent"
                    >
                      {businessData.contact.phone}
                    </a>
                  </dd>
                </div>
              </dl>
              <div className="flex flex-col gap-3 mt-6 sm:flex-row">
                <Link href="/booking" className="text-center btn-accent">
                  Bestill time
                </Link>
                <a
                  href={`tel:${businessData.contact.phoneE164}`}
                  className="text-center btn-secondary"
                >
                  Ring {businessData.contact.phone}
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg shadow-md">
              <iframe
                src={businessData.location.googleMapsEmbedUrl}
                title="Kart til 4Dekk Larvik"
                width="100%"
                height="300"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl font-headings text-headings">
              Ofte stilte spørsmål
            </h2>
            <dl className="space-y-6">
              {HOME_FAQ.map((item) => (
                <div key={item.q}>
                  <dt className="mb-2 text-lg font-semibold font-headings text-headings">
                    {item.q}
                  </dt>
                  <dd className="leading-relaxed text-text">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <HomeClient />
    </div>
  );
}
