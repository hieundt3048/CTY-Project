import type { MetadataRoute } from "next";
import { routing } from "@/lib/routing";

const baseUrl = "https://ctytnnhhnguyenduongtrunghieu.com";

const pages = [
  "/",
  "/gioi-thieu",
  "/dich-vu",
  "/nang-luc-san-xuat",
  "/du-an",
  "/lien-he",
];

const localePaths: Record<string, Record<string, string>> = {
  "/": { vi: "/", en: "/en", zh: "/zh", ko: "/ko" },
  "/gioi-thieu": { vi: "/gioi-thieu", en: "/en/about", zh: "/zh/about", ko: "/ko/about" },
  "/dich-vu": { vi: "/dich-vu", en: "/en/services", zh: "/zh/services", ko: "/ko/services" },
  "/nang-luc-san-xuat": { vi: "/nang-luc-san-xuat", en: "/en/production-capacity", zh: "/zh/production-capacity", ko: "/ko/production-capacity" },
  "/du-an": { vi: "/du-an", en: "/en/portfolio", zh: "/zh/portfolio", ko: "/ko/portfolio" },
  "/lien-he": { vi: "/lien-he", en: "/en/contact", zh: "/zh/contact", ko: "/ko/contact" },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    const paths = localePaths[page];
    entries.push({
      url: `${baseUrl}${paths.vi}`,
      lastModified: new Date(),
      changeFrequency: page === "/" ? "weekly" : "monthly",
      priority: page === "/" ? 1.0 : 0.8,
      alternates: {
        languages: {
          vi: `${baseUrl}${paths.vi}`,
          en: `${baseUrl}${paths.en}`,
          zh: `${baseUrl}${paths.zh}`,
          ko: `${baseUrl}${paths.ko}`,
        },
      },
    });
  }

  return entries;
}
