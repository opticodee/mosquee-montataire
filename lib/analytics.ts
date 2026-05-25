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

/** Période → intervalle SQL */
export function getRangeBoundaries(range: AnalyticsRange): {
  start: Date;
  end: Date;
} {
  const start = new Date();
  const end = new Date();

  switch (range) {
    case "today":
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      break;
    case "yesterday":
      start.setDate(start.getDate() - 1);
      start.setHours(0, 0, 0, 0);
      end.setDate(end.getDate() - 1);
      end.setHours(23, 59, 59, 999);
      break;
    case "7d":
      start.setDate(start.getDate() - 7);
      break;
    case "30d":
      start.setDate(start.getDate() - 30);
      break;
    case "month":
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      break;
    case "lastmonth":
      start.setMonth(start.getMonth() - 1);
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      end.setDate(0); // dernier jour du mois précédent
      end.setHours(23, 59, 59, 999);
      break;
    case "all":
      start.setFullYear(2020); // arbitraire mais antérieur
      break;
  }
  return { start, end };
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

    // Par jour (format YYYY-MM-DD)
    const dayMap = new Map<string, { views: number; sessions: Set<string> }>();
    for (const e of events) {
      const day = e.created_at.slice(0, 10);
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
