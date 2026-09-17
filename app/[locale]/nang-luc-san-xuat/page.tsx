import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Clock, Users, Zap, Package, CheckCircle, ShieldCheck } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { PRODUCTION_STATS } from "@/lib/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "capacity" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("pageTitle"),
    description: t("metaDescription"),
    openGraph: { title: t("pageTitle"), description: t("metaDescription"), siteName: tMeta("siteName") },
  };
}

export default async function CapacityPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "capacity" });

  const stats = [
    {
      icon: <Clock className="h-12 w-12 text-[#C9A15A]" />,
      value: t("yearsValue"),
      label: t("years"),
    },
    {
      icon: <Users className="h-12 w-12 text-[#C9A15A]" />,
      value: t("workersValue"),
      label: t("workers"),
    },
    {
      icon: <Zap className="h-12 w-12 text-[#C9A15A]" />,
      // TODO: thay bằng số chuyền may thật (SO_CHUYEN_MAY)
      value: PRODUCTION_STATS.sewingLines,
      label: t("sewingLines"),
    },
    {
      icon: <Zap className="h-12 w-12 text-[#C9A15A]" />,
      // TODO: thay bằng công suất thật (CONG_SUAT_THANG)
      value: PRODUCTION_STATS.monthlyCapacity,
      label: t("monthlyCapacity"),
    },
    {
      icon: <Package className="h-12 w-12 text-[#C9A15A]" />,
      // TODO: thay bằng MOQ thật (MOQ_SO_LUONG)
      value: PRODUCTION_STATS.moq,
      label: t("moq"),
    },
  ];

  const products = [
    t("product1"), t("product2"), t("product3"),
    t("product4"), t("product5"), t("product6"),
  ];

  const qualities = [
    t("quality1"), t("quality2"), t("quality3"), t("quality4"),
  ];

  return (
    <>
      {/* Page Header */}
      <div className="bg-[#1F3A5F] text-white section-py">
        <div className="container-site">
          <h1 className="text-white mb-4">{t("heroTitle")}</h1>
          <p className="text-gray-300 text-lg max-w-2xl">{t("heroSubtitle")}</p>
        </div>
      </div>

      {/* Stats Infographic */}
      <SectionWrapper>
        <h2 className="text-[#1F3A5F] text-center mb-12">{t("statsTitle")}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 bg-[#F7F7F7] rounded-2xl hover:bg-[#1F3A5F]/5 transition-colors"
            >
              <div className="mb-4">{stat.icon}</div>
              <div className="text-3xl lg:text-4xl font-bold text-[#1F3A5F] mb-1 leading-none break-all">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Products + Quality - 2 columns */}
      <SectionWrapper alt>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product categories */}
          <div>
            <h2 className="text-[#1F3A5F] mb-6">{t("productsTitle")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {products.map((product, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
                >
                  <div className="h-2 w-2 rounded-full bg-[#C9A15A] shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">{product}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quality commitment */}
          <div>
            <h2 className="text-[#1F3A5F] mb-6">{t("qualityTitle")}</h2>
            <div className="space-y-4">
              {qualities.map((q, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm leading-relaxed">{q}</span>
                </div>
              ))}
            </div>

            {/* Certification placeholder */}
            {/* TODO: Bỏ comment phía dưới khi có chứng nhận chất lượng */}
            {/* <div className="mt-6 p-4 bg-white rounded-xl border border-dashed border-gray-300">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-sm font-medium">Chứng nhận chất lượng</span>
              </div>
              <p className="text-xs text-gray-400 italic">{t("certNote")}</p>
            </div> */}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
