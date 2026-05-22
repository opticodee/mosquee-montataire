import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et de gestion des données personnelles du site de la Mosquée de Montataire.",
  path: "/politique-confidentialite",
});

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <PageHeader
        eyebrow="Vos données"
        title="Politique de confidentialité"
        breadcrumbs={[{ label: "Politique de confidentialité" }]}
      />

      <Section background="white" spacing="lg" size="md">
        <article className="prose prose-lg max-w-none text-ink">
          <h2 className="font-display text-2xl font-bold text-primary-700 mt-0">
            Préambule
          </h2>
          <p>
            La présente politique a pour objectif de vous informer sur la
            manière dont l&apos;<strong>{siteConfig.legalName}</strong> (ACMDM)
            traite vos données personnelles dans le cadre de l&apos;utilisation
            de son site internet.
          </p>

          <h2 className="font-display text-2xl font-bold text-primary-700 mt-10">
            Données collectées
          </h2>
          <p>
            Nous collectons uniquement les données strictement nécessaires aux
            services demandés :
          </p>
          <ul>
            <li>
              <strong>Formulaire de contact :</strong> nom, email, téléphone
              (optionnel), sujet et message.
            </li>
            <li>
              <strong>Dons :</strong> les données bancaires et personnelles
              sont collectées par les plateformes tierces (GoCardless,
              HelloAsso, Cotizup) et ne transitent jamais directement par notre
              site.
            </li>
            <li>
              <strong>Statistiques :</strong> nous pouvons utiliser des outils
              d&apos;analyse anonymisés afin de comprendre l&apos;usage du site
              et l&apos;améliorer.
            </li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-primary-700 mt-10">
            Finalités du traitement
          </h2>
          <p>Vos données sont utilisées uniquement pour :</p>
          <ul>
            <li>Répondre à vos demandes de contact ;</li>
            <li>Traiter vos dons via les plateformes partenaires ;</li>
            <li>
              Vous informer (uniquement avec votre consentement explicite) des
              actualités de la mosquée ;
            </li>
            <li>Améliorer le fonctionnement et la sécurité du site.</li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-primary-700 mt-10">
            Conservation
          </h2>
          <p>
            Les données issues du formulaire de contact sont conservées le
            temps nécessaire au traitement de votre demande et au maximum 3 ans
            après le dernier contact. Les données bancaires liées aux dons sont
            conservées par les plateformes partenaires selon leurs propres
            conditions.
          </p>

          <h2 className="font-display text-2xl font-bold text-primary-700 mt-10">
            Partage des données
          </h2>
          <p>
            Vos données ne sont jamais vendues, louées ou cédées à des tiers.
            Elles peuvent être communiquées uniquement à nos prestataires
            (plateformes de dons) et dans les cas prévus par la loi.
          </p>

          <h2 className="font-display text-2xl font-bold text-primary-700 mt-10">
            Vos droits
          </h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données
            (RGPD) et à la loi « Informatique et Libertés », vous disposez des
            droits suivants :
          </p>
          <ul>
            <li>Droit d&apos;accès à vos données ;</li>
            <li>Droit de rectification ;</li>
            <li>Droit à l&apos;effacement (« droit à l&apos;oubli ») ;</li>
            <li>Droit à la limitation du traitement ;</li>
            <li>Droit à la portabilité ;</li>
            <li>Droit d&apos;opposition.</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous via la page{" "}
            <a href="/contact">contact</a>.
          </p>

          <h2 className="font-display text-2xl font-bold text-primary-700 mt-10">
            Cookies
          </h2>
          <p>
            Ce site n&apos;utilise pas de cookies de traçage publicitaire.
            Seuls les cookies strictement nécessaires au fonctionnement du site
            peuvent être déposés.
          </p>

          <h2 className="font-display text-2xl font-bold text-primary-700 mt-10">
            Contact
          </h2>
          <p>
            Pour toute question relative à cette politique ou à vos données,
            écrivez-nous via la page <a href="/contact">contact</a>.
          </p>
        </article>
      </Section>
    </>
  );
}
