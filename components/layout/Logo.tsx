import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  light?: boolean;
};

/**
 * Logo officiel de la Mosquée de Montataire (ACMDM).
 * L'image se trouve dans /public/logo.png
 */
export function Logo({ className, light = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "relative h-11 w-11 shrink-0 overflow-hidden rounded-xl",
          light ? "bg-white/10 backdrop-blur-sm p-1" : "bg-white p-1 shadow-soft",
        )}
      >
        <Image
          src="/logo.png"
          alt="Logo ACMDM"
          width={64}
          height={64}
          priority
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-display text-base font-bold",
            light ? "text-cream" : "text-primary-700",
          )}
        >
          Mosquée de Montataire
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-wider",
            light ? "text-gold-light" : "text-gold",
          )}
        >
          ACMDM
        </span>
      </div>
    </div>
  );
}
