"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { useLanguage } from "@/contexts/LanguageContext";
import { getBlogArticleBySlug } from "@/utils/dataLoader";

interface BlogContent {
  type: string;
  text?: string;
  level?: number;
  items?: string[];
  alt?: string;
  caption?: string;
  src?: string;
}

function formatContent(content: BlogContent[]) {
  return content.map((item, index) => {
    switch (item.type) {
      case "paragraph":
        return (
          <p key={index} className="mb-4 leading-relaxed text-text">
            {item.text}
          </p>
        );
      case "heading": {
        const level = item.level || 2;
        if (level === 3) {
          return (
            <h3
              key={index}
              className="mt-6 mb-3 text-xl font-semibold font-headings text-headings"
            >
              {item.text}
            </h3>
          );
        }
        return (
          <h2
            key={index}
            className="mt-8 mb-4 text-2xl font-bold font-headings text-headings"
          >
            {item.text}
          </h2>
        );
      }
      case "list":
        return (
          <ul key={index} className="mb-4 ml-6 list-disc text-text">
            {item.items?.map((listItem, listIndex) => (
              <li key={listIndex} className="mb-2 leading-relaxed">
                {listItem}
              </li>
            ))}
          </ul>
        );
      case "image":
        return (
          <div key={index} className="my-6">
            <Image
              src={item.src || ""}
              alt={item.alt || ""}
              width={600}
              height={300}
              className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
            />
            {item.caption && (
              <p className="mt-2 text-sm italic text-center text-gray-600">
                {item.caption}
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  });
}

export default function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { language } = useLanguage();
  const article = getBlogArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const t = {
    no: { backToBlog: "Tilbake til Blogg", home: "Hjem", blog: "Blogg" },
    en: { backToBlog: "Back to Blog", home: "Home", blog: "Blog" },
  }[language];

  const publishedLabel = new Date(article.publishDate).toLocaleDateString(
    language === "no" ? "nb-NO" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <div>
      <section className="py-20 text-white bg-gradient-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <nav
              aria-label={language === "no" ? "Brødsmulesti" : "Breadcrumb"}
              className="mb-4 text-sm text-gray-300"
            >
              <Link href="/" className="hover:text-accent">
                {t.home}
              </Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-accent">
                {t.blog}
              </Link>
            </nav>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl font-headings">
              {article.title[language]}
            </h1>
            <p className="text-sm text-gray-300">
              <time dateTime={article.publishDate}>{publishedLabel}</time>
              <span className="mx-2">·</span>
              {article.readTime} min {language === "no" ? "lesetid" : "read"}
              <span className="mx-2">·</span>
              4Dekk Larvik
            </p>
          </div>
        </div>
      </section>

      <section className="section-light section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg max-w-none">
              <div className="text-text">
                {formatContent(article.content[language])}
              </div>
            </article>

            <div className="p-8 mt-12 card-dark">
              <h3 className="mb-4 text-xl font-semibold font-headings text-headings">
                {language === "no" ? "Trenger Du Hjelp?" : "Need Help?"}
              </h3>
              <p className="mb-6 text-text">
                {language === "no"
                  ? "Har du spørsmål om bilvedlikehold eller trenger profesjonell hjelp? Bestill time eller kontakt oss nå."
                  : "Do you have questions about car maintenance or need professional help? Book an appointment or contact us now."}
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

      <Link
        href="/blog"
        className="fixed z-50 flex items-center gap-2 px-3 py-2 text-sm font-medium text-white transition-all duration-300 ease-in-out transform border rounded-lg shadow-lg opacity-90 top-6 right-16 bg-gray-800/80 hover:bg-gray-700/80 hover:shadow-xl hover:scale-105 backdrop-blur-sm border-gray-600/50 hover:opacity-100 sm:px-4 sm:right-6"
        aria-label={t.backToBlog}
      >
        <Icon name="arrow-left" className="w-4 h-4" />
        <span className="hidden sm:inline">{t.backToBlog}</span>
      </Link>
    </div>
  );
}
