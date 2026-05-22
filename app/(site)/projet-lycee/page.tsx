import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/ui/CTASection";
import { FAQ } from "@/components/ui/FAQ";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectProgress } from "@/components/project/ProjectProgress";
import { ProjectWhySection } from "@/components/project/ProjectWhySection";
import { ProjectDonationOptions } from "@/components/project/ProjectDonationOptions";
import { projectDonation } from "@/config/donations";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projet lycée — Projet Ramadan 2026",
  description:
    "Projet d'agrandissement du collège et d'ouverture du lycée à Montataire. Objectif : 500 000 €. Participez en une fois ou en plusieurs fois pour bâtir l'avenir éducatif de nos enfants.",
  path: "/projet-lycee",
});

export default function ProjetLyceePage() {
  return (
    <>
      <ProjectHero />

      <Section background="white" spacing="lg">
        <div className="mx-auto max-w-3xl">
          <p className="font-display text-xl text-primary-700 leading-relaxed">
            Aujourd&apos;hui, la Mosquée de Montataire porte un projet
            essentiel pour notre communauté :{" "}
            <strong>
              l&apos;agrandissement du collège et l&apos;ouverture du lycée
            </strong>
            .
          </p>
          <div className="mt-6 space-y-4 text-ink leading-relaxed">
            <p>
              Ce projet n&apos;est pas un simple chantier. C&apos;est un
              investissement concret pour l&apos;avenir de nos enfants, pour
              leur éducation, leur équilibre, leur réussite et leur identité.
              C&apos;est l&apos;occasion d&apos;offrir à nos jeunes un cadre
              sain, sérieux et protecteur, dans lequel ils pourront apprendre,
              grandir et s&apos;épanouir.
            </p>
            <p>
              C&apos;est aussi un projet particulièrement important pour nos
              filles et nos sœurs, qui pourront poursuivre leurs études dans un
              environnement où elles se sentiront respectées, à l&apos;aise et
              pleinement libres de vivre leur pudeur et leur voile sans
              pression ni gêne.
            </p>
            <p>
              Ce projet a besoin de nous tous. Pas demain.{" "}
              <strong>Maintenant.</strong> Chaque participation compte. Chaque
              partage compte. Chaque don nous rapproche de l&apos;ouverture
              d&apos;un établissement qui profitera à toute une génération.
            </p>
          </div>
        </div>
      </Section>

      <ProjectProgress />
      <ProjectWhySection />
      <ProjectDonationOptions />

      <Section background="white" spacing="lg">
        <SectionHeading
          eyebrow="Questions fréquentes"
          title="Tout savoir sur le projet"
          align="center"
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FAQ
            items={[
              {
                question: "Pourquoi ce projet est-il essentiel ?",
                answer:
                  "Il permet d'offrir à nos enfants un cadre éducatif complet, alliant excellence académique et préservation de leur identité religieuse, dans un environnement bienveillant et serein.",
              },
              {
                question: "Où ira mon argent ?",
                answer:
                  "L'intégralité des fonds collectés est destinée à financer l'agrandissement du collège et l'ouverture du lycée : travaux, équipements, aménagements pédagogiques.",
              },
              {
                question: "Peut-on donner en plusieurs fois ?",
                answer: `Oui. Vous pouvez répartir votre engagement sur ${projectDonation.durationMonths} mois. Par exemple, ${projectDonation.targetPerParticipant} € deviennent ${projectDonation.monthlyEquivalent.toFixed(2).replace(".", ",")} €/mois pendant ${projectDonation.durationMonths} mois.`,
              },
              {
                question: "Comment partager le projet ?",
                answer:
                  "Partagez le lien de la cagnotte Cotizup ou la page du projet sur vos réseaux sociaux et auprès de vos proches. Chaque partage peut générer un nouveau don.",
              },
              {
                question: "Comment suivre l'avancement ?",
                answer:
                  "La cagnotte Cotizup affiche en temps réel le montant collecté. La mosquée communiquera également les étapes du projet sur ses réseaux sociaux et lors des annonces du vendredi.",
              },
              {
                question: "Le don est-il sécurisé ?",
                answer:
                  "Oui. Les dons en une fois passent par Cotizup, plateforme sécurisée certifiée. Les engagements échelonnés passent par un formulaire Tally suivi par l'association.",
              },
            ]}
          />
        </div>
      </Section>

      <CTASection
        title="Ensemble, construisons un héritage"
        description="Offrir à nos enfants un environnement éducatif à la hauteur de leurs ambitions, et bâtir un héritage dont toute la communauté sera fière."
        primary={{
          label: "Participer maintenant",
          href: projectDonation.oneTimeUrl,
          variant: "gold",
          external: true,
        }}
        secondary={{
          label: "Soutenir la mosquée chaque mois",
          href: "/dons-mensuels",
        }}
      />
    </>
  );
}
