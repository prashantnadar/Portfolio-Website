import { AnimatePresence, motion } from "framer-motion";
import { Braces, Copy, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

import { Reveal, fadeUp, scaleIn, slideLeft } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Live code console — self-typing snippets                            */
/* ------------------------------------------------------------------ */

const SNIPPETS = [
  `function useHireMe() {
  const [available] = useState(true);
  const skills = ["React", "TypeScript", "Tailwind"];

  return useMemo(() => ({
    available,
    skills,
    respondsWithin: "24 hours",
  }), [available]);
}`,
  `const buildQuality = {
  architecture: "component-driven",
  typing: "strict TypeScript",
  a11y: "keyboard + screen reader tested",
  performance: ["code splitting", "lazy images"],
  handover: "documented & deploy-ready",
} as const;`,
  `export const shipProcess = async (idea) => {
  const design  = await clarify(idea);
  const ui      = build(design, { motion: true });
  const audited = await lighthouse(ui);   // 95+
  return deploy(audited);
};`,
];

function CodeConsole() {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [chars, setChars] = useState(0);
  const source = SNIPPETS[snippetIndex];

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setChars(source.length);
      return;
    }
    if (chars < source.length) {
      const t = setTimeout(() => setChars((c) => c + 1), 12);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setChars(0);
      setSnippetIndex((i) => (i + 1) % SNIPPETS.length);
    }, 3200);
    return () => clearTimeout(t);
  }, [chars, source, snippetIndex]);

  return (
    <Reveal variants={scaleIn} className="min-w-0">
      <div className="h-full rounded-3xl border border-border bg-card/80 p-5 shadow-soft backdrop-blur-sm sm:p-6">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-destructive/70" />
          <span className="h-3 w-3 rounded-full bg-primary-soft/80" />
          <span className="h-3 w-3 rounded-full bg-primary/70" />
          <span className="ml-3 inline-flex min-w-0 items-center gap-1.5 truncate font-mono text-xs text-muted-foreground">
            <Terminal className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            live-preview.ts
          </span>
        </div>
        <pre className="mt-4 min-h-56 overflow-x-auto font-mono text-[12.5px] leading-relaxed text-muted-foreground sm:text-[13px]">
          <code>
            {source.slice(0, chars)}
            <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-primary align-middle" />
          </code>
        </pre>
        <p className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground">
          Snippet {snippetIndex + 1} of {SNIPPETS.length} — real patterns from how I build.
        </p>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* const prashant — interactive object explorer                        */
/* ------------------------------------------------------------------ */

interface Entry {
  key: string;
  value: string;
  detail: string;
  type: "string" | "array" | "boolean" | "number";
}

const ENTRIES: Entry[] = [
  {
    key: "role",
    value: `"Frontend Developer"`,
    detail: "React + TypeScript specialist shipping production interfaces since 2024.",
    type: "string",
  },
  {
    key: "stack",
    value: `["React", "TypeScript", "Tailwind", "Redux"]`,
    detail: "Component-driven architecture, strict typing, utility-first styling.",
    type: "array",
  },
  {
    key: "obsessions",
    value: `["performance", "accessibility", "motion"]`,
    detail: "Lighthouse 95+, keyboard-first flows and animation that guides attention.",
    type: "array",
  },
  {
    key: "lighthouseTarget",
    value: "95",
    detail: "Every build is audited before handover — performance, a11y, SEO, best practices.",
    type: "number",
  },
  {
    key: "respondsWithin",
    value: `"24 hours"`,
    detail: "Clear updates, no ghosting. Async-friendly across time zones.",
    type: "string",
  },
  {
    key: "openToWork",
    value: "true",
    detail: "Available for full-time roles and PN Creation freelance projects.",
    type: "boolean",
  },
];

const TYPE_CLASS: Record<Entry["type"], string> = {
  string: "text-primary",
  array: "text-primary-soft",
  boolean: "text-destructive",
  number: "text-primary",
};

function ConstPrashant() {
  const [active, setActive] = useState<string | null>(ENTRIES[0].key);
  const [copied, setCopied] = useState(false);

  const activeEntry = ENTRIES.find((e) => e.key === active) ?? null;

  const copy = async () => {
    const text = `const prashant = {\n${ENTRIES.map((e) => `  ${e.key}: ${e.value},`).join("\n")}\n} as const;`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Reveal variants={slideLeft} className="min-w-0">
      <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="inline-flex items-center gap-2 text-base font-semibold">
            <Braces className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
            const prashant
          </h3>
          <button
            type="button"
            onClick={copy}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            {copied ? "Copied!" : "Copy object"}
          </button>
        </div>

        <pre className="mt-5 overflow-x-auto font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
          <code>
            <span className="text-muted-foreground">const</span>{" "}
            <span className="font-semibold text-foreground">prashant</span>{" "}
            <span className="text-muted-foreground">= {"{"}</span>
            {"\n"}
            {ENTRIES.map((entry) => (
              <button
                key={entry.key}
                type="button"
                onMouseEnter={() => setActive(entry.key)}
                onFocus={() => setActive(entry.key)}
                onClick={() => setActive(entry.key)}
                className={cn(
                  "block w-full rounded-md px-2 py-0.5 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  active === entry.key ? "bg-primary/10" : "hover:bg-surface",
                )}
              >
                <span className="text-muted-foreground">{"  "}</span>
                <span className="font-semibold text-foreground">{entry.key}</span>
                <span className="text-muted-foreground">: </span>
                <span className={TYPE_CLASS[entry.type]}>{entry.value}</span>
                <span className="text-muted-foreground">,</span>
              </button>
            ))}
            <span className="text-muted-foreground">
              {"}"} as const;
            </span>
          </code>
        </pre>

        <AnimatePresence mode="wait">
          {activeEntry ? (
            <motion.p
              key={activeEntry.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="mt-5 rounded-xl border border-primary/25 bg-primary/5 px-4 py-3 text-sm text-muted-foreground"
            >
              <span className="font-mono font-semibold text-primary">.{activeEntry.key}</span> —{" "}
              {activeEntry.detail}
            </motion.p>
          ) : null}
        </AnimatePresence>

        <p className="mt-4 text-xs text-muted-foreground">
          Hover, tab or tap any property to inspect it — plain React state, no libraries.
        </p>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* npx prashant — animated terminal                                    */
/* ------------------------------------------------------------------ */

const LINES = [
  { text: "$ npx create-prashant-app my-product", tone: "cmd" },
  { text: "✔ Scanning requirements ......... done", tone: "ok" },
  { text: "✔ Designing system tokens ....... done", tone: "ok" },
  { text: "✔ Building components (React 19)  done", tone: "ok" },
  { text: "✔ Auditing Lighthouse ........... 98/100", tone: "ok" },
  { text: "✔ Shipping to production ........ done", tone: "ok" },
  { text: "→ Ready in 0.42s. Let's build yours.", tone: "note" },
] as const;

function BuildTerminal() {
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(LINES.length);
      return;
    }
    if (visible < LINES.length) {
      const t = setTimeout(() => setVisible((v) => v + 1), 620);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisible(1), 4200);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <Reveal variants={fadeUp} className="min-w-0">
      <div className="h-full rounded-3xl border border-border bg-card p-5 font-mono shadow-soft sm:p-6">
        <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
          zsh — prashant@mumbai
        </div>
        <div className="mt-4 min-h-44 space-y-1.5 text-[12.5px] leading-relaxed sm:text-[13px]">
          {LINES.slice(0, visible).map((line) => (
            <motion.p
              key={line.text}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "break-words",
                line.tone === "cmd" && "font-semibold text-foreground",
                line.tone === "ok" && "text-muted-foreground",
                line.tone === "note" && "text-primary",
              )}
            >
              {line.text}
            </motion.p>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */

export function Playground() {
  return (
    <Section
      id="playground"
      eyebrow="Dev Playground"
      title="A look at how I think in code"
      description="Interactive pieces built from scratch with React state and Framer Motion — the fastest way to judge a frontend developer is to use what they built."
      className="bg-surface/60"
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ConstPrashant />
        <CodeConsole />
      </div>
      <div className="mt-5">
        <BuildTerminal />
      </div>
      <Reveal variants={fadeUp} className="mt-8 text-center text-xs text-muted-foreground">
        Everything above is keyboard accessible and respects{" "}
        <code className="font-mono text-primary">prefers-reduced-motion</code>.
      </Reveal>
    </Section>
  );
}
