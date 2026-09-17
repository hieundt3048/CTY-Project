"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  id: string;
  src?: string; // undefined = dùng placeholder
  alt: string;
  category: string;
  caption?: string;
}

interface GalleryProps {
  items: GalleryItem[];
  categories?: string[];
}

// Ảnh placeholder xám SVG dạng data URL
const PLACEHOLDER_SRC = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23E5E5E5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23999'%3EẢnh minh ho%E1%BA%A1%3C/text%3E%3C/svg%3E`;

export default function Gallery({ items, categories = [] }: GalleryProps) {
  const t = useTranslations("portfolio");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div>
      {/* Category filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeCategory === "all"
                ? "bg-[#1F3A5F] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {t("allCategory")}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeCategory === cat
                  ? "bg-[#1F3A5F] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Gallery grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-lg bg-[#E5E5E5] aspect-[4/3]"
          >
            {item.src ? (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
              />
            ) : (
              // Placeholder khi chưa có ảnh thật
              // TODO: thay bằng <Image src="..." ...> khi khách gửi ảnh thật
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-400 text-xs text-center px-2">
                  {t("imagePlaceholder")}
                </div>
              </div>
            )}

            {/* Caption overlay */}
            {item.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs font-medium">{item.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
