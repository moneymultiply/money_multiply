import "server-only";
import crypto from "crypto";
import { supabaseAdmin } from "./supabase-admin";
import { MICRO_MIN, MICRO_MAX } from "./data";
import type { MicroContribution } from "./types";

const TABLE = "mm_micro";
/* eslint-disable @typescript-eslint/no-explicit-any */
const sb = () => supabaseAdmin();
const fail = (e: any): never => {
  throw new Error(e?.message || JSON.stringify(e));
};

function rowToMicro(r: any): MicroContribution {
  return {
    id: r.id,
    userId: r.user_id,
    userName: r.user_name || "",
    userEmail: r.user_email || "",
    amount: Number(r.amount) || 0,
    note: r.note || "",
    status: (r.status || "pledged") as MicroContribution["status"],
    adminNote: r.admin_note || "",
    createdAt: r.created_at,
    updatedAt: r.updated_at || undefined,
  };
}

/** Amount must be a whole rupee value within the micro pool band. */
export function isValidMicroAmount(amount: number): boolean {
  return Number.isFinite(amount) && amount >= MICRO_MIN && amount <= MICRO_MAX;
}

export async function createMicro(input: {
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  note?: string;
}): Promise<MicroContribution> {
  const row = {
    id: "mic-" + Date.now().toString(36) + crypto.randomBytes(3).toString("hex"),
    user_id: input.userId,
    user_name: input.userName,
    user_email: input.userEmail,
    amount: Math.round(input.amount),
    note: (input.note || "").slice(0, 400),
    status: "pledged",
  };
  const { data, error } = await sb().from(TABLE).insert(row).select().single();
  if (error) fail(error);
  return rowToMicro(data);
}

export async function listMicroForUser(userId: string): Promise<MicroContribution[]> {
  const { data, error } = await sb()
    .from(TABLE)
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) fail(error);
  return (data || []).map(rowToMicro);
}

export async function listAllMicro(): Promise<MicroContribution[]> {
  const { data, error } = await sb().from(TABLE).select("*").order("created_at", { ascending: false }).limit(1000);
  if (error) fail(error);
  return (data || []).map(rowToMicro);
}

/** Permanently remove a micro-pool contribution record. */
export async function deleteMicro(id: string): Promise<void> {
  const { error } = await sb().from(TABLE).delete().eq("id", id);
  if (error) fail(error);
}

export async function updateMicroStatus(
  id: string,
  status: "pledged" | "funded" | "closed",
  adminNote?: string
): Promise<MicroContribution> {
  const upd: any = { status, updated_at: new Date().toISOString() };
  if (typeof adminNote === "string") upd.admin_note = adminNote.slice(0, 400);
  const { data, error } = await sb().from(TABLE).update(upd).eq("id", id).select().single();
  if (error) fail(error);
  return rowToMicro(data);
}
