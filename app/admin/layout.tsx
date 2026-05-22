import type { Metadata } from "next";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { isAuthenticated } from "@/lib/admin-auth";
import { logoutAction } from "./actions";

export const metadata: Metadata = {
  title: "Admin — Mosquée de Montataire",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="border-b border-primary-100 bg-white shadow-soft">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-4">
            <Logo />
            <span
              aria-hidden="true"
              className="hidden h-8 w-px bg-primary-200 sm:block"
            />
            <p className="hidden font-display text-sm font-semibold uppercase tracking-wider text-primary-700 sm:block">
              Espace administrateur
            </p>
          </div>

          {authed && (
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg border border-primary-200 bg-white px-3 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Se déconnecter
              </button>
            </form>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
