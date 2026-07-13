import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Vercel Cron pings this daily (see vercel.json) so the Supabase free-tier
// project registers activity and never gets auto-paused (7-day inactivity rule).
export async function GET() {
  const { count, error } = await supabase
    .from("posts")
    .select("id", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ status: "error", detail: error.message }, { status: 500 });
  }
  return NextResponse.json({ status: "alive", posts: count ?? 0 });
}
