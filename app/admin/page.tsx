import { redirect } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  ExternalLink,
  Info,
  Radio,
  Save,
} from "lucide-react";
import { isAuthenticated } from "@/lib/admin-auth";
import { getJumuaStream } from "@/lib/supabase";
import { saveJumuaAction } from "./actions";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ saved?: string }>;

function formatUpdatedAt(iso: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(d);
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const stream = await getJumuaStream();
  const { saved } = await searchParams;
  const updatedAt = formatUpdatedAt(stream.updated_at);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-500">
            Traduction en direct
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-primary-700 sm:text-3xl">
            Gestion de la traduction Jumu&apos;a
          </h1>
        </div>
        {stream.enabled ? (
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-red-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
            En direct
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-gray-200 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-600">
            <span className="h-2 w-2 rounded-full bg-gray-500" />
            Inactif
          </span>
        )}
      </div>

      {updatedAt && (
        <p className="mt-3 text-sm text-ink-muted">
          Dernière modification : <strong>{updatedAt}</strong>
        </p>
      )}

      {saved && (
        <div className="mt-6 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          <CheckCircle2
            className="mt-0.5 h-4 w-4 shrink-0"
            aria-hidden="true"
          />
          <span>Modifications enregistrées ✓</span>
        </div>
      )}

      <form
        action={saveJumuaAction}
        className="mt-6 space-y-5 rounded-3xl border border-primary-100 bg-white p-6 shadow-soft sm:p-8"
      >
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-primary-100 bg-cream/60 p-4 transition-colors hover:bg-cream">
          <input
            type="checkbox"
            name="enabled"
            defaultChecked={stream.enabled}
            className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-primary-300 text-primary-700 focus:ring-primary-500"
          />
          <span>
            <span className="block font-semibold text-primary-700">
              Activer la diffusion
            </span>
            <span className="mt-0.5 block text-sm text-ink-muted">
              Lorsqu&apos;activée, la page publique affiche le lecteur en direct.
            </span>
          </span>
        </label>

        <div>
          <label
            htmlFor="token"
            className="mb-1.5 block text-sm font-semibold text-primary-700"
          >
            Token OneStream
          </label>
          <input
            id="token"
            name="token"
            type="text"
            defaultValue={stream.token}
            placeholder="MjM5NDIwNDY="
            className="w-full rounded-xl border border-primary-200 bg-white px-4 py-3 font-mono text-sm text-ink placeholder:text-ink-muted/60 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="mb-1.5 block text-sm font-semibold text-primary-700"
          >
            Date affichée
          </label>
          <input
            id="date"
            name="date"
            type="text"
            defaultValue={stream.date}
            placeholder="Vendredi 24 mai 2026"
            className="w-full rounded-xl border border-primary-200 bg-white px-4 py-3 text-base text-ink placeholder:text-ink-muted/60 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-700 px-5 py-3 text-base font-semibold text-white shadow-soft transition-colors hover:bg-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <Save className="h-5 w-5" aria-hidden="true" />
            Sauvegarder
          </button>

          <Link
            href="/traduction-en-direct/jumua"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-primary-200 bg-white px-5 py-3 text-base font-semibold text-primary-700 transition-colors hover:bg-primary-50"
          >
            <Radio className="h-5 w-5" aria-hidden="true" />
            Voir la page publique
            <ExternalLink className="h-4 w-4 opacity-70" aria-hidden="true" />
          </Link>
        </div>
      </form>

      <div className="mt-6 rounded-2xl border border-primary-100 bg-white p-5 shadow-soft sm:p-6">
        <div className="flex items-start gap-3">
          <Info
            className="mt-0.5 h-5 w-5 shrink-0 text-primary-500"
            aria-hidden="true"
          />
          <div className="text-sm leading-relaxed text-ink-muted">
            <p className="font-semibold text-primary-700">
              Comment obtenir le token OneStream ?
            </p>
            <p className="mt-2">
              Dans OneStream, copiez l&apos;URL du lecteur embed. Le token est
              la valeur du paramètre <code className="font-mono">token=</code> :
            </p>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-primary-900 px-3 py-2 text-xs text-cream">
              https://player.onestream.live/embed?token=
              <span className="rounded bg-gold/40 px-1 py-0.5 font-bold text-gold-light">
                MjM5NDIwNDY=
              </span>
              &amp;type=event
            </pre>
            <p className="mt-3">
              Collez uniquement la partie surlignée (avant{" "}
              <code className="font-mono">&amp;type=event</code>) dans le
              champ ci-dessus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
