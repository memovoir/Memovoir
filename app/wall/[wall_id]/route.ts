import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(
  request: Request,
  props: { params: Promise<{ wall_id: string }> }
) {
  try {
    // 1. Await the params (Critical for Next.js 15)
    const params = await props.params;
    const { wall_id } = params;

    // 2. Fetch the wall
    const { data, error } = await supabaseAdmin
      .from("walls")
      .select("*")
      .eq("wall_id", wall_id)
      .single();

    if (error || !data) {
      return new NextResponse("Wall not found", { status: 404 });
    }

    // 3. Return the data
    return NextResponse.json(data);
    
  } catch (e) {
    return new NextResponse("Server Error", { status: 500 });
  }
}