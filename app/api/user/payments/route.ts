import { NextRequest, NextResponse } from "next/server";
import { verifyUserSession, getUserById, USER_SESSION_COOKIE } from "@/lib/user-server";
import { uploadPrivate } from "@/lib/storage-server";
import { createPayment, listForUser } from "@/lib/payments-server";

export const runtime = "nodejs";

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
};

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

export async function POST(req: NextRequest) {
  const sess = verifyUserSession(req.cookies.get(USER_SESSION_COOKIE)?.value);
  if (!sess) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  try {
    const form = await req.formData();
    const amount = Number(form.get("amount")) || 0;
    const reference = String(form.get("reference") || "");
    const note = String(form.get("note") || "");
    const file = form.get("file");
    if (amount <= 0) return NextResponse.json({ ok: false, error: "amount" }, { status: 400 });
    if (!(file instanceof File)) return NextResponse.json({ ok: false, error: "no_file" }, { status: 400 });
    if (file.size > 8 * 1024 * 1024) return NextResponse.json({ ok: false, error: "too_large" }, { status: 400 });
    const ext = EXT[file.type];
    if (!ext) return NextResponse.json({ ok: false, error: "bad_type" }, { status: 400 });

    const user = await getUserById(sess.uid);
    const buffer = Buffer.from(await file.arrayBuffer());
    const slipPath = await uploadPrivate(buffer, file.type, ext, "payment");
    const payment = await createPayment({
      userId: sess.uid,
      userName: user?.name || "",
      userEmail: user?.email || "",
      amount,
      reference,
      note,
      slipPath,
    });
    // don't leak slip path back
    return NextResponse.json({ ok: true, payment });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "server", detail: e instanceof Error ? e.message : String(e) }, { status: 503 });
  }
}
