import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(
  _req: Request,
  { params }: { params: { wall_id: string } }
) {
  const { wall_id } = params;

  const { data, error } = await supabaseAdmin
    .from("walls")
    .select("wall_id, title, theme, customer_name")
    .eq("wall_id", wall_id)
    .single();

  if (error || !data) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.json(data);
}


