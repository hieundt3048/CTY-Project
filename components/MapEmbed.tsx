import { MAPS_CONFIG, COMPANY_INFO } from "@/lib/config";
import { ExternalLink, MapPin } from "lucide-react";

interface MapEmbedProps {
  height?: number;
}

export default function MapEmbed({ height = 400 }: MapEmbedProps) {
  const { lat, lng, zoom, originalLink } = MAPS_CONFIG;

  // Google Maps Embed API — không cần API key cho embed cơ bản
  const embedSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed&hl=vi`;

  return (
    <div className="space-y-3">
      <div
        className="relative overflow-hidden rounded-xl border border-gray-200 shadow-sm"
        style={{ height }}
      >
        <iframe
          src={embedSrc}
          width="100%"
          height={height}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Bản đồ vị trí ${COMPANY_INFO.nameVi}`}
          className="block"
        />
      </div>

      {/* Link mở Google Maps app/web */}
      <a
        href={originalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-[#1F3A5F] hover:text-[#C9A15A] font-medium transition-colors"
      >
        <MapPin className="h-4 w-4" />
        <span>Xem trên Google Maps / Get Directions</span>
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
