/**
 * Services de la mosquée et accès rapides.
 */

import {
  BookOpen,
  Calendar,
  Clock,
  Headphones,
  Heart,
  Languages,
  Mic,
  PlayCircle,
  Smartphone,
  Sparkles,
  Users,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
};

export type QuickAccess = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent?: "primary" | "gold";
};

// Services principaux affichés en page d'accueil
export const services: Service[] = [
  {
    title: "Prières quotidiennes",
    description:
      "Les cinq prières quotidiennes sont accomplies en commun dans la mosquée.",
    icon: Clock,
  },
  {
    title: "Jumu'a du vendredi",
    description:
      "La prière du vendredi rassemble chaque semaine toute la communauté.",
    icon: Calendar,
  },
  {
    title: "Enseignement religieux",
    description:
      "Cercles d'études, formation islamique et apprentissage de la langue arabe.",
    icon: BookOpen,
  },
  {
    title: "Apprentissage du Coran",
    description:
      "Mémorisation, récitation et psalmodie du Saint Coran pour tous les âges.",
    icon: Sparkles,
  },
  {
    title: "Conférences",
    description:
      "Rencontres, débats et séminaires sur la spiritualité et la vie communautaire.",
    icon: Mic,
  },
  {
    title: "Traduction en direct",
    description:
      "Suivez les Jumu'a et discours en français, en direct, depuis votre téléphone.",
    icon: Languages,
  },
  {
    title: "Application ACMDM",
    description:
      "Horaires, actualités, verset du jour et quiz islam dans votre poche.",
    icon: Smartphone,
  },
  {
    title: "Vie communautaire",
    description:
      "Un lieu de rencontre et d'animation au service de tous les habitants.",
    icon: Users,
  },
];

// Cartes accès rapide sur la page d'accueil
export const quickAccessItems: QuickAccess[] = [
  {
    title: "Projet lycée",
    description: "Soutenir le projet éducatif",
    href: "/projet-lycee",
    icon: GraduationCap,
    accent: "gold",
  },
  {
    title: "Horaires de prière",
    description: "Consulter les horaires du jour",
    href: "/horaires",
    icon: Clock,
    accent: "primary",
  },
  {
    title: "Traduction en direct",
    description: "Suivre la Jumu'a en français",
    href: "/traduction-en-direct",
    icon: Languages,
    accent: "primary",
  },
  {
    title: "Replay Jumu'a",
    description: "Réécouter les derniers discours",
    href: "/replay",
    icon: PlayCircle,
    accent: "primary",
  },
  {
    title: "Coran audio",
    description: "Écouter les récitations",
    href: "/coran-audio",
    icon: Headphones,
    accent: "primary",
  },
  {
    title: "Application ACMDM",
    description: "Télécharger l'app mobile",
    href: "/application",
    icon: Smartphone,
    accent: "primary",
  },
  {
    title: "Dons mensuels",
    description: "Aider la mosquée chaque mois",
    href: "/dons-mensuels",
    icon: Heart,
    accent: "gold",
  },
  {
    title: "L'Association",
    description: "Découvrir l'ACMDM",
    href: "/association",
    icon: Users,
    accent: "primary",
  },
];
