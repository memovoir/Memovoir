// app/api/comments/list/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const memory_id = searchParams.get("memory_id");

    if (!memory_id) {
      return new NextResponse("Missing memory_id", { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("comments")
      .select("*")
      .eq("memory_id", memory_id)
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      return new NextResponse("Error fetching comments", { status: 500 });
    }

    return NextResponse.json({ comments: data ?? [] });
  } catch (e) {
    console.error(e);
    return new NextResponse("Server error", { status: 500 });
  }
}
