import { Section, SectionHeading } from "@/components/ui/Section";
import { getActiveNews } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export async function NewsSection() {
  const items = await getActiveNews();
  if (items.length === 0) return null;

  const gridClass = cn(
    "mt-10 grid gap-6",
    items.length === 1 && "mx-auto max-w-2xl",
    items.length === 2 && "mx-auto max-w-4xl md:grid-cols-2",
    items.length === 3 && "md:grid-cols-3",
  );

  return (
    <Section background="cream" spacing="lg">
      <SectionHeading
        eyebrow="Actualités"
        title="Dernières actualités"
        align="center"
      />
      <div className={gridClass}>
        {items.map((news) => (
          <article
            key={news.slot}
            className="rounded-2xl border border-primary-100 bg-white p-6 shadow-soft"
          >
            {news.title && (
              <h3 className="font-display text-xl font-bold text-primary-700">
                {news.title}
              </h3>
            )}
            {/*
              dangerouslySetInnerHTML est utilisé volontairement : seul
              l'admin authentifié peut éditer ce HTML depuis le panel
              admin protégé par mot de passe. Le risque XSS est donc
              limité au compte admin.
            */}
            <div
              className={cn(
                "news-content text-ink-muted leading-relaxed",
                news.title && "mt-3",
              )}
              dangerouslySetInnerHTML={{ __html: news.html }}
            />
          </article>
        ))}
      </div>
    </Section>
  );
}
