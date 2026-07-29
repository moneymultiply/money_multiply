import { NextRequest, NextResponse } from "next/server";
import { verifyUserSession, getUserById, USER_SESSION_COOKIE } from "@/lib/user-server";
import { createMicro, listMicroForUser, isValidMicroAmount } from "@/lib/micro-server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const sess = verifyUserSession(req.cookies.get(USER_SESSION_COOKIE)?.value);
  if (!sess) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  try {
    const micro = await listMicroForUser(sess.uid);
    return NextResponse.json({ ok: true, micro });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "server", detail: e instanceof Error ? e.message : String(e) }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  const sess = verifyUserSession(req.cookies.get(USER_SESSION_COOKIE)?.value);
  if (!sess) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  let body: { amount?: unknown; note?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const amount = Math.round(Number(body?.amount) || 0);
  if (!isValidMicroAmount(amount)) {
    return NextResponse.json({ ok: false, error: "range" }, { status: 400 });
  }
  try {
    const user = await getUserById(sess.uid);
    // Micro pool is an investor-facing product.
    if (user && user.role !== "investor") {
      return NextResponse.json({ ok: false, error: "investor_only" }, { status: 403 });
    }
    const note = typeof body?.note === "string" ? body.note : "";
    const micro = await createMicro({
      userId: sess.uid,
      userName: user?.name || "",
      userEmail: user?.email || "",
      amount,
      note,
    });
    return NextResponse.json({ ok: true, micro });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "server", detail: e instanceof Error ? e.message : String(e) }, { status: 503 });
  }
}
