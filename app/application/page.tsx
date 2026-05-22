import { Smartphone, Apple } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CTASection } from "@/components/ui/CTASection";
import { appConfig, appFeatures } from "@/config/app";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Application ACMDM",
  description:
    "Téléchargez l'application officielle de la Mosquée de Montataire : horaires de prière, actualités, verset du jour, quiz islam et notifications.",
  path: "/application",
});

export default function ApplicationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Application mobile"
        title="L'application ACMDM"
        description={appConfig.description}
        breadcrumbs={[{ label: "Application" }]}
      />

      <Section background="cream" spacing="lg">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-wider text-gold-dark font-semibold">
              {appConfig.tagline}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-primary-700 sm:text-4xl">
              {appConfig.fullName}
            </h2>
            <p className="mt-4 text-ink-muted leading-relaxed">
              L&apos;application officielle de la mosquée vous accompagne au
              quotidien : horaires de prière à jour, actualités de la
              communauté, verset du jour pour méditer et notifications
              personnalisées.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {/* Google Play */}
              <a
                href={appConfig.googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-xl bg-primary-900 px-5 py-3 text-white shadow-soft transition-all hover:bg-primary-700 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M3 20.5V3.5c0-.31.16-.59.41-.75l10.5 8.75-10.5 8.75c-.25-.16-.41-.44-.41-.75zM16.7 12L14 9.7 6.5 4 17.4 10.3 16.7 12zM21 12.5c0 .35-.18.67-.48.85L18 14.7l-2.4-2.7L18 9.3l2.52 1.35c.3.18.48.5.48.85zM6.5 20l8-4.7 2.2 2.3-10.7 6c-.17.1-.34.15-.5.15v-3.75z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[10px] uppercase tracking-wider opacity-80">
                    Disponible sur
                  </div>
                  <div className="font-display text-base font-bold">
                    Google Play
                  </div>
                </div>
              </a>

              {/* App Store */}
              <a
                href={appConfig.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-xl bg-primary-900 px-5 py-3 text-white shadow-soft transition-all hover:bg-primary-700 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                <Apple className="h-7 w-7" aria-hidden="true" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] uppercase tracking-wider opacity-80">
                    Télécharger sur
                  </div>
                  <div className="font-display text-base font-bold">
                    App Store
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Mockup */}
          <div className="flex justify-center">
            <PhoneMockupLarge />
          </div>
        </div>
      </Section>

      <Section background="white" spacing="lg">
        <SectionHeading
          eyebrow="Fonctionnalités"
          title="Tout ce que l'application vous offre"
          description="Une expérience pensée pour la communauté musulmane, avec des fonctionnalités utiles au quotidien."
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {appFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                variant="outlined"
                hover
                padding="md"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-primary-700">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      <CTASection
        title="Téléchargez l'application maintenant"
        description="Disponible gratuitement sur Google Play et App Store."
        primary={{
          label: "Google Play",
          href: appConfig.googlePlayUrl,
          variant: "gold",
          external: true,
        }}
        secondary={{
          label: "App Store",
          href: appConfig.appStoreUrl,
          external: true,
        }}
      />
    </>
  );
}

function PhoneMockupLarge() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-10 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(25,135,84,0.4) 0%, transparent 70%)",
        }}
      />
      <div className="relative w-[320px] rounded-[3rem] border-[12px] border-primary-900 bg-primary-900 shadow-elevated">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
          <div className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-primary-900" />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-20 pattern-arabesque pointer-events-none"
          />
          <div className="relative h-full p-6 pt-12 text-cream flex flex-col">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-wider text-gold-light">
                ACMDM
              </p>
              <p className="mt-1 font-display text-lg font-bold">
                Mosquée Montataire
              </p>
            </div>

            <div className="mt-6 rounded-2xl bg-gold/20 border border-gold/30 backdrop-blur-sm p-4 text-center">
              <p className="text-[10px] uppercase tracking-wider text-gold-light">
                Verset du jour
              </p>
              <p className="mt-2 text-sm italic text-cream/90">
                « Ô vous qui croyez, soyez patients et perseverez… »
              </p>
            </div>

            <div className="mt-5 rounded-2xl bg-white/10 backdrop-blur-sm p-4">
              <p className="text-[10px] uppercase tracking-wider text-cream/70">
                Prochaine prière
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-gold-light">
                Maghrib
              </p>
              <p className="text-xs text-cream/80">Dans 1h 42min</p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-white/10 p-3 text-center text-xs">
                <Smartphone
                  className="mx-auto h-4 w-4 text-gold-light"
                  aria-hidden="true"
                />
                <p className="mt-1 font-semibold">Quiz</p>
              </div>
              <div className="rounded-xl bg-white/10 p-3 text-center text-xs">
                <p className="mt-1 font-semibold">Actualités</p>
              </div>
            </div>

            <div className="mt-auto pt-4 grid grid-cols-4 gap-1.5 text-[10px]">
              <div className="rounded-lg bg-gold py-2 text-center font-semibold text-primary-900">
                Accueil
              </div>
              <div className="rounded-lg bg-white/10 py-2 text-center">
                Horaires
              </div>
              <div className="rounded-lg bg-white/10 py-2 text-center">
                Quiz
              </div>
              <div className="rounded-lg bg-white/10 py-2 text-center">
                Plus
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
