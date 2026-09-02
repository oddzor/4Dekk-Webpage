import businessData from "@/data/business.json";
import pricingData from "@/data/pricing.json";

const SITE_URL = "https://www.4dekk.no";
const LOGO_URL = `${SITE_URL}/images/4dekk-logo-white-red.webp`;
const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const DAY_NAMES: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

// Larvik kommune tettsteder + nærmeste nabokommune – reelt nedslagsfelt for et
// verksted på Nanset i Larvik.
const AREA_SERVED = [
  "Larvik",
  "Stavern",
  "Torstrand",
  "Nanset",
  "Kvelde",
  "Helgeroa",
  "Tjølling",
  "Sandefjord",
];

function buildOpeningHours() {
  const [lunchStart, lunchEnd] = (businessData.hours.lunch || "").split(" - ");
  return Object.entries(businessData.hours)
    .filter(([day]) => day in DAY_NAMES)
    .filter(([, value]) => value !== "Stengt")
    .flatMap(([day, value]) => {
      const [opens, closes] = value.split(" - ");
      const dayOfWeek = `https://schema.org/${DAY_NAMES[day]}`;
      if (lunchStart && lunchEnd) {
        return [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek,
            opens,
            closes: lunchStart,
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek,
            opens: lunchEnd,
            closes,
          },
        ];
      }
      return [
        { "@type": "OpeningHoursSpecification", dayOfWeek, opens, closes },
      ];
    });
}

function parsePrice(raw: string): { value: string; isFrom: boolean } | null {
  const isFrom = /\bfra\b/i.test(raw);
  const match = raw.replace(/\s/g, "").match(/(\d[\d.]*)/);
  if (!match) return null;
  return { value: match[1].replace(/\./g, ""), isFrom };
}

function buildOfferCatalog() {
  return {
    "@type": "OfferCatalog",
    name: "Tjenester hos 4Dekk Larvik",
    itemListElement: pricingData.map((item) => {
      const price = parsePrice(item.price);
      return {
        "@type": "Offer",
        priceCurrency: "NOK",
        ...(price
          ? price.isFrom
            ? {
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "NOK",
                  minPrice: price.value,
                },
              }
            : { price: price.value }
          : {}),
        itemOffered: {
          "@type": "Service",
          name: item.service,
          description: item.description,
          provider: { "@id": BUSINESS_ID },
          areaServed: { "@type": "City", name: "Larvik" },
        },
      };
    }),
  };
}

export default function LocalBusinessSchema() {
  const business = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": BUSINESS_ID,
    name: businessData.name,
    legalName: businessData.legalName,
    alternateName: "4dekk AS",
    description: businessData.description,
    url: `${SITE_URL}/`,
    telephone: businessData.contact.phoneE164,
    email: businessData.contact.email,
    image: [
      `${SITE_URL}/images/hero-image-1.webp`,
      `${SITE_URL}/images/om-4dekk.webp`,
    ],
    logo: LOGO_URL,
    foundingDate: businessData.foundingYear,
    numberOfEmployees: 5,
    vatID: `NO${businessData.orgNumber}MVA`,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "organisasjonsnummer",
      value: businessData.orgNumber,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: businessData.address.street,
      addressLocality: businessData.address.city,
      postalCode: businessData.address.postalCode,
      addressRegion: "Vestfold",
      addressCountry: "NO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessData.location.latitude,
      longitude: businessData.location.longitude,
    },
    openingHoursSpecification: buildOpeningHours(),
    hasMap: businessData.location.googleMapsUrl,
    areaServed: AREA_SERVED.map((name) => ({ "@type": "City", name })),
    knowsLanguage: ["nb-NO"],
    priceRange: "$$",
    currenciesAccepted: "NOK",
    paymentAccepted: ["Cash", "Credit Card", "Debit Card", "Bank Transfer"],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Statens vegvesen – Bilverksted 01 (kjøretøy ≤ 3500 kg)",
        recognizedBy: {
          "@type": "GovernmentOrganization",
          name: "Statens vegvesen",
          url: "https://www.vegvesen.no/",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Statens vegvesen – Kontrollorgan 01 (EU-kontroll av kjøretøy ≤ 3500 kg)",
        recognizedBy: {
          "@type": "GovernmentOrganization",
          name: "Statens vegvesen",
          url: "https://www.vegvesen.no/",
        },
      },
    ],
    hasOfferCatalog: buildOfferCatalog(),
    sameAs: [
      "https://www.facebook.com/4dekk.no",
      "https://www.instagram.com/4dekk/",
      businessData.location.googleMapsUrl,
      `https://virksomhet.brreg.no/nb/oppslag/enheter/${businessData.orgNumber}`,
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: "4Dekk Larvik",
    inLanguage: "nb-NO",
    publisher: { "@id": BUSINESS_ID },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
