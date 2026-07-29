import { motion } from "framer-motion";
import {
  BadgeCheck,
  Brush,
  CalendarHeart,
  FileText,
  Globe,
  LayoutTemplate,
  MapPinned,
  MessageSquare,
  Paintbrush,
  RefreshCw,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import logo from "@/assets/pn-creation-logo.jpg.asset.json";
import { Reveal, StaggerGroup, fadeUp, scaleIn } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { PRICING, SERVICES, SITE } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const ICONS: LucideIcon[] = [
  Globe,
  LayoutTemplate,
  Wrench,
  User,
  RefreshCw,
  Wrench,
  MapPinned,
  FileText,
  FileText,
  CalendarHeart,
  Paintbrush,
  Brush,
];

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="PN Creation"
      title="Freelance Services by PN Creation"
      description="In addition to my professional frontend development career, I also help businesses build their online presence through PN Creation."
      className="bg-surface/60"
    >
      <Reveal
        variants={scaleIn}
        className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-5 rounded-3xl border border-border bg-card p-6 text-center shadow-soft sm:flex-row sm:gap-7 sm:p-8 sm:text-left"
      >
        <motion.img
          src={logo.url}
          alt="PN Creation logo"
          loading="lazy"
          width={128}
          height={128}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="h-24 w-24 shrink-0 rounded-2xl bg-white object-contain p-2 dark:bg-white"
        />
        <div className="min-w-0">
          <h3 className="text-xl font-semibold">PN Creation</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            A small freelance studio for websites, resumes and everyday brand design — run
            personally by me, so you always talk to the person building your project.
          </p>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/15 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Discuss your project
          </a>
        </div>
      </Reveal>

      <StaggerGroup
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        gap={0.05}
      >
        {SERVICES.map((service, i) => {
          const Icon = ICONS[i] ?? Sparkles;
          return (
            <motion.article
              key={service.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-colors hover:border-primary/45"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-base font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </motion.article>
          );
        })}
      </StaggerGroup>

      <Reveal className="mt-20 text-center">
        <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">Simple, transparent pricing</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          Every package is quoted after a short conversation — these ranges cover most projects.
        </p>
      </Reveal>

      <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3" gap={0.1}>
        {PRICING.map((plan) => (
          <motion.article
            key={plan.tier}
            variants={fadeUp}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className={cn(
              "relative flex h-full flex-col rounded-3xl border p-7 shadow-soft",
              plan.highlighted
                ? "border-primary/50 bg-card ring-2 ring-primary/30 lg:-translate-y-3"
                : "border-border bg-card",
            )}
          >
            {plan.highlighted ? (
              <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap text-primary-foreground shadow-glow">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Most complete
              </span>
            ) : null}
            <h4 className="text-lg font-semibold">{plan.tier}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
            <p
              className={cn(
                "mt-5 font-display text-2xl font-bold sm:text-3xl",
                plan.highlighted && "text-gradient",
              )}
            >
              {plan.price}
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2.5 text-sm text-muted-foreground">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={cn(
                "mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                plan.highlighted
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "border border-border bg-surface text-foreground hover:bg-accent",
              )}
            >
              Start with {plan.tier}
            </motion.a>
          </motion.article>
        ))}
      </StaggerGroup>
    </Section>
  );
}
