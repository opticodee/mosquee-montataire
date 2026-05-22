# Site officiel — Mosquée de Montataire (ACMDM)

Refonte complète du site **mosquee-montataire.fr** sous forme d'une application **Next.js 15** (App Router) en **TypeScript** et **Tailwind CSS**. Le projet remplace l'ancien thème Shopify par un site **statique, rapide, mobile-first** et complètement maintenable.

> Site original (référence visuelle et fonctionnelle) : <https://mosquee-montataire.fr>

---

## ✨ Caractéristiques

- **Next.js 15 / App Router** — toutes les pages sont prerendered en HTML statique.
- **TypeScript strict** — typage rigoureux pour toute la base de code.
- **Tailwind CSS 3.4** — design system custom (vert mosquée + doré).
- **Lucide React** — icônes vectorielles légères.
- **13 pages** déjà construites, prêtes pour la production.
- **0 dépendance lourde** — pas de CMS, données dans des fichiers TypeScript.
- **Mobile-first** — testé sur mobile, tablette et desktop.
- **Accessibilité** — focus visibles, contrastes AA, navigation clavier, aria-labels.
- **SEO** — métadonnées dynamiques, Open Graph, fichier robots.

---

## 🚀 Démarrage rapide

### Pré-requis

- **Node.js ≥ 18.17** (testé sur Node 22)
- **npm ≥ 9** (ou pnpm / yarn)

### Installation

```bash
git clone <url-du-repo>
cd mosquee-montataire
npm install
```

### Lancer en développement

```bash
npm run dev
```

Le site est servi sur <http://localhost:3000>.

### Builder pour la production

```bash
npm run build
npm run start
```

### Vérifier la qualité du code

```bash
npm run lint
```

---

## 📁 Structure du projet

```
mosquee-montataire/
├── app/                          # Pages du site (App Router)
│   ├── layout.tsx                # Layout global (header, footer, polices)
│   ├── globals.css               # Styles globaux + variables
│   ├── page.tsx                  # Page d'accueil
│   ├── horaires/                 # /horaires
│   ├── traduction-en-direct/     # /traduction-en-direct
│   ├── replay/                   # /replay
│   ├── coran-audio/              # /coran-audio
│   ├── application/              # /application
│   ├── dons-mensuels/            # /dons-mensuels
│   ├── dons-ponctuels/           # /dons-ponctuels
│   ├── projet-lycee/             # /projet-lycee
│   ├── association/              # /association
│   ├── contact/                  # /contact
│   ├── mentions-legales/         # /mentions-legales
│   └── politique-confidentialite/# /politique-confidentialite
│
├── components/                   # Composants React
│   ├── ui/                       # Composants UI réutilisables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   ├── PageHeader.tsx
│   │   ├── IconCard.tsx
│   │   ├── CTASection.tsx
│   │   └── FAQ.tsx
│   ├── layout/                   # Composants de mise en page
│   │   ├── Header.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Footer.tsx
│   │   ├── TopAnnouncement.tsx
│   │   └── Logo.tsx
│   ├── home/                     # Sections de la page d'accueil
│   ├── donations/                # Composants pages de dons
│   ├── project/                  # Composants page projet lycée
│   ├── replay/                   # Composants page replay
│   └── contact/                  # Formulaire de contact
│
├── config/                       # ⭐ Données du site (à modifier)
│   ├── site.ts                   # Adresse, contacts, réseaux sociaux
│   ├── navigation.ts             # Menu principal + footer
│   ├── donations.ts              # Liens GoCardless, HelloAsso, Cotizup
│   ├── services.ts               # Services et accès rapides
│   ├── replay.ts                 # Replays YouTube
│   ├── quran.ts                  # Coran audio (YouTube, Spotify, Apple)
│   └── app.ts                    # Application mobile
│
├── lib/                          # Utilitaires
│   ├── utils.ts                  # cn(), formatEuros(), formatDateFr()
│   └── seo.ts                    # Helper de métadonnées SEO
│
├── public/                       # Fichiers statiques (logo, favicon)
│
├── tailwind.config.ts            # Configuration Tailwind (couleurs, fonts)
├── tsconfig.json                 # Configuration TypeScript
├── next.config.js                # Configuration Next.js
├── package.json
└── README.md
```

---

## ✏️ Modifier le contenu du site

**Tout le contenu textuel et les liens externes** se trouvent dans le dossier `config/`. Vous n'avez pas besoin de toucher au code React.

### Coordonnées et infos générales — `config/site.ts`

```ts
export const siteConfig = {
  name: "Mosquée de Montataire",
  legalName: "Association Cultuelle des Musulmans De Montataire",
  url: "https://mosquee-montataire.fr",
  address: { line1: "147 bis rue Louis Blanc", ... },
  contact: { email: "", phone: "" },     // ← remplir si nécessaire
  externalLinks: { masjidbox: "...", googleMaps: "..." },
  socialLinks: { facebook: "...", twitter: "...", youtube: "..." },
  history: { foundedYear: 1982, openedYear: 1986, ... },
  coordinates: { latitude: 49.2557, longitude: 2.4368 },
};
```

### Liens de dons GoCardless — `config/donations.ts`

Si vous changez de prestataire ou recevez de nouveaux liens :

```ts
export const monthlyDonations: MonthlyDonation[] = [
  { amount: 10, url: "https://pay.gocardless.com/BRT...", impact: "..." },
  // ...
];

export const oneTimeDonation = {
  helloAssoFormUrl: "https://www.helloasso.com/.../formulaires/1",
  suggestedAmounts: [10, 20, 50, 100, 200],
};

export const projectDonation = {
  oneTimeUrl: "https://www.cotizup.com/acmdm",        // Cagnotte unique
  installmentUrl: "https://tally.so/r/zxeXqq",        // Paiement échelonné
  goalAmount: 500000,
  // ...
};
```

### Replays YouTube — `config/replay.ts`

Ajoutez vos vidéos en remplaçant l'ID YouTube. La miniature est automatiquement générée :

```ts
export const replays: Replay[] = [
  {
    id: "uid-unique",
    title: "Khoutbah du vendredi — ...",
    youtubeId: "abcDEF123",        // ← l'ID après watch?v=
    category: "jumua",             // jumua | discours | conference | ramadan
    language: "fr-ar",             // fr | ar | fr-ar
    date: "2025-11-08",
    duration: "32:15",
  },
];
```

### Horaires de prière

Les horaires sont gérés via **Masjidbox** (lien externe). Pour changer la plateforme, modifiez `siteConfig.externalLinks.masjidbox` dans `config/site.ts`.

### Coran audio — `config/quran.ts`

Modifiez les liens vers les plateformes (YouTube, Spotify, Apple Music) si nécessaire.

### Application mobile — `config/app.ts`

Modifiez les liens Google Play / App Store si l'application est republiée.

---

## 📧 Brancher le formulaire de contact

Actuellement, le formulaire de contact (`components/contact/ContactForm.tsx`) **simule** l'envoi pour la démo. Pour l'activer en production :

### Option A — Resend (recommandé)

1. Créez un compte sur <https://resend.com> et obtenez une clé API.
2. Installez le package :
   ```bash
   npm install resend
   ```
3. Créez le fichier `app/api/contact/route.ts` :
   ```ts
   import { NextResponse } from "next/server";
   import { Resend } from "resend";

   const resend = new Resend(process.env.RESEND_API_KEY);

   export async function POST(request: Request) {
     const data = await request.json();
     await resend.emails.send({
       from: "contact@mosquee-montataire.fr",
       to: "contact@mosquee-montataire.fr",
       subject: `[Site] ${data.subject}`,
       text: `De ${data.name} (${data.email}, ${data.phone || "-"}):\n\n${data.message}`,
     });
     return NextResponse.json({ ok: true });
   }
   ```
4. Dans `components/contact/ContactForm.tsx`, remplacez la simulation `setTimeout(...)` par :
   ```ts
   const res = await fetch("/api/contact", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(Object.fromEntries(new FormData(form))),
   });
   if (!res.ok) throw new Error("Erreur d'envoi");
   ```
5. Ajoutez `RESEND_API_KEY=re_xxx` dans votre fichier `.env.local`.

### Option B — SendGrid / Nodemailer

Même principe avec d'autres fournisseurs : créer une route API qui reçoit les données du formulaire et envoie un email.

---

## 🎨 Personnalisation visuelle

### Couleurs

Toutes les couleurs sont définies dans `tailwind.config.ts` :

```ts
colors: {
  primary: {
    50:  "#E8F1ED",
    // ... ← modifiez ici la palette verte
    700: "#0F3D2E",  // vert principal (header, dark sections)
    900: "#0A2A1F",
  },
  gold: {
    DEFAULT: "#C9A227",  // ← couleur dorée des CTA
    light:   "#E5C76B",
    dark:    "#A47D1B",
  },
  cream: "#F8F6F0",      // fond crème
  ink: { ... },          // textes
}
```

### Polices

Par défaut, le site utilise les **polices système** (fallback rapide et sans dépendance externe).

Pour utiliser **Google Fonts** (recommandé en production) :

1. Ouvrez `app/layout.tsx`.
2. Décommentez le bloc `next/font` et la ligne `className={...}` sur le `<html>`.
3. Reconstruisez : `npm run build`.

```tsx
import { Inter, Playfair_Display } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display", display: "swap" });
// ...
<html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
```

### Patterns décoratifs

Le motif arabesque utilisé en arrière-plan est défini dans `app/globals.css` (classe `.pattern-arabesque`). C'est un SVG en `background-image` ; vous pouvez le remplacer par votre propre motif.

---

## 🌍 Déploiement

### Vercel (recommandé, gratuit pour les associations)

1. Créez un compte sur <https://vercel.com>.
2. Importez le dépôt Git.
3. Vercel détecte automatiquement Next.js — cliquez sur **Deploy**.
4. Ajoutez le domaine `mosquee-montataire.fr` dans **Settings → Domains**.

### Netlify

1. Créez un compte sur <https://netlify.com>.
2. **New site → Import from Git**.
3. Build command : `npm run build`
4. Publish directory : `.next`

### Autre hébergeur (VPS, OVH, etc.)

Le site est totalement statique après `npm run build` (sauf le formulaire de contact qui nécessite une route API). Vous pouvez :

- Soit lancer un serveur Node :
  ```bash
  npm run build
  npm run start
  ```
  (puis configurer un reverse proxy Nginx vers le port 3000)

- Soit exporter en HTML statique en activant `output: 'export'` dans `next.config.js` (mais le formulaire de contact ne fonctionnera plus en API route — il faudra utiliser un service tiers comme Formspree).

---

## ✅ Checklist de mise en ligne

Avant de mettre en ligne, vérifiez :

- [ ] **Email de contact** renseigné dans `config/site.ts` (`contact.email`)
- [ ] **Formulaire de contact** branché à un vrai service email (voir section dédiée)
- [ ] **Liens GoCardless** vérifiés et à jour (`config/donations.ts`)
- [ ] **Liens HelloAsso / Cotizup / Tally** vérifiés et à jour
- [ ] **Liens Masjidbox** vérifiés (`config/site.ts`)
- [ ] **Liens Google Play / App Store** à jour (`config/app.ts`)
- [ ] **Replays YouTube** ajoutés avec les vrais `youtubeId` (`config/replay.ts`)
- [ ] **Polices Google Fonts** activées (voir section Personnalisation)
- [ ] **Favicon** ajouté dans `public/` (`favicon.ico`, `apple-touch-icon.png`)
- [ ] **OG Image** ajoutée dans `public/og-image.png` pour le partage social
- [ ] **Variables d'environnement** configurées (`.env.local` pour Resend, etc.)
- [ ] **DNS** du domaine `mosquee-montataire.fr` pointé vers l'hébergeur
- [ ] **HTTPS** activé (automatique sur Vercel/Netlify)
- [ ] **Analytics** (optionnel) — ajouter Plausible ou Umami, à éviter Google Analytics (RGPD)
- [ ] **Mentions légales** et **Politique de confidentialité** relues et complétées
- [ ] **Tests** sur mobile, tablette, desktop dans plusieurs navigateurs (Chrome, Safari, Firefox)
- [ ] **Lighthouse** lancé pour valider performance, accessibilité, SEO

---

## 🛠️ Scripts npm

| Commande         | Description                                          |
|------------------|------------------------------------------------------|
| `npm run dev`    | Lance le serveur de développement (port 3000)        |
| `npm run build`  | Build de production (HTML statique généré)           |
| `npm run start`  | Lance le serveur de production                       |
| `npm run lint`   | Vérifie la qualité du code (ESLint + TypeScript)     |

---

## 📚 Pour aller plus loin

- **Documentation Next.js** : <https://nextjs.org/docs>
- **Documentation Tailwind** : <https://tailwindcss.com/docs>
- **Icônes Lucide** : <https://lucide.dev/icons>
- **Resend (envoi d'email)** : <https://resend.com/docs>

---

## 📝 Licence

Code source propriété de l'**Association Cultuelle des Musulmans De Montataire (ACMDM)**. Toute reproduction sans autorisation est interdite.

Les images, logos, photographies et contenus rédactionnels sont également la propriété de l'ACMDM.

---

**🤲 Qu'Allah récompense tous ceux qui contribuent à ce projet et à la pérennité de la mosquée.**
