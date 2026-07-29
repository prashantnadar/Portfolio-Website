import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Playful pointer companion:
 *  - a comet trail of springy dots that lag progressively behind the cursor
 *  - a magnetic ring that snaps wider over interactive elements
 *  - click ripples that burst outwards, so users keep clicking around
 *
 * Desktop / fine-pointer only, and fully disabled for prefers-reduced-motion.
 */

const TRAIL = [
  { size: 26, stiffness: 220, damping: 24, opacity: 0.5 },
  { size: 20, stiffness: 170, damping: 24, opacity: 0.4 },
  { size: 15, stiffness: 130, damping: 24, opacity: 0.3 },
  { size: 11, stiffness: 100, damping: 24, opacity: 0.22 },
  { size: 8, stiffness: 78, damping: 24, opacity: 0.16 },
];

interface Ripple {
  id: number;
  x: number;
  y: number;
}

function TrailDot({
  x,
  y,
  config,
}: {
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
  config: (typeof TRAIL)[number];
}) {
  const sx = useSpring(x, { stiffness: config.stiffness, damping: config.damping, mass: 0.6 });
  const sy = useSpring(y, { stiffness: config.stiffness, damping: config.damping, mass: 0.6 });

  return (
    <motion.span
      style={{
        x: sx,
        y: sy,
        width: config.size,
        height: config.size,
        opacity: config.opacity,
      }}
      className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary blur-[2px]"
    />
  );
}

export function CursorEffect() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 300, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 300, damping: 26, mass: 0.5 });

  const removeRipple = useCallback((id: number) => {
    setRipples((r) => r.filter((item) => item.id !== id));
  }, []);

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
    const onDown = (e: PointerEvent) => {
      setDown(true);
      const id = ++rippleId.current;
      setRipples((r) => [...r.slice(-4), { id, x: e.clientX, y: e.clientY }]);
    };
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
      {TRAIL.map((config, i) => (
        <TrailDot key={i} x={x} y={y} config={config} />
      ))}

      <motion.div style={{ x: ringX, y: ringY }} className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{
            scale: down ? 0.75 : hovering ? 2.1 : 1,
            rotate: hovering ? 90 : 0,
            borderRadius: hovering ? "35%" : "50%",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="h-9 w-9 border-2 border-primary/60"
        />
      </motion.div>

      <motion.div style={{ x, y }} className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: hovering ? 0 : 1 }}
          transition={{ duration: 0.18 }}
          className="h-1.5 w-1.5 rounded-full bg-primary"
        />
      </motion.div>

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ opacity: 0.55, scale: 0 }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            onAnimationComplete={() => removeRipple(ripple.id)}
            style={{ left: ripple.x, top: ripple.y }}
            className="absolute h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 bg-primary/10"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
