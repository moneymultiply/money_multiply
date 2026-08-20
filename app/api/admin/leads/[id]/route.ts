import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/guard";
import { deleteLead } from "@/lib/leads-server";

export const runtime = "nodejs";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    await deleteLead(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "server", detail: e instanceof Error ? e.message : String(e) }, { status: 503 });
  }
}
