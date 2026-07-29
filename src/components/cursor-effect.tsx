import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Premium pointer effect: a soft glow blob that trails the cursor plus a precise
 * dot. Enabled only for fine pointers (desktop) and disabled for users who ask
 * for reduced motion. Purely decorative, so it is hidden from assistive tech.
 */
export function CursorEffect() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });
  const glowX = useSpring(x, { stiffness: 90, damping: 22, mass: 0.9 });
  const glowY = useSpring(y, { stiffness: 90, damping: 22, mass: 0.9 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a, button, [role='button'], input, textarea, select, label")));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] hidden lg:block">
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: hovering ? 1.5 : 1, opacity: hovering ? 0.5 : 0.32 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="h-40 w-40 rounded-full bg-primary/40 blur-3xl"
        />
      </motion.div>

      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale: down ? 0.8 : hovering ? 1.9 : 1,
            borderColor: hovering ? "var(--primary)" : "color-mix(in oklab, var(--primary) 45%, transparent)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="h-9 w-9 rounded-full border-2"
        />
      </motion.div>

      <motion.div
        style={{ x, y }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: hovering ? 0 : 1 }}
          transition={{ duration: 0.18 }}
          className="h-1.5 w-1.5 rounded-full bg-primary"
        />
      </motion.div>
    </div>
  );
}
