"use client";

import { useEffect, useState } from "react";
import { useMarketplace } from "@/context/MarketplaceContext";
import type { MicroContribution } from "@/lib/types";

const STATUS_LABEL: Record<string, string> = {
  pledged: "Pledged",
  funded: "Funded",
  closed: "Closed",
};

export default function AdminMicro() {
  const { fmt, toast } = useMarketplace();
  const [items, setItems] = useState<MicroContribution[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/micro")
      .then((r) => r.json())
      .then((d) => setItems(d?.ok ? d.micro : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const update = async (id: string, status: "funded" | "closed", adminNote?: string) => {
    const r = await fetch(`/api/admin/micro/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, adminNote }),
    });
    const d = await r.json().catch(() => ({}));
    if (d?.ok) {
      setItems((prev) => prev.map((m) => (m.id === id ? d.micro : m)));
      toast(status === "funded" ? "Marked as funded" : "Contribution closed");
    } else toast("Couldn’t update");
  };

  const markFunded = (m: MicroContribution) => {
    const ref = window.prompt(
      `Mark ${fmt(m.amount)} from ${m.userName || m.userEmail} as funded.\nOptional note to show the investor:`,
      "Payment received — added to the pool"
    );
    if (ref === null) return;
    update(m.id, "funded", ref);
  };

  const totalActive = items.filter((m) => m.status !== "closed").reduce((s, m) => s + m.amount, 0);

  if (loading) return <p className="db-muted">Loading micro pool…</p>;
  if (items.length === 0)
    return (
      <div className="lead-empty">
        <b>No micro contributions yet</b>
        <p>Investor commitments to the Micro Funding Pool (₹10,000–₹5,00,000) will appear here.</p>
      </div>
    );

  return (
    <>
      <div className="mfp-total" style={{ marginBottom: "16px" }}>
        <span>Total active pool</span>
        <b>{fmt(totalActive)}</b>
      </div>
      <div className="admin-list">
        {items.map((m) => (
          <div className="adm-item" key={m.id} style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
            <div className="ai-info" style={{ flex: "1 1 200px" }}>
              <b>{fmt(m.amount)} · {m.userName || m.userEmail}</b>
              <span>
                {m.userEmail}
                {m.note ? ` · ${m.note}` : ""}
                {m.createdAt ? ` · ${new Date(m.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}` : ""}
              </span>
              <span style={{ display: "block", marginTop: "4px" }}>
                <span className={"pay-badge mfp-" + m.status}>{STATUS_LABEL[m.status] || m.status}</span>
                {m.adminNote && <span className="db-muted" style={{ fontSize: "11.5px", marginLeft: "8px" }}>“{m.adminNote}”</span>}
              </span>
            </div>
            <div className="adm-actions" style={{ flexWrap: "wrap", gap: "6px" }}>
              {m.status !== "funded" && (
                <button className="btn-mini" onClick={() => markFunded(m)}>Mark funded</button>
              )}
              {m.status !== "closed" && (
                <button className="btn-mini danger" onClick={() => update(m.id, "closed")}>Close</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
