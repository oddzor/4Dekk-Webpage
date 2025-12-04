type Language = "no" | "en";

export function getMetadata(language: Language = "no", path: string = "/") {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SITE_URL || "https://4dekk.no"
      : "http://localhost:3000";
  const currentUrl = `${baseUrl}${path}${language === "en" ? "?lang=en" : ""}`;

  const metadata = {
    no: {
      title: "4Dekk Larvik - Bilverksted og Dekkservice",
      description:
        "Profesjonell bilverksted og dekkservice i Larvik. EU-kontroll, reparasjoner, hjulskift og mer. Kvalitetsarbeid til konkurransedyktige priser.",
      keywords:
        "bilverksted larvik, dekk service, eu kontroll, hjulskift, bilreparasjon, 4dekk",
      ogTitle: "4Dekk Larvik - Bilverksted og Dekkservice",
      ogDescription:
        "Profesjonell bilverksted og dekkservice i Larvik. Kvalitetsarbeid til konkurransedyktige priser.",
      canonical: currentUrl,
      alternateEn: `${baseUrl}${path}?lang=en`,
      alternateNo: `${baseUrl}${path}`,
    },
    en: {
      title: "4Dekk Larvik - Car Workshop and Tire Service",
      description:
        "Professional car workshop and tire service in Larvik. EU inspection, repairs, tire change and more. Quality work at competitive prices.",
      keywords:
        "car workshop larvik, tire service, eu inspection, tire change, car repair, 4dekk",
      ogTitle: "4Dekk Larvik - Car Workshop and Tire Service",
      ogDescription:
        "Professional car workshop and tire service in Larvik. Quality work at competitive prices.",
      canonical: currentUrl,
      alternateEn: `${baseUrl}${path}?lang=en`,
      alternateNo: `${baseUrl}${path}`,
    },
  };

  return metadata[language];
}

type Page = "home" | "about" | "contact" | "booking" | "blog";

export function generatePageMetadata(language: Language, page: Page = "home") {
  const baseMetadata = getMetadata(language, `/${page}`);

  const pageSpecific: Record<
    Language,
    Record<Page, { title: string; description: string }>
  > = {
    no: {
      home: {
        title: "4Dekk Larvik - Bilverksted og Dekkservice",
        description:
          "Profesjonell bilverksted og dekkservice i Larvik. EU-kontroll, reparasjoner, hjulskift og mer. Kvalitetsarbeid til konkurransedyktige priser.",
      },
      about: {
        title: "Om Oss - 4Dekk Larvik",
        description:
          "Lær mer om 4Dekk Larvik. Erfarne teknikere, moderne utstyr og utmerket kundeservice siden 2014.",
      },
      contact: {
        title: "Kontakt Oss - 4Dekk Larvik",
        description:
          "Kontakt 4Dekk Larvik for bilverksted og dekkservice. Ring 93 99 55 55 eller besøk oss på Haakon VII's vei 9.",
      },
      booking: {
        title: "Bestill Time - 4Dekk Larvik",
        description:
          "Bestill time for bilverksted eller dekkservice hos 4Dekk Larvik. Enkel online booking.",
      },
      blog: {
        title: "Blogg - 4Dekk Larvik",
        description:
          "Tips om vedlikehold, reparasjoner og generell, nyttig kjøretøykunnskap fra 4Dekk Larvik.",
      },
    },
    en: {
      home: {
        title: "4Dekk Larvik - Car Workshop and Tire Service",
        description:
          "Professional car workshop and tire service in Larvik. EU inspection, repairs, tire change and more. Quality work at competitive prices.",
      },
      about: {
        title: "About Us - 4Dekk Larvik",
        description:
          "Learn more about 4Dekk Larvik. Experienced technicians, modern equipment and excellent customer service since 2014.",
      },
      contact: {
        title: "Contact Us - 4Dekk Larvik",
        description:
          "Contact 4Dekk Larvik for car workshop and tire service. Call 93 99 55 55 or visit us at Haakon VII's vei 9.",
      },
      booking: {
        title: "Book Appointment - 4Dekk Larvik",
        description:
          "Book an appointment for car workshop or tire service at 4Dekk Larvik. Easy online booking.",
      },
      blog: {
        title: "Blog - 4Dekk Larvik",
        description:
          "Tips about maintenance, repairs and general, useful vehicle knowledge from 4Dekk Larvik.",
      },
    },
  };

  const pageData = pageSpecific[language][page] || pageSpecific[language].home;

  return {
    ...baseMetadata,
    title: pageData.title,
    description: pageData.description,
  };
}
