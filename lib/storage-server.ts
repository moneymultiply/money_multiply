import "server-only";
import { supabaseAdmin } from "./supabase-admin";

const BUCKET = "listings";

let ensured = false;
async function ensureBucket(): Promise<void> {
  if (ensured) return;
  const sb = supabaseAdmin();
  const { data } = await sb.storage.getBucket(BUCKET);
  if (!data) {
    await sb.storage.createBucket(BUCKET, { public: true });
  }
  ensured = true;
}

export async function uploadImage(
  buffer: Buffer,
  contentType: string,
  ext: string,
  prefix = "listing"
): Promise<string> {
  await ensureBucket();
  const sb = supabaseAdmin();
  const name =
    prefix + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8) + "." + ext;
  const { error } = await sb.storage.from(BUCKET).upload(name, buffer, {
    contentType,
    upsert: false,
  });
  if (error) throw new Error(error.message || JSON.stringify(error));
  const { data } = sb.storage.from(BUCKET).getPublicUrl(name);
  return data.publicUrl;
}

/* ---------- private bucket (payment slips) ---------- */
const PRIV = "payments";
let ensuredPriv = false;
async function ensurePriv(): Promise<void> {
  if (ensuredPriv) return;
  const sb = supabaseAdmin();
  const { data } = await sb.storage.getBucket(PRIV);
  if (!data) await sb.storage.createBucket(PRIV, { public: false });
  ensuredPriv = true;
}

/** Upload a private file (e.g. payment slip). Returns the storage path (not a public URL). */
export async function uploadPrivate(
  buffer: Buffer,
  contentType: string,
  ext: string,
  prefix = "payment"
): Promise<string> {
  await ensurePriv();
  const sb = supabaseAdmin();
  const name = prefix + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8) + "." + ext;
  const { error } = await sb.storage.from(PRIV).upload(name, buffer, { contentType, upsert: false });
  if (error) throw new Error(error.message || JSON.stringify(error));
  return name;
}

/** Short-lived signed URL to view a private file (admin only). */
export async function signedUrl(path: string, expiresSec = 3600): Promise<string> {
  if (!path) return "";
  const sb = supabaseAdmin();
  const { data, error } = await sb.storage.from(PRIV).createSignedUrl(path, expiresSec);
  if (error) throw new Error(error.message || JSON.stringify(error));
  return data.signedUrl;
}
