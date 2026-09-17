import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin", "vietnamese"],
  // latin bao phủ EN; vietnamese bao phủ VI
  // ZH và KO sẽ fallback sang system font có sẵn (CJK)
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL("https://ctytnnhhnguyenduongtrunghieu.com"),
    title: {
      default: t("siteName"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("siteDescription"),
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      description: t("siteDescription"),
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "vi" | "en" | "zh" | "ko")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={notoSans.variable}>
      <body className="font-sans antialiased bg-white text-gray-800">
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
