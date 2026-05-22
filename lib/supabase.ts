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
