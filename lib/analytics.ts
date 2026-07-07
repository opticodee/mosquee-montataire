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

/** Jour calendaire (YYYY-MM-DD) à Paris pour un timestamp ISO UTC. */
function parisDayString(iso: string): string {
  // en-CA formate en "YYYY-MM-DD"
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: PARIS_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
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

/** Visiteurs actifs dans les 60 dernières secondes */
export async function getLiveVisitors(): Promise<number> {
  noStore();
  try {
    const supabase = getSupabaseAdmin();
    const since = new Date(Date.now() - 60_000).toISOString();
    const { data } = await supabase
      .from("analytics_events")
      .select("session_id")
      .gte("created_at", since);
    if (!data) return 0;
    return new Set(data.map((e) => e.session_id)).size;
  } catch {
    return 0;
  }
}

/** Stats globales sur une période */
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
    topPages: [],
    byDay: [],
  };

  try {
    const supabase = getSupabaseAdmin();
    const { start, end } = getRangeBoundaries(range);

    const { data: events } = await supabase
      .from("analytics_events")
      .select("session_id, path, created_at")
      .gte("created_at", start.toISOString())
      .lte("created_at", end.toISOString())
      .limit(100000);

    if (!events) return empty;

    const pageViews = events.length;
    const uniqueVisitors = new Set(events.map((e) => e.session_id)).size;

    // Top pages
    const pageCount = new Map<string, number>();
    for (const e of events) {
      pageCount.set(e.path, (pageCount.get(e.path) ?? 0) + 1);
    }
    const topPages = Array.from(pageCount.entries())
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Par jour (jour calendaire Europe/Paris, format YYYY-MM-DD)
    const dayMap = new Map<string, { views: number; sessions: Set<string> }>();
    for (const e of events) {
      const day = parisDayString(e.created_at);
      if (!dayMap.has(day)) {
        dayMap.set(day, { views: 0, sessions: new Set() });
      }
      const d = dayMap.get(day)!;
      d.views++;
      d.sessions.add(e.session_id);
    }
    const byDay = Array.from(dayMap.entries())
      .map(([date, { views, sessions }]) => ({
        date,
        views,
        uniques: sessions.size,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

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

/**
 * 🔬 Diagnostic — infos brutes pour vérifier que le pipeline est vivant.
 * À retirer une fois le tracking validé.
 */
export async function getDebugInfo(): Promise<{
  nowUtc: string;
  nowParis: string;
  todayStart: string;
  todayEnd: string;
  totalEvents: number;
  last5min: number;
  lastEvents: { session_id: string; path: string; created_at: string }[];
  lastEventAt: string | null;
  error: string | null;
}> {
  noStore();
  const { start, end } = getRangeBoundaries("today");
  const now = new Date();
  const nowParis = new Intl.DateTimeFormat("fr-FR", {
    timeZone: PARIS_TZ,
    dateStyle: "short",
    timeStyle: "medium",
  }).format(now);

  const base = {
    nowUtc: now.toISOString(),
    nowParis,
    todayStart: start.toISOString(),
    todayEnd: end.toISOString(),
    totalEvents: 0,
    last5min: 0,
    lastEvents: [] as {
      session_id: string;
      path: string;
      created_at: string;
    }[],
    lastEventAt: null as string | null,
    error: null as string | null,
  };

  try {
    const supabase = getSupabaseAdmin();

    const { count: totalEvents } = await supabase
      .from("analytics_events")
      .select("*", { count: "exact", head: true });

    const fiveMinAgo = new Date(Date.now() - 5 * 60_000).toISOString();
    const { count: last5min } = await supabase
      .from("analytics_events")
      .select("*", { count: "exact", head: true })
      .gte("created_at", fiveMinAgo);

    const { data: lastEvents } = await supabase
      .from("analytics_events")
      .select("session_id, path, created_at")
      .order("created_at", { ascending: false })
      .limit(5);

    return {
      ...base,
      totalEvents: totalEvents ?? 0,
      last5min: last5min ?? 0,
      lastEvents: lastEvents ?? [],
      lastEventAt: lastEvents?.[0]?.created_at ?? null,
    };
  } catch (e) {
    return { ...base, error: e instanceof Error ? e.message : String(e) };
  }
}
