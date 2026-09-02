import businessData from "@/data/business.json";
import pricingData from "@/data/pricing.json";
import reviewsData from "@/data/cached-reviews.json";

const SITE_URL = "https://www.4dekk.no";
const LOGO_URL = `${SITE_URL}/images/4dekk-logo-white-red.webp`;

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
// verksted på Torstrand i Larvik.
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
  return Object.entries(businessData.hours)
    .filter(([day]) => day in DAY_NAMES)
    .filter(([, value]) => value !== "Stengt")
    .map(([day, value]) => {
      const [opens, closes] = value.split(" - ");
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${DAY_NAMES[day]}`,
        opens,
        closes,
      };
    });
}

function buildOfferCatalog() {
  return {
    "@type": "OfferCatalog",
    name: "Tjenester hos 4Dekk Larvik",
    itemListElement: pricingData.map((item) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: item.service,
        description: item.description,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: { "@type": "City", name: "Larvik" },
      },
    })),
  };
}

export default function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${SITE_URL}/#business`,
    name: businessData.name,
    description: businessData.description,
    url: SITE_URL,
    telephone: "+4793995555",
    email: businessData.contact.email,
    image: [
      `${SITE_URL}/images/hero-image-1.webp`,
      `${SITE_URL}/images/om-4dekk.webp`,
    ],
    logo: LOGO_URL,
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
    knowsLanguage: ["nb-NO", "en"],
    priceRange: "$$",
    currenciesAccepted: "NOK",
    paymentAccepted: ["Cash", "Credit Card", "Debit Card", "Bank Transfer"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviewsData.rating,
      reviewCount: reviewsData.totalRatings,
      bestRating: 5,
      worstRating: 1,
    },
    hasOfferCatalog: buildOfferCatalog(),
    sameAs: [
      "https://www.facebook.com/4dekk.no",
      "https://www.instagram.com/4dekk/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
