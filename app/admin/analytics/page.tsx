import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  Radio,
  Trash2,
  Users,
} from "lucide-react";
import { isAuthenticated } from "@/lib/admin-auth";
import {
  getLiveSessions,
  getLiveVisitors,
  getStats,
  type AnalyticsRange,
} from "@/lib/analytics";
import { AutoRefresh } from "@/components/admin/AutoRefresh";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { purgeOldAnalyticsAction } from "../actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchParams = Promise<{ range?: string; purged?: string }>;

const RANGES: { key: AnalyticsRange; label: string }[] = [
  { key: "today", label: "Aujourd'hui" },
  { key: "yesterday", label: "Hier" },
  { key: "7d", label: "7 derniers jours" },
  { key: "30d", label: "30 derniers jours" },
  { key: "month", label: "Ce mois" },
  { key: "lastmonth", label: "Mois dernier" },
  { key: "all", label: "Tout" },
];

function parseRange(value?: string): AnalyticsRange {
  const allowed = RANGES.map((r) => r.key);
  return (allowed as string[]).includes(value ?? "")
    ? (value as AnalyticsRange)
    : "7d";
}

function prettyPath(path: string): string {
  if (path === "/") return "/ (accueil)";
  return path;
}

function timeAgo(iso: string): string {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const s = Math.floor(diff / 1000);
  if (s < 60) return `il y a ${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `il y a ${m} min`;
  const h = Math.floor(m / 60);
  return `il y a ${h} h`;
}

function formatDayLabel(date: string): string {
  // date au format YYYY-MM-DD
  const d = new Date(date + "T00:00:00");
  if (Number.isNaN(d.getTime())) return date;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
  }).format(d);
}

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const { range: rawRange, purged } = await searchParams;
  const range = parseRange(rawRange);

  const [liveVisitors, liveSessions, stats] = await Promise.all([
    getLiveVisitors(),
    getLiveSessions(),
    getStats(range),
  ]);

  const ratio =
    stats.uniqueVisitors > 0
      ? (stats.pageViews / stats.uniqueVisitors).toFixed(1)
      : "—";

  const maxTopViews = stats.topPages[0]?.views ?? 0;
  const maxDayViews = Math.max(1, ...stats.byDay.map((d) => d.views));

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
      {/* Refresh auto du bloc live */}
      <AutoRefresh interval={10000} />

      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-500">
            Statistiques du site
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-primary-700 sm:text-3xl">
            Analytics
          </h1>
        </div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 self-start rounded-xl border border-primary-200 bg-white px-4 py-2.5 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Retour au dashboard
        </Link>
      </div>

      {purged === "1" && (
        <div className="mt-6 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Données de plus de 90 jours purgées ✓</span>
        </div>
      )}

      {/* LIVE BLOCK */}
      <section className="mt-8 rounded-3xl border border-primary-100 bg-white p-6 shadow-soft sm:p-8">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600" />
          </span>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            En direct
          </p>
        </div>

        <p className="mt-3 font-display text-4xl font-bold text-primary-700 sm:text-5xl">
          {liveVisitors}
          <span className="ml-2 align-middle text-base font-semibold text-ink-muted">
            {liveVisitors > 1 ? "visiteurs en ligne" : "visiteur en ligne"}
          </span>
        </p>

        {liveSessions.length > 0 ? (
          <ul className="mt-5 divide-y divide-primary-50">
            {liveSessions.map((s) => (
              <li
                key={s.session_id}
                className="flex items-center justify-between gap-3 py-2.5 text-sm"
              >
                <span className="flex min-w-0 items-center gap-2 text-primary-700">
                  <Radio
                    className="h-4 w-4 shrink-0 text-primary-400"
                    aria-hidden="true"
                  />
                  <span className="truncate font-medium">
                    {prettyPath(s.last_path)}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-ink-muted">
                  {timeAgo(s.last_seen)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 text-sm text-ink-muted">
            Aucun visiteur dans la dernière minute.
          </p>
        )}

        <p className="mt-5 text-xs text-ink-muted">
          Mise à jour automatique toutes les 10 secondes.
        </p>
      </section>

      {/* SÉLECTEUR DE PÉRIODE */}
      <div className="mt-10 flex flex-wrap gap-2">
        {RANGES.map((r) => {
          const active = r.key === range;
          return (
            <Link
              key={r.key}
              href={`?range=${r.key}`}
              className={
                active
                  ? "rounded-xl bg-primary-700 px-4 py-2 text-sm font-semibold text-white shadow-soft"
                  : "rounded-xl border border-primary-200 bg-white px-4 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50"
              }
            >
              {r.label}
            </Link>
          );
        })}
      </div>

      {/* KPI CARDS */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-primary-100 bg-white p-6 shadow-soft">
          <div className="flex items-center gap-2 text-primary-500">
            <Eye className="h-5 w-5" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-wider">
              Pages vues
            </p>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-primary-700">
            {stats.pageViews.toLocaleString("fr-FR")}
          </p>
        </div>
        <div className="rounded-3xl border border-primary-100 bg-white p-6 shadow-soft">
          <div className="flex items-center gap-2 text-primary-500">
            <Users className="h-5 w-5" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-wider">
              Visiteurs uniques
            </p>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-primary-700">
            {stats.uniqueVisitors.toLocaleString("fr-FR")}
          </p>
        </div>
        <div className="rounded-3xl border border-primary-100 bg-white p-6 shadow-soft">
          <div className="flex items-center gap-2 text-primary-500">
            <p className="text-xs font-semibold uppercase tracking-wider">
              Pages / visiteur
            </p>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-primary-700">
            {ratio}
          </p>
        </div>
      </div>

      {/* TOP PAGES */}
      <section className="mt-10 rounded-3xl border border-primary-100 bg-white p-6 shadow-soft sm:p-8">
        <h2 className="font-display text-xl font-bold text-primary-700">
          Top pages
        </h2>
        {stats.topPages.length > 0 ? (
          <div className="mt-5 space-y-3">
            {stats.topPages.map((p) => {
              const pct = maxTopViews > 0 ? (p.views / maxTopViews) * 100 : 0;
              return (
                <div key={p.path}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="truncate font-medium text-primary-700">
                      {prettyPath(p.path)}
                    </span>
                    <span className="shrink-0 font-semibold text-ink-muted">
                      {p.views.toLocaleString("fr-FR")}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-primary-50">
                    <div
                      className="h-full rounded-full bg-primary-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mt-5 text-sm text-ink-muted">
            Aucune donnée sur cette période.
          </p>
        )}
      </section>

      {/* GRAPHIQUE PAR JOUR */}
      <section className="mt-10 rounded-3xl border border-primary-100 bg-white p-6 shadow-soft sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl font-bold text-primary-700">
            Évolution par jour
          </h2>
          <div className="flex items-center gap-4 text-xs text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-primary-500" />
              Pages vues
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-gold" />
              Visiteurs uniques
            </span>
          </div>
        </div>

        {stats.byDay.length > 0 ? (
          <div className="mt-6 overflow-x-auto">
            <div className="flex min-w-full items-end gap-3" style={{ height: 180 }}>
              {stats.byDay.map((d) => {
                const viewsH = Math.round((d.views / maxDayViews) * 150);
                const uniquesH = Math.round((d.uniques / maxDayViews) * 150);
                return (
                  <div
                    key={d.date}
                    className="flex shrink-0 flex-col items-center justify-end gap-2"
                    style={{ minWidth: 36 }}
                  >
                    <div
                      className="flex items-end gap-1"
                      title={`${formatDayLabel(d.date)} — ${d.views} vues, ${d.uniques} visiteurs`}
                    >
                      <div
                        className="w-4 rounded-t bg-primary-500"
                        style={{ height: Math.max(2, viewsH) }}
                      />
                      <div
                        className="w-2.5 rounded-t bg-gold"
                        style={{ height: Math.max(2, uniquesH) }}
                      />
                    </div>
                    <span className="whitespace-nowrap text-[10px] text-ink-muted">
                      {formatDayLabel(d.date)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="mt-5 text-sm text-ink-muted">
            Aucune donnée sur cette période.
          </p>
        )}
      </section>

      {/* PURGE */}
      <section className="mt-10 rounded-2xl border border-red-100 bg-red-50/60 p-5 sm:p-6">
        <h2 className="font-display text-base font-bold text-red-700">
          Maintenance
        </h2>
        <p className="mt-1.5 text-sm text-ink-muted">
          Supprime définitivement les événements de plus de 90 jours. Les
          données sont anonymes et cette action est irréversible.
        </p>
        <form action={purgeOldAnalyticsAction} className="mt-4">
          <ConfirmSubmitButton
            message="Purger définitivement les données de plus de 90 jours ?"
            className="inline-flex items-center gap-2 rounded-xl border border-red-300 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Purger les données &gt; 90 jours
          </ConfirmSubmitButton>
        </form>
      </section>
    </div>
  );
}
