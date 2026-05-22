import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream">
      <div className="relative h-24 w-24 animate-pulse">
        <Image
          src="/logo.png"
          alt="Chargement — Mosquée de Montataire"
          fill
          sizes="96px"
          className="object-contain"
          priority
        />
      </div>
      <p className="mt-6 font-display text-base font-semibold text-primary-700">
        Chargement…
      </p>
      <div className="mt-4 h-1 w-32 overflow-hidden rounded-full bg-primary-100">
        <div className="h-full w-1/3 animate-[loading-bar_1.2s_ease-in-out_infinite] rounded-full bg-gold" />
      </div>
    </div>
  );
}
