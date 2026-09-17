import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center bg-[#1F3A5F] overflow-hidden">
      {/* Background placeholder - thay bằng <Image> ảnh xưởng thật */}
      {/* TODO: thay div này bằng <Image src="/images/hero-xuong.jpg" ... /> */}
      <div className="absolute inset-0 bg-[#E5E5E5] opacity-10" />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1F3A5F]/95 via-[#1F3A5F]/80 to-[#1F3A5F]/40" />

      {/* Decorative placeholder image (right side) */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
        <div className="relative h-full">
          {/* TODO: thay bằng ảnh xưởng sản xuất thật */}
          <div className="absolute inset-0 bg-[#E5E5E5]/20 flex items-center justify-center">
            <div className="text-white/40 text-sm">Ảnh minh hoạ xưởng sản xuất</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-site relative z-10 py-20 lg:py-32">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#C9A15A]/20 border border-[#C9A15A]/40 text-[#C9A15A] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-[#C9A15A] rounded-full animate-pulse" />
            Tây Ninh · Thành lập 2015
          </div>

          {/* H1 - chỉ 1 H1 mỗi trang */}
          <h1 className="text-white mb-6 leading-tight">{t("title")}</h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
            {t("subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 bg-[#C9A15A] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#d9b47a] transition-all duration-200 hover:gap-3"
            >
              {t("cta")}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/nang-luc-san-xuat"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:border-white hover:bg-white/10 transition-all duration-200"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
}
