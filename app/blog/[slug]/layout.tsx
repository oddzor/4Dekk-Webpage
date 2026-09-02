import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogArticleBySlug, getBlogData } from "@/utils/dataLoader";
import BlogPostingSchema from "@/components/BlogPostingSchema";

export function generateStaticParams() {
  return getBlogData().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = getBlogArticleBySlug(params.slug);

  if (!article) {
    return {};
  }

  const url = `/blog/${article.slug}`;
  const published = new Date(article.publishDate).toISOString();
  const modified = new Date(
    article.lastUpdated || article.publishDate,
  ).toISOString();

  return {
    title: article.title.no,
    description: article.metaDescription.no,
    alternates: {
      canonical: url,
    },
    authors: [{ name: "4Dekk Larvik" }],
    openGraph: {
      type: "article",
      title: article.title.no,
      description: article.metaDescription.no,
      url,
      publishedTime: published,
      modifiedTime: modified,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title.no,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title.no,
      description: article.metaDescription.no,
      images: [article.image],
    },
  };
}

export default function BlogArticleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  if (!getBlogArticleBySlug(params.slug)) {
    notFound();
  }

  return (
    <>
      <BlogPostingSchema slug={params.slug} />
      {children}
    </>
  );
}
