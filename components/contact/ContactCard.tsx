import { Mail, Send, MessageCircle, Phone, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";

export function ContactCard() {
  const email = siteConfig.contact.email;
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent("[Site Mosquée] ")}`;

  return (
    <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-elevated border border-primary-100">
      <p className="text-xs font-bold uppercase tracking-wider text-primary-500">
        Nous contacter
      </p>
      <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-primary-700 leading-tight">
        Envoyez-nous un email
      </h2>
      <p className="mt-4 text-ink-muted leading-relaxed">
        Pour toute question, demande d&apos;information, ou suggestion,
        écrivez-nous directement par email. Nous vous répondrons dans les
        meilleurs délais, in shâ Allah.
      </p>

      {/* Adresse email mise en avant */}
      <div className="mt-8 flex items-center gap-4 rounded-2xl bg-cream p-5 border border-primary-100">
        <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-700 text-cream shadow-soft">
          <Mail className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Adresse email
          </p>
          <p className="mt-1 font-display text-lg sm:text-xl font-bold text-primary-700 break-all">
            {email}
          </p>
        </div>
      </div>

      {/* CTA principal */}
      <div className="mt-6">
        <a
          href={mailtoUrl}
          className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-primary-700 px-6 py-4 font-semibold text-cream shadow-elevated transition-all hover:bg-primary-600 hover:-translate-y-0.5"
        >
          <Send
            className="h-5 w-5 group-hover:translate-x-0.5 transition-transform"
            aria-hidden="true"
          />
          Écrire un email
        </a>
      </div>

      {/* Mini-guide en bas */}
      <div className="mt-8 pt-6 border-t border-primary-100">
        <p className="text-xs font-bold uppercase tracking-wider text-primary-500 mb-3">
          Comment ça marche ?
        </p>
        <ul className="space-y-2 text-sm text-ink-muted">
          <li className="flex items-start gap-2">
            <MessageCircle
              className="mt-0.5 h-4 w-4 shrink-0 text-primary-500"
              aria-hidden="true"
            />
            <span>
              Cliquez sur <strong>Écrire un email</strong> ci-dessus
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Mail
              className="mt-0.5 h-4 w-4 shrink-0 text-primary-500"
              aria-hidden="true"
            />
            <span>
              Votre application de messagerie s&apos;ouvre avec notre adresse
              pré-remplie
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Clock
              className="mt-0.5 h-4 w-4 shrink-0 text-primary-500"
              aria-hidden="true"
            />
            <span>
              Rédigez votre message et envoyez — nous répondrons rapidement
            </span>
          </li>
        </ul>
      </div>

      {/* Réponse rapide info */}
      <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gold/10 p-4 border border-gold/30">
        <Phone
          className="h-5 w-5 shrink-0 text-gold-dark"
          aria-hidden="true"
        />
        <p className="text-sm text-ink leading-relaxed">
          <strong>Urgence ?</strong> Pour les questions urgentes, rendez-vous
          directement sur place aux horaires d&apos;ouverture de la mosquée.
        </p>
      </div>
    </div>
  );
}
