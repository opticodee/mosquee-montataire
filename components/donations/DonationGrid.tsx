import { DonationAmountCard } from "./DonationAmountCard";
import type { MonthlyDonation } from "@/config/donations";

type DonationGridProps = {
  donations: MonthlyDonation[];
  type?: "monthly" | "once";
};

export function DonationGrid({ donations, type = "monthly" }: DonationGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {donations.map((donation) => (
        <DonationAmountCard
          key={donation.amount}
          donation={donation}
          type={type}
        />
      ))}
    </div>
  );
}
