import { useTranslations } from "next-intl";
import { Clock, Users, Zap, Package } from "lucide-react";
import { PRODUCTION_STATS } from "@/lib/config";

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export default function StatsBlock() {
  const t = useTranslations("stats");

  const stats: StatItem[] = [
    {
      icon: <Clock className="h-8 w-8 text-[#C9A15A]" />,
      value: "11+",
      label: t("yearsLabel"),
    },
    {
      icon: <Users className="h-8 w-8 text-[#C9A15A]" />,
      value: "37",
      label: t("workersLabel"),
    },
    {
      icon: <Zap className="h-8 w-8 text-[#C9A15A]" />,
      // TODO: thay bằng số công suất thật (CONG_SUAT_THANG)
      value: PRODUCTION_STATS.monthlyCapacity,
      label: t("capacityLabel"),
    },
    {
      icon: <Package className="h-8 w-8 text-[#C9A15A]" />,
      // TODO: thay bằng MOQ thật (MOQ_SO_LUONG)
      value: PRODUCTION_STATS.moq,
      label: t("moqLabel"),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="mb-3">{stat.icon}</div>
          <div className="text-3xl lg:text-4xl font-bold text-[#1F3A5F] mb-1 leading-none">
            {stat.value}
          </div>
          <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
