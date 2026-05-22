import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
  variant?: "white" | "cream" | "outlined" | "dark" | "gradient";
};

const paddings = {
  sm: "p-5",
  md: "p-6 sm:p-7",
  lg: "p-7 sm:p-9",
};

const variants = {
  white: "bg-white",
  cream: "bg-cream",
  outlined: "bg-white border border-primary-100",
  dark: "bg-primary-800 text-cream",
  gradient:
    "bg-gradient-to-br from-primary-700 to-primary-900 text-cream",
};

export function Card({
  children,
  className,
  hover = false,
  padding = "md",
  variant = "white",
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl shadow-soft",
        variants[variant],
        paddings[padding],
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated",
        className,
      )}
    >
      {children}
    </div>
  );
}
