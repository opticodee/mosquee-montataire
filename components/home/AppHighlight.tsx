import { Apple, BookOpen, Clock, Newspaper, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { appConfig } from "@/config/app";

const features = [
  { icon: Clock, label: "Horaires de prière" },
  { icon: Newspaper, label: "Actualités" },
  { icon: Sparkles, label: "Quizz Islam" },
  { icon: BookOpen, label: "Verset du jour" },
];

export function AppHighlight() {
  return (
    <Section background="cream" spacing="lg">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Colonne texte */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-500">
            Application mobile
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight text-primary-700 sm:text-4xl lg:text-5xl">
            Pour être toujours connecté à votre mosquée
          </h2>
          <p className="mt-5 text-ink-muted leading-relaxed">
            Téléchargez notre application ACMDM pour profiter des horaires de
            prières de la mosquée, des actualités, des quizz sur l&apos;Islam,
            du verset du jour et bien plus encore.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {features.map((item) => {
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
                  GET IT ON
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
              <Apple className="h-7 w-7" aria-hidden="true" />
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase tracking-wider opacity-80">
                  Download on the
                </div>
                <div className="font-display text-base font-bold">
                  App Store
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Colonne mockup téléphone */}
        <div className="hidden lg:flex justify-center">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-full opacity-30 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(201,162,39,0.4) 0%, transparent 70%)",
              }}
            />
            <div className="relative w-[300px] mx-auto rounded-[2.5rem] border-[10px] border-primary-900 bg-primary-900 shadow-elevated">
              <div className="relative aspect-[9/19] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
                <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-primary-900" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-20 pattern-arabesque pointer-events-none"
                />

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
                      (prayer) => (
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
