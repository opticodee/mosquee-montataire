import Link from "next/link";
import Image from "next/image";
import { Clock, Heart, Languages, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary-900 text-cream">
      {/* Image de fond : salle de prière */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src="/hero-salle.jpg"
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Voile sombre pour lisibilité - dégradé multi-couches */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-primary-900/95 via-primary-900/80 to-primary-900/95"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/50 to-primary-900/70"
      />

      {/* Pattern arabesque très subtil par-dessus */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] pattern-arabesque pointer-events-none"
      />

      {/* Halo doré en haut à droite */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-[60%] w-[60%] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(201,162,39,0.55) 0%, transparent 70%)",
        }}
      />

      <Container className="relative py-16 sm:py-24 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Texte principal */}
          <div className="animate-fade-up">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-light backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              السلام عليكم — As-salāmu ʿalaykum
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.1] text-cream drop-shadow-lg sm:text-5xl lg:text-6xl">
              Bienvenue à la{" "}
              <span className="text-gold-light">Mosquée de Montataire</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/90 drop-shadow sm:text-xl">
              Un lieu de prière, de transmission et de rassemblement au service
              de la communauté depuis {siteConfig.history.foundedYear}.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/horaires" variant="gold" size="lg">
                <Clock className="h-5 w-5" aria-hidden="true" />
                Voir les horaires
              </Button>
              <Button href="/dons-mensuels" variant="white" size="lg">
                <Heart className="h-5 w-5" aria-hidden="true" />
                Faire un don
              </Button>
              <Button
                href="/traduction-en-direct"
                variant="outline"
                size="lg"
                className="!border-cream/50 !text-cream backdrop-blur-sm hover:!bg-cream hover:!text-primary-700"
              >
                <Languages className="h-5 w-5" aria-hidden="true" />
                Traduction en direct
              </Button>
            </div>

            {/* Indicateurs */}
            <div className="mt-12 grid max-w-md grid-cols-3 gap-4">
              <Stat value={`${siteConfig.history.foundedYear}`} label="Fondée en" />
              <Stat value={`${siteConfig.history.surfaceSqm} m²`} label="Surface" />
              <Stat
                value={siteConfig.history.capacity.toLocaleString("fr-FR")}
                label="Capacité"
              />
            </div>
          </div>

          {/* Carte adresse à droite */}
          <div className="relative hidden lg:block animate-fade-up">
            <AddressCard />
          </div>
        </div>
      </Container>

      {/* Dégradé de fondu en bas pour la transition douce avec la section suivante */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-primary-900"
      />
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-bold text-gold-light drop-shadow sm:text-3xl">
        {value}
      </p>
      <p className="text-xs uppercase tracking-wider text-cream/70">{label}</p>
    </div>
  );
}

function AddressCard() {
  return (
    <div className="relative mx-auto max-w-md">
      <div className="relative rounded-3xl border border-cream/20 bg-primary-900/40 p-8 backdrop-blur-md shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-gold-light/90">
              Notre adresse
            </p>
            <p className="mt-2 font-display text-xl font-semibold text-cream">
              147 bis rue Louis Blanc
            </p>
            <p className="text-cream/80">60160 Montataire</p>
          </div>
          <div className="shrink-0 rounded-xl bg-gold/20 p-2.5">
            <MapPin className="h-5 w-5 text-gold-light" aria-hidden="true" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <InfoBlock label="Capacité" value="2 500" />
          <InfoBlock label="Surface" value="1 250 m²" />
          <InfoBlock label="Parkings" value="2" />
        </div>

        <Link
          href={siteConfig.externalLinks.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-light hover:text-gold"
        >
          Obtenir un itinéraire
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/5 px-3 py-2.5 text-center backdrop-blur-sm">
      <p className="font-display text-base font-bold text-gold-light">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-cream/60">
        {label}
      </p>
    </div>
  );
}
