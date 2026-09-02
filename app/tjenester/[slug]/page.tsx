import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicePages, getServicePage } from "@/data/servicePages";
import { getBlogArticleBySlug } from "@/utils/dataLoader";

const SITE_URL = "https://www.4dekk.no";

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
        {
          url: page.image,
          width: 1200,
          height: 630,
          alt: page.imageAlt,
        },
      ],
    },
  };
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
  const relatedArticle = page.relatedBlogSlug
    ? getBlogArticleBySlug(page.relatedBlogSlug)
    : null;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
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
    provider: {
      "@type": "AutoRepair",
      "@id": `${SITE_URL}/#business`,
      name: "4Dekk Larvik",
      url: SITE_URL,
      telephone: "+4793995555",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
      { "@type": "ListItem", position: 1, name: "Hjem", item: SITE_URL },
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
    <div>
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

            <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl font-headings">
              {page.h1}
            </h1>

            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-start">
              <div className="space-y-4 text-lg text-gray-200">
                {page.intro.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="p-6 card-dark">
                <p className="text-sm tracking-wide uppercase text-gray-300">
                  Pris
                </p>
                <p className="mb-2 text-3xl font-bold text-accent">
                  {page.priceLabel}
                </p>
                <p className="mb-6 text-sm text-gray-300">{page.priceNote}</p>
                <div className="flex flex-col gap-3">
                  <Link
                    href={page.bookingUrl}
                    className="text-center btn-accent"
                  >
                    Bestill time
                  </Link>
                  <Link
                    href="/contact"
                    className="text-center btn-secondary"
                  >
                    Kontakt oss
                  </Link>
                </div>
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
              <div key={index} className="mb-10">
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
                4Dekk Larvik holder til i Haakon VII&apos;s vei 9 på Torstrand.
                Bestill time på nett, eller ta kontakt hvis du er usikker på hva
                bilen din trenger.
              </p>
              <div className="flex flex-col justify-start gap-4 sm:flex-row">
                <Link href={page.bookingUrl} className="text-center btn-accent">
                  Bestill time
                </Link>
                <Link href="/contact" className="text-center btn-secondary">
                  Kontakt oss
                </Link>
              </div>
            </div>

            {relatedArticle && (
              <p className="mt-8 text-text">
                Les mer:{" "}
                <Link
                  href={`/blog/${relatedArticle.slug}`}
                  className="underline hover:text-accent"
                >
                  {relatedArticle.title.no}
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
