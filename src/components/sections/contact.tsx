import { motion } from "framer-motion";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { z } from "zod";

import { Reveal, StaggerGroup, fadeUp, slideRight } from "@/components/motion/reveal";
import { submitContact, contactFormSchema, } from "@/lib/contact.functions";
import { Section } from "@/components/section";
import { SITE } from "@/lib/site-data";
import { cn } from "@/lib/utils";


type ContactValues = z.infer<typeof contactFormSchema>;
type FieldErrors = Partial<Record<keyof ContactValues, string>>;

const EMPTY: ContactValues = { name: "", email: "", subject: "", message: "" };

const CHANNELS = [
  { label: "Phone", value: SITE.phone, href: SITE.phoneHref, Icon: Phone },
  {
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}?subject=${encodeURIComponent("Project Inquiry")}&body=${encodeURIComponent(
      `Hi Prashant,

I came across your portfolio and would like to discuss a project/opportunity with you.

Looking forward to hearing from you.

Thanks!`
    )}`,
    Icon: Mail,
  },
  {
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    href: `${SITE.whatsapp}?text=${encodeURIComponent(
      "Hi Prashant, I came across your portfolio and would like to discuss a project/opportunity with you."
    )}`,
    Icon: FaWhatsapp,
  },
];

const SOCIALS = [
  { label: "GitHub", href: SITE.github, Icon: FaGithub },
  { label: "LinkedIn", href: SITE.linkedin, Icon: FaLinkedinIn },
  { label: "Instagram", href: SITE.instagram, Icon: FaInstagram },
];

const fieldClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

// Client-side spam guards: max 3 sends per rolling window, 30s between sends.
const RATE_LIMIT = { max: 3, windowMs: 10 * 60_000, cooldownMs: 30_000 };
const RATE_KEY = "contact-submits";

/** Reads recent submit timestamps from localStorage, dropping expired ones. */
const recentSubmits = (): number[] => {
  try {
    const raw = JSON.parse(localStorage.getItem(RATE_KEY) ?? "[]");
    const now = Date.now();
    return Array.isArray(raw)
      ? raw.filter((t: unknown) => typeof t === "number" && now - t < RATE_LIMIT.windowMs)
      : [];
  } catch {
    return [];
  }
};

const MAX_LENGTH = {
  name: 30,
  email: 80,
  subject: 30,
  message: 500,
} as const;

export function Contact() {
  const sendContact = useServerFn(submitContact);
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  // Honeypot: real users never see or fill this field.
  const [honeypot, setHoneypot] = useState("");
  // Bots submit almost instantly — track when the form was first rendered.
  const mountedAt = useRef(Date.now());

  const update = (key: keyof ContactValues, value: string) => {
    if (key === "name") {
      value = value.replace(/^\s+/, "");
    }

    if (key === "email") {
      value = value.trimStart();
    }

    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  /** SweetAlert2 themed to match the current light/dark palette. */
  const alert = async (opts: {
    icon: "success" | "error";
    title: string;
    text: string;
    confirmButtonText: string;
  }) => {
    const Swal = (await import("sweetalert2")).default;
    const isDark = document.documentElement.classList.contains("dark");
    await Swal.fire({
      ...opts,
      background: isDark ? "#1c2331" : "#ffffff",
      color: isDark ? "#f2f4f8" : "#1b2130",
      confirmButtonColor: "#2f62d8",
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Honeypot / too-fast checks now happen server-side so attempts get logged.

    // 2) Rate limit: cap sends per window and enforce a short cooldown.
    const history = recentSubmits();
    const last = history[history.length - 1];
    if (last && Date.now() - last < RATE_LIMIT.cooldownMs) {
      const wait = Math.ceil((RATE_LIMIT.cooldownMs - (Date.now() - last)) / 1000);
      await alert({
        icon: "error",
        title: "Slow down a moment",
        text: `Please wait ${wait} second${wait === 1 ? "" : "s"} before sending another message.`,
        confirmButtonText: "Okay",
      });
      return;
    }
    if (history.length >= RATE_LIMIT.max) {
      await alert({
        icon: "error",
        title: "Too many messages",
        text: "You've reached the limit of 3 messages. Please email or WhatsApp me directly and I'll reply there.",
        confirmButtonText: "Close",
      });
      return;
    }

    const parsed = contactFormSchema.safeParse(values);

    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactValues;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      await alert({
        icon: "error",
        title: "Check the form",
        text: "A few fields need fixing before the message can be sent.",
        confirmButtonText: "Got it",
      });
      return;
    }

    setSubmitting(true);
    try {
      // Server verifies honeypot + timing and enforces its own per-IP rate limit,
      // logging every blocked attempt so spam patterns are visible in server logs.
      const result = await sendContact({
        data: { ...parsed.data, honeypot, elapsedMs: Date.now() - mountedAt.current },
      });
      if (!result.ok) {
        await alert({
          icon: "error",
          title: result.reason === "rate_limit" ? "Too many messages" : "Submission blocked",
          text: result.message ?? "Your message could not be sent. Please try WhatsApp or email.",
          confirmButtonText: "Close",
        });
        return;
      }
      // Record the successful send for the client-side rate limiter.
      try {
        localStorage.setItem(RATE_KEY, JSON.stringify([...history, Date.now()]));
      } catch {
        /* storage unavailable — skip rate tracking */
      }
      await alert({
        icon: "success",
        title: "Message sent",
        text: `Thanks ${parsed.data.name}, I'll get back to you within 24 hours.`,
        confirmButtonText: "Great",
      });
      setValues(EMPTY);

    } catch {
      await alert({
        icon: "error",
        title: "Message not sent",
        text: "Something went wrong while sending. Please try again, or reach me directly on WhatsApp or email.",
        confirmButtonText: "Close",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something"
      description="Have a role, a project or an idea? Send a message or reach out directly — I reply quickly."
      className="bg-surface/60"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <StaggerGroup className="flex flex-col gap-4" gap={0.08}>
          {CHANNELS.map(({ label, value, href, Icon }) => (
            <motion.a
              key={label}
              href={href}
              title={`${label}: ${value}`}
              aria-label={`${label}: ${value}`}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-primary/45 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {label}
                </span>
                <span className="block truncate text-sm font-medium">{value}</span>
              </span>
            </motion.a>
          ))}

          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-border bg-card p-5 shadow-soft"
          >
            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
              {SITE.location}
            </p>
            <ul className="mt-4 flex items-center gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${label} profile (opens in a new tab)`}
                    title={label}
                    whileHover={{ y: -3, scale: 1.06 }}
                    className="grid h-11 w-11 min-h-11 min-w-11 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-primary/45 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call now
              </a>
              <a
                href={SITE.portfolio}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Portfolio
              </a>
            </div>
          </motion.div>
        </StaggerGroup>

        <Reveal variants={slideRight}>
          <form
            onSubmit={onSubmit}
            noValidate
            aria-label="Contact Prashant Nadar"
            aria-busy={submitting}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
          >
            {/* Honeypot — hidden from users and assistive tech, bots fill it. */}
            <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="company-website">Company website (leave blank)</label>
              <input
                id="company-website"
                name="company-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                id="name"
                label="Name"
                value={values.name}
                error={errors.name}
                autoCapitalize="words"
                onChange={(v) => update("name", v)}
                placeholder="John Doe"
                autoComplete="name"
              />
              <Field
                id="email"
                label="Email"
                type="email"
                inputMode="email"
                spellCheck={false}
                autoCapitalize="none"
                value={values.email}
                error={errors.email}
                onChange={(v) => update("email", v)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div className="mt-5">
              <Field
                id="subject"
                label="Subject"
                value={values.subject}
                error={errors.subject}
                onChange={(v) => update("subject", v)}
                placeholder="Website Development Project"
                autoComplete="off"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                maxLength={500}
                required
                autoComplete="off"
                aria-label="Message"
                aria-required="true"
                spellCheck={true}
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                placeholder="Describe your project, requirement, or inquiry..."
                className={cn(fieldClass, "resize-y", errors.message && "border-destructive")}
              />
              {errors.message ? (
                <p
                  id="message-error"
                  role="alert"
                  className="mt-2 text-xs font-medium text-destructive"
                >
                  {errors.message}
                </p>
              ) : null}
            </div>

            <motion.button
              type="submit"
              disabled={submitting}
              title="Send your message"
              aria-label={submitting ? "Sending your message" : "Send your message"}
              whileHover={{ y: submitting ? 0 : -3 }}
              whileTap={{ scale: submitting ? 1 : 0.97 }}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:w-auto"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="h-4 w-4" aria-hidden="true" />
              )}
              {submitting ? "Sending…" : "Send message"}
            </motion.button>
          </form>
        </Reveal>
      </div>
    </Section >
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  autoCapitalize,
  inputMode,
  spellCheck,
}:{
  id: keyof typeof MAX_LENGTH;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  type?: "text" | "email";
  inputMode?: "text" | "email" | "search" | "tel" | "url" | "numeric" | "decimal";
  autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters";
  spellCheck?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        maxLength={MAX_LENGTH[id]}
        required
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
        inputMode={inputMode}
        spellCheck={spellCheck}
        aria-required="true"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldClass, error && "border-destructive")}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}