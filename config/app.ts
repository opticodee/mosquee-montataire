/**
 * Configuration de l'application mobile ACMDM.
 */

import {
  Bell,
  BookMarked,
  Brain,
  Calendar,
  Clock,
  Newspaper,
  type LucideIcon,
} from "lucide-react";

export const appConfig = {
  name: "ACMDM",
  fullName: "Application Mosquée de Montataire",
  tagline: "Pour être toujours connecté à votre mosquée",
  description:
    "L'application officielle de la Mosquée de Montataire vous permet de rester informé en temps réel : horaires, actualités, contenus religieux et notifications utiles.",
  googlePlayUrl:
    "https://play.google.com/store/apps/details?id=com.masjidbox.acmdm5fb6de85612b490015118359&hl=fr",
  appStoreUrl: "https://apps.apple.com/fr/app/acmdm/id1547237804",
};

export type AppFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const appFeatures: AppFeature[] = [
  {
    title: "Horaires de prière",
    description:
      "Consultez les horaires officiels de la mosquée en temps réel, où que vous soyez.",
    icon: Clock,
  },
  {
    title: "Actualités de la mosquée",
    description:
      "Restez informé des événements, conférences et annonces de la communauté.",
    icon: Newspaper,
  },
  {
    title: "Quiz Islam",
    description:
      "Testez et approfondissez vos connaissances religieuses tout en vous amusant.",
    icon: Brain,
  },
  {
    title: "Verset du jour",
    description:
      "Un verset du Coran chaque jour, pour méditer et nourrir votre spiritualité.",
    icon: BookMarked,
  },
  {
    title: "Notifications",
    description:
      "Recevez les rappels des prières et les annonces importantes de la mosquée.",
    icon: Bell,
  },
  {
    title: "Agenda communautaire",
    description:
      "Ne manquez plus les Jumu'a, conférences et événements ramadan.",
    icon: Calendar,
  },
];
