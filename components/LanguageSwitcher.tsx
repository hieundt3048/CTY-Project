"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { routing } from "@/lib/routing";

const localeLabels: Record<string, { label: string; flag: string }> = {
  vi: { label: "VI", flag: "🇻🇳" },
  en: { label: "EN", flag: "🇬🇧" },
  zh: { label: "ZH", flag: "🇨🇳" },
  ko: { label: "KO", flag: "🇰🇷" },
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const switchLocale = (newLocale: string) => {
    setOpen(false);

    // Tính pathname mới: bỏ locale prefix hiện tại, thêm locale mới
    let pathWithoutLocale = pathname;

    // Bỏ prefix locale hiện tại
    for (const loc of routing.locales) {
      if (pathname.startsWith(`/${loc}/`)) {
        pathWithoutLocale = pathname.slice(loc.length + 1);
        break;
      } else if (pathname === `/${loc}`) {
        pathWithoutLocale = "/";
        break;
      }
    }

    // Thêm locale mới (nếu không phải default)
    const newPath =
      newLocale === routing.defaultLocale
        ? pathWithoutLocale
        : `/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;

    router.push(newPath);
  };

  const current = localeLabels[locale] ?? localeLabels["vi"];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-gray-600 hover:text-[#1F3A5F] hover:bg-[#F7F7F7] rounded-md transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Chọn ngôn ngữ"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg py-1 min-w-[110px] z-50"
          role="listbox"
          aria-label="Danh sách ngôn ngữ"
        >
          {routing.locales.map((loc) => {
            const info = localeLabels[loc];
            return (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                role="option"
                aria-selected={loc === locale}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                  loc === locale
                    ? "text-[#1F3A5F] bg-[#F7F7F7] font-medium"
                    : "text-gray-600 hover:text-[#1F3A5F] hover:bg-[#F7F7F7]"
                }`}
              >
                <span>{info.flag}</span>
                <span>{info.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
