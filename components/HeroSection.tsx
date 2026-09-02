"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { language } = useLanguage();

  const content = {
    no: {
      title: "Bilverksted og dekkservice i Larvik",
      description:
        "Statens vegvesen-godkjent bilverksted og kontrollorgan på Nanset. 4,8 ★ av 233 Google-anmeldelser. EU-kontroll 1150,-, hjulskift fra 600,-.",
      cta1: "Bestill Time Nå",
      cta2: "Se Våre Tjenester",
      trust1: "Års Erfaring",
      trust2: "Fornøyde Kunder",
      trust3: "Mandag-Fredag",
    },
    en: {
      title: "Automotive Repair & Tire Service",
      description:
        "Quality work, competitive pricing and excellent customer service. Your partner for car and tire service in Larvik.",
      cta1: "Book Appointment Now",
      cta2: "See Our Services",
      trust1: "Years Experience",
      trust2: "Satisfied Customers",
      trust3: "Monday-Friday",
    },
  };

  const t = content[language];
  return (
    <section className="relative flex items-start justify-center min-h-screen pt-20 pb-8 overflow-hidden md:pt-16 md:pb-12 bg-gradient-dark">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-black/70" />
        <Image
          src="/images/hero-image-1.webp"
          alt="Bilverksted med teknikere som arbeider"
          fill
          className="object-cover"
          priority
          quality={80}
          sizes="100vw"
          fetchPriority="high"
        />
      </div>

      <div className="relative z-20 px-4 mt-4 text-center text-white md:mt-8">
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="relative w-80 h-32 md:w-[28rem] md:h-48 lg:w-[32rem] lg:h-56">
            <Image
              src="/images/4dekk-logo-white-red.webp"
              alt="4Dekk Logo"
              fill
              className="object-contain"
              priority
              quality={95}
              sizes="(max-width: 768px) 320px, (max-width: 1024px) 448px, 512px"
              fetchPriority="high"
              style={{
                imageRendering: "auto",
              }}
            />
          </div>
        </div>
        <h1 className="mb-4 text-3xl font-bold md:mb-6 md:text-6xl lg:text-7xl font-headings text-shadow-lg">
          {t.title}
        </h1>

        <p className="max-w-2xl mx-auto mb-8 text-base text-gray-200 md:mb-12 md:text-xl text-shadow">
          {t.description}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/booking"
            className="px-8 py-4 text-lg text-center btn-accent border-glow whitespace-nowrap min-w-[240px]"
          >
            {t.cta1}
          </Link>
          <a
            href="#services"
            className="px-8 py-4 text-lg text-center btn-secondary whitespace-nowrap min-w-[200px]"
          >
            {t.cta2}
          </a>
        </div>

        <div className="grid max-w-4xl grid-cols-1 gap-4 mx-auto mt-8 md:gap-8 md:mt-16 md:grid-cols-3">
          <div className="p-4 text-center md:p-6 card-dark">
            <div className="mb-2 text-2xl font-bold md:text-3xl text-accent">
              10+
            </div>
            <div className="text-sm text-gray-300 md:text-base">{t.trust1}</div>
          </div>
          <div className="p-4 text-center md:p-6 card-dark">
            <div className="mb-2 text-2xl font-bold md:text-3xl text-accent">
              1000+
            </div>
            <div className="text-sm text-gray-300 md:text-base">{t.trust2}</div>
          </div>
          <div className="p-4 text-center md:p-6 card-dark">
            <div className="mb-2 text-2xl font-bold md:text-3xl text-accent">
              08-16
            </div>
            <div className="text-sm text-gray-300 md:text-base">{t.trust3}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
