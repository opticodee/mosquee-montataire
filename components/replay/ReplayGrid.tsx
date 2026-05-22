"use client";

import { useState, useMemo } from "react";
import { Youtube } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  replays,
  replayCategories,
  type ReplayCategory,
} from "@/config/replay";
import { ReplayCard } from "./ReplayCard";

export function ReplayGrid() {
  const [category, setCategory] = useState<ReplayCategory | "all">("all");

  const filtered = useMemo(() => {
    return replays.filter((r) => {
      if (category !== "all" && r.category !== category) return false;
      return true;
    });
  }, [category]);

  return (
    <div>
      {/* Filtres */}
      <div className="mb-8">
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
