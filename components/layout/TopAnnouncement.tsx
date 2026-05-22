import Link from "next/link";
import { Megaphone, ArrowRight } from "lucide-react";

export function TopAnnouncement() {
  return (
    <div className="bg-gold text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5 text-center text-sm">
        <Megaphone className="h-4 w-4 shrink-0" aria-hidden="true" />
        <p className="font-medium">
          <span className="hidden sm:inline">
            Projet éducatif : participons ensemble à l&apos;ouverture du lycée.
          </span>
          <span className="sm:hidden">Projet éducatif — lycée</span>{" "}
          <Link
            href="/projet-lycee"
            className="inline-flex items-center gap-1 font-bold underline-offset-2 hover:underline"
          >
            Découvrir le projet
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </p>
      </div>
    </div>
  );
}
