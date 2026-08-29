import { NextRequest, NextResponse } from "next/server";
import { verifyUserSession, getUserById, USER_SESSION_COOKIE } from "@/lib/user-server";
import { privateExists } from "@/lib/storage-server";
import { createPayment, listForUser } from "@/lib/payments-server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const sess = verifyUserSession(req.cookies.get(USER_SESSION_COOKIE)?.value);
  if (!sess) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  try {
    const payments = await listForUser(sess.uid);
    return NextResponse.json({ ok: true, payments });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "server", detail: e instanceof Error ? e.message : String(e) }, { status: 503 });
  }
}

// The slip is uploaded straight to storage from the browser (via /sign), so this
// handler only receives lightweight JSON metadata + the resulting slip path — no
// large request body flows through the serverless function.
export async function POST(req: NextRequest) {
  const sess = verifyUserSession(req.cookies.get(USER_SESSION_COOKIE)?.value);
  if (!sess) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  let body: { amount?: unknown; reference?: unknown; note?: unknown; slipPath?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const amount = Math.round(Number(body?.amount) || 0);
  const reference = typeof body?.reference === "string" ? body.reference : "";
  const note = typeof body?.note === "string" ? body.note : "";
  const slipPath = typeof body?.slipPath === "string" ? body.slipPath : "";
  if (amount <= 0) return NextResponse.json({ ok: false, error: "amount" }, { status: 400 });
  if (!/^payment-[a-z0-9]+\.[a-z0-9]+$/i.test(slipPath)) return NextResponse.json({ ok: false, error: "no_file" }, { status: 400 });
  try {
    if (!(await privateExists(slipPath))) {
      return NextResponse.json({ ok: false, error: "no_file" }, { status: 400 });
    }
    const user = await getUserById(sess.uid);
    const payment = await createPayment({
      userId: sess.uid,
      userName: user?.name || "",
      userEmail: user?.email || "",
      amount,
      reference,
      note,
      slipPath,
    });
    return NextResponse.json({ ok: true, payment });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "server", detail: e instanceof Error ? e.message : String(e) }, { status: 503 });
  }
}
