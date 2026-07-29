import { motion } from "framer-motion";
import { Compass, GraduationCap, Lightbulb, Puzzle, Rocket, User } from "lucide-react";

import { Reveal, StaggerGroup, fadeUp } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { EDUCATION } from "@/lib/site-data";

const CARDS = [
  {
    Icon: User,
    title: "Who I am",
    text: "A Mumbai-based frontend developer who cares about how an interface feels, not only how it looks. I write typed, component-driven React that other developers can pick up without friction.",
  },
  {
    Icon: Compass,
    title: "Career Journey",
    text: "I moved into development from a management background, learned the fundamentals deeply, and joined Secure Access Tech in 2024 where I ship production React features every sprint.",
  },
  {
    Icon: GraduationCap,
    title: "Education",
    text: `${EDUCATION.degree}, ${EDUCATION.school} (${EDUCATION.period}) — followed by self-driven, project-first learning in modern frontend engineering.`,
  },
  {
    Icon: Rocket,
    title: "Professional Goals",
    text: "Grow into a frontend engineer who owns architecture end to end — design systems, performance budgets and accessible experiences at scale.",
  },
  {
    Icon: Puzzle,
    title: "Problem Solving",
    text: "I break requirements into small, testable pieces, question edge cases early, and favour a simple solution that holds up over a clever one that breaks.",
  },
  {
    Icon: Lightbulb,
    title: "Passion for Frontend",
    text: "Motion, layout, type and state management are the parts of the web I genuinely enjoy. Every project is a chance to make something feel a little faster and smoother.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Frontend development, done with intent"
      description="A short look at where I come from, how I work, and what I am building towards."
      className="bg-surface/60"
    >
      <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
        {CARDS.map(({ Icon, title, text }) => (
          <motion.article
            key={title}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-colors hover:border-primary/40"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </motion.article>
        ))}
      </StaggerGroup>

      <Reveal className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center sm:p-8">
        <p className="mx-auto max-w-3xl text-base leading-relaxed text-pretty sm:text-lg">
          My aim on every project is the same: a codebase that is easy to extend, an interface that
          is fast on a mid-range phone, and a result the client is proud to share.
        </p>
      </Reveal>
    </Section>
  );
}
