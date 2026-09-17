import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { Scissors, Ruler, Printer, ArrowRight, CheckCircle } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("pageTitle"),
    description: t("metaDescription"),
    openGraph: { title: t("pageTitle"), description: t("metaDescription"), siteName: tMeta("siteName") },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  const services = [
    {
      icon: <Scissors className="h-10 w-10 text-[#C9A15A]" />,
      title: t("service1Title"),
      description: t("service1Description"),
      highlights: ["Nguyên liệu khách cung cấp", "Quy trình chuẩn hóa", "Kiểm tra chất lượng"],
    },
    {
      icon: <Ruler className="h-10 w-10 text-[#C9A15A]" />,
      title: t("service2Title"),
      description: t("service2Description"),
      highlights: ["Theo bản vẽ kỹ thuật", "Theo mẫu vật thật", "Báo giá chi tiết"],
    },
    {
      icon: <Printer className="h-10 w-10 text-[#C9A15A]" />,
      title: t("service3Title"),
      description: t("service3Description"),
      highlights: [t("service3Note")],
    },
  ];

  const steps = [
    { num: "01", title: t("step1Title"), desc: t("step1Description") },
    { num: "02", title: t("step2Title"), desc: t("step2Description") },
    { num: "03", title: t("step3Title"), desc: t("step3Description") },
    { num: "04", title: t("step4Title"), desc: t("step4Description") },
    { num: "05", title: t("step5Title"), desc: t("step5Description") },
    { num: "06", title: t("step6Title"), desc: t("step6Description") },
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

      {/* Services */}
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((svc, i) => (
            <div
              key={i}
              className="flex flex-col p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow hover:border-[#C9A15A]/30"
            >
              <div className="mb-5">{svc.icon}</div>
              <h2 className="text-[#1F3A5F] text-xl mb-3">{svc.title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-grow">
                {svc.description}
              </p>
              <ul className="space-y-2">
                {svc.highlights.map((h, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-[#C9A15A] mt-0.5 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Process / Stepper */}
      <SectionWrapper alt>
        <div className="text-center mb-12">
          <h2 className="text-[#1F3A5F] mb-3">{t("processTitle")}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">{t("processSubtitle")}</p>
        </div>

        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-12 lg:mb-12 ${
                    isEven ? "" : "lg:direction-rtl"
                  }`}
                >
                  {/* Step number circle (center) */}
                  <div className="hidden lg:flex absolute left-1/2 top-6 -translate-x-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-[#1F3A5F] text-white font-bold text-sm border-4 border-white shadow-md">
                    {step.num}
                  </div>

                  {/* Content */}
                  <div className={`lg:${isEven ? "pr-16 text-right" : "pl-16 col-start-2"}`}>
                    <div
                      className={`bg-white rounded-xl p-6 border border-gray-100 shadow-sm ${
                        isEven ? "lg:ml-auto" : "lg:mr-auto"
                      }`}
                    >
                      {/* Mobile step number */}
                      <div className="flex items-center gap-3 mb-3 lg:hidden">
                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#1F3A5F] text-white font-bold text-xs">
                          {step.num}
                        </div>
                        <h3 className="text-[#1F3A5F] font-semibold">{step.title}</h3>
                      </div>
                      <h3 className="hidden lg:block text-[#1F3A5F] font-semibold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Empty col for alternating layout */}
                  {isEven && <div />}
                  {!isEven && <div className="order-first" />}
                </div>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <div className="bg-[#1F3A5F] rounded-2xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-white mb-3">{t("ctaTitle")}</h2>
          <p className="text-gray-300 mb-8 text-lg max-w-xl mx-auto">{t("ctaContent")}</p>
          <Link
            href="/lien-he"
            className="inline-flex items-center gap-2 bg-[#C9A15A] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#d9b47a] transition-colors"
          >
            {t("ctaButton")}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
