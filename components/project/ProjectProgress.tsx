import { Target, Users, Calendar } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { projectDonation } from "@/config/donations";
import { formatEuros } from "@/lib/utils";

export function ProjectProgress() {
  return (
    <Section background="cream" spacing="lg">
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-7 shadow-soft">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
            <Target className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="mt-4 text-xs uppercase tracking-wider text-ink-muted font-semibold">
            Objectif à atteindre
          </p>
          <p className="mt-1 font-display text-4xl font-bold text-primary-700">
            {projectDonation.goalLabel}
          </p>
          <p className="mt-2 text-sm text-ink-muted">
            Une somme importante, mais atteignable lorsque toute une communauté
            se mobilise.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-7 shadow-soft">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
            <Users className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="mt-4 text-xs uppercase tracking-wider text-ink-muted font-semibold">
            La règle du{" "}
            {projectDonation.targetParticipants.toLocaleString("fr-FR")} ×{" "}
            {projectDonation.targetPerParticipant} €
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-primary-700">
            {projectDonation.targetParticipants.toLocaleString("fr-FR")} dons
            de {formatEuros(projectDonation.targetPerParticipant)}
          </p>
          <p className="mt-2 text-sm text-ink-muted">
            Si {projectDonation.targetParticipants.toLocaleString("fr-FR")}{" "}
            personnes donnent {projectDonation.targetPerParticipant} €, le
            projet est financé immédiatement.
          </p>
        </div>

        <div className="rounded-3xl bg-primary-700 p-7 text-cream shadow-soft">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/20 text-gold-light">
            <Calendar className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="mt-4 text-xs uppercase tracking-wider text-cream/70 font-semibold">
            Paiement sur 12 mois
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-gold-light">
            {projectDonation.monthlyEquivalent.toFixed(2).replace(".", ",")} € / mois
          </p>
          <p className="mt-2 text-sm text-cream/80">
            Une solution plus accessible pour participer concrètement, sans
            devoir tout donner en une seule fois.
          </p>
        </div>
      </div>
    </Section>
  );
}
