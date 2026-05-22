import { Clock, ExternalLink, Smartphone, Info } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/ui/CTASection";
import { siteConfig } from "@/config/site";
import { appConfig } from "@/config/app";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Horaires de prière",
  description:
    "Consultez les horaires officiels des cinq prières quotidiennes et de la Jumu'a à la Mosquée de Montataire, mis à jour quotidiennement via Masjidbox.",
  path: "/horaires",
});

const prayers = [
  { name: "Fajr", arabic: "الفجر", description: "Prière de l'aube" },
  { name: "Dhouhr", arabic: "الظهر", description: "Prière du midi" },
  { name: "ʿAsr", arabic: "العصر", description: "Prière de l'après-midi" },
  { name: "Maghrib", arabic: "المغرب", description: "Prière du coucher du soleil" },
  { name: "ʿIshāʾ", arabic: "العشاء", description: "Prière du soir" },
  { name: "Jumu'a", arabic: "الجمعة", description: "Prière du vendredi" },
];

export default function HorairesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Horaires"
        title="Horaires des prières"
        description="Retrouvez chaque jour les horaires officiels des cinq prières quotidiennes et de la Jumu'a, actualisés en temps réel."
        breadcrumbs={[{ label: "Horaires de prière" }]}
      />

      <Section background="cream" spacing="lg">
        <div className="mx-auto max-w-4xl">
          {/* Bloc info */}
          <div className="rounded-2xl border border-primary-200 bg-primary-50 p-5">
            <div className="flex items-start gap-3">
              <Info
                className="mt-0.5 h-5 w-5 shrink-0 text-primary-500"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold text-primary-700">
                  Horaires officiels via Masjidbox
                </p>
                <p className="mt-1 text-sm text-ink-muted leading-relaxed">
                  Les horaires de la Mosquée de Montataire sont gérés sur la
                  plateforme Masjidbox. Cliquez sur le bouton ci-dessous pour
                  accéder aux horaires précis du jour, mis à jour
                  automatiquement.
                </p>
              </div>
            </div>
          </div>

          {/* Cartes prières */}
          <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-elevated border border-primary-100">
            <div className="border-b border-primary-100 bg-gradient-to-br from-primary-700 to-primary-900 px-6 py-5 text-cream">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gold-light" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-cream/70 font-semibold">
                    Mosquée de Montataire
                  </p>
                  <p className="font-display text-lg font-bold">
                    Les prières quotidiennes
                  </p>
                </div>
              </div>
            </div>

            <ul className="divide-y divide-primary-100">
              {prayers.map((prayer) => (
                <li
                  key={prayer.name}
                  className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-primary-50/40"
                >
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="font-display text-2xl text-primary-700/60"
                    >
                      {prayer.arabic}
                    </span>
                    <div>
                      <p className="font-display text-lg font-bold text-primary-700">
                        {prayer.name}
                      </p>
                      <p className="text-xs text-ink-muted">
                        {prayer.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-ink-muted">
                    Voir sur Masjidbox →
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Button
              href={siteConfig.externalLinks.masjidbox}
              external
              variant="primary"
              size="lg"
            >
              <Clock className="h-5 w-5" aria-hidden="true" />
              Voir tous les horaires
              <ExternalLink className="h-4 w-4 opacity-70" aria-hidden="true" />
            </Button>
            <Button
              href={appConfig.googlePlayUrl}
              external
              variant="outline"
              size="lg"
            >
              <Smartphone className="h-5 w-5" aria-hidden="true" />
              Télécharger l&apos;application
            </Button>
          </div>
        </div>
      </Section>

      <Section background="white" spacing="lg">
        <SectionHeading
          eyebrow="Conseils pratiques"
          title="Ne manquez plus aucune prière"
          align="center"
        />
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-3">
          {[
            {
              title: "Application mobile",
              description:
                "Téléchargez l'application ACMDM pour recevoir des notifications avant chaque prière.",
            },
            {
              title: "Plateforme Masjidbox",
              description:
                "Les horaires sont synchronisés en temps réel avec la plateforme officielle de la mosquée.",
            },
            {
              title: "Jumu'a du vendredi",
              description:
                "La prière du vendredi rassemble toute la communauté. Pensez à venir à l'avance.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-primary-100 bg-cream p-6"
            >
              <h3 className="font-display text-lg font-bold text-primary-700">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        title="Soutenez la mosquée"
        description="Les prières quotidiennes ne sont possibles que grâce à votre soutien régulier."
        primary={{
          label: "Faire un don mensuel",
          href: "/dons-mensuels",
          variant: "gold",
        }}
        secondary={{
          label: "Découvrir l'association",
          href: "/association",
        }}
      />
    </>
  );
}
