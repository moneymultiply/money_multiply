import { NextRequest, NextResponse } from "next/server";
import { verifyUserSession, updateKyc, USER_SESSION_COOKIE } from "@/lib/user-server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const sess = verifyUserSession(req.cookies.get(USER_SESSION_COOKIE)?.value);
  if (!sess) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  let body: { pan?: unknown; aadhaar?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  try {
    const kyc = await updateKyc(sess.uid, {
      pan: typeof body?.pan === "string" ? body.pan : "",
      aadhaar: typeof body?.aadhaar === "string" ? body.aadhaar : "",
    });
    return NextResponse.json({ ok: true, ...kyc });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "server", detail: e instanceof Error ? e.message : String(e) },
      { status: 503 }
    );
  }
}
