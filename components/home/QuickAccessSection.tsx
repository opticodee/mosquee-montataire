import { Section, SectionHeading } from "@/components/ui/Section";
import { IconCard } from "@/components/ui/IconCard";
import { quickAccessItems } from "@/config/services";

export function QuickAccessSection() {
  return (
    <Section background="white" spacing="lg">
      <SectionHeading
        eyebrow="Accès rapide"
        title="Tout ce dont vous avez besoin"
        description="Un accès direct aux services principaux de la mosquée."
        align="center"
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {quickAccessItems.map((item) => (
          <IconCard
            key={item.href}
            title={item.title}
            description={item.description}
            href={item.href}
            icon={item.icon}
            accent={item.accent}
          />
        ))}
      </div>
    </Section>
  );
}
