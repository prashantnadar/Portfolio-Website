import { motion } from "framer-motion";
import {
  Code2,
  Eye,
  Gauge,
  Layers,
  MessageCircle,
  Search,
  Smartphone,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { StaggerGroup, fadeUp } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { WHY_HIRE_ME } from "@/lib/site-data";

const ICONS: LucideIcon[] = [
  Code2,
  Sparkles,
  Smartphone,
  Gauge,
  Search,
  Layers,
  Eye,
  MessageCircle,
];

export function WhyHireMe() {
  return (
    <Section
      id="why-hire-me"
      eyebrow="Why work with me"
      title="What you actually get"
      description="The standards I hold every project to, whether it is a sprint ticket or a freelance build."
    >
      <StaggerGroup
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        gap={0.05}
      >
        {WHY_HIRE_ME.map((item, i) => {
          const Icon = ICONS[i] ?? Sparkles;
          return (
            <motion.article
              key={item.title}
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-colors hover:border-primary/45"
            >
              <motion.span
                whileHover={{ rotate: 8 }}
                className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </motion.span>
              <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </motion.article>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
