import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Danh sách ngôn ngữ hỗ trợ
  locales: ["vi", "en", "zh", "ko"],

  // Ngôn ngữ mặc định
  defaultLocale: "vi",

  // Không thêm prefix cho ngôn ngữ mặc định (vi)
  // → /gioi-thieu = /vi/gioi-thieu, /en/about = /en/about
  localePrefix: "as-needed",

  // Đường dẫn riêng theo từng ngôn ngữ
  pathnames: {
    "/": "/",
    "/gioi-thieu": {
      vi: "/gioi-thieu",
      en: "/about",
      zh: "/about",
      ko: "/about",
    },
    "/dich-vu": {
      vi: "/dich-vu",
      en: "/services",
      zh: "/services",
      ko: "/services",
    },
    "/nang-luc-san-xuat": {
      vi: "/nang-luc-san-xuat",
      en: "/production-capacity",
      zh: "/production-capacity",
      ko: "/production-capacity",
    },
    "/du-an": {
      vi: "/du-an",
      en: "/portfolio",
      zh: "/portfolio",
      ko: "/portfolio",
    },
    "/lien-he": {
      vi: "/lien-he",
      en: "/contact",
      zh: "/contact",
      ko: "/contact",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
