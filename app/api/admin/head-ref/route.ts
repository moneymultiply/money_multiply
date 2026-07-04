import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/guard";
import { getHeadRef, regenerateHeadRef } from "@/lib/auth-server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  try {
    const code = await getHeadRef();
    return NextResponse.json({ ok: true, code });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "server", detail: e instanceof Error ? e.message : String(e) },
      { status: 503 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  try {
    const code = await regenerateHeadRef();
    return NextResponse.json({ ok: true, code });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "server", detail: e instanceof Error ? e.message : String(e) },
      { status: 503 }
    );
  }
}
