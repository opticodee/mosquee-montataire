import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales du site internet de la Mosquée de Montataire (ACMDM).",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Informations"
        title="Mentions légales"
        breadcrumbs={[{ label: "Mentions légales" }]}
      />

      <Section background="white" spacing="lg" size="md">
        <article className="prose prose-lg max-w-none text-ink">
          <h2 className="font-display text-2xl font-bold text-primary-700 mt-0">
            Éditeur du site
          </h2>
          <p>
            Ce site est édité par l&apos;<strong>{siteConfig.legalName}</strong>{" "}
            (ACMDM), association régie par la loi du 1er juillet 1901 et le
            décret du 16 août 1901.
          </p>
          <ul>
            <li>
              <strong>Adresse :</strong> {siteConfig.address.line1},{" "}
              {siteConfig.address.postalCode} {siteConfig.address.city},{" "}
              {siteConfig.address.country}
            </li>
            {siteConfig.contact.email && (
              <li>
                <strong>Email :</strong>{" "}
                <a href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              </li>
            )}
            <li>
              <strong>Année de fondation :</strong>{" "}
              {siteConfig.history.foundedYear}
            </li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-primary-700 mt-10">
            Directeur de la publication
          </h2>
          <p>
            Le directeur de la publication est le président de l&apos;ACMDM.
            Pour toute demande d&apos;information, vous pouvez nous écrire via
            la page <a href="/contact">contact</a>.
          </p>

          <h2 className="font-display text-2xl font-bold text-primary-700 mt-10">
            Hébergement
          </h2>
          <p>
            Le site est hébergé par un prestataire d&apos;hébergement web. Pour
            toute information complémentaire concernant l&apos;hébergeur, merci
            de nous contacter.
          </p>

          <h2 className="font-display text-2xl font-bold text-primary-700 mt-10">
            Propriété intellectuelle
          </h2>
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, images,
            logos, vidéos, audios) est la propriété de l&apos;ACMDM ou de ses
            partenaires. Toute reproduction, représentation, modification,
            publication, transmission ou exploitation non autorisée est
            interdite.
          </p>

          <h2 className="font-display text-2xl font-bold text-primary-700 mt-10">
            Liens externes
          </h2>
          <p>
            Le site contient des liens vers des plateformes externes
            (GoCardless, HelloAsso, Cotizup, Masjidbox, YouTube, Spotify, Apple
            Music, Google Play, App Store). L&apos;ACMDM n&apos;est pas
            responsable du contenu de ces sites tiers, dont la consultation est
            soumise aux conditions d&apos;utilisation propres à chaque
            plateforme.
          </p>

          <h2 className="font-display text-2xl font-bold text-primary-700 mt-10">
            Dons
          </h2>
          <p>
            Les dons effectués sur ce site transitent par des plateformes
            sécurisées tierces (GoCardless pour les dons mensuels, HelloAsso et
            Cotizup pour les dons ponctuels). L&apos;ACMDM ne stocke jamais vos
            données bancaires directement.
          </p>

          <h2 className="font-display text-2xl font-bold text-primary-700 mt-10">
            Contact
          </h2>
          <p>
            Pour toute question relative à ces mentions légales, vous pouvez
            nous contacter via la page <a href="/contact">contact</a>.
          </p>
        </article>
      </Section>
    </>
  );
}
