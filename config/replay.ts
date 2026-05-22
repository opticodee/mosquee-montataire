/**
 * Configuration des replays (discours et Jumu'a).
 *
 * Pour ajouter un replay : ajoutez une entrée dans le tableau `replays` ci-dessous.
 * Les vidéos / audios sont hébergés sur la chaîne YouTube de la mosquée.
 *
 * Pour récupérer le youtubeId d'une vidéo YouTube, prenez la partie après "v=" dans
 * l'URL (ex : https://youtube.com/watch?v=ABC123 → youtubeId: "ABC123").
 */

export type ReplayCategory =
  | "jumua"
  | "discours"
  | "conference"
  | "ramadan";

export type ReplayLanguage = "fr" | "ar" | "fr-ar";

export type Replay = {
  id: string;
  title: string;
  date: string; // format ISO yyyy-mm-dd
  category: ReplayCategory;
  language: ReplayLanguage;
  duration?: string; // ex : "32:15"
  youtubeId?: string;
  externalUrl?: string;
  description?: string;
};

export const replayCategories: { value: ReplayCategory | "all"; label: string }[] =
  [
    { value: "all", label: "Tous" },
    { value: "jumua", label: "Jumu'a" },
    { value: "discours", label: "Discours" },
    { value: "conference", label: "Conférences" },
    { value: "ramadan", label: "Ramadan" },
  ];

// Lien direct vers la chaîne YouTube de la mosquée
export const youtubeChannelUrl =
  "https://youtube.com/@mosqueemontataire60160";

export type YoutubePlaylist = {
  id: string;
  title: string;
  description?: string;
  url: string;
  accent?: "primary" | "gold";
};

export const youtubePlaylists: YoutubePlaylist[] = [
  {
    id: "ramadan-2026",
    title: "Ramadan 2026",
    description: "Discours et conférences du mois béni",
    url: "https://www.youtube.com/playlist?list=PLZ2xu8sciUZW0zFFwzm2-VF_nVhEtJOP7",
    accent: "gold",
  },
  {
    id: "discours-fajr",
    title: "Discours Fajr",
    description: "Les discours du Fajr",
    url: "https://www.youtube.com/playlist?list=PLZ2xu8sciUZUBvjnmP-jdwEa31v4I1Iha",
    accent: "primary",
  },
  {
    id: "jumua-fr",
    title: "Jumu'a en français",
    description: "Khoutbah du vendredi en français",
    url: "https://www.youtube.com/playlist?list=PLZ2xu8sciUZWkiGwJyiXHZcrZHOJVnAEK",
    accent: "primary",
  },
  {
    id: "jumua-ar",
    title: "Jumu'a en arabe",
    description: "Khoutbah du vendredi en arabe",
    url: "https://www.youtube.com/playlist?list=PLZ2xu8sciUZW2cg5fN2JeTES_7UoLeBq9",
    accent: "primary",
  },
  {
    id: "coran-sheikh",
    title: "Coran — Sheikh Hassan El Montasser",
    description: "Récitations par l'imam",
    url: "https://www.youtube.com/playlist?list=PLZ2xu8sciUZWlv7I3QJcH3VragWOSNK9f",
    accent: "gold",
  },
];

/**
 * Replays affichés sur le site.
 *
 * NOTE : les entrées ci-dessous sont des exemples génériques (titres neutres).
 * Remplacez-les par les véritables replays de votre chaîne YouTube en ajoutant
 * le youtubeId réel de chaque vidéo. Tant que les youtubeId ne sont pas
 * renseignés, les cartes redirigent vers la chaîne YouTube principale.
 */
export const replays: Replay[] = [
  {
    id: "jumua-recent-1",
    title: "Jumu'a — Discours du vendredi",
    date: "2025-11-14",
    category: "jumua",
    language: "fr-ar",
    description:
      "Khoutbah hebdomadaire de la mosquée de Montataire.",
  },
  {
    id: "discours-recent-1",
    title: "Discours du dimanche soir",
    date: "2025-11-09",
    category: "discours",
    language: "fr",
    description:
      "Rappel hebdomadaire en français pour la communauté.",
  },
  {
    id: "jumua-recent-2",
    title: "Jumu'a — Discours du vendredi",
    date: "2025-11-07",
    category: "jumua",
    language: "fr-ar",
  },
  {
    id: "discours-recent-2",
    title: "Discours du vendredi soir",
    date: "2025-11-07",
    category: "discours",
    language: "fr",
  },
  {
    id: "conference-1",
    title: "Conférence — Spiritualité et famille",
    date: "2025-10-26",
    category: "conference",
    language: "fr",
  },
  {
    id: "jumua-recent-3",
    title: "Jumu'a — Discours du vendredi",
    date: "2025-10-31",
    category: "jumua",
    language: "fr-ar",
  },
];
