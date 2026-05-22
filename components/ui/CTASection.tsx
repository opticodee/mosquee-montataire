import { Button } from "./Button";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

type CTAAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline" | "gold" | "white";
  external?: boolean;
};

type CTASectionProps = {
  title: string;
  description?: string;
  primary?: CTAAction;
  secondary?: CTAAction;
  variant?: "dark" | "primary" | "gold";
  className?: string;
};

export function CTASection({
  title,
  description,
  primary,
  secondary,
  variant = "dark",
  className,
}: CTASectionProps) {
  const variants = {
    dark: "bg-primary-900 text-cream",
    primary: "bg-primary-700 text-cream",
    gold: "bg-gradient-to-br from-gold to-gold-dark text-white",
  };

  return (
    <section className={cn("py-16 sm:py-20", variants[variant], className)}>
      <Container size="md" className="text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg opacity-90">
            {description}
          </p>
        )}
        {(primary || secondary) && (
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {primary && (
              <Button
                href={primary.href}
                external={primary.external}
                variant={primary.variant ?? (variant === "gold" ? "white" : "gold")}
                size="lg"
              >
                {primary.label}
              </Button>
            )}
            {secondary && (
              <Button
                href={secondary.href}
                external={secondary.external}
                variant={secondary.variant ?? "outline"}
                size="lg"
                className={cn(
                  variant !== "gold" &&
                    "!border-white !text-white hover:!bg-white hover:!text-primary-700",
                )}
              >
                {secondary.label}
              </Button>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
