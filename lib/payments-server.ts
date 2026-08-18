import "server-only";
import crypto from "crypto";
import { supabaseAdmin } from "./supabase-admin";
import { signedUrl } from "./storage-server";
import type { Payment } from "./types";

const TABLE = "mm_payments";
/* eslint-disable @typescript-eslint/no-explicit-any */
const sb = () => supabaseAdmin();
const fail = (e: any): never => {
  throw new Error(e?.message || JSON.stringify(e));
};

function rowToPayment(r: any): Payment {
  return {
    id: r.id,
    userId: r.user_id,
    userName: r.user_name || "",
    userEmail: r.user_email || "",
    amount: Number(r.amount) || 0,
    reference: r.reference || "",
    note: r.note || "",
    status: (r.status || "submitted") as Payment["status"],
    ackNote: r.ack_note || "",
    createdAt: r.created_at,
    ackAt: r.ack_at || undefined,
  };
}

export async function createPayment(input: {
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  reference?: string;
  note?: string;
  slipPath?: string;
  status?: "submitted" | "acknowledged" | "rejected";
  ackNote?: string;
}): Promise<Payment> {
  const status = input.status || "submitted";
  const row: any = {
    id: "pay-" + Date.now().toString(36) + crypto.randomBytes(3).toString("hex"),
    user_id: input.userId,
    user_name: input.userName,
    user_email: input.userEmail,
    amount: Math.round(input.amount),
    reference: (input.reference || "").slice(0, 120),
    note: (input.note || "").slice(0, 400),
    slip_path: input.slipPath || "",
    status,
  };
  if (input.ackNote) row.ack_note = input.ackNote.slice(0, 400);
  if (status === "acknowledged") row.ack_at = new Date().toISOString();
  const { data, error } = await sb().from(TABLE).insert(row).select().single();
  if (error) fail(error);
  return rowToPayment(data);
}

/** Investor's own payments — never exposes the slip path. */
export async function listForUser(userId: string): Promise<Payment[]> {
  const { data, error } = await sb()
    .from(TABLE)
    .select("id,user_id,user_name,user_email,amount,reference,note,status,ack_note,created_at,ack_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) fail(error);
  return (data || []).map(rowToPayment);
}

/** All payments (admin) with short-lived signed slip URLs. */
export async function listAllPayments(): Promise<Payment[]> {
  const { data, error } = await sb().from(TABLE).select("*").order("created_at", { ascending: false }).limit(1000);
  if (error) fail(error);
  const rows = data || [];
  return Promise.all(
    rows.map(async (r: any) => {
      const p = rowToPayment(r);
      p.slipUrl = r.slip_path ? await signedUrl(r.slip_path).catch(() => "") : "";
      return p;
    })
  );
}

export async function acknowledgePayment(
  id: string,
  status: "acknowledged" | "rejected" | "submitted",
  ackNote?: string
): Promise<Payment> {
  const upd: any = { status };
  if (typeof ackNote === "string") upd.ack_note = ackNote.slice(0, 400);
  if (status === "acknowledged") upd.ack_at = new Date().toISOString();
  const { data, error } = await sb().from(TABLE).update(upd).eq("id", id).select().single();
  if (error) fail(error);
  return rowToPayment(data);
}
