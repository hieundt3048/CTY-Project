"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Phone } from "lucide-react";
import { COMPANY_INFO } from "@/lib/config";
import LanguageSwitcher from "./LanguageSwitcher";

const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/gioi-thieu" },
  { key: "services", href: "/dich-vu" },
  { key: "capacity", href: "/nang-luc-san-xuat" },
  { key: "portfolio", href: "/du-an" },
  { key: "contact", href: "/lien-he" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Tạo đường dẫn locale-aware
  const localePath = (href: string) =>
    locale === "vi" ? href : `/${locale}${href}`;

  const isActive = (href: string) => {
    const full = localePath(href);
    if (href === "/") return pathname === full || pathname === `/${locale}`;
    return pathname.startsWith(full);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container-site">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo / Wordmark */}
          <Link href={localePath("/")} className="flex items-center gap-2 shrink-0">
            {/* TODO: thay bằng <Image> logo thật khi có file logo chính thức */}
            <div className="flex flex-col leading-none">
              <span className="text-[#1F3A5F] font-bold text-lg tracking-tight">
                NDTH
              </span>
              <span className="text-[#C9A15A] text-[10px] font-medium tracking-widest uppercase">
                Gia công balo
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map(({ key, href }) => (
              <Link
                key={key}
                href={localePath(href)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(href)
                    ? "text-[#1F3A5F] bg-[#F7F7F7]"
                    : "text-gray-600 hover:text-[#1F3A5F] hover:bg-[#F7F7F7]"
                }`}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          {/* Right side: Phone + Language + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* TODO: thay [[SO_DIEN_THOAI]] bằng số điện thoại thật */}
            {COMPANY_INFO.phone !== "[[SO_DIEN_THOAI]]" && (
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#1F3A5F] transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
            )}
            <LanguageSwitcher />
            <Link
              href={localePath("/lien-he")}
              className="bg-[#C9A15A] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#d9b47a] transition-colors"
            >
              {t("requestQuote")}
            </Link>
          </div>

          {/* Mobile: Language + Hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-gray-600 hover:text-[#1F3A5F] hover:bg-[#F7F7F7] rounded-md transition-colors"
              aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navItems.map(({ key, href }) => (
                <Link
                  key={key}
                  href={localePath(href)}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive(href)
                      ? "text-[#1F3A5F] bg-[#F7F7F7]"
                      : "text-gray-600 hover:text-[#1F3A5F] hover:bg-[#F7F7F7]"
                  }`}
                >
                  {t(key)}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-gray-100 flex flex-col gap-2">
                <Link
                  href={localePath("/lien-he")}
                  onClick={() => setMobileOpen(false)}
                  className="bg-[#C9A15A] text-white px-4 py-3 rounded-md text-sm font-medium text-center hover:bg-[#d9b47a] transition-colors"
                >
                  {t("requestQuote")}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
