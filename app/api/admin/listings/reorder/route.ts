import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminRequest } from "@/lib/guard";
import { reorderListings } from "@/lib/listings-server";

export const runtime = "nodejs";

export async function PUT(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  let body: { ids?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const ids = body?.ids;
  if (!Array.isArray(ids) || ids.some((x) => typeof x !== "string")) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  try {
    await reorderListings(ids as string[]);
    // Purge cached public pages so the new order shows immediately.
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "server", detail: e instanceof Error ? e.message : String(e) }, { status: 503 });
  }
}
