import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { wall_id, password } = body;

    if (!wall_id || !password) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const hash = createHash("sha256").update(password).digest("hex");

    const { data, error } = await supabaseAdmin
      .from("walls")
      .select("password_hash")
      .eq("wall_id", wall_id)
      .single();

    if (error || !data) {
      return new NextResponse("Not found", { status: 404 });
    }

    if (data.password_hash !== hash) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return new NextResponse("Server error", { status: 500 });
  }
}


