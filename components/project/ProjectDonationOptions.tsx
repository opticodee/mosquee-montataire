import { Heart, Calendar, Share2, ExternalLink, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { projectDonation } from "@/config/donations";
import { formatEuros } from "@/lib/utils";

export function ProjectDonationOptions() {
  return (
    <Section background="cream" spacing="lg">
      <SectionHeading
        eyebrow="Comment participer ?"
        title="Choisissez la formule qui vous convient"
        description="Vous pouvez participer en une seule fois ou en plusieurs fois, selon vos moyens. Chaque contribution compte."
        align="center"
      />

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
        {/* Option 1 - en 1 fois */}
        <div className="relative overflow-hidden rounded-3xl border-2 border-gold bg-white p-8 shadow-elevated">
          <span className="absolute right-6 top-6 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Le plus rapide
          </span>
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
            <Heart className="h-6 w-6" aria-hidden="true" />
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold text-primary-700">
            En 1 seule fois
          </h3>
          <p className="mt-2 text-ink-muted leading-relaxed">
            Donnez en une seule fois via la cagnotte Cotizup. Idéal pour
            participer immédiatement au projet.
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-start gap-2 text-ink">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-gold" />
              Don libre, montant à choisir
            </li>
            <li className="flex items-start gap-2 text-ink">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-gold" />
              Paiement sécurisé par CB
            </li>
            <li className="flex items-start gap-2 text-ink">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-gold" />
              Suivi de la cagnotte en direct
            </li>
          </ul>
          <Button
            href={projectDonation.oneTimeUrl}
            external
            variant="gold"
            size="lg"
            fullWidth
            className="mt-7"
          >
            <Heart className="h-5 w-5" aria-hidden="true" />
            Participer en 1 fois
            <ExternalLink className="h-4 w-4 opacity-70" aria-hidden="true" />
          </Button>
        </div>

        {/* Option 2 - en plusieurs fois */}
        <div className="rounded-3xl border-2 border-primary-100 bg-white p-8 shadow-soft">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
            <Calendar className="h-6 w-6" aria-hidden="true" />
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold text-primary-700">
            En plusieurs fois
          </h3>
          <p className="mt-2 text-ink-muted leading-relaxed">
            Répartissez votre engagement sur 12 mois pour participer
            concrètement sans tout donner en une seule fois.
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-start gap-2 text-ink">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary-500" />
              Engagement sur 12 mois
            </li>
            <li className="flex items-start gap-2 text-ink">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary-500" />
              Effort réparti et accessible
            </li>
            <li className="flex items-start gap-2 text-ink">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary-500" />
              Formulaire simple à remplir
            </li>
          </ul>
          <Button
            href={projectDonation.installmentUrl}
            external
            variant="primary"
            size="lg"
            fullWidth
            className="mt-7"
          >
            <Calendar className="h-5 w-5" aria-hidden="true" />
            Participer en plusieurs fois
          </Button>
        </div>
      </div>

      {/* Exemples de paiement échelonné */}
      <div className="mx-auto mt-14 max-w-5xl">
        <h3 className="text-center font-display text-2xl font-bold text-primary-700 sm:text-3xl">
          Exemples de paiement en plusieurs fois
        </h3>
        <p className="mt-2 text-center text-ink-muted">
          Voici quelques exemples concrets d&apos;engagements possibles.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projectDonation.installmentExamples.map((example) => (
            <div
              key={example.total}
              className="rounded-2xl border border-primary-100 bg-white p-6 text-center shadow-soft"
            >
              <p className="font-display text-3xl font-bold text-primary-700">
                {formatEuros(example.total)}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-ink-muted font-semibold">
                au total
              </p>
              <div className="my-4 h-px bg-primary-100" />
              <p className="font-display text-xl font-bold text-gold-dark">
                {example.monthly.toFixed(2).replace(".", ",")} €
              </p>
              <p className="text-sm text-ink-muted">
                / mois sur {example.months} mois
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 mx-auto max-w-3xl rounded-3xl bg-primary-700 p-7 text-cream text-center shadow-soft">
        <Share2 className="mx-auto h-8 w-8 text-gold-light" aria-hidden="true" />
        <h3 className="mt-3 font-display text-xl font-bold">
          Partager le projet est aussi un don
        </h3>
        <p className="mt-2 text-cream/85">
          Si vous ne pouvez pas donner aujourd&apos;hui, partagez la cagnotte
          autour de vous. Chaque partage peut faire la différence.
        </p>
        <a
          href={projectDonation.oneTimeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 font-semibold text-gold-light hover:text-gold underline-offset-2 hover:underline"
        >
          Voir la cagnotte
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </Section>
  );
}
