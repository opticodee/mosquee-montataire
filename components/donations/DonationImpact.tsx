import { Zap, Droplet, Thermometer, Wrench, GraduationCap, Users } from "lucide-react";

export function DonationImpact() {
  const impacts = [
    {
      icon: Zap,
      title: "Électricité",
      description: "Éclairage, climatisation, équipement audio pour les prières et conférences.",
    },
    {
      icon: Droplet,
      title: "Eau",
      description: "Eau courante pour les ablutions et l'entretien quotidien de la mosquée.",
    },
    {
      icon: Thermometer,
      title: "Chauffage",
      description: "Gaz et chauffage en période hivernale pour assurer le confort des fidèles.",
    },
    {
      icon: Wrench,
      title: "Entretien",
      description: "Réparations, propreté et maintenance régulière du bâtiment.",
    },
    {
      icon: GraduationCap,
      title: "Enseignement",
      description: "Cours d'arabe, mémorisation du Coran, cercles d'études.",
    },
    {
      icon: Users,
      title: "Imam & équipe",
      description: "Salaire de l'Imam et fonctionnement quotidien de l'association.",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {impacts.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="rounded-2xl bg-cream p-6"
          >
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary-500 shadow-soft">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-primary-700">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-ink-muted leading-relaxed">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
