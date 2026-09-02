import type { Metadata } from "next";
import Link from "next/link";
import { servicePages } from "@/data/servicePages";

const SITE_URL = "https://www.4dekk.no";

export const metadata: Metadata = {
  title: {
    absolute: "Tjenester i Larvik – EU-kontroll, dekk og verksted | 4Dekk",
  },
  description:
    "Oversikt over tjenestene til 4Dekk Larvik: EU-kontroll, hjulskift, 4-hjulskontroll, AC-service, dekkhotell og bilverksted. Priser og booking på Nanset i Larvik.",
  alternates: { canonical: "/tjenester" },
  openGraph: {
    title: "Tjenester hos 4Dekk Larvik",
    description:
      "EU-kontroll, hjulskift, 4-hjulskontroll, AC-service, dekkhotell og bilverksted i Larvik.",
    url: "/tjenester",
    siteName: "4Dekk Larvik",
    locale: "no_NO",
    type: "website",
    images: [
      {
        url: "/images/hero-image-1.webp",
        width: 1200,
        height: 630,
        alt: "4Dekk Larvik – bilverksted og dekkservice",
      },
    ],
  },
};

export default function ServicesIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hjem", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tjenester",
        item: `${SITE_URL}/tjenester`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: servicePages.map((page, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: page.name,
      url: `${SITE_URL}/tjenester/${page.slug}`,
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <section className="py-16 text-white bg-gradient-dark md:py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <nav
              aria-label="Brødsmulesti"
              className="mb-4 text-sm text-gray-300"
            >
              <Link href="/" className="hover:text-accent">
                Hjem
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-400">Tjenester</span>
            </nav>
            <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl font-headings">
              Tjenester i Larvik
            </h1>
            <p className="max-w-3xl text-lg text-gray-200">
              4Dekk Larvik er et Statens vegvesen-godkjent bilverksted og
              dekkverksted på Nanset. Under finner du de vanligste tjenestene
              våre med pris og mulighet for å bestille time.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding section-light">
        <div className="container-custom">
          <div className="grid max-w-5xl gap-6 mx-auto md:grid-cols-2">
            {servicePages.map((page) => (
              <Link
                key={page.slug}
                href={`/tjenester/${page.slug}`}
                className="block p-6 transition-all duration-300 border border-gray-600 rounded-lg card-dark hover:border-accent hover:shadow-lg"
              >
                <h2 className="mb-2 text-xl font-semibold font-headings text-headings">
                  {page.name} i Larvik
                </h2>
                <p className="mb-3 text-sm text-accent">{page.priceLabel}</p>
                <p className="text-text">{page.intro[0]}</p>
                <span className="inline-block mt-4 text-sm font-medium text-accent">
                  Les mer →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/booking"
              className="btn-accent whitespace-nowrap min-w-[200px]"
            >
              Bestill time
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
