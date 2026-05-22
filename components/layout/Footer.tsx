import Link from "next/link";
import { Facebook, Twitter, Youtube, MapPin, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "@/components/ui/Container";
import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-cream relative overflow-hidden">
      {/* Décor */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20 pattern-arabesque pointer-events-none"
      />
      <Container className="relative py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Branding + adresse */}
          <div className="lg:col-span-2">
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/80">
              {siteConfig.legalName}
            </p>
            <address className="mt-3 not-italic">
              <div className="flex items-start gap-2.5 text-sm text-cream/85">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold-light"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold">{siteConfig.address.line1}</p>
                  <p>
                    {siteConfig.address.postalCode} {siteConfig.address.city}
                  </p>
                </div>
              </div>
              {siteConfig.contact.email && (
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="mt-3 flex items-center gap-2.5 text-sm text-cream/85 hover:text-gold-light"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.contact.email}
                </a>
              )}
            </address>

            <div className="mt-6 flex items-center gap-2">
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mosquée de Montataire sur Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-gold hover:text-primary-900"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mosquée de Montataire sur Twitter / X"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-gold hover:text-primary-900"
              >
                <Twitter className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mosquée de Montataire sur YouTube"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-gold hover:text-primary-900"
              >
                <Youtube className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Colonnes de navigation */}
          {Object.values(footerNavigation).map((column) => (
            <div key={column.title}>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-gold-light">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-cream/80 transition-colors hover:text-cream hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bandeau bas */}
        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-cream/60">
            © {currentYear} {siteConfig.legalName}. Tous droits réservés.
          </p>
          <p className="text-xs text-cream/60">
            Site refait avec ♥ pour la communauté.
          </p>
        </div>
      </Container>
    </footer>
  );
}
