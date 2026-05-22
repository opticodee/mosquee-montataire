import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  size?: "sm" | "md" | "lg" | "xl";
  spacing?: "sm" | "md" | "lg";
  background?: "white" | "cream" | "primary" | "dark";
  id?: string;
};

export function Section({
  children,
  className,
  containerClassName,
  size = "lg",
  spacing = "lg",
  background = "white",
  id,
}: SectionProps) {
  const spacings = {
    sm: "py-10 sm:py-14",
    md: "py-14 sm:py-20",
    lg: "py-16 sm:py-24",
  };
  const backgrounds = {
    white: "bg-white",
    cream: "bg-cream",
    primary: "bg-primary-50",
    dark: "bg-primary-900 text-cream",
  };
  return (
    <section
      id={id}
      className={cn(spacings[spacing], backgrounds[background], className)}
    >
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-semibold uppercase tracking-wider",
            light ? "text-gold-light" : "text-primary-500",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]",
          light ? "text-cream" : "text-primary-700",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed",
            light ? "text-cream/80" : "text-ink-muted",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
