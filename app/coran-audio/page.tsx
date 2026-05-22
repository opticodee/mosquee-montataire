import { Headphones, Youtube, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/ui/CTASection";
import { quranReciter, quranPlatforms, quranTracks } from "@/config/quran";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Coran audio",
  description:
    "Écoutez le Coran récité par Sheikh Hassan El Montasser, Imam de la Mosquée de Montataire. Disponible sur YouTube, Spotify et Apple Music.",
  path: "/coran-audio",
});

export default function CoranAudioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Récitations"
        title="Coran audio"
        description="Écoutez les récitations du Coran par l'Imam de la Mosquée de Montataire, accessibles sur vos plateformes audio préférées."
        breadcrumbs={[{ label: "Coran audio" }]}
      />

      <Section background="cream" spacing="lg">
        <div className="mx-auto max-w-4xl">
          {/* Bloc Imam */}
          <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-elevated border-l-4 border-gold">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                <Headphones className="h-9 w-9" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gold-dark font-semibold">
                  {quranReciter.title}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold text-primary-700 sm:text-3xl">
                  {quranReciter.name}
                </h2>
                <p className="mt-3 text-ink-muted leading-relaxed">
                  {quranReciter.description}
                </p>
              </div>
            </div>
          </div>

          {/* Plateformes */}
          <div className="mt-10">
            <SectionHeading
              title="Disponible sur vos plateformes préférées"
              align="center"
            />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {quranPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border-2 border-primary-100 bg-white p-6 text-center transition-all hover:-translate-y-1 hover:shadow-elevated hover:border-primary-300"
                >
                  <div
                    className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-soft"
                    style={{ backgroundColor: platform.color }}
                  >
                    {platform.name === "YouTube" && (
                      <Youtube className="h-6 w-6" aria-hidden="true" />
                    )}
                    {platform.name === "Spotify" && (
                      <SpotifyIcon className="h-6 w-6" />
                    )}
                    {platform.name === "Apple Music" && (
                      <AppleMusicIcon className="h-6 w-6" />
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-primary-700">
                    {platform.name}
                  </h3>
                  <p className="mt-1 text-sm text-ink-muted">
                    {platform.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 group-hover:gap-2.5 transition-all">
                    Écouter
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section background="white" spacing="lg">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Playlist complète"
            title="Écoutez sur YouTube"
            description="La playlist YouTube regroupe l'ensemble des récitations disponibles publiquement."
            align="center"
          />

          {quranTracks.length > 0 ? (
            <div className="mt-10 space-y-3">
              {quranTracks.map((track) => (
                <a
                  key={track.id}
                  href={track.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-primary-100 bg-white p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                    <Headphones className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-base font-semibold text-primary-700 truncate">
                      {track.title}
                    </p>
                    {track.description && (
                      <p className="text-sm text-ink-muted truncate">
                        {track.description}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl bg-cream p-10 text-center">
              <Youtube
                className="mx-auto h-10 w-10 text-primary-300"
                aria-hidden="true"
              />
              <p className="mt-4 max-w-md mx-auto text-ink-muted">
                L&apos;ensemble des récitations est regroupé dans une playlist
                YouTube complète. Cliquez ci-dessous pour y accéder.
              </p>
              <Button
                href={quranPlatforms[0].url}
                external
                variant="primary"
                size="lg"
                className="mt-6"
              >
                <Youtube className="h-5 w-5" aria-hidden="true" />
                Voir la playlist complète
              </Button>
            </div>
          )}
        </div>
      </Section>

      <CTASection
        title="Suivre la mosquée"
        description="Téléchargez l'application ACMDM pour le verset du jour, les horaires de prière et bien plus encore."
        primary={{
          label: "Télécharger l'application",
          href: "/application",
          variant: "gold",
        }}
        secondary={{
          label: "Voir les replays",
          href: "/replay",
        }}
      />
    </>
  );
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.58 14.42c-.18.3-.57.4-.87.21-2.39-1.46-5.4-1.79-8.94-.98-.34.08-.69-.14-.77-.48-.08-.34.14-.69.48-.77 3.88-.89 7.21-.51 9.9 1.13.3.18.4.58.2.89zm1.22-2.7c-.23.37-.71.49-1.08.26-2.74-1.68-6.92-2.17-10.16-1.19-.42.12-.86-.11-.99-.53-.12-.42.11-.86.53-.99 3.71-1.12 8.32-.58 11.48 1.36.36.22.49.71.22 1.09zm.11-2.81C14.65 9.04 9.29 8.84 6.13 9.78c-.5.15-1.03-.13-1.18-.63-.15-.5.13-1.03.63-1.18 3.62-1.1 9.55-.88 13.32 1.39.45.27.6.85.33 1.3-.27.45-.85.6-1.32.32z" />
    </svg>
  );
}

function AppleMusicIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22.78 7.91c0-.59 0-1.17-.04-1.76-.03-.5-.08-1.01-.18-1.5a4.7 4.7 0 0 0-.46-1.45 4.85 4.85 0 0 0-2.13-2.13 4.7 4.7 0 0 0-1.45-.46c-.49-.1-1-.15-1.5-.18-.59-.04-1.17-.04-1.76-.04H8.74c-.59 0-1.17 0-1.76.04-.5.03-1.01.08-1.5.18a4.7 4.7 0 0 0-1.45.46 4.85 4.85 0 0 0-2.13 2.13 4.7 4.7 0 0 0-.46 1.45c-.1.49-.15 1-.18 1.5-.04.59-.04 1.17-.04 1.76v8.18c0 .59 0 1.17.04 1.76.03.5.08 1.01.18 1.5.09.49.25.97.46 1.45a4.85 4.85 0 0 0 2.13 2.13c.48.21.96.37 1.45.46.49.1 1 .15 1.5.18.59.04 1.17.04 1.76.04h6.52c.59 0 1.17 0 1.76-.04.5-.03 1.01-.08 1.5-.18a4.7 4.7 0 0 0 1.45-.46 4.85 4.85 0 0 0 2.13-2.13c.21-.48.37-.96.46-1.45.1-.49.15-1 .18-1.5.04-.59.04-1.17.04-1.76V7.91zm-5.31 6.46c0 .81-.04 1.4-.44 1.96-.46.66-1.2.94-1.85 1-.55.05-1.05-.04-1.43-.27-.6-.36-.9-1.02-.9-1.66 0-.92.6-1.66 1.65-1.9.34-.08.7-.13.96-.16l.86-.1c.13-.02.22.04.22.18v.95zm-1.6-3.5l-3.45.7v6.13c0 .81-.04 1.4-.44 1.96-.46.66-1.2.94-1.85 1-.55.05-1.05-.04-1.43-.27-.6-.36-.9-1.02-.9-1.66 0-.92.6-1.66 1.65-1.9.34-.08.7-.13.96-.16l.86-.1c.13-.02.22-.13.22-.27V7.45c0-.34.18-.5.5-.57l5.7-1.15c.3-.06.55.1.55.45v4.65c0 .14-.1.27-.22.3l-1.95.4-.2-.66z" />
    </svg>
  );
}
