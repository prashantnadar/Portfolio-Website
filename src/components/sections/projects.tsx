import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github, Star } from "lucide-react";

import { StaggerGroup, fadeUp } from "@/components/motion/reveal";
import { ResponsiveImage } from "@/components/responsive-image";
import { Section } from "@/components/section";
import { PROJECTS } from "@/lib/projects-data";
import { cn } from "@/lib/utils";

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
            key={project.slug}
            variants={fadeUp}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            aria-labelledby={`project-${project.slug}-title`}
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
              <h3 id={`project-${project.slug}-title`} className="text-xl font-semibold text-balance sm:text-2xl">
                {project.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">{project.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.overview}</p>

              {/* Labelled blocks keep highlights and stack visually distinct from the preview */}
              <div className="mt-6 rounded-2xl border border-border bg-surface/60 p-4 sm:p-5">
                <h4 className="text-xs font-semibold tracking-[0.14em] text-foreground uppercase">
                  Key highlights
                </h4>
                <ul className="mt-3 space-y-2" aria-label={`${project.title} key highlights`}>
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
                <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${project.title} tech stack`}>
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
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  title={`Read the ${project.title} case study`}
                  aria-label={`Read the ${project.title} case study — problem, approach and results`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  Case study
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                {project.live ? (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    title={`Open the live ${project.title} website in a new tab`}
                    aria-label={`Open the live ${project.title} website in a new tab`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
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
                    title={`View the ${project.title} source on GitHub`}
                    aria-label={`View the ${project.title} source code on GitHub`}
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
