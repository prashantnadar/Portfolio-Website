import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Follow-up cursor:
 *  - a precise dot pinned to the pointer
 *  - a soft gradient glow that drifts behind it
 *  - a slowly rotating dashed ring that eases in, opens up over interactive
 *    elements and squeezes on click
 *
 * Desktop / fine-pointer only, disabled for prefers-reduced-motion.
 */
export function CursorEffect() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const ringX = useSpring(x, { stiffness: 210, damping: 22, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 210, damping: 22, mass: 0.5 });
  const glowX = useSpring(x, { stiffness: 55, damping: 18, mass: 1.1 });
  const glowY = useSpring(y, { stiffness: 55, damping: 18, mass: 1.1 });

  // Glow stretches slightly in the direction of travel.
  const velX = useTransform(glowX, (v) => v);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)");
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setEnabled(fine.matches && !reduceQuery.matches);
    sync();
    fine.addEventListener("change", sync);
    reduceQuery.addEventListener("change", sync);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHovering(
        Boolean(target?.closest("a, button, [role='button'], input, textarea, select, label")),
      );
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      fine.removeEventListener("change", sync);
      reduceQuery.removeEventListener("change", sync);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] hidden lg:block">
      {/* soft trailing glow */}
      <motion.div
        style={{ x: glowX, y: glowY, translateX: velX ? 0 : 0 }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: hovering ? 1.5 : down ? 0.8 : 1, opacity: hovering ? 0.5 : 0.32 }}
          transition={{ type: "spring", stiffness: 160, damping: 22 }}
          className="h-24 w-24 rounded-full bg-primary/40 blur-2xl"
        />
      </motion.div>

      {/* rotating dashed ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            animate={{ scale: down ? 0.7 : hovering ? 1.85 : 1, opacity: hovering ? 1 : 0.7 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="h-10 w-10 rounded-full border border-dashed border-primary/70"
          />
        </motion.div>
      </motion.div>

      {/* precise dot */}
      <motion.div style={{ x, y }} className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: down ? 2.2 : hovering ? 0.4 : 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          className="h-2 w-2 rounded-full bg-primary"
        />
      </motion.div>
    </div>
  );
}
