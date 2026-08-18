import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/guard";
import { listAllPayments, createPayment } from "@/lib/payments-server";
import { getUserById } from "@/lib/user-server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  try {
    const payments = await listAllPayments();
    return NextResponse.json({ ok: true, payments });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "server", detail: e instanceof Error ? e.message : String(e) }, { status: 503 });
  }
}

/** Admin records a manual (offline/cash) payment for an investor. */
export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  let body: { userId?: unknown; amount?: unknown; reference?: unknown; note?: unknown; status?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const userId = String(body?.userId || "");
  const amount = Math.round(Number(body?.amount) || 0);
  const reference = typeof body?.reference === "string" ? body.reference : "";
  const note = typeof body?.note === "string" ? body.note : "";
  const status = body?.status === "submitted" ? "submitted" : "acknowledged";
  if (!userId) return NextResponse.json({ ok: false, error: "user" }, { status: 400 });
  if (!(amount > 0)) return NextResponse.json({ ok: false, error: "amount" }, { status: 400 });
  try {
    const user = await getUserById(userId);
    if (!user) return NextResponse.json({ ok: false, error: "user_not_found" }, { status: 404 });
    const payment = await createPayment({
      userId,
      userName: user.name || "",
      userEmail: user.email || "",
      amount,
      reference,
      note,
      status,
      ackNote: status === "acknowledged" ? "Recorded manually by admin" : "",
    });
    return NextResponse.json({ ok: true, payment });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "server", detail: e instanceof Error ? e.message : String(e) }, { status: 503 });
  }
}
