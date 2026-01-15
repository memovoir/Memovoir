import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const wall_id = searchParams.get("wall_id");

  if (!wall_id) {
    return new NextResponse("Missing wall_id", { status: 400 });
  }

  const { data, error } = await supabaseAdmin
  .from("memories")
  .select("*")
  .eq("wall_id", wall_id)
  .order("is_pinned", { ascending: false })
  .order("created_at", { ascending: false });


  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return new NextResponse("Error", { status: 500 });
  }

  return NextResponse.json({ memories: data ?? [] });
}


