import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";

/** Shared schema — reused by the client form so validation can't drift. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  subject: z.string().trim().min(3, "Add a short subject").max(120),
  message: z.string().trim().min(10, "Tell me a little more").max(1000, "Message is too long"),
  // Anti-spam signals sent alongside the payload.
  honeypot: z.string().max(200).optional().default(""),
  elapsedMs: z.number().nonnegative().max(86_400_000).optional().default(0),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactResult = { ok: boolean; reason?: "spam" | "rate_limit" | "invalid"; message?: string };

/** Server-side rate limit: per-IP sliding window (survives client tampering). */
const LIMIT = { max: 3, windowMs: 10 * 60_000, cooldownMs: 30_000, minFillMs: 2500 };
const hits = new Map<string, number[]>();

/** Blocked attempts are logged so spam patterns show up in server logs. */
function logBlocked(reason: string, ip: string, detail: Record<string, unknown> = {}) {
  console.warn(
    `[contact:blocked] ${JSON.stringify({ reason, ip, at: new Date().toISOString(), ...detail })}`,
  );
}

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: ContactInput) => contactSchema.parse(input))
  .handler(async ({ data }): Promise<ContactResult> => {
    let ip = "unknown";
    try {
      ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
    } catch {
      /* no request context (build/prerender) */
    }

    // 1) Honeypot filled or form submitted implausibly fast → bot.
    if (data.honeypot.trim() !== "" || data.elapsedMs < LIMIT.minFillMs) {
      logBlocked(data.honeypot.trim() ? "honeypot" : "too_fast", ip, {
        elapsedMs: data.elapsedMs,
        subject: data.subject.slice(0, 60),
      });
      return { ok: false, reason: "spam", message: "This message looked automated and was blocked." };
    }

    // 2) Per-IP sliding window + cooldown between sends.
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < LIMIT.windowMs);
    const last = recent[recent.length - 1];

    if (last && now - last < LIMIT.cooldownMs) {
      const wait = Math.ceil((LIMIT.cooldownMs - (now - last)) / 1000);
      logBlocked("cooldown", ip, { waitSeconds: wait });
      return { ok: false, reason: "rate_limit", message: `Please wait ${wait}s before sending again.` };
    }
    if (recent.length >= LIMIT.max) {
      logBlocked("rate_limit", ip, { count: recent.length });
      return {
        ok: false,
        reason: "rate_limit",
        message: "You've reached the message limit. Please email or WhatsApp me directly.",
      };
    }

    recent.push(now);
    hits.set(ip, recent);
    console.info(`[contact:accepted] ${JSON.stringify({ ip, subject: data.subject.slice(0, 60) })}`);
    return { ok: true };
  });
