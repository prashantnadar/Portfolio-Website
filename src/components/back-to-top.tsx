import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SIZE = 52;
const R = 23;

/** Floating back-to-top button with the page scroll progress drawn as its outline ring. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();
  const wasFocused = useRef(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll (unless reduced motion), then hand keyboard focus back to the header.
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    if (wasFocused.current) {
      document.querySelector<HTMLElement>("header a, header button")?.focus();
    }
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Back to top of page"
          title="Back to top"
          onFocus={() => (wasFocused.current = true)}
          onBlur={() => (wasFocused.current = false)}
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          whileHover={reduceMotion ? undefined : { y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="fixed right-4 bottom-4 z-50 grid h-11 w-11 min-h-11 min-w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none sm:right-6 sm:bottom-6"
        >
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="pointer-events-none absolute -inset-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+0.75rem)] -rotate-90"
          >
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              strokeWidth="4"
              className="stroke-background"
            />
            <motion.circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ pathLength: reduceMotion ? scrollYProgress : progress }}
              className="stroke-primary-soft"
            />
          </svg>
          <ArrowUp className="relative h-5 w-5" aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
