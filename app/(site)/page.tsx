import { HeroSection } from "@/components/home/HeroSection";
import { AppHighlight } from "@/components/home/AppHighlight";
import { QuickAccessSection } from "@/components/home/QuickAccessSection";
import { ProjectHighlight } from "@/components/home/ProjectHighlight";
import { MonthlyDonationHighlight } from "@/components/home/MonthlyDonationHighlight";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ReplayHighlight } from "@/components/home/ReplayHighlight";
import { AssociationPreview } from "@/components/home/AssociationPreview";
import { ContactPreview } from "@/components/home/ContactPreview";
import { NewsSection } from "@/components/home/NewsSection";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <NewsSection />
      <ProjectHighlight />
      <AppHighlight />
      <QuickAccessSection />
      <MonthlyDonationHighlight />
      <ServicesSection />
      <ReplayHighlight />
      <AssociationPreview />
      <ContactPreview />
    </>
  );
}
