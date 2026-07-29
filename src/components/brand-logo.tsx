import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: number;
  /** Above-the-fold usages (navbar) should not lazy load. */
  priority?: boolean;
}

/** PN Creation brand mark, used in the navbar, footer and services header. */
export function BrandLogo({ className, size = 36, priority = false }: BrandLogoProps) {
  return (
    <img
      src="/pn-logo.png"
      alt="PN Creation logo"
      width={size}
      height={size}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={cn("rounded-xl bg-white object-contain", className)}
      style={{ width: size, height: size }}
    />
  );
}
