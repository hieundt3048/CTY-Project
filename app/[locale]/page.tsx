import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { ArrowRight, Scissors, Ruler, Printer, CheckCircle } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import StatsBlock from "@/components/StatsBlock";
import SectionWrapper from "@/components/ui/SectionWrapper";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("siteName"),
    description: t("siteDescription"),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const tServices = await getTranslations({ locale, namespace: "services" });
  const tPortfolio = await getTranslations({ locale, namespace: "portfolio" });
  const tContact = await getTranslations({ locale, namespace: "contact" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const services = [
    {
      icon: <Scissors className="h-7 w-7 text-[#C9A15A]" />,
      title: tServices("service1Title"),
      desc: tServices("service1Description"),
    },
    {
      icon: <Ruler className="h-7 w-7 text-[#C9A15A]" />,
      title: tServices("service2Title"),
      desc: tServices("service2Description"),
    },
    {
      icon: <Printer className="h-7 w-7 text-[#C9A15A]" />,
      title: tServices("service3Title"),
      desc: tServices("service3Description"),
    },
  ];

  // Portfolio placeholder items (sẽ thay bằng ảnh thật)
  const portfolioItems = Array.from({ length: 6 }, (_, i) => ({
    id: `placeholder-${i}`,
    aspectRatio: "4/3" as const,
    label: tPortfolio("imagePlaceholder"),
  }));

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Stats Block */}
      <SectionWrapper alt>
        <StatsBlock />
      </SectionWrapper>

      {/* Services Preview */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="text-[#1F3A5F] mb-3">{t("servicesTitle")}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">{t("servicesSubtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow hover:border-[#C9A15A]/30"
            >
              <div className="mb-4">{svc.icon}</div>
              <h3 className="text-[#1F3A5F] mb-2">{svc.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{svc.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/dich-vu"
            className="inline-flex items-center gap-2 text-[#1F3A5F] font-semibold hover:text-[#C9A15A] transition-colors group"
          >
            {t("viewMore")}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </SectionWrapper>

      {/* Portfolio Preview */}
      <SectionWrapper alt>
        <div className="text-center mb-12">
          <h2 className="text-[#1F3A5F] mb-3">{t("portfolioTitle")}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">{t("portfolioSubtitle")}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {portfolioItems.map((item) => (
            <PlaceholderImage
              key={item.id}
              aspectRatio={item.aspectRatio}
              label={item.label}
              className="rounded-xl"
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/du-an"
            className="inline-flex items-center gap-2 bg-[#1F3A5F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2d5491] transition-colors"
          >
            {t("viewAllPortfolio")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </SectionWrapper>

      {/* Quick Contact CTA */}
      <SectionWrapper>
        <div className="bg-[#1F3A5F] rounded-2xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-white mb-3">{t("contactTitle")}</h2>
          <p className="text-gray-300 mb-8 text-lg max-w-xl mx-auto">
            {t("contactSubtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 bg-[#C9A15A] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#d9b47a] transition-colors"
            >
              {tCommon("contactUs")}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
