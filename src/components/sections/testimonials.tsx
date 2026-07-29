import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import { Reveal, StaggerGroup, fadeUp, scaleIn } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { CLIENT_LOGOS, TESTIMONIALS } from "@/lib/site-data";

export function Testimonials() {
  return (
    <Section
      id="testimonials"
      eyebrow="Client Love"
      title="What clients say about working with me"
      description="Real feedback from the businesses and individuals I've built websites, resumes and brand creatives for through PN Creation."
    >
      <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
        {TESTIMONIALS.map((t) => (
          <motion.figure
            key={t.name}
            variants={fadeUp}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 250, damping: 22 }}
            className="group relative flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition-colors hover:border-primary/45"
          >
            <Quote
              className="absolute top-5 right-5 h-8 w-8 text-primary/15 transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
            <div className="flex items-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 * i, type: "spring", stiffness: 300, damping: 18 }}
                >
                  <Star className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
                </motion.span>
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary"
              >
                {t.initials}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{t.name}</span>
                <span className="block truncate text-xs text-muted-foreground">{t.role}</span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </StaggerGroup>

      <Reveal variants={scaleIn} className="mt-14">
        <p className="text-center text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          Trusted by teams &amp; independent businesses
        </p>
        <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-surface/60 py-5">
          <motion.ul
            className="flex w-max items-center gap-10 px-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          >
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((name, i) => (
              <li
                key={`${name}-${i}`}
                className="font-display text-base font-semibold whitespace-nowrap text-muted-foreground/70 transition-colors hover:text-primary sm:text-lg"
              >
                {name}
              </li>
            ))}
          </motion.ul>
        </div>
      </Reveal>
    </Section>
  );
}
