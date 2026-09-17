import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import { COMPANY_INFO } from "@/lib/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("pageTitle"),
    description: t("metaDescription"),
    openGraph: { title: t("pageTitle"), description: t("metaDescription"), siteName: tMeta("siteName") },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  const contactDetails = [
    {
      icon: <Phone className="h-5 w-5 text-[#C9A15A]" />,
      label: t("phoneLabel2"),
      // TODO: thay bằng số điện thoại thật (SO_DIEN_THOAI)
      value: COMPANY_INFO.phone,
      href: `tel:${COMPANY_INFO.phone}`,
    },
    {
      icon: <MessageCircle className="h-5 w-5 text-[#C9A15A]" />,
      label: t("zaloLabel"),
      // TODO: thay bằng số Zalo thật (SO_ZALO)
      value: `Zalo: ${COMPANY_INFO.zalo}`,
      href: `https://zalo.me/${COMPANY_INFO.zalo}`,
    },
    {
      icon: <Mail className="h-5 w-5 text-[#C9A15A]" />,
      label: t("emailLabel2"),
      // TODO: thay bằng email thật (EMAIL_CONG_TY)
      value: COMPANY_INFO.email,
      href: `mailto:${COMPANY_INFO.email}`,
    },
    {
      icon: <MapPin className="h-5 w-5 text-[#C9A15A]" />,
      label: t("addressLabel"),
      value: COMPANY_INFO.address,
      href: COMPANY_INFO.siteUrl,
    },
    {
      icon: <Clock className="h-5 w-5 text-[#C9A15A]" />,
      label: "Giờ làm việc",
      value: t("workingHours"),
      href: undefined,
    },
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

      {/* Form + Info */}
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form - wider */}
          <div className="lg:col-span-3">
            <h2 className="text-[#1F3A5F] mb-8">{t("formTitle")}</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
              <ContactForm />
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h2 className="text-[#1F3A5F] mb-8">{t("infoTitle")}</h2>
            <div className="space-y-4">
              {contactDetails.map(({ icon, label, value, href }, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 bg-[#F7F7F7] rounded-xl"
                >
                  <div className="mt-0.5 shrink-0">{icon}</div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-gray-700 text-sm font-medium hover:text-[#1F3A5F] transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-gray-700 text-sm font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Map */}
      <SectionWrapper alt>
        <h2 className="text-[#1F3A5F] mb-8">Vị trí xưởng</h2>
        <MapEmbed height={450} />
      </SectionWrapper>
    </>
  );
}
