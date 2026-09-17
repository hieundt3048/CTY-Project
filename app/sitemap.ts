import type { MetadataRoute } from "next";

const baseUrl = "https://ctytnnhhnguyenduongtrunghieu.com";

const pages = [
  "",
  "/gioi-thieu",
  "/dich-vu",
  "/nang-luc-san-xuat",
  "/du-an",
  "/lien-he",
];

const locales = ["vi", "en", "zh", "ko"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    entries.push({
      url: `${baseUrl}/vi${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? "weekly" : "monthly",
      priority: page === "" ? 1.0 : 0.8,
      alternates: {
        languages: {
          vi: `${baseUrl}/vi${page}`,
          en: `${baseUrl}/en${page}`,
          zh: `${baseUrl}/zh${page}`,
          ko: `${baseUrl}/ko${page}`,
        },
      },
    });
  }

  return entries;
}
