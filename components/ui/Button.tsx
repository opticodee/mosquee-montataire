import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "gold" | "white";
type Size = "sm" | "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 shadow-soft hover:shadow-elevated",
  secondary:
    "bg-primary-700 text-white hover:bg-primary-800 shadow-soft",
  outline:
    "bg-transparent text-primary-700 border-2 border-primary-700 hover:bg-primary-700 hover:text-white",
  ghost:
    "bg-transparent text-primary-700 hover:bg-primary-50",
  gold:
    "bg-gold text-white hover:bg-gold-dark shadow-soft hover:shadow-elevated",
  white:
    "bg-white text-primary-700 hover:bg-cream shadow-soft",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-base rounded-xl gap-2",
  lg: "px-6 py-3.5 text-base sm:text-lg rounded-xl gap-2",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  ariaLabel?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseStyles =
  "inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  props,
  ref,
) {
  const { variant = "primary", size = "md", className, children, fullWidth } =
    props;

  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href) {
    const { href, external, ariaLabel } = props;
    const isExternal =
      external ?? (href.startsWith("http") || href.startsWith("mailto:"));
    if (isExternal) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  // Cas bouton natif - on retire les props gérées par le composant
  const buttonProps = props as ButtonAsButton;
  const { ...rest } = {
    ...buttonProps,
    variant: undefined,
    size: undefined,
    fullWidth: undefined,
    className: undefined,
  };
  // Nettoyer les undefined
  const cleanRest: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(rest)) {
    if (v !== undefined) cleanRest[k] = v;
  }
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...cleanRest}
    >
      {children}
    </button>
  );
});
