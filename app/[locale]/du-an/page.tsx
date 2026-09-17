import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Gallery, { type GalleryItem } from "@/components/Gallery";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("pageTitle"),
    description: t("metaDescription"),
    openGraph: { title: t("pageTitle"), description: t("metaDescription"), siteName: tMeta("siteName") },
  };
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });

  const localePath = (href: string) =>
    locale === "vi" ? href : `/${locale}${href}`;

  /**
   * PORTFOLIO ITEMS
   * TODO: Khi khách hàng gửi ảnh thật:
   * 1. Đặt file ảnh vào /public/images/portfolio/
   * 2. Thay `src: undefined` bằng `src: "/images/portfolio/ten-anh.jpg"`
   * 3. Cập nhật `alt` và `caption` mô tả sản phẩm
   */
  const portfolioItems: GalleryItem[] = [
    { id: "p1", alt: t("imageAlt"), category: "balo", caption: "Balo học sinh" },
    { id: "p2", alt: t("imageAlt"), category: "balo", caption: "Balo laptop" },
    { id: "p3", alt: t("imageAlt"), category: "balo", caption: "Balo thể thao" },
    { id: "p4", alt: t("imageAlt"), category: "tui-xach", caption: "Túi xách thời trang" },
    { id: "p5", alt: t("imageAlt"), category: "tui-xach", caption: "Túi tote" },
    { id: "p6", alt: t("imageAlt"), category: "tui-du-lich", caption: "Túi du lịch" },
    { id: "p7", alt: t("imageAlt"), category: "balo", caption: "Balo dã ngoại" },
    { id: "p8", alt: t("imageAlt"), category: "tui-xach", caption: "Túi đeo chéo" },
    { id: "p9", alt: t("imageAlt"), category: "tui-du-lich", caption: "Túi hành lý" },
    { id: "p10", alt: t("imageAlt"), category: "balo", caption: "Balo công sở" },
    { id: "p11", alt: t("imageAlt"), category: "tui-xach", caption: "Túi xách da" },
    { id: "p12", alt: t("imageAlt"), category: "tui-du-lich", caption: "Balo phượt" },
  ];

  const categories = [
    t("baloCategory"),
    t("tuiXachCategory"),
    t("tuiDuLichCategory"),
  ];

  // Map category labels back to IDs for filtering
  const itemsWithLabel: GalleryItem[] = portfolioItems.map((item) => ({
    ...item,
    category:
      item.category === "balo"
        ? t("baloCategory")
        : item.category === "tui-xach"
        ? t("tuiXachCategory")
        : t("tuiDuLichCategory"),
  }));

  return (
    <>
      {/* Page Header */}
      <div className="bg-[#1F3A5F] text-white section-py">
        <div className="container-site">
          <h1 className="text-white mb-4">{t("heroTitle")}</h1>
          <p className="text-gray-300 text-lg max-w-2xl">{t("heroSubtitle")}</p>
        </div>
      </div>

      {/* Gallery */}
      <SectionWrapper>
        <Gallery items={itemsWithLabel} categories={categories} />
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper alt>
        <div className="text-center">
          <h2 className="text-[#1F3A5F] mb-3">{t("contactCta")}</h2>
          <Link
            href={localePath("/lien-he")}
            className="inline-flex items-center gap-2 bg-[#C9A15A] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#d9b47a] transition-colors mt-4"
          >
            {t("contactButton")}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
