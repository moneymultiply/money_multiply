import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminRequest } from "@/lib/guard";
import { updateListing, deleteListing } from "@/lib/listings-server";
import type { Listing } from "@/lib/types";

export const runtime = "nodejs";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    const l = (await req.json()) as Listing;
    const updated = await updateListing(id, l);
    // Purge cached public pages so edits (incl. new images) reflect immediately.
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, listing: updated });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "server", detail: e instanceof Error ? e.message : String(e) },
      { status: 503 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    await deleteListing(id);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "server", detail: e instanceof Error ? e.message : String(e) },
      { status: 503 }
    );
  }
}
