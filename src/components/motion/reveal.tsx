import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger = (staggerChildren = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

interface RevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: ElementType;
  once?: boolean;
}

/**
 * Motion components must be created once and cached. Calling motion.create()
 * during render returns a brand-new component type on every render, which makes
 * React unmount and remount the whole subtree — that shows up as flickering.
 */
const motionCache = new Map<ElementType, ElementType>();
function getMotionTag(as: ElementType): ElementType {
  const cached = motionCache.get(as);
  if (cached) return cached;
  const created = motion.create(as as never) as unknown as ElementType;
  motionCache.set(as, created);
  return created;
}

/** Scroll-triggered reveal wrapper used across every section. */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  as = "div",
  once = true,
}: RevealProps) {
  const MotionTag = getMotionTag(as);
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      transition={{ delay }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/** Staggered container — children should use `variants={fadeUp}` etc. */
export function StaggerGroup({
  children,
  className,
  gap = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={stagger(gap, delay)}
    >
      {children}
    </motion.div>
  );
}
