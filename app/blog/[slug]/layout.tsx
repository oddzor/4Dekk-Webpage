import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogArticleBySlug, getBlogData } from "@/utils/dataLoader";

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

  return {
    title: article.title.no,
    description: article.metaDescription.no,
    alternates: {
      canonical: `/blog/${article.slug}`,
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

  return children;
}
