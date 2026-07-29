import { motion } from "framer-motion";
import { Briefcase, CalendarDays, Check, MapPin } from "lucide-react";

import { StaggerGroup, fadeUp } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { EXPERIENCE } from "@/lib/site-data";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I have been shipping"
      description="Production React work in an Agile team, from component architecture to release."
      className="bg-surface/60"
    >
      <ol className="relative mx-auto max-w-3xl">
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-4 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent sm:left-5"
        />
        {EXPERIENCE.map((job) => (
          <li key={job.company} className="relative pl-12 sm:pl-16">
            <motion.span
              aria-hidden="true"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="absolute top-6 left-0 grid h-9 w-9 place-items-center rounded-full border border-primary/30 bg-primary/15 text-primary sm:left-1"
            >
              <Briefcase className="h-4 w-4" aria-hidden="true" />
            </motion.span>

            <motion.article
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:justify-between">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-balance sm:text-xl">{job.role}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{job.company}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                  {job.period}
                </span>
              </div>

              <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {job.location}
              </p>

              <StaggerGroup className="mt-6 space-y-3" gap={0.06}>
                {job.points.map((point) => (
                  <motion.p
                    key={point}
                    variants={fadeUp}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{point}</span>
                  </motion.p>
                ))}
              </StaggerGroup>
            </motion.article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
