import { MetadataRoute } from "next";
import { getBlogData } from "@/utils/dataLoader";
import { servicePages } from "@/data/servicePages";

// Bump when static pages get meaningful content changes.
const STATIC_LAST_MODIFIED = new Date("2026-09-02T00:00:00Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://www.4dekk.no"
      : "http://localhost:3000";

  const blogUrls: MetadataRoute.Sitemap = getBlogData().map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.lastUpdated || article.publishDate),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const serviceUrls: MetadataRoute.Sitemap = servicePages.map((page) => ({
    url: `${baseUrl}/tjenester/${page.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/tjenester`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...serviceUrls,
    ...blogUrls,
  ];
}
