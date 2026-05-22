import { Youtube, ExternalLink } from "lucide-react";
import { youtubePlaylists } from "@/config/replay";
import { cn } from "@/lib/utils";

export function YoutubePlaylists() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {youtubePlaylists.map((playlist) => (
        <a
          key={playlist.id}
          href={playlist.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-4 rounded-2xl border border-primary-100 bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated hover:border-primary-300"
        >
          <div
            className={cn(
              "shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-soft",
              playlist.accent === "gold" ? "bg-gold" : "bg-primary-700",
            )}
          >
            <Youtube className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-base font-bold text-primary-700 line-clamp-1">
                {playlist.title}
              </h3>
              <ExternalLink
                className="h-3.5 w-3.5 text-ink-muted group-hover:text-primary-700"
                aria-hidden="true"
              />
            </div>
            {playlist.description && (
              <p className="mt-1 text-sm text-ink-muted line-clamp-2">
                {playlist.description}
              </p>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
