import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "primary" | "gold" | "outline" | "soft";
  className?: string;
  size?: "sm" | "md";
};

const variants = {
  primary: "bg-primary-500 text-white",
  gold: "bg-gold text-white",
  outline: "border border-primary-200 text-primary-700 bg-white",
  soft: "bg-primary-50 text-primary-700",
};

const sizes = {
  sm: "px-2.5 py-0.5 text-[11px]",
  md: "px-3 py-1 text-xs",
};

export function Badge({
  children,
  variant = "primary",
  className,
  size = "md",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold uppercase tracking-wider rounded-full",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
