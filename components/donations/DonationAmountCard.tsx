import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MonthlyDonation } from "@/config/donations";

type DonationAmountCardProps = {
  donation: MonthlyDonation;
  type?: "monthly" | "once";
};

export function DonationAmountCard({
  donation,
  type = "monthly",
}: DonationAmountCardProps) {
  const suffix = type === "monthly" ? "/ mois" : "ponctuel";
  const isPopular = donation.badge === "popular";

  return (
    <a
      href={donation.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex flex-col rounded-2xl border-2 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated",
        isPopular
          ? "border-gold shadow-elevated"
          : "border-primary-100 hover:border-primary-300",
      )}
    >
      {donation.badge === "popular" && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white whitespace-nowrap shadow-md">
          Le plus choisi
        </span>
      )}
      {donation.badge === "recommended" && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-700 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white whitespace-nowrap shadow-md">
          Recommandé
        </span>
      )}
      <div className="flex items-baseline gap-1.5">
        <p className="font-display text-4xl font-bold text-primary-700">
          {donation.amount} €
        </p>
        <p className="text-sm font-medium text-ink-muted">{suffix}</p>
      </div>
      <p className="mt-3 text-sm text-ink leading-relaxed flex-1">
        {donation.impact}
      </p>
      <span
        className={cn(
          "mt-5 inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all",
          isPopular ? "text-gold-dark" : "text-primary-500",
        )}
      >
        Donner ce montant
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </a>
  );
}
