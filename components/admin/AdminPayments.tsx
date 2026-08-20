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
  const [investors, setInvestors] = useState<{ id: string; name: string; email: string }[]>([]);
  const [adding, setAdding] = useState(false);
  const emptyPay = { userId: "", amount: "", reference: "", note: "", status: "acknowledged" };
  const [np, setNp] = useState(emptyPay);
  const [savingNew, setSavingNew] = useState(false);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/payments")
      .then((r) => r.json())
      .then((d) => setPayments(d?.ok ? d.payments : []))
      .catch(() => setPayments([]))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok) {
          setInvestors(
            (d.users as { id: string; name: string; email: string; role: string }[])
              .filter((u) => u.role === "investor")
              .map((u) => ({ id: u.id, name: u.name, email: u.email }))
          );
        }
      })
      .catch(() => {});
  }, []);

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

  const removePayment = async (p: Payment) => {
    if (!confirm(`Delete this ${fmt(p.amount)} payment from ${p.userName || p.userEmail}? This removes the record and its slip. This cannot be undone.`)) return;
    const r = await fetch(`/api/admin/payments/${p.id}`, { method: "DELETE" });
    const d = await r.json().catch(() => ({}));
    if (r.ok && d.ok) {
      setPayments((prev) => prev.filter((x) => x.id !== p.id));
      toast("Payment deleted");
    } else toast("Couldn’t delete payment");
  };

  const setP = (k: keyof typeof np) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setNp((p) => ({ ...p, [k]: e.target.value }));

  const createManual = async () => {
    if (savingNew) return;
    if (!np.userId) return toast("Select an investor");
    if (!(Number(np.amount) > 0)) return toast("Enter the amount");
    setSavingNew(true);
    try {
      const r = await fetch("/api/admin/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: np.userId, amount: Number(np.amount), reference: np.reference, note: np.note, status: np.status }),
      });
      const d = await r.json().catch(() => ({}));
      setSavingNew(false);
      if (r.ok && d.ok) {
        setPayments((prev) => [d.payment, ...prev]);
        setNp(emptyPay);
        setAdding(false);
        toast("Manual payment recorded");
      } else toast("Couldn’t record payment");
    } catch {
      setSavingNew(false);
      toast("Network error");
    }
  };

  const addBlock = (
    <div style={{ marginBottom: "16px" }}>
      {!adding ? (
        <button className="btn-mini" onClick={() => setAdding(true)}>
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "6px" }}>
            <path d="M12 5v14M5 12h14" />
          </svg>
          Record manual payment
        </button>
      ) : (
        <div className="au-detail">
          <div className="leads-head" style={{ marginBottom: "12px" }}>
            <div className="lh-title">Record a manual payment</div>
          </div>
          <div className="frow">
            <div className="field">
              <label>Investor</label>
              <select value={np.userId} onChange={setP("userId")}>
                <option value="">Select investor…</option>
                {investors.map((i) => (
                  <option key={i.id} value={i.id}>{(i.name || i.email)} · {i.email}</option>
                ))}
              </select>
            </div>
            <div className="field"><label>Amount (₹)</label><input type="number" value={np.amount} onChange={setP("amount")} placeholder="500000" /></div>
          </div>
          <div className="frow">
            <div className="field"><label>Reference / UTR (optional)</label><input value={np.reference} onChange={setP("reference")} placeholder="Cash / bank ref" /></div>
            <div className="field">
              <label>Status</label>
              <select value={np.status} onChange={setP("status")}>
                <option value="acknowledged">Acknowledged (received)</option>
                <option value="submitted">Under review</option>
              </select>
            </div>
          </div>
          <div className="field"><label>Note (optional)</label><input value={np.note} onChange={setP("note")} placeholder="e.g. cash received at office / Himalayan Hills" /></div>
          <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
            <button className={"btn-gold" + (savingNew ? " loading" : "")} onClick={createManual} disabled={savingNew} style={{ padding: "10px 22px" }}>Record payment</button>
            <button className="btn-ghost" onClick={() => { setAdding(false); setNp(emptyPay); }} style={{ padding: "10px 18px" }}>Cancel</button>
          </div>
          {investors.length === 0 && (
            <p className="db-muted" style={{ fontSize: "12px", marginTop: "8px" }}>No investor accounts found yet — add one from the Users tab first.</p>
          )}
        </div>
      )}
    </div>
  );

  if (loading) return <p className="db-muted">Loading payments…</p>;
  if (payments.length === 0)
    return (
      <>
        {addBlock}
        <div className="lead-empty">
          <b>No payments yet</b>
          <p>Record one above, or investor payment slips submitted from their dashboard will appear here for review.</p>
        </div>
      </>
    );

  return (
    <>
      {addBlock}
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
            <button className="iconbtn del" aria-label="Delete payment" onClick={() => removePayment(p)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" /></svg>
            </button>
          </div>
        </div>
      ))}
      </div>
    </>
  );
}
