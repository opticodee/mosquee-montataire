import Link from "next/link";
import { PlayCircle, Youtube, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/config/site";

export function ReplayHighlight() {
  return (
    <Section background="cream" spacing="lg">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <SectionHeading
            eyebrow="Discours & Jumu'a"
            title="Écoutez les discours en replay"
            description="Retrouvez tous les Jumu'a et discours de la mosquée de Montataire en replay, directement depuis notre site ou notre chaîne YouTube officielle."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/replay" variant="primary" size="lg">
              <PlayCircle className="h-5 w-5" aria-hidden="true" />
              Voir tous les replays
            </Button>
            <Button
              href={siteConfig.socialLinks.youtube}
              external
              variant="outline"
              size="lg"
            >
              <Youtube className="h-5 w-5" aria-hidden="true" />
              Chaîne YouTube
            </Button>
          </div>
        </div>

        {/* Mockup décoratif lecteur vidéo */}
        <div className="relative">
          <div className="rounded-2xl bg-primary-900 p-3 shadow-elevated">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-primary-700 to-primary-900">
              {/* Pattern */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-20 pattern-arabesque pointer-events-none"
              />

              {/* Play button central */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold shadow-2xl ring-4 ring-gold/30">
                  <PlayCircle
                    className="h-10 w-10 text-white"
                    aria-hidden="true"
                    fill="currentColor"
                  />
                </div>
              </div>

              {/* Badge LIVE / replay */}
              <div className="absolute left-4 top-4">
                <Badge variant="gold" size="sm">
                  Replays disponibles
                </Badge>
              </div>

              {/* Barre du bas */}
              <div className="absolute inset-x-4 bottom-4 rounded-lg bg-black/40 backdrop-blur-sm p-3">
                <p className="text-xs uppercase tracking-wider text-gold-light/80">
                  Dernière Jumu&apos;a
                </p>
                <p className="text-sm font-semibold text-cream">
                  Discours du vendredi
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/replay"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 hover:text-primary-600"
          >
            Découvrir tous les contenus
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
