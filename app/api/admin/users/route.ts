import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/guard";
import { listUsers, createUser } from "@/lib/user-server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  try {
    const users = await listUsers();
    return NextResponse.json({ ok: true, users });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "server", detail: e instanceof Error ? e.message : String(e) },
      { status: 503 }
    );
  }
}

/** Admin manually onboards a partner or investor. */
export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  let body: { role?: unknown; name?: unknown; email?: unknown; phone?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const role = body?.role === "partner" ? "partner" : "investor";
  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim();
  const phone = String(body?.phone || "").trim();
  const password = String(body?.password || "");
  if (!name) return NextResponse.json({ ok: false, error: "name" }, { status: 400 });
  if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  if (password.length < 6) return NextResponse.json({ ok: false, error: "password" }, { status: 400 });
  try {
    const user = await createUser({ role, name, email, phone, password });
    return NextResponse.json({ ok: true, user });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg === "email_taken") return NextResponse.json({ ok: false, error: "email_taken" }, { status: 409 });
    return NextResponse.json({ ok: false, error: "server", detail: msg }, { status: 503 });
  }
}
