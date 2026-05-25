"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = sessionStorage.getItem("acmdm_sid");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("acmdm_sid", id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

export function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith("/admin")) return;

    const session_id = getSessionId();

    let referrer: string | null = null;
    try {
      if (document.referrer) {
        const ref = new URL(document.referrer);
        referrer =
          ref.origin === window.location.origin ? ref.pathname : ref.hostname;
      }
    } catch {
      referrer = null;
    }

    // Ping silencieux (sendBeacon = ne bloque pas la navigation)
    const body = JSON.stringify({ session_id, path: pathname, referrer });
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/track", blob);
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
