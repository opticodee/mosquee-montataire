import { GraduationCap, Heart, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { projectDonation } from "@/config/donations";

export function ProjectHero() {
  return (
    <section className="relative overflow-hidden bg-primary-900 text-cream">
      <div aria-hidden="true" className="absolute inset-0 bg-dark-pattern" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18] pattern-arabesque pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-[70%] w-[60%] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(201,162,39,0.5) 0%, transparent 70%)",
        }}
      />

      <Container className="relative py-16 sm:py-24 lg:py-32">
        <div className="max-w-3xl">
          <Badge variant="gold" className="mb-5">
            <GraduationCap className="mr-1 h-3 w-3" aria-hidden="true" />
            Projet Ramadan 2026
          </Badge>
          <h1 className="font-display text-4xl font-bold leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
            Projet lycée :{" "}
            <span className="text-gold-light">
              bâtissons l&apos;avenir de nos enfants
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-cream/85">
            Agrandissement du collège et ouverture du lycée : un projet
            essentiel pour notre communauté, pour l&apos;éducation et
            l&apos;identité de nos jeunes.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button
              href={projectDonation.oneTimeUrl}
              external
              variant="gold"
              size="lg"
            >
              <Heart className="h-5 w-5" aria-hidden="true" />
              Participer en 1 fois
              <ExternalLink className="h-4 w-4 opacity-70" aria-hidden="true" />
            </Button>
            <Button
              href={projectDonation.installmentUrl}
              external
              variant="outline"
              size="lg"
              className="!border-cream/40 !text-cream hover:!bg-cream hover:!text-primary-700"
            >
              Participer en plusieurs fois
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
