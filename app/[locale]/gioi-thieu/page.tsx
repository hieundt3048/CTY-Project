import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Building2, Calendar, MapPin, FileText, Eye, Target } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import MapEmbed from "@/components/MapEmbed";
import { COMPANY_INFO } from "@/lib/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("pageTitle"),
    description: t("metaDescription"),
    openGraph: { title: t("pageTitle"), description: t("metaDescription"), siteName: tMeta("siteName") },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const legalInfo = [
    { icon: <Building2 className="h-4 w-4" />, label: t("companyName"), value: COMPANY_INFO.nameVi },
    { icon: <FileText className="h-4 w-4" />, label: t("companyType"), value: COMPANY_INFO.type },
    { icon: <FileText className="h-4 w-4" />, label: t("taxCode"), value: COMPANY_INFO.taxCode },
    { icon: <Calendar className="h-4 w-4" />, label: t("foundedYear"), value: COMPANY_INFO.foundedYear.toString() },
    { icon: <MapPin className="h-4 w-4" />, label: t("address"), value: COMPANY_INFO.address },
  ];

  return (
    <>
      {/* Page Header */}
      <div className="bg-[#1F3A5F] text-white section-py">
        <div className="container-site">
          <h1 className="text-white mb-4">{t("pageTitle")}</h1>
          <p className="text-gray-300 text-lg max-w-2xl">{t("metaDescription")}</p>
        </div>
      </div>

      {/* History */}
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-[#1F3A5F] mb-6">{t("historyTitle")}</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{t("historyContent")}</p>
          </div>
          <div>
            {/* TODO: thay bằng ảnh xưởng/công ty thật */}
            <PlaceholderImage aspectRatio="4/3" className="rounded-2xl shadow-lg" />
          </div>
        </div>
      </SectionWrapper>

      {/* Vision & Mission */}
      <SectionWrapper alt>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#1F3A5F]/10 rounded-lg">
                <Eye className="h-6 w-6 text-[#1F3A5F]" />
              </div>
              <h2 className="text-[#1F3A5F] text-xl">{t("visionTitle")}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">{t("visionContent")}</p>
          </div>
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#C9A15A]/10 rounded-lg">
                <Target className="h-6 w-6 text-[#C9A15A]" />
              </div>
              <h2 className="text-[#1F3A5F] text-xl">{t("missionTitle")}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">{t("missionContent")}</p>
          </div>
        </div>
      </SectionWrapper>

      {/* Legal Info */}
      <SectionWrapper>
        <h2 className="text-[#1F3A5F] mb-8">{t("legalTitle")}</h2>
        <div className="bg-[#F7F7F7] rounded-2xl p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
            {legalInfo.map(({ icon, label, value }, i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-gray-200 last:border-0 md:last:border-0">
                <span className="text-[#C9A15A] mt-0.5 shrink-0">{icon}</span>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">{label}</p>
                  <p className="text-gray-700 font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Location / Map */}
      <SectionWrapper alt>
        <h2 className="text-[#1F3A5F] mb-8">{t("locationTitle")}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <MapEmbed height={450} />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#C9A15A] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-700 mb-1">{t("address")}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{COMPANY_INFO.address}</p>
                </div>
              </div>
            </div>
            {/* TODO: Chứng nhận chất lượng - chừa sẵn vị trí, ẩn cho đến khi có */}
            {/* <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-[#1F3A5F] mb-3">Chứng nhận</h3>
              <p className="text-gray-400 text-sm italic">{t("certificationNote")}</p>
            </div> */}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
