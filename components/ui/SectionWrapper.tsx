import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  alt?: boolean; // background #F7F7F7
}

/**
 * SectionWrapper: wrapper chuẩn cho mỗi section trên trang.
 * Áp dụng padding nhất quán và max-width container.
 */
export default function SectionWrapper({
  children,
  className,
  containerClassName,
  id,
  alt = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "section-py",
        alt ? "bg-[#F7F7F7]" : "bg-white",
        className
      )}
    >
      <div className={cn("container-site", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
