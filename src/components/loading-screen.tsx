import { Loader2 } from "lucide-react";

export function LoadingScreen({ label = "Loading" }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 bg-background"
    >
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
        <Loader2 className="h-6 w-6 animate-spin text-primary" aria-hidden="true" />
      </div>
      <p className="text-sm font-medium tracking-wide text-muted-foreground">{label}…</p>
    </div>
  );
}

export function SectionFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center" role="status" aria-live="polite">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
      <span className="sr-only">Loading section</span>
    </div>
  );
}
