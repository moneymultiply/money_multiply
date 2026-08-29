import { NextRequest, NextResponse } from "next/server";
import { verifyUserSession, USER_SESSION_COOKIE } from "@/lib/user-server";
import { createSignedUpload } from "@/lib/storage-server";

export const runtime = "nodejs";

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/heic": "heic",
  "application/pdf": "pdf",
};

export async function POST(req: NextRequest) {
  const sess = verifyUserSession(req.cookies.get(USER_SESSION_COOKIE)?.value);
  if (!sess) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  let body: { contentType?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const ext = EXT[String(body?.contentType || "")];
  if (!ext) return NextResponse.json({ ok: false, error: "bad_type" }, { status: 400 });
  try {
    const { path, signedUrl } = await createSignedUpload(ext, "payment");
    return NextResponse.json({ ok: true, path, signedUrl });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "server", detail: e instanceof Error ? e.message : String(e) }, { status: 503 });
  }
}
