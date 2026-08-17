import businessData from "@/data/business.json";
import businessEnData from "@/data/business-en.json";
import servicesData from "@/data/services.json";
import servicesEnData from "@/data/services-en.json";
import pricingData from "@/data/pricing.json";
import pricingEnData from "@/data/pricing-en.json";
import blogIndex from "@/data/blogs/index.json";
import wheelAlignmentBlog from "@/data/blogs/wheel-alignment.json";
import seasonalTiresBlog from "@/data/blogs/seasonal-tires.json";
import carMaintenanceBlog from "@/data/blogs/car-maintenance.json";
import oilChangeBlog from "@/data/blogs/oil-change.json";
import euControlBlog from "@/data/blogs/eu-control.json";
import tireWearBlog from "@/data/blogs/tire-wear.json";

type Language = "no" | "en";

interface BlogContent {
  type: string;
  text?: string;
  level?: number;
  items?: string[];
  alt?: string;
  caption?: string;
  src?: string;
}

interface BlogData {
  id: string;
  slug: string;
  category: string;
  publishDate: string;
  featured: boolean;
  readTime: number;
  no: {
    title: string;
    excerpt: string;
    metaDescription?: string;
    content: BlogContent[];
  };
  en: {
    title: string;
    excerpt: string;
    metaDescription?: string;
    content: BlogContent[];
  };
}

export function getBusinessData(language: Language = "no") {
  return language === "en" ? businessEnData : businessData;
}

export function getServicesData(language: Language = "no") {
  return language === "en" ? servicesEnData : servicesData;
}

export function getPricingData(language: Language = "no") {
  return language === "en" ? pricingEnData : pricingData;
}

export function getBlogData() {
  const blogFiles: { [key: string]: BlogData } = {
    "wheel-alignment": wheelAlignmentBlog,
    "seasonal-tires": seasonalTiresBlog,
    "car-maintenance": carMaintenanceBlog,
    "oil-change": oilChangeBlog,
    "eu-control": euControlBlog,
    "tire-wear": tireWearBlog,
  };

  const getCategoryName = (categoryId: string) => {
    const category = blogIndex.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : { no: categoryId, en: categoryId };
  };

  return blogIndex.blogs
    .map((blogMeta) => {
      const blogData = blogFiles[blogMeta.id];
      if (!blogData) return null;

      const categoryName = getCategoryName(blogData.category);

      return {
        id: blogData.id,
        slug: blogData.slug,
        title: {
          no: blogData.no.title,
          en: blogData.en.title,
        },
        excerpt: {
          no: blogData.no.excerpt,
          en: blogData.en.excerpt,
        },
        metaDescription: {
          no: blogData.no.metaDescription || blogData.no.excerpt,
          en: blogData.en.metaDescription || blogData.en.excerpt,
        },
        content: {
          no: blogData.no.content,
          en: blogData.en.content,
        },
        image: `/images/${
          blogData.category === "maintenance"
            ? "oil-change.webp"
            : blogData.category === "tires"
              ? "tire-service.webp"
              : "eucontrol.webp"
        }`,
        category: categoryName,
        readTime: `${blogData.readTime}`,
        publishDate: blogData.publishDate,
        featured: blogData.featured || false,
      };
    })
    .filter((blog): blog is NonNullable<typeof blog> => blog !== null);
}

export function getBlogArticleBySlug(slug: string) {
  return getBlogData().find((article) => article.slug === slug) || null;
}

export function getAllData(language: Language = "no") {
  return {
    business: getBusinessData(language),
    services: getServicesData(language),
    pricing: getPricingData(language),
    blog: getBlogData(),
  };
}
