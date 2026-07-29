"use client";

import { useEffect, useState } from "react";
import { useMarketplace } from "@/context/MarketplaceContext";
import type { Payment } from "@/lib/types";

const STATUS_LABEL: Record<string, string> = {
  submitted: "Under review",
  acknowledged: "Acknowledged",
  rejected: "Rejected",
};

export default function AdminPayments() {
  const { fmt, toast } = useMarketplace();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/payments")
      .then((r) => r.json())
      .then((d) => setPayments(d?.ok ? d.payments : []))
      .catch(() => setPayments([]))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const update = async (id: string, status: "acknowledged" | "rejected", ackNote?: string) => {
    const r = await fetch(`/api/admin/payments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, ackNote }),
    });
    const d = await r.json().catch(() => ({}));
    if (d?.ok) {
      setPayments((prev) => prev.map((p) => (p.id === id ? d.payment : p)));
      toast(status === "acknowledged" ? "Acknowledgement sent" : "Payment rejected");
    } else toast("Couldn’t update payment");
  };

  const acknowledge = (p: Payment) => {
    const ref = window.prompt(
      `Acknowledge ${fmt(p.amount)} from ${p.userName || p.userEmail}.\nOptional receipt/reference to share with the investor:`,
      p.reference ? `Received — ref ${p.reference}` : "Payment received with thanks"
    );
    if (ref === null) return; // cancelled
    update(p.id, "acknowledged", ref);
  };

  if (loading) return <p className="db-muted">Loading payments…</p>;
  if (payments.length === 0)
    return (
      <div className="lead-empty">
        <b>No payments yet</b>
        <p>Investor payment slips submitted from their dashboard will appear here for review.</p>
      </div>
    );

  return (
    <div className="admin-list">
      {payments.map((p) => (
        <div className="adm-item" key={p.id} style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
          <div className="ai-info" style={{ flex: "1 1 200px" }}>
            <b>{fmt(p.amount)} · {p.userName || p.userEmail}</b>
            <span>
              {p.userEmail}
              {p.reference ? ` · ref ${p.reference}` : ""}
              {p.note ? ` · ${p.note}` : ""}
            </span>
            <span style={{ display: "block", marginTop: "4px" }}>
              <span className={"pay-badge " + p.status}>{STATUS_LABEL[p.status] || p.status}</span>
              {p.ackNote && <span className="db-muted" style={{ fontSize: "11.5px", marginLeft: "8px" }}>“{p.ackNote}”</span>}
            </span>
          </div>
          <div className="adm-actions" style={{ flexWrap: "wrap", gap: "6px" }}>
            {p.slipUrl && (
              <a className="btn-mini" href={p.slipUrl} target="_blank" rel="noopener">View slip</a>
            )}
            {p.status !== "acknowledged" && (
              <button className="btn-mini" onClick={() => acknowledge(p)}>Acknowledge</button>
            )}
            {p.status !== "rejected" && (
              <button className="btn-mini danger" onClick={() => update(p.id, "rejected")}>Reject</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
