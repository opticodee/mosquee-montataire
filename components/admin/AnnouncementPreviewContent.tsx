"use client";

import { ArrowRight } from "lucide-react";

type Values = Record<string, string | boolean>;

export function AnnouncementPreviewContent({ values }: { values: Values }) {
  const enabled = Boolean(values.enabled);
  const emoji = String(values.emoji ?? "");
  const message = String(values.message ?? "");
  const ctaLabel = String(values.cta_label ?? "");
  const ctaUrl = String(values.cta_url ?? "");

  if (!enabled) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-ink-muted/30 bg-cream/50 p-8 text-center">
        <p className="text-base text-ink-muted">
          🔇 Le bandeau est désactivé. Il ne s&apos;affichera pas sur le site.
        </p>
      </div>
    );
  }
  if (!message.trim()) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-ink-muted/30 bg-cream/50 p-8 text-center">
        <p className="text-base text-ink-muted">
          ✏️ Renseignez un message pour voir l&apos;aperçu.
        </p>
      </div>
    );
  }

  const hasCta = ctaLabel.trim().length > 0 && ctaUrl.trim().length > 0;

  return (
    <div>
      <p className="mb-3 text-xs text-ink-muted">
        Voici à quoi ressemblera le bandeau en haut du site :
      </p>
      {/* Reproduction fidèle de components/layout/TopAnnouncement.tsx */}
      <div className="overflow-hidden rounded-xl border border-primary-100">
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
    </div>
  );
}
