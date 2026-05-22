import { Clock, ArrowRight, ExternalLink } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

/**
 * Aperçu horaires sur la page d'accueil.
 * Pour éviter les horaires inventés, on redirige vers Masjidbox qui
 * est la source officielle de la mosquée.
 */
export function PrayerTimesPreview() {
  const prayers = [
    { name: "Fajr", arabic: "الفجر" },
    { name: "Dhouhr", arabic: "الظهر" },
    { name: "ʿAsr", arabic: "العصر" },
    { name: "Maghrib", arabic: "المغرب" },
    { name: "ʿIshāʾ", arabic: "العشاء" },
    { name: "Jumuʿa", arabic: "الجمعة" },
  ];

  return (
    <Section background="cream" spacing="lg">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Horaires de prière"
            title="Les cinq prières quotidiennes"
            description="Retrouvez les horaires officiels actualisés par la mosquée chaque jour."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/horaires" variant="primary" size="lg">
              <Clock className="h-5 w-5" aria-hidden="true" />
              Voir tous les horaires
            </Button>
            <Button
              href={siteConfig.externalLinks.masjidbox}
              external
              variant="outline"
              size="lg"
            >
              Masjidbox
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-elevated border border-primary-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-primary-500 font-semibold">
                Horaires officiels
              </p>
              <p className="font-display text-lg font-bold text-primary-700 mt-1">
                Mosquée de Montataire
              </p>
            </div>
            <div className="rounded-xl bg-primary-50 p-2.5">
              <Clock
                className="h-5 w-5 text-primary-500"
                aria-hidden="true"
              />
            </div>
          </div>

          <ul className="divide-y divide-primary-100">
            {prayers.map((prayer) => (
              <li
                key={prayer.name}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="font-display text-base text-primary-700/70"
                  >
                    {prayer.arabic}
                  </span>
                  <span className="font-semibold text-ink">{prayer.name}</span>
                </div>
                <span className="text-sm text-ink-muted">
                  Voir sur Masjidbox
                </span>
              </li>
            ))}
          </ul>

          <a
            href={siteConfig.externalLinks.masjidbox}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 hover:text-primary-600"
          >
            Voir les horaires détaillés
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </Section>
  );
}
