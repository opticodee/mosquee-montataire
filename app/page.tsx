import { HeroSection } from "@/components/home/HeroSection";
import { PrayerTimesPreview } from "@/components/home/PrayerTimesPreview";
import { QuickAccessSection } from "@/components/home/QuickAccessSection";
import { ProjectHighlight } from "@/components/home/ProjectHighlight";
import { MonthlyDonationHighlight } from "@/components/home/MonthlyDonationHighlight";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ReplayHighlight } from "@/components/home/ReplayHighlight";
import { AppDownloadSection } from "@/components/home/AppDownloadSection";
import { AssociationPreview } from "@/components/home/AssociationPreview";
import { ContactPreview } from "@/components/home/ContactPreview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PrayerTimesPreview />
      <QuickAccessSection />
      <ProjectHighlight />
      <MonthlyDonationHighlight />
      <ServicesSection />
      <ReplayHighlight />
      <AppDownloadSection />
      <AssociationPreview />
      <ContactPreview />
    </>
  );
}
