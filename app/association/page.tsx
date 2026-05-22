import { Users, BookOpen, Mic, Award, Building2, Heart, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CTASection } from "@/components/ui/CTASection";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "L'Association",
  description:
    "L'Association Cultuelle des Musulmans De Montataire (ACMDM), régie par la loi 1901, est au service de la communauté depuis 1982. Découvrez son histoire et ses missions.",
  path: "/association",
});

export default function AssociationPage() {
  const timeline = [
    {
      year: `${siteConfig.history.foundedYear}`,
      title: "Fondation de l'association",
      description:
        "L'Association Cultuelle et Culturelle de la Mosquée de Montataire est fondée, régie par la loi du 1er juillet 1901 et le décret du 16 août 1901.",
    },
    {
      year: `${siteConfig.history.openedYear}`,
      title: "Ouverture officielle de la mosquée",
      description:
        "Après environ 3 ans de travaux, la mosquée ouvre officiellement ses portes pour accueillir la communauté.",
    },
    {
      year: "2014",
      title: "Devient l'ACMDM",
      description:
        "L'association adopte officiellement le nom d'Association Cultuelle des Musulmans De Montataire (ACMDM).",
    },
    {
      year: "Aujourd'hui",
      title: "Un lieu vivant pour la communauté",
      description:
        "La mosquée est devenue un véritable centre de vie : prière, enseignement, conférences, accompagnement.",
    },
  ];

  const missions = [
    {
      icon: BookOpen,
      title: "Enseignement de la langue arabe",
      description: "Cours pour tous les âges, débutants comme avancés.",
    },
    {
      icon: Sparkles,
      title: "Apprentissage et récitation du Coran",
      description: "Mémorisation, psalmodie et perfectionnement de la lecture.",
    },
    {
      icon: Users,
      title: "Formation et éducation religieuse",
      description: "Cercles d'études, séminaires et veillées spirituelles.",
    },
    {
      icon: Award,
      title: "Concours de lecture du Coran",
      description:
        "Organisation d'un concours régional de la lecture et de la psalmodie du Saint Coran.",
    },
    {
      icon: Mic,
      title: "Conférences et débats",
      description:
        "Rencontres autour de la spiritualité, de la famille et de la vie communautaire.",
    },
    {
      icon: Heart,
      title: "Lieu de vie communautaire",
      description:
        "Un centre de rencontre où sont traités les problèmes du quotidien.",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="ACMDM"
        title="L'Association"
        description={`${siteConfig.legalName}. Une mosquée vivante au service de la communauté depuis ${siteConfig.history.foundedYear}.`}
        breadcrumbs={[{ label: "L'Association" }]}
      />

      {/* Présentation */}
      <Section background="cream" spacing="lg">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-soft">
            <div className="prose prose-lg max-w-none text-ink">
              <p className="leading-relaxed">
                L&apos;Association Cultuelle et Culturelle de la Mosquée de
                Montataire a été fondée en{" "}
                <strong>{siteConfig.history.foundedYear}</strong>. Elle est régie
                par la loi du 1er juillet 1901 et le décret du 16 août 1901. Elle
                est devenue l&apos;<strong>Association Cultuelle des Musulmans De
                Montataire</strong> depuis 2014 (ACMDM).
              </p>
              <p className="mt-4 leading-relaxed">
                La Mosquée a ouvert officiellement ses portes en{" "}
                <strong>{siteConfig.history.openedYear}</strong>, après une
                période de travaux qui a duré environ 3 ans. Elle est construite
                sur une superficie de{" "}
                <strong>{siteConfig.history.surfaceSqm} m²</strong> avec une
                capacité d&apos;accueil de{" "}
                <strong>
                  {siteConfig.history.capacity.toLocaleString("fr-FR")} personnes
                </strong>{" "}
                et avec {siteConfig.history.parkingCount} parkings privés.
              </p>
              <p className="mt-4 leading-relaxed">
                Cet espace est devenu à travers le temps, en plus de sa mission
                spirituelle, un lieu de rencontre, un centre de réunion où sont
                traités l&apos;ensemble des problèmes du quotidien, un centre
                de vie et d&apos;animation :{" "}
                <em>une maison de lumière et de paix</em>.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Chiffres clés */}
      <Section background="white" spacing="md">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Building2}
            value={`${siteConfig.history.foundedYear}`}
            label="Année de fondation"
          />
          <StatCard
            icon={Award}
            value={`${siteConfig.history.openedYear}`}
            label="Ouverture officielle"
          />
          <StatCard
            icon={Users}
            value={siteConfig.history.capacity.toLocaleString("fr-FR")}
            label="Capacité d'accueil"
          />
          <StatCard
            icon={Building2}
            value={`${siteConfig.history.surfaceSqm} m²`}
            label="Surface"
          />
        </div>
      </Section>

      {/* Timeline */}
      <Section background="cream" spacing="lg">
        <SectionHeading
          eyebrow="Notre histoire"
          title="Plus de 40 ans au service de la communauté"
          align="center"
        />
        <div className="mx-auto mt-12 max-w-3xl">
          <ol className="relative space-y-8 border-l-2 border-primary-200 pl-8">
            {timeline.map((item, idx) => (
              <li key={idx} className="relative">
                <span className="absolute -left-[2.4rem] flex h-7 w-7 items-center justify-center rounded-full bg-gold ring-4 ring-cream">
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
                <p className="font-display text-lg font-bold text-gold-dark">
                  {item.year}
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-primary-700">
                  {item.title}
                </h3>
                <p className="mt-2 text-ink-muted leading-relaxed">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Missions */}
      <Section background="white" spacing="lg">
        <SectionHeading
          eyebrow="Nos missions"
          title="Activités et services de la mosquée"
          description="La Mosquée de Montataire propose de nombreuses activités et services ouverts à toute personne désireuse d'y participer."
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {missions.map((mission) => {
            const Icon = mission.icon;
            return (
              <Card key={mission.title} variant="outlined" hover padding="md">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-primary-700">
                  {mission.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                  {mission.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Vision */}
      <Section background="cream" spacing="lg">
        <div className="mx-auto max-w-3xl text-center">
          <Sparkles
            className="mx-auto h-10 w-10 text-gold"
            aria-hidden="true"
          />
          <h2 className="mt-4 font-display text-2xl font-bold text-primary-700 sm:text-3xl">
            Notre vision
          </h2>
          <p className="mt-4 font-display text-xl sm:text-2xl leading-relaxed text-primary-700/90 italic">
            « Une mosquée vivante, au service de la foi, de la transmission et
            de la communauté. »
          </p>
        </div>
      </Section>

      <CTASection
        title="Soutenez la mission de la mosquée"
        description="L'association ne reçoit aucune subvention de l'État. Elle vit uniquement grâce à la générosité des fidèles."
        primary={{
          label: "Soutenir la mosquée",
          href: "/dons-mensuels",
          variant: "gold",
        }}
        secondary={{
          label: "Nous contacter",
          href: "/contact",
        }}
      />
    </>
  );
}

type StatCardProps = {
  icon: typeof Users;
  value: string;
  label: string;
};

function StatCard({ icon: Icon, value, label }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-cream p-6 text-center">
      <div className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary-500 shadow-soft">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <p className="mt-4 font-display text-3xl font-bold text-primary-700">
        {value}
      </p>
      <p className="text-sm text-ink-muted">{label}</p>
    </div>
  );
}
