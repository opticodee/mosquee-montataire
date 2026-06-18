"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

type Initial = {
  enabled: boolean;
  emoji: string;
  message: string;
  cta_label: string;
  cta_url: string;
};

export function AnnouncementPreview({ initial }: { initial: Initial }) {
  const [enabled, setEnabled] = useState(initial.enabled);
  const [emoji, setEmoji] = useState(initial.emoji);
  const [message, setMessage] = useState(initial.message);
  const [ctaLabel, setCtaLabel] = useState(initial.cta_label);
  const [ctaUrl, setCtaUrl] = useState(initial.cta_url);

  // Écoute les changements des inputs du formulaire pour mettre à jour
  // la preview en temps réel (sans avoir à sauvegarder).
  useEffect(() => {
    function handleFormInput(e: Event) {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;
      if (!target.name) return;

      switch (target.name) {
        case "enabled":
          setEnabled((target as HTMLInputElement).checked);
          break;
        case "emoji":
          setEmoji(target.value);
          break;
        case "message":
          setMessage(target.value);
          break;
        case "cta_label":
          setCtaLabel(target.value);
          break;
        case "cta_url":
          setCtaUrl(target.value);
          break;
      }
    }

    const form = document.getElementById("announcement-form");
    if (!form) return;

    form.addEventListener("input", handleFormInput);
    form.addEventListener("change", handleFormInput);

    return () => {
      form.removeEventListener("input", handleFormInput);
      form.removeEventListener("change", handleFormInput);
    };
  }, []);

  const hasCta = ctaLabel.trim().length > 0 && ctaUrl.trim().length > 0;

  return (
    <div className="mt-6">
      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-primary-500">
        Aperçu en direct
      </p>

      {!enabled ? (
        <div className="rounded-2xl border-2 border-dashed border-ink-muted/30 bg-cream/50 p-6 text-center">
          <p className="text-sm text-ink-muted">
            🔇 Le bandeau est désactivé. Il ne s&apos;affichera pas sur le site.
          </p>
        </div>
      ) : !message.trim() ? (
        <div className="rounded-2xl border-2 border-dashed border-ink-muted/30 bg-cream/50 p-6 text-center">
          <p className="text-sm text-ink-muted">
            ✏️ Renseignez un message pour voir l&apos;aperçu du bandeau.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-primary-100 shadow-soft">
          <p className="border-b border-primary-100 bg-primary-50 px-4 py-2 text-xs text-ink-muted">
            Voici à quoi ressemblera le bandeau en haut du site :
          </p>
          {/* Reproduction fidèle de components/layout/TopAnnouncement.tsx */}
          <div className="bg-gold text-white">
            <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5 text-center text-sm">
              {emoji && (
                <span
                  className="shrink-0 text-base leading-none"
                  aria-hidden="true"
                >
                  {emoji}
                </span>
              )}
              <p className="font-medium">
                {message}{" "}
                {hasCta && (
                  <span className="inline-flex items-center gap-1 font-bold underline-offset-2 hover:underline">
                    {ctaLabel}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
