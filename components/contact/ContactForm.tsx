"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const subjects = [
  "Question générale",
  "Dons",
  "École / enseignement",
  "Traduction en direct",
  "Association",
  "Autre",
];

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(form: HTMLFormElement): Record<string, string> {
    const data = new FormData(form);
    const e: Record<string, string> = {};
    if (!(data.get("name") as string)?.trim()) {
      e.name = "Veuillez indiquer votre nom.";
    }
    const email = (data.get("email") as string)?.trim();
    if (!email) {
      e.email = "Veuillez indiquer votre email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = "Adresse email invalide.";
    }
    if (!(data.get("subject") as string)) {
      e.subject = "Veuillez choisir un sujet.";
    }
    const message = (data.get("message") as string)?.trim();
    if (!message) {
      e.message = "Veuillez écrire votre message.";
    } else if (message.length < 10) {
      e.message = "Votre message est trop court (10 caractères minimum).";
    }
    return e;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const subject = String(data.get("subject") ?? "");
    const message = String(data.get("message") ?? "");

    const mailSubject = `[Site Mosquée] ${subject}`;
    const mailBody =
      `De : ${name}\n` +
      `Email : ${email}\n` +
      (phone ? `Téléphone : ${phone}\n` : "") +
      `\n---\n\n${message}`;

    const mailto = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    window.location.href = mailto;
    setState("success");
    form.reset();
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl bg-primary-50 border border-primary-200 p-8 text-center">
        <CheckCircle
          className="mx-auto h-12 w-12 text-primary-500"
          aria-hidden="true"
        />
        <h3 className="mt-4 font-display text-xl font-bold text-primary-700">
          Message bien reçu
        </h3>
        <p className="mt-2 text-ink-muted">
          Merci pour votre message. La mosquée vous répondra dans les meilleurs
          délais.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-5 inline-flex items-center gap-2 rounded-lg border-2 border-primary-200 px-4 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-100"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-3xl bg-white p-6 sm:p-8 shadow-soft border border-primary-100"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="name"
          label="Nom complet"
          required
          error={errors.name}
          placeholder="Mohammed Ali"
        />
        <Field
          name="email"
          label="Email"
          type="email"
          required
          error={errors.email}
          placeholder="exemple@email.com"
        />
      </div>

      <Field
        name="phone"
        label="Téléphone (optionnel)"
        type="tel"
        placeholder="06 12 34 56 78"
      />

      <div>
        <label
          htmlFor="subject"
          className="mb-1.5 block text-sm font-semibold text-primary-700"
        >
          Sujet <span className="text-gold">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          defaultValue=""
          required
          className={cn(
            "w-full rounded-xl border-2 bg-white px-4 py-2.5 text-base text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/40",
            errors.subject
              ? "border-red-300 focus:border-red-500"
              : "border-primary-100 focus:border-primary-500",
          )}
        >
          <option value="" disabled>
            Choisir un sujet…
          </option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-semibold text-primary-700"
        >
          Message <span className="text-gold">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Bonjour, je vous écris au sujet de…"
          className={cn(
            "w-full rounded-xl border-2 bg-white px-4 py-2.5 text-base text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/40",
            errors.message
              ? "border-red-300 focus:border-red-500"
              : "border-primary-100 focus:border-primary-500",
          )}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      {state === "error" && (
        <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            Une erreur est survenue. Merci de réessayer ou de nous écrire
            directement par email.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3.5 text-base font-semibold text-white shadow-soft transition-all hover:bg-primary-600 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-60 sm:w-auto"
      >
        {state === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Envoi en cours…
          </>
        ) : (
          <>
            <Send className="h-5 w-5" aria-hidden="true" />
            Envoyer le message
          </>
        )}
      </button>

      <p className="text-xs text-ink-muted">
        En envoyant ce message, vous acceptez que vos données soient utilisées
        uniquement pour vous répondre. Voir notre{" "}
        <a
          href="/politique-confidentialite"
          className="underline hover:text-primary-700"
        >
          politique de confidentialité
        </a>
        .
      </p>
    </form>
  );
}

type FieldProps = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
};

function Field({
  name,
  label,
  type = "text",
  required = false,
  placeholder,
  error,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-semibold text-primary-700"
      >
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-xl border-2 bg-white px-4 py-2.5 text-base text-ink transition-colors placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-primary-500/40",
          error
            ? "border-red-300 focus:border-red-500"
            : "border-primary-100 focus:border-primary-500",
        )}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
