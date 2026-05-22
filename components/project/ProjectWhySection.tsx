import { Shield, BookOpen, HandHeart, GraduationCap, Sprout } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

export function ProjectWhySection() {
  const reasons = [
    {
      icon: Shield,
      title: "Préserver l'identité",
      description:
        "Offrir à nos jeunes un cadre éducatif qui respecte et nourrit leur identité religieuse et culturelle.",
    },
    {
      icon: BookOpen,
      title: "Transmettre le savoir",
      description:
        "Garantir une éducation de qualité, alliant excellence académique et enseignement religieux.",
    },
    {
      icon: HandHeart,
      title: "Accompagner les jeunes",
      description:
        "Un environnement bienveillant qui les soutient dans leur développement personnel et spirituel.",
    },
    {
      icon: GraduationCap,
      title: "Un cadre sérieux",
      description:
        "Particulièrement important pour nos filles et nos sœurs qui pourront étudier sereinement.",
    },
    {
      icon: Sprout,
      title: "Investir dans l'avenir",
      description:
        "Ce que nous finançons aujourd'hui peut protéger et élever toute une jeunesse.",
    },
  ];

  return (
    <Section background="white" spacing="lg">
      <SectionHeading
        eyebrow="Pourquoi ce projet compte"
        title="Un investissement pour toute une génération"
        description="Ce projet n'est pas un simple chantier. C'est un investissement concret pour l'avenir de nos enfants, leur éducation, leur équilibre et leur identité."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason) => {
          const Icon = reason.icon;
          return (
            <div
              key={reason.title}
              className="group rounded-2xl border border-primary-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-500 transition-colors group-hover:bg-primary-500 group-hover:text-white">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-primary-700">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                {reason.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
