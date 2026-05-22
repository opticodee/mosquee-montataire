"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

const SCRIPT_ID = "masjidbox-loader";
const SCRIPT_SRC = "https://masjidbox.com/widgets/loader.js";
const WIDGET_TOKEN = "HgweNf5HvhXwVEipnWtS4";
const FALLBACK_URL =
  "https://masjidbox.com/horaires-de-priere/mosquee-de-montataire";

export function MasjidboxWidget() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!document.getElementById(SCRIPT_ID)) {
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.async = true;
      s.defer = true;
      s.src = SCRIPT_SRC;
      document.body.appendChild(s);
    }

    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      if (container.querySelector("iframe")) {
        setLoaded(true);
        observer.disconnect();
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="masjidbox-wrapper relative min-h-[500px] w-full overflow-hidden rounded-2xl bg-white"
    >
      {!loaded && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink-muted"
          aria-hidden="true"
        >
          <Loader2 className="h-7 w-7 animate-spin text-primary-500" />
          <p className="text-sm">Chargement des horaires…</p>
        </div>
      )}
      <a
        data-masjidbox-widget={WIDGET_TOKEN}
        data-masjidbox-ifr=""
        href={FALLBACK_URL}
      >
        Horaires de prière Mosquée de Montataire
      </a>
    </div>
  );
}
