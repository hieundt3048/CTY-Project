"use client";

import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { routing, Locale } from "@/lib/routing";
import { usePathname, Link } from "@/lib/navigation";

const localeLabels: Record<string, { label: string; flag: string }> = {
  vi: { label: "VI", flag: "🇻🇳" },
  en: { label: "EN", flag: "🇬🇧" },
  zh: { label: "ZH", flag: "🇨🇳" },
  ko: { label: "KO", flag: "🇰🇷" },
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
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
              <Link
                key={loc}
                href={pathname}
                locale={loc as Locale}
                onClick={() => setOpen(false)}
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
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
