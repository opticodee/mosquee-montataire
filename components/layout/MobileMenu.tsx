"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Heart } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import {
  mainNavigation,
  isNavGroup,
  type NavItem,
} from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>("Dons");
  const pathname = usePathname();

  // Fermer le menu lors d'un changement de page
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Bloquer le scroll body
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Fermer avec ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-primary-700 hover:bg-primary-50 lg:hidden"
        aria-label="Ouvrir le menu"
        aria-expanded={open}
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-primary-900/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Panneau */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-[60] flex w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
      >
        <div className="flex items-center justify-between border-b border-primary-100 p-4">
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-primary-700 hover:bg-primary-50"
            aria-label="Fermer le menu"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <nav
          className="flex-1 overflow-y-auto px-3 py-4"
          aria-label="Navigation mobile"
        >
          <ul className="space-y-1">
            {mainNavigation.map((item) => {
              if (isNavGroup(item)) {
                const isOpen = expanded === item.label;
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded(isOpen ? null : item.label)
                      }
                      className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-semibold text-primary-700 hover:bg-primary-50"
                      aria-expanded={isOpen}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          isOpen && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <ul className="ml-3 mt-1 space-y-0.5 border-l-2 border-primary-100 pl-3">
                        {item.items.map((sub: NavItem) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              className={cn(
                                "block rounded-lg px-3 py-2 text-sm",
                                pathname === sub.href
                                  ? "bg-primary-50 text-primary-700 font-semibold"
                                  : "text-ink hover:bg-primary-50 hover:text-primary-700",
                              )}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-xl px-3 py-3 text-base font-medium",
                      pathname === item.href
                        ? "bg-primary-50 text-primary-700 font-semibold"
                        : "text-ink hover:bg-primary-50 hover:text-primary-700",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-primary-100 p-4 space-y-3">
          <Button href="/dons-mensuels" variant="gold" fullWidth size="md">
            <Heart className="h-4 w-4" aria-hidden="true" />
            Faire un don
          </Button>
          <Button
            href={siteConfig.externalLinks.masjidbox}
            external
            variant="outline"
            fullWidth
            size="md"
          >
            Horaires de prière
          </Button>
        </div>
      </div>
    </>
  );
}
