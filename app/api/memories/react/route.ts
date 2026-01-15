import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { memory_id, emoji } = await req.json();

    if (!memory_id || !emoji) {
      return new NextResponse("Missing memory_id or emoji", { status: 400 });
    }

    // Get existing reactions
    const { data, error } = await supabaseAdmin
      .from("memories")
      .select("reactions")
      .eq("memory_id", memory_id)
      .single();

    if (error) {
      // eslint-disable-next-line no-console
      console.error("Reactions select error", error);
      return new NextResponse("Error", { status: 500 });
    }

    const current =
      (data?.reactions as Record<string, number> | null) ?? {};

    const updated = {
      ...current,
      [emoji]: (current[emoji] ?? 0) + 1
    };

    const { error: updateError } = await supabaseAdmin
      .from("memories")
      .update({ reactions: updated })
      .eq("memory_id", memory_id);

    if (updateError) {
      // eslint-disable-next-line no-console
      console.error("Reactions update error", updateError);
      return new NextResponse("Error", { status: 500 });
    }

    return NextResponse.json({ reactions: updated });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Reactions server error", e);
    return new NextResponse("Server error", { status: 500 });
  }
}
