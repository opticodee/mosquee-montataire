import { Heart, ShieldCheck, RotateCcw, Mail, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { monthlyDonations } from "@/config/donations";

export function MonthlyDonationHighlight() {
  // Sélection des 4 montants les plus courants pour la home
  const featured = monthlyDonations.filter((d) =>
    [10, 15, 20, 25].includes(d.amount),
  );

  return (
    <Section background="cream" spacing="lg">
      <SectionHeading
        eyebrow="Soutenir la mosquée"
        title="Même 10 € par mois peuvent changer beaucoup"
        description="La mosquée ne reçoit aucune subvention de l'État. Elle vit uniquement grâce à la générosité des fidèles. Vos dons mensuels permettent d'assurer durablement les charges essentielles."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((donation) => (
          <a
            key={donation.amount}
            href={donation.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col rounded-2xl border-2 border-primary-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-elevated"
          >
            {donation.badge === "popular" && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white whitespace-nowrap shadow-md">
                Le plus choisi
              </span>
            )}
            <p className="font-display text-4xl font-bold text-primary-700">
              {donation.amount} €
            </p>
            <p className="mt-1 text-sm text-ink-muted">par mois</p>
            <p className="mt-3 text-sm text-ink leading-relaxed flex-1">
              {donation.impact}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 group-hover:gap-2.5 transition-all">
              Donner ce montant
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4">
        <Button href="/dons-mensuels" variant="primary" size="lg">
          <Heart className="h-5 w-5" aria-hidden="true" />
          Voir tous les montants
        </Button>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck
              className="h-4 w-4 text-primary-500"
              aria-hidden="true"
            />
            Mandat SEPA sécurisé
          </span>
          <span className="inline-flex items-center gap-1.5">
            <RotateCcw
              className="h-4 w-4 text-primary-500"
              aria-hidden="true"
            />
            Modifiable à tout moment
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Mail
              className="h-4 w-4 text-primary-500"
              aria-hidden="true"
            />
            Confirmation par email
          </span>
        </div>
      </div>
    </Section>
  );
}
