import { getBlogArticleBySlug } from "@/utils/dataLoader";

const SITE_URL = "https://www.4dekk.no";
const LOGO_URL = `${SITE_URL}/images/4dekk-logo-white-red.webp`;

export default function BlogPostingSchema({ slug }: { slug: string }) {
  const article = getBlogArticleBySlug(slug);
  if (!article) return null;

  const url = `${SITE_URL}/blog/${slug}`;
  const image = article.image.startsWith("http")
    ? article.image
    : `${SITE_URL}${article.image}`;

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: article.title.no,
    description: article.metaDescription.no,
    image: [image],
    datePublished: new Date(article.publishDate).toISOString(),
    dateModified: new Date(
      article.lastUpdated || article.publishDate,
    ).toISOString(),
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#henrikas`,
      name: "Henrikas",
      jobTitle: "Teknisk leder og godkjent kjøretøykontrollør",
      worksFor: { "@id": `${SITE_URL}/#business` },
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#business`,
      name: "4Dekk Larvik",
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    inLanguage: "nb-NO",
    articleSection: article.category.no,
    isPartOf: {
      "@type": "Blog",
      "@id": `${SITE_URL}/blog`,
      name: "4Dekk Larvik Blogg",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hjem", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogg",
        item: `${SITE_URL}/blog`,
      },
      { "@type": "ListItem", position: 3, name: article.title.no, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
