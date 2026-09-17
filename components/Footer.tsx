import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "@/lib/config";

const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/gioi-thieu" },
  { key: "services", href: "/dich-vu" },
  { key: "capacity", href: "/nang-luc-san-xuat" },
  { key: "portfolio", href: "/du-an" },
  { key: "contact", href: "/lien-he" },
] as const;

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const localePath = (href: string) =>
    locale === "vi" ? href : `/${locale}${href}`;

  return (
    <footer className="bg-[#1F3A5F] text-white">
      <div className="container-site py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cột 1: Brand */}
          <div className="space-y-4">
            {/* Logo wordmark */}
            <div>
              <div className="text-white font-bold text-xl tracking-tight">NDTH</div>
              <div className="text-[#C9A15A] text-xs font-medium tracking-widest uppercase mt-0.5">
                Gia công balo
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              {t("description")}
            </p>
          </div>

          {/* Cột 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              {navItems.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={localePath(href)}
                    className="text-gray-300 text-sm hover:text-[#C9A15A] transition-colors"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base">
              {t("contactInfo")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#C9A15A] mt-0.5 shrink-0" />
                <span className="text-gray-300 text-sm leading-relaxed">
                  {COMPANY_INFO.address}
                </span>
              </li>
              {/* TODO: hiển thị sau khi có số điện thoại thật */}
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#C9A15A] shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="text-gray-300 text-sm hover:text-[#C9A15A] transition-colors"
                >
                  {COMPANY_INFO.phone}
                </a>
              </li>
              {/* TODO: hiển thị sau khi có số Zalo thật */}
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 text-[#C9A15A] shrink-0" />
                <span className="text-gray-300 text-sm">
                  Zalo: {COMPANY_INFO.zalo}
                </span>
              </li>
              {/* TODO: hiển thị sau khi có email thật */}
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#C9A15A] shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-gray-300 text-sm hover:text-[#C9A15A] transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="text-gray-400 text-xs mt-1">
                {t("taxCodeLabel")}: {COMPANY_INFO.taxCode}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
