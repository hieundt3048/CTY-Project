import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Trỏ đến file config i18n
const withNextIntl = createNextIntlPlugin("./lib/i18n.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  allowedDevOrigins: ["26.154.143.211"],
};

export default withNextIntl(nextConfig);
