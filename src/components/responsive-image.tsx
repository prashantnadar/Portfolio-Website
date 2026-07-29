import { cn } from "@/lib/utils";

interface ResponsiveImageProps {
  /** AVIF srcset string generated at build time by vite-imagetools */
  avif: string;
  /** WebP srcset string generated at build time by vite-imagetools */
  webp: string;
  /** Fallback raster source */
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
}

/** <picture> wrapper that serves AVIF → WebP → JPEG with responsive srcsets. */
export function ResponsiveImage({
  avif,
  webp,
  src,
  alt,
  width,
  height,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
  loading = "lazy",
  fetchPriority = "auto",
}: ResponsiveImageProps) {
  return (
    <picture>
      <source type="image/avif" srcSet={avif} sizes={sizes} />
      <source type="image/webp" srcSet={webp} sizes={sizes} />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={cn(className)}
      />
    </picture>
  );
}
