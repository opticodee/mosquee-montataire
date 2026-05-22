import { Languages, Headphones, Info, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/ui/CTASection";
import { getJumuaStream } from "@/lib/supabase";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Traduction en direct",
  description:
    "Suivez la traduction française en direct des Jumu'a et discours de la Mosquée de Montataire directement depuis votre téléphone.",
  path: "/traduction-en-direct",
});

// Lien externe conservé pour la carte discours du soir
const translationLinks = {
  discours:
    "https://mosquee-montataire.fr/pages/traduction-discours-vendredi-soir-et-dimanche-soir",
};

export default async function TraductionPage() {
  const stream = await getJumuaStream();
  const jumuaLive = stream.enabled && stream.token.trim().length > 0;

  return (
    <>
      <PageHeader
        eyebrow="📱 Traduction en direct"
        title="Traduction française en direct"
        description="Suivez la traduction des Jumu'a et discours en français, directement depuis votre téléphone. Une oreillette suffit pour ne rien manquer."
        breadcrumbs={[{ label: "Traduction en direct" }]}
      />

      <Section background="cream" spacing="lg">
        <div className="mx-auto max-w-4xl">
          {/* Info usage */}
          <div className="rounded-2xl border border-primary-200 bg-primary-50 p-5">
            <div className="flex items-start gap-3">
              <Info
                className="mt-0.5 h-5 w-5 shrink-0 text-primary-500"
                aria-hidden="true"
              />
              <div className="text-sm text-ink-muted leading-relaxed">
                <p className="font-semibold text-primary-700 mb-1">
                  N&apos;oubliez pas vos écouteurs 🎧
                </p>
                <p>
                  Pour la traduction de Jumu&apos;a, cliquez sur la carte bleue.
                  Pour la traduction des discours du vendredi et dimanche soir,
                  cliquez sur la carte verte.
                </p>
              </div>
            </div>
          </div>

          {/* Deux cartes de traduction */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* Jumua */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 to-primary-900 p-8 text-cream shadow-elevated transition-transform hover:-translate-y-1">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-10 pattern-arabesque pointer-events-none"
              />
              <div className="relative">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant="gold">Vendredi</Badge>
                  {jumuaLive && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                      En direct
                    </span>
                  )}
                </div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/20 text-gold-light">
                  <Languages className="h-7 w-7" aria-hidden="true" />
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold">
                  Traduction Jumu&apos;a
                </h2>
                <p className="mt-2 text-cream/85 leading-relaxed">
                  Suivez la traduction française de la khoutbah du vendredi en
                  direct depuis votre téléphone.
                </p>
                <Button
                  href="/traduction-en-direct/jumua"
                  variant="white"
                  size="lg"
                  fullWidth
                  className="mt-6"
                >
                  <Headphones className="h-5 w-5" aria-hidden="true" />
                  Accéder à la traduction
                </Button>
              </div>
            </div>

            {/* Discours */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold to-gold-dark p-8 text-white shadow-elevated transition-transform hover:-translate-y-1">
              <div className="relative">
                <Badge
                  variant="outline"
                  className="mb-4 !border-white/40 !text-white !bg-white/10"
                >
                  Vendredi & Dimanche soir
                </Badge>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white">
                  <Languages className="h-7 w-7" aria-hidden="true" />
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold">
                  Traduction Discours
                </h2>
                <p className="mt-2 text-white/90 leading-relaxed">
                  Suivez la traduction française des discours du vendredi soir
                  et du dimanche soir en direct.
                </p>
                <Button
                  href={translationLinks.discours}
                  external
                  variant="white"
                  size="lg"
                  fullWidth
                  className="mt-6"
                >
                  <Headphones className="h-5 w-5" aria-hidden="true" />
                  Accéder à la traduction
                  <ExternalLink className="h-4 w-4 opacity-70" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section background="white" spacing="lg">
        <SectionHeading
          eyebrow="Comment ça marche ?"
          title="Suivre la traduction en 3 étapes"
          align="center"
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Connectez-vous",
              description:
                "Cliquez sur la carte correspondant à la session (Jumu'a ou discours).",
            },
            {
              step: "2",
              title: "Branchez vos écouteurs",
              description:
                "Utilisez vos écouteurs pour profiter d'une expérience optimale et silencieuse.",
            },
            {
              step: "3",
              title: "Suivez en direct",
              description:
                "La traduction française défile en temps réel. Un léger délai est possible pour garantir la qualité.",
            },
          ].map((step) => (
            <div
              key={step.step}
              className="rounded-2xl border border-primary-100 bg-white p-6 text-center shadow-soft"
            >
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold font-display text-xl font-bold">
                {step.step}
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-primary-700">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        title="Pas de session en cours ?"
        description="Consultez les replays des Jumu'a et discours passés pour ne rien manquer."
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
