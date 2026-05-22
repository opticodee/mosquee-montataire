/**
 * Configuration globale du site
 * Modifiez ici toutes les informations principales de la mosquée.
 */

export const siteConfig = {
  name: "Mosquée de Montataire",
  shortName: "ACMDM",
  legalName:
    "Association Cultuelle des Musulmans De Montataire",
  description:
    "Site officiel de la Mosquée de Montataire (ACMDM) : horaires de prière, traduction en direct, replay des discours et Jumu'a, Coran audio, dons et projet éducatif.",
  url: "https://mosquee-montataire.fr",

  address: {
    line1: "147 bis rue Louis Blanc",
    postalCode: "60160",
    city: "Montataire",
    country: "France",
    full: "147 bis rue Louis Blanc, 60160 Montataire, France",
  },

  contact: {
    email: "mosquee.montataire@gmail.com",
    phone: "",
  },

  // Liens externes principaux
  externalLinks: {
    masjidbox:
      "https://masjidbox.com/horaires-de-priere/mosquee-de-montataire",
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.masjidbox.acmdm5fb6de85612b490015118359&hl=fr",
    appStore: "https://apps.apple.com/fr/app/acmdm/id1547237804",
    googleMaps:
      "https://maps.google.com?daddr=147+bis+rue+louis+blanc,+60160+Montataire",
  },

  socialLinks: {
    facebook:
      "https://fr-fr.facebook.com/people/Mosquée-de-Montataire/100069386124810/",
    twitter: "https://twitter.com/ACMDMOFFICIELLE",
    youtube: "https://youtube.com/@mosqueemontataire60160",
    instagram: "",
  },

  // Coordonnées géographiques pour la carte
  coordinates: {
    latitude: 49.2557,
    longitude: 2.4368,
  },

  // Histoire / chiffres clés
  history: {
    foundedYear: 1982,
    openedYear: 1986,
    surfaceSqm: 1250,
    capacity: 2500,
    parkingCount: 2,
  },
} as const;

export type SiteConfig = typeof siteConfig;
