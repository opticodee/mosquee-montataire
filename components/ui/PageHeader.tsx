import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

type Breadcrumb = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  breadcrumbs?: Breadcrumb[];
  variant?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

export function PageHeader({
  title,
  description,
  eyebrow,
  breadcrumbs,
  variant = "light",
  align = "left",
  className,
}: PageHeaderProps) {
  const isDark = variant === "dark";

  return (
    <header
      className={cn(
        "relative overflow-hidden",
        isDark
          ? "bg-dark-pattern bg-primary-900 text-cream"
          : "bg-hero-pattern bg-cream",
        className,
      )}
    >
      {/* Décor géométrique discret */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(circle at 90% 10%, rgba(201,162,39,0.15), transparent 40%)"
            : "radial-gradient(circle at 90% 10%, rgba(25,135,84,0.1), transparent 40%)",
        }}
      />
      <Container className="relative py-14 sm:py-20">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Fil d'Ariane"
            className={cn(
              "mb-6 flex items-center gap-1.5 text-sm",
              isDark ? "text-cream/70" : "text-ink-muted",
              align === "center" && "justify-center",
            )}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:underline"
              aria-label="Accueil"
            >
              <Home className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:underline">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

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
                isDark ? "text-gold-light" : "text-primary-500",
              )}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className={cn(
              "font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl",
              isDark ? "text-cream" : "text-primary-700",
            )}
          >
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                "mt-5 text-base sm:text-lg lg:text-xl leading-relaxed",
                isDark ? "text-cream/85" : "text-ink-muted",
              )}
            >
              {description}
            </p>
          )}
        </div>
      </Container>
    </header>
  );
}
