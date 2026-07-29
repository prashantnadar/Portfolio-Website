import { cn } from "@/lib/utils";

interface PNMarkProps {
  className?: string;
  size?: number;
}

/** Personal "PN" monogram mark (Prashant Nadar) — not the PN Creation business logo. */
export function PNMark({ className, size = 36 }: PNMarkProps) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 font-display font-bold tracking-tight text-primary",
        className,
      )}
    >
      PN
    </span>
  );
}
