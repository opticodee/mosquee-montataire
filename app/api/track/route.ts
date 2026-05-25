import { NextRequest, NextResponse } from "next/server";
import { trackEvent } from "@/lib/analytics";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session_id =
      typeof body?.session_id === "string" ? body.session_id : null;
    const path = typeof body?.path === "string" ? body.path : null;
    const referrer =
      typeof body?.referrer === "string" ? body.referrer.slice(0, 200) : null;

    if (!session_id || !path) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Ignore les paths admin/api pour ne pas polluer les stats
    if (path.startsWith("/admin") || path.startsWith("/api")) {
      return NextResponse.json({ ok: true });
    }

    await trackEvent({
      session_id: session_id.slice(0, 64),
      path: path.slice(0, 200),
      referrer,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
