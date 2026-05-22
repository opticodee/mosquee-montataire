import { GraduationCap, Sparkles, Heart, Users, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { projectDonation } from "@/config/donations";

export function ProjectHighlight() {
  return (
    <Section background="white" spacing="lg">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 p-8 sm:p-12 lg:p-16 text-cream shadow-elevated">
        {/* Décor */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-10 pattern-arabesque pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(201,162,39,0.5) 0%, transparent 70%)",
          }}
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <Badge variant="gold" className="mb-4">
              <Sparkles className="mr-1 h-3 w-3" aria-hidden="true" />
              Projet éducatif Ramadan 2026
            </Badge>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Construisons ensemble{" "}
              <span className="text-gold-light">
                l&apos;avenir de nos enfants
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-cream/85">
              Aujourd&apos;hui, la Mosquée de Montataire porte un projet
              essentiel : l&apos;agrandissement du collège et l&apos;ouverture
              du lycée. Un investissement concret pour l&apos;éducation,
              l&apos;équilibre et l&apos;identité de nos jeunes.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href={projectDonation.oneTimeUrl}
                external
                variant="gold"
                size="lg"
              >
                <Heart className="h-5 w-5" aria-hidden="true" />
                Participer en 1 fois
              </Button>
              <Button
                href="/projet-lycee"
                variant="outline"
                size="lg"
                className="!border-cream/40 !text-cream hover:!bg-cream hover:!text-primary-700"
              >
                Découvrir le projet
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Carte stats */}
          <div className="rounded-2xl border border-cream/10 bg-white/[0.04] p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gold/20 p-2.5">
                <GraduationCap
                  className="h-5 w-5 text-gold-light"
                  aria-hidden="true"
                />
              </div>
              <p className="text-sm uppercase tracking-wider text-cream/70 font-semibold">
                Objectif
              </p>
            </div>
            <p className="mt-3 font-display text-4xl font-bold text-gold-light sm:text-5xl">
              {projectDonation.goalLabel}
            </p>
            <p className="mt-2 text-sm text-cream/75">
              {projectDonation.targetParticipants.toLocaleString("fr-FR")}{" "}
              personnes donnant{" "}
              {projectDonation.targetPerParticipant} € = projet financé.
            </p>

            <div className="mt-6 rounded-xl border border-cream/10 bg-primary-900/50 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-cream/70 font-semibold">
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                Solution accessible
              </div>
              <p className="mt-2 text-base text-cream">
                <span className="font-display text-2xl font-bold text-gold-light">
                  {projectDonation.monthlyEquivalent.toFixed(2).replace(".", ",")} €
                </span>
                <span className="ml-1 text-sm text-cream/75">
                  / mois pendant {projectDonation.durationMonths} mois
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
