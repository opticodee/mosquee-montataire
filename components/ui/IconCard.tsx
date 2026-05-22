import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconCardProps = {
  title: string;
  description?: string;
  href: string;
  icon: LucideIcon;
  accent?: "primary" | "gold";
  external?: boolean;
};

export function IconCard({
  title,
  description,
  href,
  icon: Icon,
  accent = "primary",
  external = false,
}: IconCardProps) {
  const accentClasses =
    accent === "gold"
      ? "bg-gold/10 text-gold-dark group-hover:bg-gold group-hover:text-white"
      : "bg-primary-50 text-primary-500 group-hover:bg-primary-500 group-hover:text-white";

  const Wrapper: React.ElementType = external ? "a" : Link;
  const linkProps = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <Wrapper
      {...linkProps}
      className="group block rounded-2xl bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
    >
      <div
        className={cn(
          "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300",
          accentClasses,
        )}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="font-display text-lg font-semibold text-primary-700">
        {title}
      </h3>
      {description && (
        <p className="mt-1 text-sm text-ink-muted">{description}</p>
      )}
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-500 group-hover:gap-2 transition-all">
        Découvrir
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Wrapper>
  );
}
