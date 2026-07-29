import { motion } from "framer-motion";
import { ArrowUpRight, Github, Star } from "lucide-react";

import legalAvif from "@/assets/project-legal.jpg?w=640;960;1440&format=avif&as=srcset";
import legalImg from "@/assets/project-legal.jpg?w=1024&format=jpg";
import legalWebp from "@/assets/project-legal.jpg?w=640;960;1440&format=webp&as=srcset";
import tasksAvif from "@/assets/project-tasks.jpg?w=640;960;1440&format=avif&as=srcset";
import tasksImg from "@/assets/project-tasks.jpg?w=1024&format=jpg";
import tasksWebp from "@/assets/project-tasks.jpg?w=640;960;1440&format=webp&as=srcset";
import toolsAvif from "@/assets/project-tools.jpg?w=640;960;1440&format=avif&as=srcset";
import toolsImg from "@/assets/project-tools.jpg?w=1024&format=jpg";
import toolsWebp from "@/assets/project-tools.jpg?w=640;960;1440&format=webp&as=srcset";
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
    featured: true,
    note: "Live in production and actively used by the practice for client enquiries.",
  },
  {
    title: "Universal Tools",
    subtitle: "Multi-utility platform",
    overview:
      "A growing multi-utility platform bundling developer, SEO, productivity and design tools behind one fast, modular interface. Routes are lazy loaded and each tool is an isolated, reusable module.",
    image: toolsImg,
    avif: toolsAvif,
    webp: toolsWebp,
    alt: "Universal Tools dashboard showing categorised developer, SEO and design tool cards",
    stack: ["React", "TypeScript", "Tailwind CSS", "Lazy Loading", "Modular Architecture"],
    features: [
      "Developer tools, SEO tools, productivity tools and design tools",
      "Lazy-loaded modular routing for a lean initial bundle",
      "Scalable reusable architecture built for continuous expansion",
    ],
    live: "https://universaltools.in",
    github: SITE.github,
    note: "100+ tools planned. New tools are continuously being added.",
  },
  {
    title: "Task Manager",
    subtitle: "CRUD task application",
    overview:
      "A focused task manager covering the full CRUD cycle with Context API state, client-side routing and a responsive Tailwind interface.",
    image: tasksImg,
    avif: tasksAvif,
    webp: tasksWebp,
    alt: "Task manager application interface with task columns and an add task form",
    stack: ["React", "Context API", "Routing", "Tailwind CSS"],
    features: ["Create, read, update and delete tasks", "Global state with Context API", "Responsive, keyboard-friendly UI"],
    github: SITE.github,
  },
];

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      description="Real products — one live in production, one continuously expanding, one built to sharpen fundamentals."
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
            <div className="relative overflow-hidden">
              <div className={cn("aspect-video w-full", project.featured && "lg:aspect-[21/9]")}>
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
              {project.featured ? (
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow">
                  <Star className="h-3.5 w-3.5" aria-hidden="true" />
                  Featured project
                </span>
              ) : null}
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <h3 className="text-xl font-semibold text-balance sm:text-2xl">{project.title}</h3>
              <p className="mt-1 text-sm font-medium text-primary">{project.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.overview}</p>

              <ul className="mt-5 space-y-2">
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

              {project.note ? (
                <p className="mt-5 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                  {project.note}
                </p>
              ) : null}

              <ul className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

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
