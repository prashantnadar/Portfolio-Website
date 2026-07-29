import { motion } from "framer-motion";

import { StaggerGroup, fadeUp } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { SKILL_GROUPS } from "@/lib/site-data";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="The toolkit behind the work"
      description="Grouped by how I actually use them — no arbitrary percentages, just the stack I work in every day."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {SKILL_GROUPS.map((group, groupIndex) => (
          <motion.section
            key={group.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: groupIndex * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-7"
            aria-label={`${group.category} skills`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-xl font-semibold">{group.category}</h3>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">
                {String(group.items.length).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{group.description}</p>

            <StaggerGroup className="mt-6 flex flex-wrap gap-2.5" gap={0.04}>
              {group.items.map((item) => (
                <motion.span
                  key={item}
                  variants={fadeUp}
                  whileHover={{ y: -4, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="cursor-default rounded-xl border border-border bg-surface px-3.5 py-2 text-sm font-medium text-surface-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  {item}
                </motion.span>
              ))}
            </StaggerGroup>
          </motion.section>
        ))}
      </div>
    </Section>
  );
}
