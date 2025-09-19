"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { generatePageMetadata } from "@/utils/metadata";

type Page = "home" | "about" | "contact" | "booking" | "blog";

interface DynamicMetadataProps {
  page?: Page;
}

export default function DynamicMetadata({
  page = "home",
}: DynamicMetadataProps) {
  const { language } = useLanguage();

  useEffect(() => {
    const metadata = generatePageMetadata(language, page);

    document.title = metadata.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", metadata.description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = metadata.description;
      document.head.appendChild(meta);
    }
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", metadata.keywords);
    } else {
      const meta = document.createElement("meta");
      meta.name = "keywords";
      meta.content = metadata.keywords;
      document.head.appendChild(meta);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", metadata.ogTitle);
    } else {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:title");
      meta.content = metadata.ogTitle;
      document.head.appendChild(meta);
    }
    const ogDescription = document.querySelector(
      'meta[property="og:description"]',
    );
    if (ogDescription) {
      ogDescription.setAttribute("content", metadata.ogDescription);
    } else {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:description");
      meta.content = metadata.ogDescription;
      document.head.appendChild(meta);
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", metadata.canonical);
    } else {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = metadata.canonical;
      document.head.appendChild(link);
    }
    const alternateEn = document.querySelector(
      'link[rel="alternate"][hreflang="en"]',
    );
    if (alternateEn) {
      alternateEn.setAttribute("href", metadata.alternateEn);
    } else {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.setAttribute("hreflang", "en");
      link.href = metadata.alternateEn;
      document.head.appendChild(link);
    }

    const alternateNo = document.querySelector(
      'link[rel="alternate"][hreflang="no"]',
    );
    if (alternateNo) {
      alternateNo.setAttribute("href", metadata.alternateNo);
    } else {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.setAttribute("hreflang", "no");
      link.href = metadata.alternateNo;
      document.head.appendChild(link);
    }
    document.documentElement.lang = language;
  }, [language, page]);

  return null;
}
