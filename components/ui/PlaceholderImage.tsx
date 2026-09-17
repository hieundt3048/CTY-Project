import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

interface PlaceholderImageProps {
  aspectRatio?: "square" | "4/3" | "16/9" | "3/4";
  className?: string;
  label?: string;
  alt?: string;
}

const aspectRatioClasses = {
  square: "aspect-square",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-video",
  "3/4": "aspect-[3/4]",
};

/**
 * PlaceholderImage: ảnh nền xám #E5E5E5 dùng khi chưa có ảnh thật.
 * Giữ đúng tỉ lệ khung hình, dễ thay bằng <Image> thật sau này.
 */
export default function PlaceholderImage({
  aspectRatio = "4/3",
  className,
  label = "Ảnh minh hoạ",
  alt,
}: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-[#E5E5E5] flex items-center justify-center",
        aspectRatioClasses[aspectRatio],
        className
      )}
      role="img"
      aria-label={alt ?? label}
    >
      <div className="flex flex-col items-center gap-2 text-gray-400">
        <ImageIcon className="h-8 w-8" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>
  );
}
