import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { services } from "@/config/services";

export function ServicesSection() {
  return (
    <Section background="white" spacing="lg">
      <SectionHeading
        eyebrow="Nos services"
        title="Une mosquée vivante au quotidien"
        description="Bien plus qu'un lieu de prière : un centre de vie, d'enseignement et de rencontres au service de la communauté."
        align="center"
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Card
              key={service.title}
              variant="outlined"
              hover
              padding="md"
              className="text-center"
            >
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-display text-base font-bold text-primary-700">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                {service.description}
              </p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
