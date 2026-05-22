import { redirect } from "next/navigation";
import { Lock, AlertCircle } from "lucide-react";
import { isAuthenticated } from "@/lib/admin-auth";
import { loginAction } from "../actions";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ error?: string }>;

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  if (await isAuthenticated()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-elevated sm:p-10">
        <div className="text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-500">
            <Lock className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold text-primary-700 sm:text-3xl">
            Connexion
          </h1>
          <p className="mt-2 text-sm text-ink-muted">Espace administrateur</p>
        </div>

        {error && (
          <div className="mt-6 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle
              className="mt-0.5 h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            <span>Mot de passe incorrect</span>
          </div>
        )}

        <form action={loginAction} className="mt-7 space-y-4">
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold text-primary-700"
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-primary-200 bg-white px-4 py-3 text-base text-ink placeholder:text-ink-muted/60 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary-700 px-5 py-3 text-base font-semibold text-white shadow-soft transition-colors hover:bg-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
