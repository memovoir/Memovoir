import { NextResponse } from "next/server";
import { createHash, randomUUID } from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, customerName, password, themeId } = body;

    if (!title || !password || !themeId) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const wall_id = randomUUID().replace(/-/g, "").slice(0, 10);
    const password_hash = createHash("sha256").update(password).digest("hex");

    const { error } = await supabaseAdmin.from("walls").insert({
      wall_id,
      title,
      theme: themeId,
      password_hash,
      customer_name: customerName ?? null
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return new NextResponse("Error creating wall", { status: 500 });
    }

    return NextResponse.json({ wall_id });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return new NextResponse("Server error", { status: 500 });
  }
}


