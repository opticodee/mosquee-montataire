import { Youtube, ExternalLink, Languages } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/ui/CTASection";
import { ReplayGrid } from "@/components/replay/ReplayGrid";
import { youtubeChannelUrl } from "@/config/replay";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Replay Discours et Jumu'a",
  description:
    "Réécoutez tous les Jumu'a, discours et conférences de la Mosquée de Montataire. Filtrez par catégorie et par langue pour retrouver le contenu qui vous intéresse.",
  path: "/replay",
});

export default function ReplayPage() {
  return (
    <>
      <PageHeader
        eyebrow="Discours & Jumu'a"
        title="Replay des discours et Jumu'a"
        description="Retrouvez tous les Jumu'a et discours de la mosquée de Montataire en replay, classés par catégorie et par langue."
        breadcrumbs={[{ label: "Replay" }]}
      />

      <Section background="cream" spacing="lg">
        <ReplayGrid />

        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <p className="text-ink-muted max-w-2xl">
            Tous nos discours sont publiés sur notre chaîne YouTube officielle.
            Abonnez-vous pour ne manquer aucune publication.
          </p>
          <Button
            href={youtubeChannelUrl}
            external
            variant="primary"
            size="lg"
          >
            <Youtube className="h-5 w-5" aria-hidden="true" />
            Voir tous les contenus sur YouTube
            <ExternalLink className="h-4 w-4 opacity-70" aria-hidden="true" />
          </Button>
        </div>
      </Section>

      <CTASection
        title="Suivre les discours en direct"
        description="La traduction française est disponible en direct sur votre téléphone pendant les Jumu'a et discours."
        primary={{
          label: "Traduction en direct",
          href: "/traduction-en-direct",
          variant: "gold",
        }}
        secondary={{
          label: "Coran audio",
          href: "/coran-audio",
        }}
      />
    </>
  );
}
