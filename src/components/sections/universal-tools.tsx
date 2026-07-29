import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Braces,
  FileText,
  Image as ImageIcon,
  KeyRound,
  Palette,
  Sparkles,
  Type,
  Wrench,
  Zap,
} from "lucide-react";

import { Reveal, StaggerGroup, fadeUp, scaleIn } from "@/components/motion/reveal";
import { Section } from "@/components/section";

const TOOL_CATEGORIES = [
  {
    icon: Type,
    name: "Text Tools",
    href: "https://universaltools.in/tools/text",
    blurb: "Case converters, word & character counters, cleaners, formatters.",
  },
  {
    icon: Zap,
    name: "Productivity Tools",
    href: "https://universaltools.in/tools/productivity",
    blurb: "Timers, notes, unit converters and everyday utilities in one tab.",
  },
  {
    icon: Braces,
    name: "Developer Tools",
    href: "https://universaltools.in/tools/code",
    blurb: "JSON formatter, base64, URL encode/decode, regex helpers.",
  },
  {
    icon: Palette,
    name: "Color Tools",
    href: "https://universaltools.in/tools/color",
    blurb: "Pickers, HEX/RGB/HSL converters, palettes and contrast checks.",
  },
  {
    icon: FileText,
    name: "Code Tools",
    href: "https://universaltools.in/tools/code",
    blurb: "Minifiers, beautifiers and quick snippet playgrounds.",
  },
  {
    icon: KeyRound,
    name: "Password Tools",
    href: "https://universaltools.in/tools/password",
    blurb: "Strong password generator and strength analysis, done client-side.",
  },
  {
    icon: ImageIcon,
    name: "Image Tools",
    href: "https://universaltools.in/tools/image",
    blurb: "Compress, convert, resize and crop images without uploads.",
  },
  {
    icon: Wrench,
    name: "PDF Tools",
    href: "https://universaltools.in/tools/pdf",
    blurb: "Merge, split, compress and convert PDFs in a couple of clicks.",
  },
] as const;

const SITE_URL = "https://universaltools.in";

export function UniversalToolsPromo() {
  return (
    <Section
      id="tools"
      eyebrow="My Product"
      title={
        <>
          Universal Tools — <span className="text-primary">universaltools.in</span>
        </>
      }
      description="My own live product: one fast, free, ad-light platform bundling 100+ everyday web tools. Nothing to install, nothing to sign up for — open a tool and get the job done."
      className="bg-surface/60"
    >
      <Reveal variants={scaleIn} className="mb-10">
        <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-card p-6 shadow-soft sm:p-9">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
          />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Live &amp; free to use
              </span>
              <h3 className="mt-4 text-2xl font-bold text-balance sm:text-3xl">
                Text, developer, image, PDF, color, password and productivity tools — all in one place
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Built and maintained by me end to end: modular architecture, lazy-loaded routes and
                privacy-first processing that happens right in your browser. New tools ship regularly.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <motion.a
                href={SITE_URL}
                target="_blank"
                rel="noreferrer noopener"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Explore Universal Tools
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </motion.a>
            </div>
          </div>
        </div>
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
        {TOOL_CATEGORIES.map(({ icon: Icon, name, blurb, href }) => (
          <motion.a
            key={name}
            href={href}
            title={`Open ${name} on universaltools.in`}
            aria-label={`Open ${name} on universaltools.in (opens in a new tab)`}
            target="_blank"
            rel="noreferrer noopener"
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-primary/45 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h4 className="mt-4 text-sm font-semibold">{name}</h4>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{blurb}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
              Open
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </motion.a>
        ))}
      </StaggerGroup>

      <Reveal variants={fadeUp} className="mt-8 text-center text-sm text-muted-foreground">
        …and many more — visit{" "}
        <a
          href={SITE_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          universaltools.in
        </a>{" "}
        to see the full collection.
      </Reveal>
    </Section>
  );
}
