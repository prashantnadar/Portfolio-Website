import { AnimatePresence, motion } from "framer-motion";
import { Check, Gamepad2, RotateCcw, Terminal, Trophy, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Reveal, fadeUp, scaleIn, slideLeft, slideRight } from "@/components/motion/reveal";
import { Section } from "@/components/section";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Live code console                                                   */
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
/* Memory match                                                        */
/* ------------------------------------------------------------------ */

const TECHS = ["React", "TypeScript", "Tailwind", "Vite", "Redux", "Git"];

interface Tile {
  id: number;
  label: string;
  matched: boolean;
}

function shuffle(): Tile[] {
  return [...TECHS, ...TECHS]
    .map((label, i) => ({ id: i, label, matched: false }))
    .sort(() => Math.random() - 0.5)
    .map((t, i) => ({ ...t, id: i }));
}

function MemoryGame() {
  const [tiles, setTiles] = useState<Tile[]>(() =>
    [...TECHS, ...TECHS].map((label, i) => ({ id: i, label, matched: false })),
  );
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [started, setStarted] = useState(false);

  const reset = useCallback(() => {
    setTiles(shuffle());
    setFlipped([]);
    setMoves(0);
    setStarted(true);
  }, []);

  useEffect(() => {
    if (flipped.length !== 2) return;
    const [a, b] = flipped;
    const timer = setTimeout(() => {
      setTiles((prev) =>
        prev[a].label === prev[b].label
          ? prev.map((t, i) => (i === a || i === b ? { ...t, matched: true } : t))
          : prev,
      );
      setFlipped([]);
    }, 650);
    return () => clearTimeout(timer);
  }, [flipped]);

  const won = started && tiles.every((t) => t.matched);

  const onFlip = (index: number) => {
    if (!started) {
      reset();
      return;
    }
    if (flipped.length === 2 || flipped.includes(index) || tiles[index].matched) return;
    setFlipped((f) => [...f, index]);
    if (flipped.length === 1) setMoves((m) => m + 1);
  };

  return (
    <Reveal variants={slideRight} className="min-w-0">
      <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="inline-flex items-center gap-2 text-base font-semibold">
            <Gamepad2 className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
            Stack Memory Match
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-muted-foreground">Moves: {moves}</span>
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              {started ? "Restart" : "Start"}
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
          {tiles.map((tile, i) => {
            const revealed = tile.matched || flipped.includes(i);
            return (
              <motion.button
                key={tile.id}
                type="button"
                onClick={() => onFlip(i)}
                whileTap={{ scale: 0.94 }}
                animate={{ rotateY: revealed ? 180 : 0 }}
                transition={{ duration: 0.35 }}
                aria-label={revealed ? tile.label : "Hidden tile"}
                className={cn(
                  "grid aspect-square min-h-16 place-items-center rounded-xl border px-1 text-center text-[11px] font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:text-xs",
                  tile.matched
                    ? "border-primary/50 bg-primary/15 text-primary"
                    : revealed
                      ? "border-primary/30 bg-surface text-foreground"
                      : "border-border bg-surface text-lg text-primary/35 hover:border-primary/40",
                )}
              >
                <span style={{ transform: revealed ? "rotateY(180deg)" : undefined }}>
                  {revealed ? tile.label : "?"}
                </span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {won ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-sm font-semibold text-primary"
            >
              <Trophy className="h-4 w-4" aria-hidden="true" />
              Cleared in {moves} moves — nice pattern recognition.
            </motion.p>
          ) : (
            <p className="mt-5 text-xs text-muted-foreground">
              Match every pair of my core stack. Built with React state only — no game library.
            </p>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Frontend quiz                                                       */
/* ------------------------------------------------------------------ */

const QUESTIONS = [
  {
    q: "Which hook memoises an expensive computed value?",
    options: ["useEffect", "useMemo", "useRef", "useState"],
    answer: 1,
  },
  {
    q: "What does CLS measure in Core Web Vitals?",
    options: ["Server latency", "Bundle size", "Visual layout shift", "Cache hits"],
    answer: 2,
  },
  {
    q: "Which attribute defers offscreen image loading natively?",
    options: [`loading="lazy"`, `defer`, `async`, `preload`],
    answer: 0,
  },
  {
    q: "Which element best wraps a page's primary navigation?",
    options: ["<div>", "<nav>", "<aside>", "<section>"],
    answer: 1,
  },
  {
    q: "In TypeScript, what does `as const` do to an array literal?",
    options: [
      "Deep-freezes it at runtime",
      "Makes it a readonly tuple of literal types",
      "Converts it to an enum",
      "Nothing — it's a comment",
    ],
    answer: 1,
  },
];

function Quiz() {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const done = step >= QUESTIONS.length;
  const current = QUESTIONS[Math.min(step, QUESTIONS.length - 1)];
  const progress = useMemo(() => Math.round((step / QUESTIONS.length) * 100), [step]);

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === current.answer) setScore((s) => s + 1);
    setTimeout(() => {
      setPicked(null);
      setStep((s) => s + 1);
    }, 800);
  };

  const restart = () => {
    setStep(0);
    setPicked(null);
    setScore(0);
  };

  return (
    <Reveal variants={slideLeft} className="min-w-0">
      <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-semibold">Frontend Quick Quiz</h3>
          <span className="text-xs font-medium text-muted-foreground">
            Score {score}/{QUESTIONS.length}
          </span>
        </div>

        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface">
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{ width: `${done ? 100 : progress}%` }}
            transition={{ type: "spring", stiffness: 160, damping: 24 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 flex flex-1 flex-col justify-center text-center"
            >
              <Trophy className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
              <p className="mt-3 font-display text-2xl font-bold">
                {score}/{QUESTIONS.length}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {score === QUESTIONS.length
                  ? "Perfect score — we'd get along well."
                  : "Nicely done. These are the details I obsess over daily."}
              </p>
              <button
                type="button"
                onClick={restart}
                className="mx-auto mt-5 inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Play again
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
              className="mt-5 flex-1"
            >
              <p className="text-sm font-semibold">
                {step + 1}. {current.q}
              </p>
              <ul className="mt-4 space-y-2.5">
                {current.options.map((option, i) => {
                  const isAnswer = i === current.answer;
                  const state =
                    picked === null ? "idle" : isAnswer ? "correct" : picked === i ? "wrong" : "idle";
                  return (
                    <li key={option}>
                      <button
                        type="button"
                        onClick={() => choose(i)}
                        className={cn(
                          "flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-left font-mono text-xs transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:text-sm",
                          state === "correct" && "border-primary/60 bg-primary/10 text-primary",
                          state === "wrong" && "border-destructive/50 bg-destructive/10 text-destructive",
                          state === "idle" && "border-border bg-surface hover:border-primary/40",
                        )}
                      >
                        <span className="min-w-0 break-words">{option}</span>
                        {state === "correct" ? <Check className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
                        {state === "wrong" ? <X className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
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
      title="Code you can actually play with"
      description="A few interactive pieces built from scratch with React state and Framer Motion — no game engines, no plugins. Because the fastest way to judge a frontend developer is to use what they built."
      className="bg-surface/60"
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <CodeConsole />
        <Quiz />
      </div>
      <div className="mt-5">
        <MemoryGame />
      </div>
      <Reveal variants={fadeUp} className="mt-8 text-center text-xs text-muted-foreground">
        Everything above is keyboard accessible and respects{" "}
        <code className="font-mono text-primary">prefers-reduced-motion</code>.
      </Reveal>
    </Section>
  );
}
