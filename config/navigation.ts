/**
 * Configuration de la navigation principale et du footer.
 */

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const mainNavigation: (NavItem | NavGroup)[] = [
  { label: "Accueil", href: "/" },
  { label: "Horaires", href: "/horaires" },
  { label: "Traduction en direct", href: "/traduction-en-direct" },
  { label: "Replay", href: "/replay" },
  { label: "Coran audio", href: "/coran-audio" },
  { label: "Application", href: "/application" },
  {
    label: "Dons",
    items: [
      {
        label: "Dons mensuels",
        href: "/dons-mensuels",
        description: "Soutenez la mosquée chaque mois.",
      },
      {
        label: "Dons ponctuels",
        href: "/dons-ponctuels",
        description: "Un don unique pour la mosquée.",
      },
      {
        label: "Projet lycée",
        href: "/projet-lycee",
        description: "Participez au projet éducatif.",
      },
    ],
  },
  { label: "Association", href: "/association" },
  { label: "Contact", href: "/contact" },
];

export const footerNavigation = {
  mosquee: {
    title: "La Mosquée",
    items: [
      { label: "Accueil", href: "/" },
      { label: "L'Association", href: "/association" },
      { label: "Contact", href: "/contact" },
    ],
  },
  services: {
    title: "Services",
    items: [
      { label: "Horaires de prière", href: "/horaires" },
      { label: "Traduction en direct", href: "/traduction-en-direct" },
      { label: "Replay Jumu'a", href: "/replay" },
      { label: "Coran audio", href: "/coran-audio" },
      { label: "Application ACMDM", href: "/application" },
    ],
  },
  dons: {
    title: "Soutenir",
    items: [
      { label: "Dons mensuels", href: "/dons-mensuels" },
      { label: "Dons ponctuels", href: "/dons-ponctuels" },
      { label: "Projet lycée", href: "/projet-lycee" },
    ],
  },
  ressources: {
    title: "Ressources",
    items: [
      { label: "Mentions légales", href: "/mentions-legales" },
      {
        label: "Politique de confidentialité",
        href: "/politique-confidentialite",
      },
    ],
  },
};

// Helper pour distinguer item / group
export function isNavGroup(item: NavItem | NavGroup): item is NavGroup {
  return "items" in item;
}
