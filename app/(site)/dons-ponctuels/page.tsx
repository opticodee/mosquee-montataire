import { Heart, ExternalLink, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/ui/CTASection";
import { FAQ } from "@/components/ui/FAQ";
import { Button } from "@/components/ui/Button";
import { DonationReassurance } from "@/components/donations/DonationReassurance";
import { oneTimeDonation, donationFAQ } from "@/config/donations";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Dons ponctuels",
  description:
    "Faites un don ponctuel à la Mosquée de Montataire via HelloAsso. Paiement sécurisé, reçu fiscal et confirmation immédiate par email.",
  path: "/dons-ponctuels",
});

export default function DonsPonctuelsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Don ponctuel"
        title="Un don unique pour soutenir la mosquée"
        description="Faites un don ponctuel selon vos moyens. Chaque contribution, qu'elle soit petite ou grande, fait avancer la mosquée."
        breadcrumbs={[{ label: "Dons ponctuels" }]}
      />

      <Section background="cream" spacing="lg">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 sm:p-12 shadow-elevated">
          <div className="text-center">
            <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold">
              <Heart className="h-7 w-7" aria-hidden="true" />
            </div>
            <h2 className="font-display text-2xl font-bold text-primary-700 sm:text-3xl">
              Don ponctuel via HelloAsso
            </h2>
            <p className="mt-3 text-ink-muted max-w-2xl mx-auto">
              Les dons ponctuels sont gérés via la plateforme HelloAsso, leader
              français de la collecte associative. Vous choisissez librement le
              montant que vous souhaitez donner.
            </p>

            {/* Montants suggérés */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {oneTimeDonation.suggestedAmounts.map((amount) => (
                <a
                  key={amount}
                  href={oneTimeDonation.helloAssoFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-primary-100 bg-white px-5 py-2.5 font-display text-lg font-bold text-primary-700 transition-all hover:border-gold hover:bg-gold/5 hover:shadow-soft"
                >
                  {amount} €
                </a>
              ))}
              <a
                href={oneTimeDonation.helloAssoFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-xl border-2 border-dashed border-primary-200 px-5 py-2.5 font-medium text-primary-700 transition-all hover:border-primary-500 hover:bg-primary-50"
              >
                Autre montant
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-10">
              <Button
                href={oneTimeDonation.helloAssoFormUrl}
                external
                variant="gold"
                size="lg"
              >
                <Heart className="h-5 w-5" aria-hidden="true" />
                Faire un don ponctuel
                <ExternalLink className="h-4 w-4 opacity-70" aria-hidden="true" />
              </Button>
              <p className="mt-3 text-xs text-ink-muted">
                Vous serez redirigé vers la plateforme sécurisée HelloAsso.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section background="white" spacing="lg">
        <SectionHeading
          eyebrow="En toute confiance"
          title="Un don simple et sécurisé"
          align="center"
        />
        <div className="mt-10">
          <DonationReassurance />
        </div>
      </Section>

      <Section background="cream" spacing="lg">
        <SectionHeading
          eyebrow="Questions fréquentes"
          title="À propos des dons ponctuels"
          align="center"
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FAQ
            items={[
              {
                question: "Quelle plateforme est utilisée ?",
                answer:
                  "Les dons ponctuels sont collectés via HelloAsso, plateforme française reconnue et certifiée, spécialisée dans le financement des associations.",
              },
              {
                question: "Vais-je recevoir un reçu ?",
                answer:
                  "Oui. Après votre don, HelloAsso vous adresse automatiquement un email de confirmation et, le cas échéant, un reçu pour vos démarches.",
              },
              ...donationFAQ.filter((q) => !q.question.includes("mensuel")),
            ]}
          />
        </div>
      </Section>

      <CTASection
        title="Préférez-vous un soutien régulier ?"
        description="Les dons mensuels permettent à la mosquée de couvrir durablement ses charges. À partir de 10 € par mois."
        primary={{
          label: "Voir les dons mensuels",
          href: "/dons-mensuels",
          variant: "gold",
        }}
        secondary={{
          label: "Projet lycée",
          href: "/projet-lycee",
        }}
      />
    </>
  );
}
