import { motion } from "framer-motion";
import { ArrowUpRight, Github, Star } from "lucide-react";

import legalAvif from "@/assets/project-legal.png?w=640;960;1440&format=avif&as=srcset";
import legalImg from "@/assets/project-legal.png?w=1024&format=jpg";
import legalWebp from "@/assets/project-legal.png?w=640;960;1440&format=webp&as=srcset";
import pcsAvif from "@/assets/project-pcs.png?w=640;960;1440&format=avif&as=srcset";
import pcsImg from "@/assets/project-pcs.png?w=1024&format=jpg";
import pcsWebp from "@/assets/project-pcs.png?w=640;960;1440&format=webp&as=srcset";
import toolsAvif from "@/assets/project-tools.png?w=640;960;1440&format=avif&as=srcset";
import toolsImg from "@/assets/project-tools.png?w=1024&format=jpg";
import toolsWebp from "@/assets/project-tools.png?w=640;960;1440&format=webp&as=srcset";
import { StaggerGroup, fadeUp } from "@/components/motion/reveal";
import { ResponsiveImage } from "@/components/responsive-image";
import { Section } from "@/components/section";
import { SITE } from "@/lib/site-data";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  subtitle: string;
  overview: string;
  image: string;
  avif: string;
  webp: string;
  alt: string;
  stack: string[];
  features: string[];
  live?: string;
  github?: string;
  featured?: boolean;
  note?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Universal Tools",
    subtitle: "universaltools.in — 110+ browser-based utilities in one platform",
    overview:
      "My own live product: a fast, ad-light multi-utility platform bundling 110+ text, PDF, image, code, color, password and productivity tools behind a single modular interface. Accounts, search and usage data are backed by PostgreSQL, while the heavy processing runs client-side so nothing leaves the user's device.",
    image: toolsImg,
    avif: toolsAvif,
    webp: toolsWebp,
    alt: "Universal Tools homepage with the one toolkit hero, tool category navigation and search bar",
    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Node.js API",
      "Lazy Loading",
      "Modular Architecture",
      "SEO",
      "Responsive UI",
    ],
    features: [
      "110+ tools across text, PDF, image, code, color, password and productivity categories",
      "Global Ctrl/⌘K command search across every tool with instant filtering",
      "PostgreSQL-backed accounts, auth (log in / sign up) and usage persistence",
      "Privacy-first: file and text processing runs in the browser — no uploads",
      "Lazy-loaded modular routing keeps the initial bundle lean and first paint fast",
      "Built-in dark mode with remembered preference",
      "Fully responsive across mobile, tablet, laptop and large monitors",
      "SEO-optimised tool pages with semantic markup and per-tool metadata",
    ],
    live: "https://universaltools.in",
    github: SITE.github,
    featured: true,
    note: "Live in production, actively maintained — new tools ship regularly.",
  },
  {
    title: "Power Consilium System",
    subtitle: "power-consilium.com — Pan India UPS AMC & power infrastructure",
    overview:
      "A corporate website for Power Consilium System (PCS), a Mumbai-based UPS and power infrastructure company established in 2013. Founded by senior executives with card-level expertise across APC-MGE, Emerson and Numeric, the site presents pan-India AMC services, products and enquiry channels through a bold hero slider and conversion-focused layout.",
    image: pcsImg,
    avif: pcsAvif,
    webp: pcsWebp,
    alt: "Power Consilium System website hero showing Pan India UPS AMC and services",
    stack: ["React", "Tailwind CSS", "Responsive UI", "Dark Mode", "SEO", "WhatsApp Integration"],
    features: [
      "Animated hero slider highlighting 1000+ UPS units managed across 70+ locations",
      "Pan India UPS AMC services and card-level UPS repairing",
      "Inverter sales & service plus tubular and SMF battery supply",
      "Energy & power audit and wholesale UPS / battery supply",
      "Multivendor support for APC, Emerson and Numeric equipment",
      "24/7 remote monitoring & support with floating WhatsApp and call CTAs",
      "Fully responsive with built-in dark mode",
    ],
    live: "https://power-consilium.com",
    note: "Live corporate site — serving corporate and IT clients pan India since 2013.",
  },
  {
    title: "Ask Legal Vision",
    subtitle: "Live website for Adv. Aditya Shankar Kharche — Bombay High Court",
    overview:
      "A production legal-services website for a Bombay High Court advocate with 20+ years in employment law, civil litigation and compliance. Built around a strong \"Precision Legal Strategy for a Fast-Moving World\" hero, clear consultation CTAs, service breakdown, testimonials and direct contact — backed by a MySQL (phpMyAdmin) driven enquiry flow.",
    image: legalImg,
    avif: legalAvif,
    webp: legalWebp,
    alt: "Ask Legal Vision website homepage with hero section and practice areas",
    stack: ["React (JSX)", "Tailwind CSS", "PHP", "MySQL / phpMyAdmin", "Responsive UI", "SEO"],
    features: [
      "Hero with Book a Consultation and Call Now conversion CTAs",
      "About section for Adv. Aditya Shankar Kharche — 20+ years, Bar Council of Maharashtra & Goa",
      "Five service areas: property litigation, employment & labour law, corporate & HR legal advisory, legal drafting & compliance, and legal trainings",
      "Client testimonials plus phone and email contact for direct enquiries",
      "MySQL-backed enquiry storage managed through phpMyAdmin",
      "Fully responsive across mobile, tablet and desktop with fast first paint",
    ],
    live: "https://asklegalvision.in/",
    note: "Live in production and actively used by the practice for client enquiries.",
  },
];

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      description="Real products in production — a live multi-utility platform, a pan-India power services site and a legal practice website."
    >
      <StaggerGroup className="grid grid-cols-1 gap-7 lg:grid-cols-2" gap={0.1}>
        {PROJECTS.map((project) => (
          <motion.article
            key={project.title}
            variants={fadeUp}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className={cn(
              "group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-colors hover:border-primary/45",
              project.featured && "lg:col-span-2",
            )}
          >
            {/* Screenshot presented inside a browser-style frame so it reads as a preview, not decoration */}
            <div className="relative border-b border-border bg-surface p-3 sm:p-4">
              <div className="overflow-hidden rounded-xl border border-border bg-background shadow-soft">
                <div className="flex items-center gap-2 border-b border-border bg-surface px-3 py-2">
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="ml-2 truncate text-[11px] font-medium text-muted-foreground">
                    {project.live ? project.live.replace(/^https?:\/\//, "").replace(/\/$/, "") : "local preview"}
                  </span>
                </div>
                <div className={cn("aspect-video w-full overflow-hidden", project.featured && "lg:aspect-[21/9]")}>
                  <ResponsiveImage
                    src={project.image}
                    avif={project.avif}
                    webp={project.webp}
                    alt={project.alt}
                    width={1200}
                    height={800}
                    sizes={project.featured ? "(min-width: 1024px) 1100px, 100vw" : "(min-width: 1024px) 560px, 100vw"}
                    className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              {project.featured ? (
                <span className="absolute top-6 left-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow sm:top-7 sm:left-7">
                  <Star className="h-3.5 w-3.5" aria-hidden="true" />
                  Featured project
                </span>
              ) : null}
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <h3 className="text-xl font-semibold text-balance sm:text-2xl">{project.title}</h3>
              <p className="mt-1 text-sm font-medium text-primary">{project.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.overview}</p>

              {/* Labelled blocks keep highlights and stack visually distinct from the preview */}
              <div className="mt-6 rounded-2xl border border-border bg-surface/60 p-4 sm:p-5">
                <h4 className="text-xs font-semibold tracking-[0.14em] text-foreground uppercase">
                  Key highlights
                </h4>
                <ul className="mt-3 space-y-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm text-muted-foreground">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {project.note ? (
                <p className="mt-5 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                  {project.note}
                </p>
              ) : null}

              <div className="mt-6 border-t border-border pt-5">
                <h4 className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  Tech stack
                </h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>


              <div className="mt-7 flex flex-wrap gap-3 pt-1">
                {project.live ? (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    Live Website
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </motion.a>
                ) : null}
                {project.github ? (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    GitHub
                  </motion.a>
                ) : null}
              </div>
            </div>
          </motion.article>
        ))}
      </StaggerGroup>
    </Section>
  );
}
