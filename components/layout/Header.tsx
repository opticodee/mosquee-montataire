"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Heart } from "lucide-react";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/components/ui/Button";
import {
  mainNavigation,
  isNavGroup,
  type NavItem,
} from "@/config/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full isolate transition-all duration-200",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-soft border-b border-primary-100"
          : "bg-white border-b border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Accueil — Mosquée de Montataire"
          className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <Logo />
        </Link>

        {/* Navigation desktop */}
        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Navigation principale"
        >
          {mainNavigation.map((item) => {
            if (isNavGroup(item)) {
              const isOpen = openDropdown === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink hover:text-primary-700 hover:bg-primary-50 transition-colors"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() =>
                      setOpenDropdown(isOpen ? null : item.label)
                    }
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="absolute left-0 top-full pt-2">
                      <div className="w-72 rounded-2xl border border-primary-100 bg-white p-2 shadow-elevated">
                        {item.items.map((sub: NavItem) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block rounded-xl px-3 py-2.5 hover:bg-primary-50 transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <span className="block text-sm font-semibold text-primary-700">
                              {sub.label}
                            </span>
                            {sub.description && (
                              <span className="mt-0.5 block text-xs text-ink-muted">
                                {sub.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink hover:text-primary-700 hover:bg-primary-50 transition-colors"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href="/dons-mensuels"
            variant="gold"
            size="md"
            className="hidden sm:inline-flex"
          >
            <Heart className="h-4 w-4" aria-hidden="true" />
            Faire un don
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
