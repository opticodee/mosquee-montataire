import { MapPin, Mail, Navigation, Facebook, Twitter, Youtube, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ContactCard } from "@/components/contact/ContactCard";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contactez la Mosquée de Montataire. Adresse : 147 bis rue Louis Blanc, 60160 Montataire. Formulaire de contact, itinéraire et réseaux sociaux.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nous joindre"
        title="Contact"
        description="Vous pouvez nous contacter directement via le formulaire, par email ou en venant nous voir à la mosquée."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <Section background="cream" spacing="lg">
        <div className="grid w-full max-w-full gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Coordonnées */}
          <div className="w-full min-w-0 space-y-5">
            <div className="w-full rounded-3xl bg-white p-6 shadow-soft border border-primary-100 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-xl bg-primary-50 p-3 text-primary-500">
                  <MapPin className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wider text-ink-muted font-semibold">
                    Adresse
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-primary-700 break-words">
                    {siteConfig.address.line1}
                  </p>
                  <p className="text-ink-muted break-words">
                    {siteConfig.address.postalCode} {siteConfig.address.city},{" "}
                    {siteConfig.address.country}
                  </p>
                  <Button
                    href={siteConfig.externalLinks.googleMaps}
                    external
                    variant="primary"
                    size="sm"
                    className="mt-4"
                  >
                    <Navigation className="h-4 w-4" aria-hidden="true" />
                    Itinéraire
                  </Button>
                </div>
              </div>
            </div>

            {siteConfig.contact.email && (
              <div className="w-full rounded-3xl bg-white p-6 shadow-soft border border-primary-100 sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-xl bg-primary-50 p-3 text-primary-500">
                    <Mail className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wider text-ink-muted font-semibold">
                      Email
                    </p>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="mt-1 inline-block font-display text-lg font-bold text-primary-700 hover:underline break-all"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            )}

            <div className="w-full rounded-3xl bg-white p-6 shadow-soft border border-primary-100 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-xl bg-primary-50 p-3 text-primary-500">
                  <Clock className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wider text-ink-muted font-semibold">
                    Horaires de la mosquée
                  </p>
                  <p className="mt-1 text-ink leading-relaxed">
                    La mosquée est ouverte pour les cinq prières quotidiennes
                    et la Jumu&apos;a.
                  </p>
                  <Button
                    href="/horaires"
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                  >
                    Voir les horaires
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full rounded-3xl bg-primary-700 p-6 text-cream shadow-soft sm:p-7">
              <p className="text-xs uppercase tracking-wider text-cream/70 font-semibold">
                Réseaux sociaux
              </p>
              <p className="mt-1 font-display text-lg font-bold">
                Suivez-nous
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={siteConfig.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gold hover:text-primary-900"
                >
                  <Facebook className="h-4 w-4" aria-hidden="true" />
                  Facebook
                </a>
                <a
                  href={siteConfig.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gold hover:text-primary-900"
                >
                  <Twitter className="h-4 w-4" aria-hidden="true" />
                  Twitter
                </a>
                <a
                  href={siteConfig.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gold hover:text-primary-900"
                >
                  <Youtube className="h-4 w-4" aria-hidden="true" />
                  YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Encart contact email */}
          <div className="w-full min-w-0">
            <ContactCard />
          </div>
        </div>
      </Section>

      {/* Carte */}
      <Section background="white" spacing="lg">
        <SectionHeading
          eyebrow="Localisation"
          title="Venez nous rendre visite"
          align="center"
        />
        <div className="mt-10 overflow-hidden rounded-3xl border border-primary-100 shadow-elevated">
          <iframe
            title="Carte de la mosquée de Montataire"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${siteConfig.coordinates.longitude - 0.008},${siteConfig.coordinates.latitude - 0.005},${siteConfig.coordinates.longitude + 0.008},${siteConfig.coordinates.latitude + 0.005}&layer=mapnik&marker=${siteConfig.coordinates.latitude},${siteConfig.coordinates.longitude}`}
            className="aspect-[16/9] w-full"
            loading="lazy"
          />
        </div>
      </Section>
    </>
  );
}
