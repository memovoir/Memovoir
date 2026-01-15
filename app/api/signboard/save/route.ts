import { NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const { wall_id, strokes } = await req.json();

  if (!wall_id || !strokes) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("wall_signboards")
    .upsert(
      { wall_id, strokes },
      { onConflict: "wall_id" }
    );

  if (error) {
    console.error("SIGNBOARD SAVE ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
