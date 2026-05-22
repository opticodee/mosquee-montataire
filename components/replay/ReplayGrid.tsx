"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  replays,
  replayCategories,
  replayLanguages,
  type ReplayCategory,
  type ReplayLanguage,
} from "@/config/replay";
import { ReplayCard } from "./ReplayCard";
import { Youtube } from "lucide-react";

export function ReplayGrid() {
  const [category, setCategory] = useState<ReplayCategory | "all">("all");
  const [language, setLanguage] = useState<ReplayLanguage | "all">("all");

  const filtered = useMemo(() => {
    return replays.filter((r) => {
      if (category !== "all" && r.category !== category) return false;
      if (language !== "all" && r.language !== language) return false;
      return true;
    });
  }, [category, language]);

  return (
    <div>
      {/* Filtres */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-ink-muted font-semibold mb-2">
            Catégorie
          </p>
          <div className="flex flex-wrap gap-2">
            {replayCategories.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setCategory(c.value)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-all",
                  category === c.value
                    ? "bg-primary-700 text-white shadow-soft"
                    : "bg-white text-ink hover:bg-primary-50 border border-primary-100",
                )}
                aria-pressed={category === c.value}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:text-right">
          <p className="text-xs uppercase tracking-wider text-ink-muted font-semibold mb-2">
            Langue
          </p>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            {replayLanguages.map((l) => (
              <button
                key={l.value}
                type="button"
                onClick={() => setLanguage(l.value)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-all",
                  language === l.value
                    ? "bg-gold text-white shadow-soft"
                    : "bg-white text-ink hover:bg-primary-50 border border-primary-100",
                )}
                aria-pressed={language === l.value}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grille */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-primary-200 bg-white p-12 text-center">
          <Youtube
            className="mx-auto h-10 w-10 text-primary-300"
            aria-hidden="true"
          />
          <p className="mt-4 font-display text-lg font-semibold text-primary-700">
            Aucun replay ne correspond à votre filtre
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            Essayez d&apos;autres critères ou consultez la chaîne YouTube
            complète.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((replay) => (
            <ReplayCard key={replay.id} replay={replay} />
          ))}
        </div>
      )}

      <p className="mt-6 text-center text-sm text-ink-muted">
        {filtered.length} replay{filtered.length > 1 ? "s" : ""} affiché
        {filtered.length > 1 ? "s" : ""}
      </p>
    </div>
  );
}
