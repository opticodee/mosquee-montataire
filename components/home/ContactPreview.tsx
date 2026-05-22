import { MapPin, Navigation, Mail, Facebook, Twitter, Youtube } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export function ContactPreview() {
  return (
    <Section background="cream" spacing="lg">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Nous trouver"
            title="Venez nous rendre visite"
            description="La mosquée vous accueille toute l'année. Vous pouvez nous joindre par email ou venir directement sur place."
          />

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-primary-50 p-2.5">
                <MapPin
                  className="h-5 w-5 text-primary-500"
                  aria-hidden="true"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-muted font-semibold">
                  Adresse
                </p>
                <p className="mt-1 font-semibold text-primary-700">
                  {siteConfig.address.line1}
                </p>
                <p className="text-ink-muted">
                  {siteConfig.address.postalCode} {siteConfig.address.city},{" "}
                  {siteConfig.address.country}
                </p>
              </div>
            </div>

            {siteConfig.contact.email && (
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-primary-50 p-2.5">
                  <Mail
                    className="h-5 w-5 text-primary-500"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-ink-muted font-semibold">
                    Email
                  </p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="mt-1 font-semibold text-primary-700 hover:underline"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href={siteConfig.externalLinks.googleMaps}
              external
              variant="primary"
              size="md"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Itinéraire
            </Button>
            <Button href="/contact" variant="outline" size="md">
              Nous contacter
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-2">
            <span className="text-sm text-ink-muted">Suivez-nous :</span>
            <a
              href={siteConfig.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white text-primary-700 shadow-soft hover:bg-primary-700 hover:text-white transition-colors"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={siteConfig.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white text-primary-700 shadow-soft hover:bg-primary-700 hover:text-white transition-colors"
            >
              <Twitter className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={siteConfig.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white text-primary-700 shadow-soft hover:bg-primary-700 hover:text-white transition-colors"
            >
              <Youtube className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Carte OpenStreetMap embed */}
        <div className="overflow-hidden rounded-3xl border border-primary-100 bg-white shadow-elevated">
          <iframe
            title="Carte de la mosquée de Montataire"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${siteConfig.coordinates.longitude - 0.005},${siteConfig.coordinates.latitude - 0.003},${siteConfig.coordinates.longitude + 0.005},${siteConfig.coordinates.latitude + 0.003}&layer=mapnik&marker=${siteConfig.coordinates.latitude},${siteConfig.coordinates.longitude}`}
            className="aspect-[4/3] w-full"
            loading="lazy"
          />
        </div>
      </div>
    </Section>
  );
}
