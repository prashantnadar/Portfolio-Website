import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal, fadeUp } from "@/components/motion/reveal";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  align = "center",
}: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-28", className)} aria-labelledby={`${id}-heading`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal
          className={cn(
            "mb-12 max-w-2xl sm:mb-16",
            align === "center" && "mx-auto text-center",
          )}
          variants={fadeUp}
        >
          {eyebrow ? (
            <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
              {eyebrow}
            </span>
          ) : null}
          <h2
            id={`${id}-heading`}
            className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base text-muted-foreground text-pretty sm:text-lg">
              {description}
            </p>
          ) : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
