import { unstable_noStore as noStore } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";

export type AnalyticsEvent = {
  id: number;
  session_id: string;
  path: string;
  referrer: string | null;
  created_at: string;
};

export type AnalyticsRange =
  | "today"
  | "yesterday"
  | "7d"
  | "30d"
  | "month"
  | "lastmonth"
  | "all";

const PARIS_TZ = "Europe/Paris";

/**
 * Décalage (en ms) de Europe/Paris par rapport à UTC à l'instant donné.
 * Gère automatiquement l'heure d'été (+2h) / d'hiver (+1h).
 */
function parisOffsetMs(at: Date): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: PARIS_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const parts = dtf.formatToParts(at);
  const map: Record<string, number> = {};
  for (const p of parts) {
    if (p.type !== "literal") map[p.type] = Number(p.value);
  }
  const asUTC = Date.UTC(
    map.year,
    map.month - 1,
    map.day,
    map.hour,
    map.minute,
    map.second,
  );
  return asUTC - at.getTime();
}

/**
 * "Maintenant" à Paris, encodé de telle sorte que les getters UTC
 * (getUTCFullYear / getUTCHours / ...) renvoient l'heure MURALE de Paris.
 * Permet de raisonner en jours calendaires français.
 */
function parisNow(): Date {
  const now = new Date();
  return new Date(now.getTime() + parisOffsetMs(now));
}

/**
 * Convertit un Date "mur Paris" (dont les champs UTC = heure murale de Paris)
 * en instant réel UTC, à passer tel quel à Supabase (created_at est en UTC).
 */
function fromParisWall(wall: Date): Date {
  const guess = wall.getTime();
  const offset = parisOffsetMs(new Date(guess));
  return new Date(guess - offset);
}

/**
 * Période → intervalle [start, end] en instants UTC, mais dont les jours
 * calendaires correspondent au fuseau Europe/Paris (et non à l'UTC du serveur).
 */
export function getRangeBoundaries(range: AnalyticsRange): {
  start: Date;
  end: Date;
} {
  // Champs UTC = heure murale de Paris → on manipule via setUTC*.
  const start = parisNow();
  const end = parisNow();

  switch (range) {
    case "today":
      start.setUTCHours(0, 0, 0, 0);
      end.setUTCHours(23, 59, 59, 999);
      break;
    case "yesterday":
      start.setUTCDate(start.getUTCDate() - 1);
      start.setUTCHours(0, 0, 0, 0);
      end.setUTCDate(end.getUTCDate() - 1);
      end.setUTCHours(23, 59, 59, 999);
      break;
    case "7d":
      start.setUTCDate(start.getUTCDate() - 7);
      start.setUTCHours(0, 0, 0, 0);
      break;
    case "30d":
      start.setUTCDate(start.getUTCDate() - 30);
      start.setUTCHours(0, 0, 0, 0);
      break;
    case "month":
      start.setUTCDate(1);
      start.setUTCHours(0, 0, 0, 0);
      break;
    case "lastmonth":
      start.setUTCMonth(start.getUTCMonth() - 1, 1);
      start.setUTCHours(0, 0, 0, 0);
      end.setUTCDate(0); // dernier jour du mois précédent
      end.setUTCHours(23, 59, 59, 999);
      break;
    case "all":
      start.setUTCFullYear(2020, 0, 1);
      start.setUTCHours(0, 0, 0, 0);
      break;
  }

  // Reconvertit les bornes "mur Paris" en instants UTC réels.
  return { start: fromParisWall(start), end: fromParisWall(end) };
}

/** Insère un événement (côté API route) */
export async function trackEvent(input: {
  session_id: string;
  path: string;
  referrer: string | null;
}): Promise<void> {
  const supabase = getSupabaseAdmin();
  await supabase.from("analytics_events").insert({
    session_id: input.session_id,
    path: input.path,
    referrer: input.referrer,
  });
}

/** Visiteurs actifs dans les 60 dernières secondes (agrégé en SQL) */
export async function getLiveVisitors(): Promise<number> {
  noStore();
  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase.rpc("analytics_live_visitors", {
      p_since_seconds: 60,
    });
    return Number(data ?? 0);
  } catch {
    return 0;
  }
}

/**
 * Stats globales sur une période.
 * Agrégation faite EN SQL via des RPC Postgres : indispensable car
 * Supabase plafonne les SELECT bruts à 1000 lignes (le .limit() client
 * est ignoré). On ne rapatrie donc que les résultats agrégés.
 */
export async function getStats(range: AnalyticsRange): Promise<{
  pageViews: number;
  uniqueVisitors: number;
  topPages: { path: string; views: number }[];
  byDay: { date: string; views: number; uniques: number }[];
}> {
  noStore();
  const empty = {
    pageViews: 0,
    uniqueVisitors: 0,
    topPages: [] as { path: string; views: number }[],
    byDay: [] as { date: string; views: number; uniques: number }[],
  };

  try {
    const supabase = getSupabaseAdmin();
    const { start, end } = getRangeBoundaries(range);
    const p_start = start.toISOString();
    const p_end = end.toISOString();

    const [statsRes, topPagesRes, byDayRes] = await Promise.all([
      supabase.rpc("analytics_get_stats", { p_start, p_end }),
      supabase.rpc("analytics_top_pages", { p_start, p_end, p_limit: 10 }),
      supabase.rpc("analytics_by_day", { p_start, p_end }),
    ]);

    const statsRow = (
      statsRes.data as { page_views: number; unique_visitors: number }[] | null
    )?.[0];
    const pageViews = Number(statsRow?.page_views ?? 0);
    const uniqueVisitors = Number(statsRow?.unique_visitors ?? 0);

    const topPages = (
      (topPagesRes.data as { path: string; views: number }[] | null) ?? []
    ).map((r) => ({ path: r.path, views: Number(r.views) }));

    const byDay = (
      (byDayRes.data as
        | { day: string; views: number; uniques: number }[]
        | null) ?? []
    ).map((r) => ({
      date: r.day,
      views: Number(r.views),
      uniques: Number(r.uniques),
    }));

    return { pageViews, uniqueVisitors, topPages, byDay };
  } catch {
    return empty;
  }
}

/** Liste des sessions actives en live avec leurs dernières pages */
export async function getLiveSessions(): Promise<
  {
    session_id: string;
    last_path: string;
    last_seen: string;
  }[]
> {
  noStore();
  try {
    const supabase = getSupabaseAdmin();
    const since = new Date(Date.now() - 60_000).toISOString();
    const { data } = await supabase
      .from("analytics_events")
      .select("session_id, path, created_at")
      .gte("created_at", since)
      .order("created_at", { ascending: false });

    if (!data) return [];
    const seen = new Map<string, { last_path: string; last_seen: string }>();
    for (const e of data) {
      if (!seen.has(e.session_id)) {
        seen.set(e.session_id, { last_path: e.path, last_seen: e.created_at });
      }
    }
    return Array.from(seen.entries()).map(([session_id, info]) => ({
      session_id,
      ...info,
    }));
  } catch {
    return [];
  }
}
