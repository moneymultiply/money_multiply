import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/guard";
import { updateMicroStatus, deleteMicro } from "@/lib/micro-server";

export const runtime = "nodejs";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    await deleteMicro(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "server", detail: e instanceof Error ? e.message : String(e) }, { status: 503 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  let body: { status?: unknown; adminNote?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const status = body?.status;
  if (status !== "pledged" && status !== "funded" && status !== "closed") {
    return NextResponse.json({ ok: false, error: "bad_status" }, { status: 400 });
  }
  try {
    const micro = await updateMicroStatus(id, status, typeof body?.adminNote === "string" ? body.adminNote : undefined);
    return NextResponse.json({ ok: true, micro });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "server", detail: e instanceof Error ? e.message : String(e) }, { status: 503 });
  }
}
