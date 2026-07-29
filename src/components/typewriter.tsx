import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface TypewriterProps {
  words: readonly string[];
  className?: string;
  /** ms per typed character */
  typeSpeed?: number;
  /** ms per deleted character */
  deleteSpeed?: number;
  /** ms to hold a completed word */
  holdTime?: number;
  /** Render the caret after the text */
  caret?: boolean;
}

/**
 * Accessible typewriter. The first word is rendered on the server so there is no
 * layout shift or empty first paint, and the full list is exposed to screen readers.
 */
export function Typewriter({
  words,
  className,
  typeSpeed = 70,
  deleteSpeed = 38,
  holdTime = 1500,
  caret = true,
}: TypewriterProps) {
  const first = words[0] ?? "";
  const [text, setText] = useState(first);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "typing" | "deleting">("idle");

  useEffect(() => {
    if (words.length < 2) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    if (phase === "idle") {
      const t = setTimeout(() => setPhase("deleting"), holdTime);
      return () => clearTimeout(t);
    }

    const current = words[index % words.length];

    if (phase === "deleting") {
      if (text.length === 0) {
        setIndex((i) => (i + 1) % words.length);
        setPhase("typing");
        return;
      }
      const t = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed);
      return () => clearTimeout(t);
    }

    if (text === current) {
      const t = setTimeout(() => setPhase("deleting"), holdTime);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
    return () => clearTimeout(t);
  }, [text, phase, index, words, typeSpeed, deleteSpeed, holdTime]);

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span aria-hidden="true">{text}</span>
      {caret ? (
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] animate-pulse bg-current"
        />
      ) : null}
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
