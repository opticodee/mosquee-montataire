import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { ArrowRight } from "lucide-react";

export function AssociationPreview() {
  const stats = [
    {
      value: `${siteConfig.history.foundedYear}`,
      label: "Année de fondation",
    },
    {
      value: `${siteConfig.history.openedYear}`,
      label: "Ouverture officielle",
    },
    {
      value: `${siteConfig.history.surfaceSqm} m²`,
      label: "Surface",
    },
    {
      value: siteConfig.history.capacity.toLocaleString("fr-FR"),
      label: "Capacité d'accueil",
    },
  ];

  return (
    <Section background="white" spacing="lg">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="L'Association"
            title="Une mosquée vivante depuis plus de 40 ans"
            description="L'Association Cultuelle des Musulmans De Montataire (ACMDM), régie par la loi 1901, est au service de la communauté musulmane de Montataire et de ses environs depuis 1982."
          />
          <Button href="/association" variant="primary" size="lg" className="mt-8">
            Découvrir l&apos;association
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-primary-100 bg-cream p-6 shadow-soft"
            >
              <p className="font-display text-3xl font-bold text-primary-700 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
