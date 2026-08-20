import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/guard";
import { acknowledgePayment, deletePayment } from "@/lib/payments-server";

export const runtime = "nodejs";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    await deletePayment(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "server", detail: e instanceof Error ? e.message : String(e) }, { status: 503 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const status = body?.status;
  if (status !== "acknowledged" && status !== "rejected" && status !== "submitted") {
    return NextResponse.json({ ok: false, error: "bad_status" }, { status: 400 });
  }
  try {
    const payment = await acknowledgePayment(id, status, typeof body?.ackNote === "string" ? body.ackNote : undefined);
    return NextResponse.json({ ok: true, payment });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "server", detail: e instanceof Error ? e.message : String(e) }, { status: 503 });
  }
}
