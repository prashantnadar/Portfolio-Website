import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";

import { fadeUp } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type Faq = { q: string; a: string };

/**
 * Accessible FAQ accordion: WAI-ARIA pattern with roving arrow-key navigation
 * (Up/Down/Home/End), multiple panels open at once, first item open by default.
 */
export function FaqAccordion({ items, idBase = "faq" }: { items: readonly Faq[]; idBase?: string }) {
  const [open, setOpen] = useState<number[]>([0]);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  const toggle = (i: number) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const moves: Record<string, number> = {
      ArrowDown: (i + 1) % items.length,
      ArrowUp: (i - 1 + items.length) % items.length,
      Home: 0,
      End: items.length - 1,
    };
    const next = moves[event.key];
    if (next === undefined) return;
    event.preventDefault();
    triggers.current[next]?.focus();
  };

  return (
    <div className="space-y-3">
      {items.map((faq, i) => {
        const expanded = open.includes(i);
        return (
          <motion.div
            key={faq.q}
            variants={fadeUp}
            className={cn(
              "overflow-hidden rounded-2xl border bg-card shadow-soft transition-colors",
              expanded ? "border-primary/45" : "border-border hover:border-primary/30",
            )}
          >
            <h4>
              <button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                id={`${idBase}-trigger-${i}`}
                aria-expanded={expanded}
                aria-controls={`${idBase}-panel-${i}`}
                title={expanded ? `Collapse: ${faq.q}` : `Expand: ${faq.q}`}
                onClick={() => toggle(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-semibold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <span className="min-w-0">{faq.q}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors",
                    expanded
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-surface text-primary",
                  )}
                >
                  {expanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
            </h4>
            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  key="panel"
                  id={`${idBase}-panel-${i}`}
                  role="region"
                  aria-labelledby={`${idBase}-trigger-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
