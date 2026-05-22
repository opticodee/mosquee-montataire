/**
 * Configuration des dons.
 *
 * IMPORTANT : Ne pas modifier ces liens sauf si les liens officiels
 * de la mosquée changent. Les liens GoCardless ci-dessous correspondent
 * aux mandats SEPA mis en place par l'association.
 *
 * Pour ajouter un nouveau montant : ajoutez un objet dans monthlyDonations
 * avec son lien GoCardless correspondant.
 */

export type MonthlyDonation = {
  amount: number;
  url: string;
  badge?: "popular" | "recommended";
  impact: string;
};

// Liens GoCardless récupérés du site officiel
export const monthlyDonations: MonthlyDonation[] = [
  {
    amount: 10,
    url: "https://pay.gocardless.com/BRT0004A8JV474E",
    impact: "Aide à couvrir les charges courantes.",
  },
  {
    amount: 15,
    url: "https://pay.gocardless.com/BRT0004AA1RHS5T",
    impact: "Contribue aux frais d'eau et d'électricité.",
  },
  {
    amount: 20,
    url: "https://pay.gocardless.com/BRT0004AA1WTN8E",
    badge: "popular",
    impact: "Le montant le plus souvent choisi par la communauté.",
  },
  {
    amount: 25,
    url: "https://pay.gocardless.com/BRT0004AA1X51GC",
    impact: "Soutient l'entretien quotidien du bâtiment.",
  },
  {
    amount: 30,
    url: "https://pay.gocardless.com/BRT0004AA268F52",
    impact: "Participe au chauffage en période hivernale.",
  },
  {
    amount: 35,
    url: "https://pay.gocardless.com/BRT0004AAWRZ50V",
    impact: "Aide aux activités éducatives de la mosquée.",
  },
  {
    amount: 40,
    url: "https://pay.gocardless.com/BRT0004AAWV58G2",
    impact: "Soutient les enseignements et conférences.",
  },
  {
    amount: 45,
    url: "https://pay.gocardless.com/BRT0004AAWY6RCF",
    impact: "Contribue au rayonnement de la mosquée.",
  },
  {
    amount: 50,
    url: "https://pay.gocardless.com/BRT0004AAWZ3S0B",
    badge: "recommended",
    impact: "Un soutien régulier précieux pour la communauté.",
  },
  {
    amount: 55,
    url: "https://pay.gocardless.com/BRT0004AAX0QRND",
    impact: "Aide à pérenniser les services proposés.",
  },
  {
    amount: 60,
    url: "https://pay.gocardless.com/BRT0004AAX20EB5",
    impact: "Contribue significativement aux frais de fonctionnement.",
  },
  {
    amount: 65,
    url: "https://pay.gocardless.com/BRT0004AAX4T5FR",
    impact: "Soutien fort pour les projets de la mosquée.",
  },
  {
    amount: 70,
    url: "https://pay.gocardless.com/BRT0004AAX52TBP",
    impact: "Participe activement aux missions essentielles.",
  },
  {
    amount: 75,
    url: "https://pay.gocardless.com/BRT0004AAX63H6B",
    impact: "Don substantiel pour l'avenir de la mosquée.",
  },
  {
    amount: 80,
    url: "https://pay.gocardless.com/BRT0004AAX7EV9P",
    impact: "Contribue à la stabilité financière de l'association.",
  },
  {
    amount: 85,
    url: "https://pay.gocardless.com/BRT0004AAX9YWCZ",
    impact: "Soutien généreux pour toute la communauté.",
  },
  {
    amount: 90,
    url: "https://pay.gocardless.com/BRT0004AAXAT8QQ",
    impact: "Don important pour les projets éducatifs.",
  },
  {
    amount: 95,
    url: "https://pay.gocardless.com/BRT0004AAXBVG3M",
    impact: "Contribution majeure aux missions de la mosquée.",
  },
  {
    amount: 100,
    url: "https://pay.gocardless.com/BRT0004AAXCGW3T",
    impact: "Un soutien exceptionnel, qu'Allah vous récompense.",
  },
];

// Dons ponctuels
export const oneTimeDonation = {
  helloAssoUrl: "https://www.helloasso.com/associations/acmdm",
  helloAssoFormUrl:
    "https://www.helloasso.com/associations/acmdm/formulaires/1",
  helloAssoWidgetUrl:
    "https://www.helloasso.com/associations/acmdm/formulaires/1/widget",
  suggestedAmounts: [20, 50, 100, 200, 500],
};

// Projet lycée
export const projectDonation = {
  goalAmount: 500000,
  goalLabel: "500 000 €",
  monthlyEquivalent: 41.67,
  durationMonths: 12,
  targetParticipants: 1000,
  targetPerParticipant: 500,
  oneTimeUrl: "https://www.cotizup.com/acmdm",
  installmentUrl:
    "https://tally.so/r/zxeXqq",
  installmentEmbedUrl:
    "https://tally.so/embed/zxeXqq?transparentBackground=1&alignLeft=1&hideTitle=1&dynamicHeight=1",
  // Exemples de paiement en plusieurs fois
  installmentExamples: [
    { total: 120, monthly: 10, months: 12 },
    { total: 300, monthly: 25, months: 12 },
    { total: 500, monthly: 41.67, months: 12 },
    { total: 1000, monthly: 83.34, months: 12 },
  ],
} as const;

// FAQ générique réutilisable
export const donationFAQ = [
  {
    question: "Où va mon don ?",
    answer:
      "Vos dons servent exclusivement à faire vivre la mosquée : factures d'eau, de gaz, d'électricité, entretien du bâtiment, salaire de l'Imam, activités éducatives et projets de la communauté.",
  },
  {
    question: "Le paiement est-il sécurisé ?",
    answer:
      "Oui. Les paiements mensuels sont gérés via GoCardless (mandat SEPA sécurisé) et les paiements ponctuels via HelloAsso ou Cotizup, plateformes reconnues et certifiées.",
  },
  {
    question: "Puis-je arrêter mon don mensuel ?",
    answer:
      "Oui, à tout moment. Le mandat SEPA est modifiable et résiliable sans frais via votre espace GoCardless ou en nous contactant directement.",
  },
  {
    question: "Puis-je choisir un autre montant ?",
    answer:
      "Bien sûr. Vous pouvez choisir parmi les montants proposés de 10 € à 100 € par mois, ou nous contacter pour un montant personnalisé.",
  },
  {
    question: "Vais-je recevoir une confirmation ?",
    answer:
      "Oui, vous recevrez automatiquement un email de confirmation après chaque don, ainsi qu'un reçu pour vos prélèvements mensuels.",
  },
  {
    question: "La mosquée reçoit-elle des subventions ?",
    answer:
      "Non. La mosquée ne reçoit aucune subvention de l'État. Elle ne vit que par la générosité des fidèles, c'est pourquoi chaque don compte.",
  },
];
