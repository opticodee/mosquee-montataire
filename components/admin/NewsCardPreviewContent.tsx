"use client";

import { cn } from "@/lib/utils";

type Values = Record<string, string | boolean>;

export function NewsCardPreviewContent({ values }: { values: Values }) {
  const enabled = Boolean(values.enabled);
  const title = String(values.title ?? "");
  const html = String(values.html ?? "");

  if (!enabled) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-ink-muted/30 bg-cream/50 p-8 text-center">
        <p className="text-base text-ink-muted">
          🔇 Cette carte est désactivée. Elle ne s&apos;affichera pas sur le
          site.
        </p>
      </div>
    );
  }
  if (!html.trim()) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-ink-muted/30 bg-cream/50 p-8 text-center">
        <p className="text-base text-ink-muted">
          ✏️ Renseignez du contenu HTML pour voir l&apos;aperçu.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-3 text-xs text-ink-muted">
        Voici à quoi ressemblera la carte sur la page d&apos;accueil :
      </p>
      {/* Reproduction fidèle d'une carte de components/home/NewsSection.tsx */}
      <article className="rounded-2xl border border-primary-100 bg-white p-6 shadow-soft">
        {title.trim() && (
          <h3 className="font-display text-xl font-bold text-primary-700">
            {title}
          </h3>
        )}
        <div
          className={cn(
            "news-content text-ink-muted leading-relaxed",
            title.trim() && "mt-3",
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </div>
  );
}
