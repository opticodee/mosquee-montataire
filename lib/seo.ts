import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type SeoProps = {
  title: string;
  description: string;
  path?: string; // ex : "/dons-mensuels"
  image?: string;
  noIndex?: boolean;
};

/**
 * Construit les métadonnées Next.js pour une page donnée.
 * Utilisation :
 *   export const metadata = buildMetadata({ title: "...", description: "...", path: "/..." });
 */
export function buildMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: SeoProps): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = `${title} — ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      site: "@ACMDMOFFICIELLE",
      images: image ? [image] : undefined,
    },
  };
}
