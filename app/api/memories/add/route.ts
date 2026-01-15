import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
/*
export async function POST(req: Request) {
  try {
    const { memory_id, emoji } = await req.json();

    if (!memory_id || !emoji) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    // ✅ NORMALIZE EMOJI HERE (CORRECT PLACE)
    const normalizedEmoji = normalizeEmoji(emoji);

    // fetch current reactions
    const { data: memory, error: fetchError } = await supabaseAdmin
      .from("memories")
      .select("reactions")
      .eq("memory_id", memory_id)
      .single();

    if (fetchError || !memory) {
      console.error(fetchError);
      return new NextResponse("Memory not found", { status: 404 });
    }

    const reactions = memory.reactions ?? {};

    // increment normalized emoji count
    reactions[normalizedEmoji] = (reactions[normalizedEmoji] || 0) + 1;

    // update DB
    const { error: updateError } = await supabaseAdmin
      .from("memories")
      .update({ reactions })
      .eq("memory_id", memory_id);

    if (updateError) {
      console.error(updateError);
      return new NextResponse("Update failed", { status: 500 });
    }

    return NextResponse.json({ reactions });
  } catch (e) {
    console.error(e);
    return new NextResponse("Server error", { status: 500 });
  }
}

*/
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const wall_id = formData.get("wall_id") as string | null;
    const contributor_name = (formData.get("contributor_name") as string) ?? "";
    const relationship = (formData.get("relationship") as string) ?? "";
    const message = (formData.get("message") as string) ?? "";
    const file = formData.get("photo") as File | null;

    if (!wall_id || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let photo_url: string | null = null;

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${wall_id}/${randomUUID()}.${ext}`;

      const { data, error } = await supabaseAdmin.storage
        .from("memories")
        .upload(path, buffer, {
          contentType: file.type
        });

      if (error) {
        console.error("UPLOAD ERROR:", error);
        return NextResponse.json(
          { error: "Upload failed" },
          { status: 500 }
        );
      }

      const { data: urlData } = supabaseAdmin.storage
        .from("memories")
        .getPublicUrl(data.path);

      photo_url = urlData.publicUrl;
    }

    const { error: insertError } = await supabaseAdmin
      .from("memories")
      .insert({
        wall_id,
        contributor_name,
        relationship,
        message,
        photo_url,
        reactions: {}
      });

    if (insertError) {
      console.error("INSERT ERROR:", insertError);
      return NextResponse.json(
        { error: "Database insert failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("ADD MEMORY ERROR:", err);
    return NextResponse.json(
      { error: "Server crash" },
      { status: 500 }
    );
  }
}
