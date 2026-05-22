import { createClient } from "@supabase/supabase-js";

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase env vars not set");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function getSupabasePublic() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env vars not set");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export type Stream = {
  id: string;
  enabled: boolean;
  token: string;
  date: string;
  updated_at: string;
};

const DEFAULT_JUMUA: Stream = {
  id: "jumua",
  enabled: false,
  token: "",
  date: "",
  updated_at: "",
};

export async function getJumuaStream(): Promise<Stream> {
  try {
    const supabase = getSupabasePublic();
    const { data } = await supabase
      .from("streams")
      .select("*")
      .eq("id", "jumua")
      .maybeSingle();
    return (data as Stream) ?? DEFAULT_JUMUA;
  } catch {
    return DEFAULT_JUMUA;
  }
}

export async function setJumuaStream(input: {
  enabled: boolean;
  token: string;
  date: string;
}): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("streams").upsert({
    id: "jumua",
    enabled: input.enabled,
    token: input.token,
    date: input.date,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}

export function buildOneStreamUrl(token: string): string {
  return `https://player.onestream.live/embed?token=${token}&type=event`;
}

export type NewsItem = {
  slot: number;
  enabled: boolean;
  title: string;
  html: string;
  updated_at: string;
};

const DEFAULT_NEWS_ITEM = (slot: number): NewsItem => ({
  slot,
  enabled: false,
  title: "",
  html: "",
  updated_at: "",
});

export async function getNews(): Promise<NewsItem[]> {
  try {
    const supabase = getSupabasePublic();
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("slot", { ascending: true });
    if (!data || data.length === 0) {
      return [DEFAULT_NEWS_ITEM(1), DEFAULT_NEWS_ITEM(2), DEFAULT_NEWS_ITEM(3)];
    }
    return [1, 2, 3].map(
      (s) =>
        (data as NewsItem[]).find((n) => n.slot === s) ?? DEFAULT_NEWS_ITEM(s),
    );
  } catch {
    return [DEFAULT_NEWS_ITEM(1), DEFAULT_NEWS_ITEM(2), DEFAULT_NEWS_ITEM(3)];
  }
}

export async function getActiveNews(): Promise<NewsItem[]> {
  const all = await getNews();
  return all.filter((n) => n.enabled && n.html.trim().length > 0);
}

export async function setNewsItem(input: {
  slot: number;
  enabled: boolean;
  title: string;
  html: string;
}): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("news").upsert({
    slot: input.slot,
    enabled: input.enabled,
    title: input.title,
    html: input.html,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}
