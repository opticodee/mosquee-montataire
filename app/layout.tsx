import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TopAnnouncement } from "@/components/layout/TopAnnouncement";
import { siteConfig } from "@/config/site";

/**
 * Polices :
 * - On utilise des polices système avec fallback robuste pour rester rapides
 *   et fonctionner hors-ligne. Pour utiliser Google Fonts en production,
 *   décommentez le bloc next/font ci-dessous et remettez les classes du <html>.
 *
 * import { Inter, Playfair_Display } from "next/font/google";
 * const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
 * const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display", display: "swap" });
 */

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Lieu de prière, d'enseignement et de rassemblement`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Mosquée Montataire",
    "Mosquée de Montataire",
    "ACMDM",
    "horaires prière Montataire",
    "Jumua Montataire",
    "dons mosquée Montataire",
    "Coran audio Montataire",
    "association musulmane Montataire",
    "traduction Jumua français",
    "imam Hassan El Montasser",
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    site: "@ACMDMOFFICIELLE",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#0F3D2E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col bg-white text-ink antialiased">
        <TopAnnouncement />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
