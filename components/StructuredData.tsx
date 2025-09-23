interface StructuredDataProps {
  businessName: string;
  businessDescription: string;
  businessAddress: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  businessPhone: string;
  businessEmail: string;
  businessWebsite: string;
  businessHours: string[];
  services: string[];
  priceRange: string;
}

export default function StructuredData({
  businessName,
  businessDescription,
  businessAddress,
  businessPhone,
  businessEmail,
  businessWebsite,
  businessHours,
  services,
  priceRange,
}: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutomotiveRepair",
    "name": businessName,
    "description": businessDescription,
    "url": businessWebsite,
    "telephone": businessPhone,
    "email": businessEmail,
    "priceRange": priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessAddress.streetAddress,
      "addressLocality": businessAddress.addressLocality,
      "postalCode": businessAddress.postalCode,
      "addressCountry": businessAddress.addressCountry,
    },
    "openingHoursSpecification": businessHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": hours.split(":")[0],
      "opens": hours.split(":")[1]?.split("-")[0] || "09:00",
      "closes": hours.split(":")[1]?.split("-")[1] || "17:00",
    })),
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 59.0533,
        "longitude": 10.0297,
      },
      "geoRadius": "50000",
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Automotive Services",
      "itemListElement": services.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service,
        },
        "position": index + 1,
      })),
    },
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
    "currenciesAccepted": "NOK",
    "image": `${businessWebsite}/images/4dekk-logo-white-red.webp`,
    "logo": `${businessWebsite}/images/4dekk-logo-white-red.webp`,
    "sameAs": [
      "https://www.facebook.com/4dekk.no",
      "https://www.instagram.com/4dekk/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
