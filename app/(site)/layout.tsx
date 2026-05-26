import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TopAnnouncement } from "@/components/layout/TopAnnouncement";
import { Tracker } from "@/components/analytics/Tracker";

export const dynamic = "force-dynamic";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Tracker />
      <TopAnnouncement />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
