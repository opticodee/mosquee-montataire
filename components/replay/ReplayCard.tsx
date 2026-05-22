import { PlayCircle, Calendar, Languages } from "lucide-react";
import { formatDateFr } from "@/lib/utils";
import type { Replay } from "@/config/replay";
import { youtubeChannelUrl } from "@/config/replay";

type ReplayCardProps = {
  replay: Replay;
};

const categoryLabels: Record<Replay["category"], string> = {
  jumua: "Jumu'a",
  discours: "Discours",
  conference: "Conférence",
  ramadan: "Ramadan",
};

const languageLabels: Record<Replay["language"], string> = {
  fr: "Français",
  ar: "Arabe",
  "fr-ar": "Bilingue",
};

export function ReplayCard({ replay }: ReplayCardProps) {
  const href = replay.externalUrl
    ? replay.externalUrl
    : replay.youtubeId
      ? `https://youtube.com/watch?v=${replay.youtubeId}`
      : youtubeChannelUrl;

  const thumbnailUrl = replay.youtubeId
    ? `https://i.ytimg.com/vi/${replay.youtubeId}/hqdefault.jpg`
    : null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
    >
      {/* Thumbnail / placeholder */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary-700 to-primary-900">
        {thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnailUrl}
            alt={`Miniature de ${replay.title}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-20 pattern-arabesque pointer-events-none"
          />
        )}

        {/* Overlay play */}
        <div className="absolute inset-0 flex items-center justify-center bg-primary-900/40 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold shadow-2xl">
            <PlayCircle
              className="h-9 w-9 text-white"
              fill="currentColor"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Badge catégorie */}
        <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-700 shadow-soft">
          {categoryLabels[replay.category]}
        </span>

        {/* Durée */}
        {replay.duration && (
          <span className="absolute right-3 bottom-3 rounded-md bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
            {replay.duration}
          </span>
        )}
      </div>

      {/* Métadonnées */}
      <div className="p-5">
        <h3 className="font-display text-base font-bold text-primary-700 line-clamp-2">
          {replay.title}
        </h3>
        {replay.description && (
          <p className="mt-1 text-sm text-ink-muted line-clamp-2">
            {replay.description}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            {formatDateFr(replay.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Languages className="h-3.5 w-3.5" aria-hidden="true" />
            {languageLabels[replay.language]}
          </span>
        </div>
      </div>
    </a>
  );
}
