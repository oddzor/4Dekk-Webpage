import businessData from "@/data/business.json";

const SITE_URL = "https://www.4dekk.no";

const DAY_NAMES: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

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

export default function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: businessData.name,
    description: businessData.description,
    url: SITE_URL,
    telephone: businessData.contact.phone,
    email: businessData.contact.email,
    image: `${SITE_URL}/images/4dekk-logo-white-red.webp`,
    logo: `${SITE_URL}/images/4dekk-logo-white-red.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessData.address.street,
      addressLocality: businessData.address.city,
      postalCode: businessData.address.postalCode,
      addressCountry: "NO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessData.location.latitude,
      longitude: businessData.location.longitude,
    },
    openingHoursSpecification: buildOpeningHours(),
    hasMap: businessData.location.googleMapsUrl,
    areaServed: {
      "@type": "City",
      name: "Larvik",
    },
    priceRange: "$$",
    currenciesAccepted: "NOK",
    paymentAccepted: ["Cash", "Credit Card", "Bank Transfer"],
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
