import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/ui/CTASection";
import { FAQ } from "@/components/ui/FAQ";
import { DonationGrid } from "@/components/donations/DonationGrid";
import { DonationReassurance } from "@/components/donations/DonationReassurance";
import { DonationImpact } from "@/components/donations/DonationImpact";
import { monthlyDonations, donationFAQ } from "@/config/donations";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Dons mensuels",
  description:
    "Soutenez la Mosquée de Montataire chaque mois. Mandat SEPA sécurisé via GoCardless, à partir de 10 € par mois. Confirmation par email, résiliable à tout moment.",
  path: "/dons-mensuels",
});

export default function DonsMensuelsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Faire un don régulier"
        title="Soutenir sa mosquée chaque mois"
        description="Un don régulier, même modeste, permet d'assurer les dépenses essentielles de la mosquée et de préserver ses services pour toute la communauté."
        breadcrumbs={[{ label: "Dons mensuels" }]}
      />

      <Section background="cream" spacing="lg">
        <SectionHeading
          eyebrow="Choisissez votre montant"
          title="Soutenez la mosquée chaque mois"
          description="À partir de 10 €/mois. Choisissez le montant qui correspond à vos moyens — tous les dons sont précieux, qu'Allah récompense votre générosité."
          align="center"
        />
        <div className="mt-12">
          <DonationGrid donations={monthlyDonations} type="monthly" />
        </div>
      </Section>

      <Section background="white" spacing="md">
        <div className="mx-auto max-w-3xl rounded-3xl bg-cream p-8 sm:p-10 shadow-soft border-l-4 border-gold">
          <p className="font-display text-xl sm:text-2xl text-primary-700 leading-relaxed">
            « Netflix, fast-food, abonnements… on trouve toujours 10 €. Mais
            pour la mosquée, on trouve souvent une excuse. Il est temps
            d&apos;investir dans ce qui te suivra demain. »
          </p>
        </div>
      </Section>

      <Section background="cream" spacing="lg">
        <SectionHeading
          eyebrow="Pourquoi donner chaque mois ?"
          title="La mosquée ne vit que par vos dons"
          description="La Mosquée de Montataire ne reçoit aucune subvention de l'État. Elle n'a aucune entrée d'argent en dehors de la générosité des fidèles. Vos dons servent directement à faire vivre la mosquée au quotidien."
        />
        <div className="mt-12">
          <DonationImpact />
        </div>
      </Section>

      <Section background="white" spacing="lg">
        <SectionHeading
          eyebrow="En toute confiance"
          title="Un système simple et sécurisé"
          align="center"
        />
        <div className="mt-10">
          <DonationReassurance />
        </div>
      </Section>

      <Section background="cream" spacing="lg">
        <SectionHeading
          eyebrow="Questions fréquentes"
          title="Tout savoir sur les dons mensuels"
          align="center"
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FAQ items={donationFAQ} />
        </div>
      </Section>

      <CTASection
        title="Un autre type de don vous intéresse ?"
        description="Vous pouvez aussi faire un don ponctuel ou contribuer au projet éducatif du lycée."
        primary={{
          label: "Faire un don ponctuel",
          href: "/dons-ponctuels",
          variant: "gold",
        }}
        secondary={{
          label: "Découvrir le projet lycée",
          href: "/projet-lycee",
        }}
      />
    </>
  );
}
