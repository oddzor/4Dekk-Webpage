import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicePages, getServicePage } from "@/data/servicePages";
import { getBlogArticleBySlug } from "@/utils/dataLoader";
import businessData from "@/data/business.json";
import LazyMapEmbed from "@/components/LazyMapEmbed";

const SITE_URL = "https://www.4dekk.no";
const PHONE = businessData.contact.phoneE164;
const PHONE_DISPLAY = businessData.contact.phone;

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = getServicePage(params.slug);
  if (!page) return {};

  const url = `/tjenester/${page.slug}`;
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      type: "website",
      images: [
        { url: page.image, width: 1200, height: 630, alt: page.imageAlt },
      ],
    },
  };
}

function parsePriceLabel(
  label: string,
): { value: string; isFrom: boolean } | null {
  const isFrom = /\bfra\b/i.test(label);
  const match = label.replace(/\s/g, "").match(/(\d[\d.]*)/);
  if (!match) return null;
  return { value: match[1].replace(/\./g, ""), isFrom };
}

function BookingButton({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function ServiceLandingPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = getServicePage(params.slug);
  if (!page) {
    notFound();
  }

  const url = `${SITE_URL}/tjenester/${page.slug}`;
  const relatedSlugs =
    page.relatedBlogSlugs ??
    (page.relatedBlogSlug ? [page.relatedBlogSlug] : []);
  const relatedArticles = relatedSlugs
    .map((slug) => getBlogArticleBySlug(slug))
    .filter((a): a is NonNullable<typeof a> => a !== null);
  const siblingServices = (page.relatedServiceSlugs ?? [])
    .map((slug) => getServicePage(slug))
    .filter((s): s is NonNullable<typeof s> => s !== undefined);

  const price = parsePriceLabel(page.priceLabel);
  const isQuote = page.bookingUrl.startsWith("/contact");
  const ctaLabel = isQuote ? "Be om pristilbud" : "Bestill time";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.name,
    serviceType: page.serviceType,
    description: page.metaDescription,
    url,
    areaServed: [
      "Larvik",
      "Stavern",
      "Kvelde",
      "Helgeroa",
      "Tjølling",
      "Sandefjord",
    ].map((name) => ({ "@type": "City", name })),
    provider: { "@id": `${SITE_URL}/#business` },
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "NOK",
            url: `${SITE_URL}/booking`,
            ...(price.isFrom
              ? {
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    priceCurrency: "NOK",
                    minPrice: price.value,
                  },
                }
              : { price: price.value }),
          },
        }
      : {}),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "nb-NO",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hjem", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tjenester",
        item: `${SITE_URL}/tjenester`,
      },
      { "@type": "ListItem", position: 3, name: page.name, item: url },
    ],
  };

  return (
    <div className="pb-24 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
              <Link href="/tjenester" className="hover:text-accent">
                Tjenester
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-400">{page.name}</span>
            </nav>

            <h1 className="mb-3 text-3xl font-bold md:text-4xl lg:text-5xl font-headings">
              {page.h1}
            </h1>

            <p className="mb-6 text-sm text-gray-300">
              Statens vegvesen-godkjent bilverksted og kontrollorgan
              <span className="mx-2">·</span>
              4,8 ★ på Google (233 anmeldelser)
              <span className="mx-2">·</span>
              10+ år på Nanset i Larvik
            </p>

            <div className="flex flex-col gap-8 md:grid md:grid-cols-[1.4fr_1fr] md:items-start">
              <div className="order-2 space-y-4 text-lg text-gray-200 md:order-1">
                {page.intro.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="order-1 p-6 card-dark md:order-2">
                <p className="text-sm tracking-wide uppercase text-gray-300">
                  Pris
                </p>
                <p className="mb-2 text-3xl font-bold text-accent">
                  {page.priceLabel}
                </p>
                <p className="mb-5 text-sm text-gray-300">{page.priceNote}</p>
                <div className="flex flex-col gap-3">
                  <BookingButton
                    href={page.bookingUrl}
                    className="text-center btn-accent"
                  >
                    {ctaLabel}
                  </BookingButton>
                  <a
                    href={`tel:${PHONE}`}
                    className="text-center btn-secondary"
                  >
                    Ring {PHONE_DISPLAY}
                  </a>
                </div>
                <dl className="pt-5 mt-5 space-y-1 text-sm border-t border-gray-700 text-gray-300">
                  <div className="flex justify-between gap-3">
                    <dt>Adresse</dt>
                    <dd className="text-right">
                      Haakon VII&apos;s vei 9, 3269 Larvik
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>Åpningstider</dt>
                    <dd className="text-right">Man–fre 08:00–16:00</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="my-8 overflow-hidden rounded-lg shadow-md">
              <Image
                src={page.image}
                alt={page.imageAlt}
                width={1024}
                height={576}
                className="w-full h-auto"
              />
            </div>

            {page.sections.map((section, index) => (
              <div key={index} id={section.id} className="mb-10 scroll-mt-28">
                <h2 className="mb-4 text-2xl font-bold font-headings text-headings">
                  {section.heading}
                </h2>
                {section.body.map((paragraph, pIndex) => (
                  <p key={pIndex} className="mb-4 leading-relaxed text-text">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mb-4 ml-6 list-disc text-text">
                    {section.bullets.map((bullet, bIndex) => (
                      <li key={bIndex} className="mb-2 leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
                {section.id === "etterkontroll" && (
                  <div className="flex flex-col gap-3 mt-6 sm:flex-row">
                    <BookingButton
                      href={page.bookingUrl}
                      className="text-center btn-accent"
                    >
                      Bestill etterkontroll (400,-)
                    </BookingButton>
                    <a
                      href={`tel:${PHONE}`}
                      className="text-center btn-secondary"
                    >
                      Ring {PHONE_DISPLAY}
                    </a>
                  </div>
                )}
              </div>
            ))}

            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold font-headings text-headings">
                Ofte stilte spørsmål
              </h2>
              <dl className="space-y-6">
                {page.faq.map((item, index) => (
                  <div key={index}>
                    <dt className="mb-2 text-lg font-semibold font-headings text-headings">
                      {item.q}
                    </dt>
                    <dd className="leading-relaxed text-text">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="p-8 mt-12 card-dark">
              <h2 className="mb-4 text-xl font-semibold font-headings text-headings">
                Bestill {page.name.toLowerCase()} i Larvik
              </h2>
              <p className="mb-6 text-text">
                4Dekk Larvik holder til i Haakon VII&apos;s vei 9 på Nanset,
                få minutter fra E18. Åpent mandag til fredag 08:00–16:00. Bestill
                time på nett, eller ring {PHONE_DISPLAY} hvis du er usikker på hva
                bilen din trenger.
              </p>
              <div className="flex flex-col justify-start gap-4 sm:flex-row">
                <BookingButton
                  href={page.bookingUrl}
                  className="text-center btn-accent"
                >
                  {ctaLabel}
                </BookingButton>
                <a
                  href={`tel:${PHONE}`}
                  className="text-center btn-secondary"
                >
                  Ring {PHONE_DISPLAY}
                </a>
              </div>
              <div className="mt-6 overflow-hidden rounded-lg">
                <LazyMapEmbed
                  src={businessData.location.googleMapsEmbedUrl}
                  title="Kart til 4Dekk Larvik"
                  height={240}
                />
              </div>
              <p className="mt-3 text-sm">
                <a
                  href={businessData.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-accent"
                >
                  Åpne veibeskrivelse i Google Maps
                </a>
              </p>
            </div>

            {siblingServices.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-4 text-xl font-semibold font-headings text-headings">
                  Andre tjenester
                </h2>
                <ul className="ml-6 list-disc text-text">
                  {siblingServices.map((s) => (
                    <li key={s.slug} className="mb-2">
                      <Link
                        href={`/tjenester/${s.slug}`}
                        className="underline hover:text-accent"
                      >
                        {s.h1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {relatedArticles.length > 0 && (
              <div className="mt-8 text-text">
                <p className="mb-2 font-semibold">Les mer:</p>
                <ul className="ml-6 list-disc">
                  {relatedArticles.map((a) => (
                    <li key={a.slug} className="mb-1">
                      <Link
                        href={`/blog/${a.slug}`}
                        className="underline hover:text-accent"
                      >
                        {a.title.no}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="pt-6 mt-10 text-sm border-t border-gray-300 text-gray-500">
              Innhold av 4Dekk Larvik. Faglig gjennomgått av Henrikas, teknisk
              leder og godkjent kjøretøykontrollør hos Statens vegvesen.{" "}
              <Link href="/about" className="underline hover:text-accent">
                Om verkstedet
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Fast handlingslinje på mobil */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] border-t bg-gray-darker/95 backdrop-blur-sm border-accent/20 md:hidden">
        <a
          href={`tel:${PHONE}`}
          className="flex items-center justify-center flex-1 gap-2 py-3 text-sm font-semibold text-center btn-secondary"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Ring oss
        </a>
        <BookingButton
          href={page.bookingUrl}
          className="flex-1 py-3 text-sm font-semibold text-center btn-accent"
        >
          {isQuote ? "Be om pristilbud" : `Bestill ${page.name.toLowerCase()}`}
        </BookingButton>
      </div>
    </div>
  );
}
