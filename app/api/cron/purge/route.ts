import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.rpc("purge_old_analytics");
    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 },
      );
    }
    return NextResponse.json({ ok: true, purged_at: new Date().toISOString() });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
