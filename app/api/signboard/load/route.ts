import { NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabaseAdmin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const wall_id = searchParams.get("wall_id");

  if (!wall_id)
    return NextResponse.json({ strokes: [] });

  const { data } = await supabaseAdmin
    .from("wall_signboards")
    .select("strokes")
    .eq("wall_id", wall_id)
    .single();

  return NextResponse.json({
    strokes: data?.strokes ?? []
  });
}
