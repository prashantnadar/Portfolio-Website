import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa6";

import { Reveal, StaggerGroup, fadeUp, scaleIn } from "@/components/motion/reveal";
import { SITE } from "@/lib/site-data";

const ROLES = ["Frontend Developer", "React Developer", "Freelance Web Developer"];

const SOCIALS = [
  { href: SITE.github, label: "GitHub", Icon: FaGithub },
  { href: SITE.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
  { href: SITE.instagram, label: "Instagram", Icon: FaInstagram },
];

const STATS = [
  { value: "2+", label: "Years building UIs" },
  { value: "5+", label: "Modules shipped" },
  { value: "20+", label: "Tools in Universal Tools" },
];

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="grid-backdrop pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -26, 0], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-20 -right-24 -z-10 h-72 w-72 rounded-full bg-primary/25 blur-3xl sm:h-96 sm:w-96"
      />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 24, 0], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-28 -left-24 -z-10 h-72 w-72 rounded-full bg-primary-soft/25 blur-3xl sm:h-96 sm:w-96"
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-8">
        <StaggerGroup className="min-w-0" gap={0.1}>
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Available for freelance projects
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            Prashant <span className="text-gradient">Nadar</span>
          </motion.h1>

          <motion.ul variants={fadeUp} className="mt-5 flex flex-wrap items-center gap-2">
            {ROLES.map((role) => (
              <li
                key={role}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-muted-foreground"
              >
                {role}
              </li>
            ))}
          </motion.ul>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg"
          >
            I build modern, fast, scalable and responsive web applications using React, TypeScript
            and Tailwind CSS. I also help businesses establish a strong online presence through
            custom website development.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <motion.a
              href="#contact"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Hire Me
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
              {SITE.location}
            </span>
            <ul className="flex items-center gap-2">
              {SOCIALS.map(({ href, label, Icon }) => (
                <li key={label}>
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    whileHover={{ y: -3, scale: 1.06 }}
                    className="grid h-11 w-11 min-h-11 min-w-11 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </StaggerGroup>

        <Reveal variants={scaleIn} className="min-w-0">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-3xl border border-border bg-card/80 p-5 shadow-soft backdrop-blur-sm sm:p-7"
          >
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-destructive/70" />
              <span className="h-3 w-3 rounded-full bg-primary-soft/80" />
              <span className="h-3 w-3 rounded-full bg-primary/70" />
              <span className="ml-3 truncate font-mono text-xs text-muted-foreground">
                prashant.tsx
              </span>
            </div>
            <pre className="mt-4 overflow-x-auto font-mono text-[13px] leading-relaxed text-muted-foreground">
              <code>{`const prashant = {
  role: "Frontend Developer",
  stack: ["React", "TypeScript",
          "Tailwind CSS"],
  focus: "performance + a11y",
  freelance: "PN Creation",
  status: "open to work",
};`}</code>
            </pre>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
              {STATS.map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <p className="font-display text-xl font-bold text-primary sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
