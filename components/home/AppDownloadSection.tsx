import { Smartphone, Bell, BookMarked, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { appConfig } from "@/config/app";

export function AppDownloadSection() {
  return (
    <Section background="white" spacing="lg">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        {/* Mockup téléphone à gauche */}
        <div className="order-2 lg:order-1 flex justify-center">
          <PhoneMockup />
        </div>

        {/* Texte à droite */}
        <div className="order-1 lg:order-2">
          <Badge variant="soft" className="mb-4">
            Application mobile
          </Badge>
          <h2 className="font-display text-3xl font-bold leading-tight text-primary-700 sm:text-4xl lg:text-5xl">
            Restez toujours connecté à{" "}
            <span className="text-gold">votre mosquée</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-ink-muted">
            Téléchargez l&apos;application <strong>ACMDM</strong> pour
            consulter les horaires de prière, les actualités, le verset du
            jour et bien plus encore.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {[
              { icon: Clock, label: "Horaires de prière" },
              { icon: Bell, label: "Notifications" },
              { icon: BookMarked, label: "Verset du jour" },
              { icon: Smartphone, label: "Quiz Islam" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl bg-primary-50 px-4 py-3"
                >
                  <Icon
                    className="h-5 w-5 shrink-0 text-primary-500"
                    aria-hidden="true"
                  />
                  <span className="font-medium text-primary-700">
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={appConfig.googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-xl bg-primary-900 px-5 py-3 text-white shadow-soft transition-all hover:bg-primary-700 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M3 20.5V3.5c0-.31.16-.59.41-.75l10.5 8.75-10.5 8.75c-.25-.16-.41-.44-.41-.75zM16.7 12L14 9.7 6.5 4 17.4 10.3 16.7 12zM21 12.5c0 .35-.18.67-.48.85L18 14.7l-2.4-2.7L18 9.3l2.52 1.35c.3.18.48.5.48.85zM6.5 20l8-4.7 2.2 2.3-10.7 6c-.17.1-.34.15-.5.15v-3.75z" />
              </svg>
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase tracking-wider opacity-80">
                  Disponible sur
                </div>
                <div className="font-display text-base font-bold">
                  Google Play
                </div>
              </div>
            </a>

            <a
              href={appConfig.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-xl bg-primary-900 px-5 py-3 text-white shadow-soft transition-all hover:bg-primary-700 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase tracking-wider opacity-80">
                  Télécharger sur
                </div>
                <div className="font-display text-base font-bold">
                  App Store
                </div>
              </div>
            </a>
          </div>

          <Button href="/application" variant="ghost" className="mt-4">
            En savoir plus sur l&apos;application
          </Button>
        </div>
      </div>
    </Section>
  );
}

function PhoneMockup() {
  return (
    <div className="relative">
      {/* Halo */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(25,135,84,0.4) 0%, transparent 70%)",
        }}
      />
      <div className="relative w-[280px] rounded-[2.5rem] border-[10px] border-primary-900 bg-primary-900 shadow-elevated">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
          {/* Encoche */}
          <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-primary-900" />

          {/* Pattern fond */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-20 pattern-arabesque pointer-events-none"
          />

          {/* Contenu écran */}
          <div className="relative h-full p-5 pt-10 text-cream flex flex-col">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-wider text-gold-light">
                ACMDM
              </p>
              <p className="mt-1 font-display text-base font-bold">
                Mosquée Montataire
              </p>
            </div>

            <div className="mt-5 rounded-2xl bg-white/10 backdrop-blur-sm p-4">
              <p className="text-[10px] uppercase tracking-wider text-cream/70">
                Prochaine prière
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-gold-light">
                ʿAsr
              </p>
              <p className="text-xs text-cream/80">Dans 2h 14min</p>
            </div>

            <div className="mt-4 space-y-2">
              {["Fajr", "Dhouhr", "ʿAsr", "Maghrib", "ʿIshāʾ"].map(
                (prayer, idx) => (
                  <div
                    key={prayer}
                    className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs"
                  >
                    <span className="font-semibold">{prayer}</span>
                    <span className="text-cream/70">--:--</span>
                  </div>
                ),
              )}
            </div>

            <div className="mt-auto pt-4 grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-white/10 py-2 text-center text-[10px]">
                Horaires
              </div>
              <div className="rounded-lg bg-gold py-2 text-center text-[10px] font-semibold text-primary-900">
                Actu
              </div>
              <div className="rounded-lg bg-white/10 py-2 text-center text-[10px]">
                Verset
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
