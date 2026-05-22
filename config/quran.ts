/**
 * Configuration des récitations du Coran.
 *
 * L'imam de la mosquée, Sheikh Hassan El Montasser, partage ses récitations
 * sur plusieurs plateformes audio publiques. Les liens ci-dessous renvoient
 * vers ces plateformes.
 *
 * Pour ajouter une piste audio interne, complétez le champ `audioUrl` avec
 * un fichier hébergé (par exemple dans /public/audio).
 */

export const quranReciter = {
  name: "Sheikh Hassan El Montasser",
  title: "Imam de la Mosquée de Montataire",
  description:
    "Venez écouter le Coran récité par l'Imam de la Mosquée, Sheikh Hassan El Montasser. Ses récitations sont disponibles en libre écoute sur YouTube, Spotify et Apple Music.",
};

export const quranPlatforms = [
  {
    name: "YouTube",
    description: "Playlist complète des récitations sur YouTube",
    url: "https://youtube.com/playlist?list=PLZ2xu8sciUZWlv7I3QJcH3VragWOSNK9f",
    color: "#FF0000",
  },
  {
    name: "Spotify",
    description: "Écouter sur Spotify",
    url: "https://open.spotify.com/artist/1TY1qjjx9FIRiYAN2FoWKh",
    color: "#1DB954",
  },
  {
    name: "Apple Music",
    description: "Écouter sur Apple Music",
    url: "https://music.apple.com/fr/artist/sheikh-hassan-el-montasser/1664639479",
    color: "#FA243C",
  },
];

export type QuranTrack = {
  id: string;
  title: string; // ex : "Sourate Al-Fatiha"
  surahNumber?: number;
  description?: string;
  externalUrl?: string;
  audioUrl?: string;
};

/**
 * NOTE : Les pistes ci-dessous ne sont pas des récitations spécifiques mais
 * des entrées-titres génériques. Pour afficher des récitations individuelles,
 * renseignez les `externalUrl` (lien direct YouTube) ou `audioUrl` (fichier local).
 *
 * Tant que la liste reste vide ou générique, la page met simplement en avant
 * la playlist YouTube et les plateformes externes.
 */
export const quranTracks: QuranTrack[] = [];
