// app/api/memories/pin/route.ts
import { NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabaseAdmin"; // your admin client

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { memory_id, is_pinned } = body;

    if (!memory_id || typeof is_pinned !== "boolean") {
      return NextResponse.json({ error: "memory_id and is_pinned(boolean) required" }, { status: 400 });
    }

    // Optional: verify ownership here if you have wall owner info in request headers or in body
    // e.g. const { user_id } = body; check against memory->wall->owner_id

    const { data, error } = await supabaseAdmin
      .from("memories")
      .update({ is_pinned })
      .eq("memory_id", memory_id)
      .select("*")
      .single();

    if (error) {
      console.error("Pin update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, memory: data });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err?.message ?? "unknown error" }, { status: 500 });
  }
}
