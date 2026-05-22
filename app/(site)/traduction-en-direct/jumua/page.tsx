import { ArrowLeft, Headphones, RadioTower } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/ui/CTASection";
import { OneStreamPlayer } from "@/components/translation/OneStreamPlayer";
import { getJumuaStream } from "@/lib/supabase";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Traduction Jumu'a en direct",
  description:
    "Suivez en direct la traduction française de la khoutbah du vendredi à la Mosquée de Montataire.",
  path: "/traduction-en-direct/jumua",
});

export default async function JumuaTranslationPage() {
  const stream = await getJumuaStream();
  const isLive = stream.enabled && stream.token.trim().length > 0;

  return (
    <>
      <PageHeader
        eyebrow={isLive ? "🔴 Vendredi" : "Vendredi"}
        title="Traduction Jumu'a"
        description={
          stream.date ||
          "Suivez la traduction française de la khoutbah du vendredi."
        }
        breadcrumbs={[
          { label: "Traduction en direct", href: "/traduction-en-direct" },
          { label: "Jumu'a" },
        ]}
      />

      <Section background="cream" spacing="lg">
        <div className="mx-auto max-w-4xl">
          {/* Encart écouteurs */}
          <div className="rounded-2xl border border-primary-200 bg-primary-50 p-5">
            <div className="flex items-start gap-3">
              <Headphones
                className="mt-0.5 h-5 w-5 shrink-0 text-primary-500"
                aria-hidden="true"
              />
              <div className="text-sm text-ink-muted leading-relaxed">
                <p className="mb-1 font-semibold text-primary-700">
                  N&apos;oubliez pas vos écouteurs 🎧
                </p>
                <p>
                  Pour une expérience optimale et silencieuse pendant la
                  khoutbah, utilisez vos écouteurs.
                </p>
              </div>
            </div>
          </div>

          {isLive ? (
            <div className="mt-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-700">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
                  En direct
                </span>
                {stream.date && (
                  <span className="text-sm text-ink-muted">{stream.date}</span>
                )}
              </div>

              <OneStreamPlayer
                token={stream.token}
                title="Traduction Jumu'a en direct"
              />

              <p className="mt-4 text-center text-sm text-ink-muted">
                Si le lecteur ne s&apos;affiche pas, rafraîchissez la page.
              </p>
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-primary-100 bg-white p-10 text-center shadow-soft">
              <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-500">
                <RadioTower className="h-7 w-7" aria-hidden="true" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold text-primary-700">
                Pas de session en cours
              </h2>
              <p className="mt-2 text-ink-muted leading-relaxed">
                La traduction de la prochaine Jumu&apos;a sera disponible ici.
              </p>
              <Button
                href="/traduction-en-direct"
                variant="outline"
                size="md"
                className="mt-6"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Retour à la traduction en direct
              </Button>
            </div>
          )}
        </div>
      </Section>

      <CTASection
        title="En attendant la prochaine session"
        description="Retrouvez les replays des Jumu'a passées et consultez les horaires des prières."
        primary={{
          label: "Voir les replays",
          href: "/replay",
          variant: "gold",
        }}
        secondary={{
          label: "Voir les horaires",
          href: "/horaires",
        }}
      />
    </>
  );
}
