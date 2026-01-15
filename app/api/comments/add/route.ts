// app/api/comments/add/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { memory_id, name, comment } = body ?? {};

    if (!memory_id || !comment) {
      return new NextResponse("Missing memory_id or comment", { status: 400 });
    }

    const comment_id = randomUUID();

    const { error } = await supabaseAdmin.from("comments").insert({
      comment_id,
      memory_id,
      name: name || "Anonymous",
      comment,
    });

    if (error) {
      console.error(error);
      return new NextResponse("Insert error", { status: 500 });
    }

    const { data } = await supabaseAdmin
      .from("comments")
      .select("*")
      .eq("comment_id", comment_id)
      .single();

    return NextResponse.json({ ok: true, comment: data });
  } catch (e) {
    console.error(e);
    return new NextResponse("Server error", { status: 500 });
  }
}
