"use client";

import Link from "next/link";
import Icon from "../../components/Icon";
import { useLanguage } from "../../contexts/LanguageContext";
import DynamicMetadata from "../../components/DynamicMetadata";
import { getBlogData } from "../../utils/dataLoader";

export default function BlogPage() {
  const { language } = useLanguage();
  const blogArticles = getBlogData();

  const content = {
    no: {
      title: "Blogg",
      description:
        "Tips om vedlikehold, reparasjoner og generell, nyttig kjøretøykunnskap.",
      subtitle: "Ekspertråd og Tips",
      readMore: "Les Mer",
    },
    en: {
      title: "Blog",
      description:
        "Tips about maintenance, repairs and general, useful vehicle knowledge.",
      subtitle: "Expert Advice and Tips",
      readMore: "Read More",
    },
  };

  const t = content[language];

  return (
    <div>
      <DynamicMetadata page="blog" />

      <section className="py-20 text-white bg-gradient-dark">
        <div className="text-center container-custom">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl font-headings">
            {t.title}
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-300 md:text-xl">
            {t.description}
          </p>
        </div>
      </section>

      <section className="section-light section-padding">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl font-headings text-headings">
              {t.subtitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {blogArticles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className={`group overflow-hidden transition-all duration-300 border border-gray-600 rounded-lg card-dark hover:border-accent hover:shadow-lg hover:shadow-accent/10 ${
                  article.featured ? "lg:col-span-2 xl:col-span-1" : ""
                }`}
              >
                <div className="p-6">
                  <h3 className="mb-3 text-xl font-bold transition-colors duration-200 font-headings text-headings group-hover:text-accent">
                    {article.title[language]}
                  </h3>

                  <p className="mb-4 text-text line-clamp-3">
                    {article.excerpt[language]}
                  </p>

                  <span className="inline-flex items-center gap-2 font-medium transition-colors duration-200 text-accent group-hover:text-accent/80">
                    {t.readMore}
                    <Icon
                      name="arrow-right"
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="max-w-2xl p-8 mx-auto card-dark">
              <h3 className="mb-4 text-xl font-semibold font-headings text-headings">
                {language === "no" ? "Trenger Du Hjelp?" : "Need Help?"}
              </h3>
              <p className="mb-6 text-text">
                {language === "no"
                  ? "Har du spørsmål om bilvedlikehold eller trenger profesjonell hjelp? Våre eksperter er her for å hjelpe deg."
                  : "Do you have questions about car maintenance or need professional help? Our experts are here to help you."}
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/contact" className="text-center btn-secondary">
                  {language === "no" ? "Kontakt Oss" : "Contact Us"}
                </Link>
                <Link href="/booking" className="text-center btn-accent">
                  {language === "no" ? "Bestill Time" : "Book Appointment"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
