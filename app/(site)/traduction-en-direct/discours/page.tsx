import { Headphones, Info } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/ui/CTASection";
import { MixlrPlayer } from "@/components/translation/MixlrPlayer";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Traduction Discours en direct",
  description:
    "Suivez en direct la traduction française des discours du vendredi soir et du dimanche soir, via le lecteur Mixlr de la mosquée.",
  path: "/traduction-en-direct/discours",
});

export default function DiscoursTraductionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Vendredi & Dimanche soir"
        title="Traduction Discours"
        description="Suivez la traduction française des discours du vendredi soir et du dimanche soir en direct."
        breadcrumbs={[
          { label: "Traduction en direct", href: "/traduction-en-direct" },
          { label: "Discours" },
        ]}
      />

      <Section background="cream" spacing="lg">
        <div className="mx-auto max-w-4xl">
          {/* Rappel écouteurs */}
          <div className="mb-8 rounded-2xl border border-primary-200 bg-primary-50 p-5">
            <div className="flex items-start gap-3">
              <Headphones
                className="mt-0.5 h-5 w-5 shrink-0 text-primary-500"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold text-primary-700">
                  N&apos;oubliez pas vos écouteurs 🎧
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  Pour une meilleure expérience et pour ne pas déranger autour
                  de vous, utilisez des écouteurs.
                </p>
              </div>
            </div>
          </div>

          {/* Lecteur Mixlr en grand */}
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-elevated border border-primary-100">
            <SectionHeading
              eyebrow="Diffusion en direct"
              title="Lecteur Mixlr"
              align="center"
            />
            <div className="mt-6">
              <MixlrPlayer />
            </div>
            <p className="mt-4 text-xs text-ink-muted text-center">
              Le lecteur diffuse automatiquement quand une session est en cours.
              Si rien ne joue, cela signifie qu&apos;il n&apos;y a pas de
              session active actuellement.
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-white p-5 shadow-soft border border-primary-100">
            <div className="flex items-start gap-3">
              <Info
                className="mt-0.5 h-5 w-5 shrink-0 text-primary-500"
                aria-hidden="true"
              />
              <div className="text-sm text-ink-muted leading-relaxed">
                <p className="font-semibold text-primary-700 mb-1">
                  Quand suivre la traduction ?
                </p>
                <p>
                  Les sessions de traduction ont lieu chaque{" "}
                  <strong>vendredi soir</strong> et{" "}
                  <strong>dimanche soir</strong>, après les prières
                  correspondantes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <CTASection
        title="Suivre les Jumu'a en direct"
        description="La traduction de la khoutbah du vendredi est aussi disponible en direct."
        primary={{
          label: "Traduction Jumu'a",
          href: "/traduction-en-direct/jumua",
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
