import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { Resend } from "resend";
import { z } from "zod";

import { SITE } from "@/lib/site-data";

const resend = new Resend(process.env.RESEND_API_KEY);

/* -------------------------------------------------------------------------- */
/*                                Validation                                  */
/* -------------------------------------------------------------------------- */

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name cannot exceed 30 characters")
    .regex(
      /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
      "Name can only contain letters, spaces, apostrophes, and hyphens",
    ),

  email: z.string().trim().email("Enter a valid email address").max(254, "Email is too long"),

  subject: z
    .string()
    .trim()
    .min(10, "Subject must be at least 10 characters")
    .max(80, "Subject cannot exceed 80 characters"),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message cannot exceed 500 characters"),
});

/** Shared schema (client + server) */
export const contactSchema = contactFormSchema.extend({
  honeypot: z.string().max(200).optional().default(""),
  elapsedMs: z.number().nonnegative().max(86_400_000).optional().default(0),
});

export type ContactInput = z.input<typeof contactSchema>;

export type ContactResult = {
  ok: boolean;
  reason?: "spam" | "rate_limit" | "invalid";
  message?: string;
};

/* -------------------------------------------------------------------------- */
/*                               Rate Limiting                                */
/* -------------------------------------------------------------------------- */

const LIMIT = {
  max: 3,
  windowMs: 10 * 60_000,
  cooldownMs: 30_000,
  minFillMs: 2500,
};

const hits = new Map<string, number[]>();

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function logBlocked(reason: string, ip: string, detail: Record<string, unknown> = {}) {
  console.warn(
    `[contact:blocked] ${JSON.stringify({
      reason,
      ip,
      at: new Date().toISOString(),
      ...detail,
    })}`,
  );
}

/* -------------------------------------------------------------------------- */
/*                               Contact Server                               */
/* -------------------------------------------------------------------------- */

export const submitContact = createServerFn({ method: "POST" })
  .validator(contactSchema)
  .handler(async ({ data }): Promise<ContactResult> => {
    let ip = "unknown";

    try {
      ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
    } catch {
      // Build / prerender
    }

    /* ---------------------------------------------------------------------- */
    /* Bot Protection                                                          */
    /* ---------------------------------------------------------------------- */

    if (data.honeypot.trim() !== "" || data.elapsedMs < LIMIT.minFillMs) {
      logBlocked(data.honeypot.trim() ? "honeypot" : "too_fast", ip, {
        elapsedMs: data.elapsedMs,
        subject: data.subject.trim().slice(0, 60),
      });

      return {
        ok: false,
        reason: "spam",
        message: "This message looked automated and was blocked.",
      };
    }

    /* ---------------------------------------------------------------------- */
    /* Rate Limiting                                                           */
    /* ---------------------------------------------------------------------- */

    const now = Date.now();

    const recent = (hits.get(ip) ?? []).filter((time) => now - time < LIMIT.windowMs);

    const last = recent.at(-1);

    if (last && now - last < LIMIT.cooldownMs) {
      const wait = Math.ceil((LIMIT.cooldownMs - (now - last)) / 1000);

      logBlocked("cooldown", ip, {
        waitSeconds: wait,
      });

      return {
        ok: false,
        reason: "rate_limit",
        message: `Please wait ${wait} second${wait === 1 ? "" : "s"} before sending another message.`,
      };
    }

    if (recent.length >= LIMIT.max) {
      logBlocked("rate_limit", ip, {
        count: recent.length,
      });

      return {
        ok: false,
        reason: "rate_limit",
        message: "You've reached the message limit. Please email or WhatsApp me directly.",
      };
    }

    recent.push(now);
    hits.set(ip, recent);

    /* ---------------------------------------------------------------------- */
    /* Escape HTML                                                             */
    /* ---------------------------------------------------------------------- */

    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeSubject = escapeHtml(data.subject);
    const safeMessage = escapeHtml(data.message);

    /* ---------------------------------------------------------------------- */
    /* Send Email                                                              */
    /* ---------------------------------------------------------------------- */

    try {
      // Send your notification and visitor auto-reply in parallel.
      const [ownerResult, userResult] = await Promise.all([
        resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: SITE.email,
          replyTo: data.email,
          subject: `Portfolio Contact: ${safeSubject}`,

          html: `
        <h2>New Portfolio Enquiry</h2>

        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>

        <hr>

        <p style="white-space:pre-wrap;">
${safeMessage}
        </p>
      `,

          text: `
New Portfolio Enquiry

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}
`,
        }),

        resend.emails.send({
          from: "Prashant Nadar <onboarding@resend.dev>",
          to: data.email,
          subject: "Thanks for contacting me!",

          html: `
<div style="max-width:600px;margin:auto;padding:20px;font-family:Arial,sans-serif;line-height:1.7;color:#333;">

  <h2 style="margin-top:0;">Hi ${safeName}, 👋</h2>

  <p>Thank you for contacting me through my portfolio website.</p>

  <p>I've successfully received your message and will review it shortly.</p>

  <p><strong>I'll get back to you within 24 hours.</strong></p>

  <hr style="margin:24px 0;">

  <h3 style="margin-bottom:12px;">While you're waiting</h3>

  <p>You can explore my recent work and pricing.</p>

  <p>
    🚀
    <a href="https://prashant-nadar.vercel.app/#projects"
       style="color:#2563eb;text-decoration:none;font-weight:600;">
      View Projects
    </a>
  </p>

  <p>
    💰
    <a href="https://prashant-nadar.vercel.app/#pricing"
       style="color:#2563eb;text-decoration:none;font-weight:600;">
      View Pricing
    </a>
  </p>

  <hr style="margin:24px 0;">

  <p><strong>Your message:</strong></p>

  <blockquote
    style="
      white-space:pre-wrap;
      margin:0;
      padding:12px;
      background:#f7f7f7;
      border-left:4px solid #2563eb;
    ">
${safeMessage}
  </blockquote>

  <br>

  <p>
    Regards,<br>
    <strong>Prashant Nadar</strong><br>
    Full Stack Developer
  </p>

</div>
`,

          text: `
Hi ${data.name},

Thank you for contacting me through my portfolio website.

I've successfully received your message and will get back to you within 24 hours.

While you're waiting:

🚀 Projects
https://prashant-nadar.vercel.app/#projects

💰 Pricing
https://prashant-nadar.vercel.app/#pricing

Your message:
${data.message}

Regards,
Prashant Nadar
Full Stack Developer
`,
        }),
      ]);

      // Your notification email must succeed.
      if (ownerResult.error) {
        console.error("Owner email error:", ownerResult.error);

        return {
          ok: false,
          message: "Unable to send your message right now. Please try again later.",
        };
      }

      // Auto-reply is optional. Log failures without blocking the form.
      if (userResult.error) {
        console.warn("Auto-reply email failed:", userResult.error);
      }

      console.info(
        `[contact:accepted] ${JSON.stringify({
          ip,
          subject: data.subject.slice(0, 60),
          ownerEmailId: ownerResult.data?.id,
          autoReplyEmailId: userResult.data?.id,
        })}`,
      );

      return { ok: true };
    } catch (error) {
      console.error("Failed to send email:", error);

      return {
        ok: false,
        message: "Unable to send your message right now. Please try again later.",
      };
    }
  });
