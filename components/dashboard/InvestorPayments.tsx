"use client";

import { useEffect, useState } from "react";
import { useMarketplace } from "@/context/MarketplaceContext";
import { COMPANY_BANK } from "@/lib/data";
import type { Payment } from "@/lib/types";

const STATUS_LABEL: Record<string, string> = {
  submitted: "Under review",
  acknowledged: "Acknowledged",
  rejected: "Rejected",
};

export default function InvestorPayments() {
  const { fmt, toast } = useMarketplace();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  const load = () => {
    fetch("/api/user/payments")
      .then((r) => r.json())
      .then((d) => d?.ok && setPayments(d.payments))
      .catch(() => {});
  };
  useEffect(load, []);

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast(label + " copied");
    } catch {
      toast(text);
    }
  };

  const submit = async () => {
    if (busy) return;
    if (!(Number(amount) > 0)) return toast("Enter the amount paid");
    if (!file) return toast("Attach your payment slip");
    if (file.size > 20 * 1024 * 1024) return toast("File too large (max 20MB)");
    setBusy(true);
    try {
      // 1. get a signed upload URL (validates the file type server-side)
      const contentType = file.type || "application/octet-stream";
      const s = await fetch("/api/user/payments/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType }),
      });
      const sd = await s.json().catch(() => ({}));
      if (!s.ok || !sd.ok) {
        setBusy(false);
        return toast(sd.error === "bad_type" ? "Use an image or PDF" : "Couldn’t start upload — try again");
      }

      // 2. upload the slip straight to storage (no serverless size limit)
      const up = await fetch(sd.signedUrl, { method: "PUT", headers: { "Content-Type": contentType }, body: file });
      if (!up.ok) {
        setBusy(false);
        return toast("Upload failed — please try again");
      }

      // 3. record the payment (tiny JSON request)
      const r = await fetch("/api/user/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, reference, note, slipPath: sd.path }),
      });
      const d = await r.json().catch(() => ({}));
      setBusy(false);
      if (r.ok && d.ok) {
        toast("Payment slip submitted");
        setAmount(""); setReference(""); setNote(""); setFile(null);
        load();
      } else {
        toast("Couldn’t submit — try again");
      }
    } catch {
      setBusy(false);
      toast("Network error");
    }
  };

  return (
    <div className="db-card">
      <h3 className="db-h3">Release payment to company account</h3>

      {/* bank details */}
      <div className="pay-bank">
        <div className="pay-row"><span>Beneficiary</span><b>{COMPANY_BANK.beneficiary}</b></div>
        <div className="pay-row"><span>Bank</span><b>{COMPANY_BANK.bank}</b></div>
        <div className="pay-row"><span>Account no.</span><b>{COMPANY_BANK.account}<button className="pay-copy" onClick={() => copy(COMPANY_BANK.account, "Account number")}>copy</button></b></div>
        <div className="pay-row"><span>IFSC</span><b>{COMPANY_BANK.ifsc}<button className="pay-copy" onClick={() => copy(COMPANY_BANK.ifsc, "IFSC")}>copy</button></b></div>
        <div className="pay-row"><span>Type</span><b>{COMPANY_BANK.type}</b></div>
        <div className="pay-row"><span>Branch</span><b>{COMPANY_BANK.branch}</b></div>
      </div>

      {/* scan & pay via UPI */}
      <div className="pay-qr">
        <div className="pay-qr-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={COMPANY_BANK.upiQr} alt="Scan to pay via UPI" width={180} height={180} />
        </div>
        <div className="pay-qr-info">
          <span className="pay-qr-tag">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M20 14v.01M14 20h.01M20 20v.01M17 20v.01M20 17h.01"/></svg>
            Scan &amp; Pay via UPI
          </span>
          <p className="db-muted" style={{ fontSize: "12px", margin: "6px 0 10px" }}>
            Open any UPI app (GPay, PhonePe, Paytm) and scan the code to pay directly.
          </p>
          <div className="pay-row" style={{ padding: 0, border: "none" }}>
            <span>UPI ID</span>
            <b>{COMPANY_BANK.upiVpa}<button className="pay-copy" onClick={() => copy(COMPANY_BANK.upiVpa, "UPI ID")}>copy</button></b>
          </div>
        </div>
      </div>

      <p className="db-muted" style={{ fontSize: "12px", margin: "10px 0 18px" }}>
        Transfer via NEFT / IMPS / UPI to the account above, then upload your payment slip below. Our
        team verifies it and shares an acknowledgement here.
      </p>

      {/* submit form */}
      <div className="frow">
        <div className="field"><label>Amount paid (₹)</label><input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="500000" /></div>
        <div className="field"><label>UTR / reference (optional)</label><input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Bank transaction ref" /></div>
      </div>
      <div className="field"><label>Note (optional)</label><input value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Himalayan Hills — 1 fraction" /></div>
      <div className="field">
        <label>Payment slip (image or PDF)</label>
        <input type="file" accept="image/*,application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        {file && <span className="db-muted" style={{ fontSize: "12px" }}>{file.name}</span>}
      </div>
      <button className={"btn-gold" + (busy ? " loading" : "")} onClick={submit} disabled={busy} style={{ padding: "12px 22px" }}>
        Submit payment slip
      </button>

      {/* history */}
      {payments.length > 0 && (
        <>
          <h4 className="pd-sub">Your payments</h4>
          <table className="pd-fin">
            <thead>
              <tr><td>Date</td><td>Amount</td><td>Status</td><td style={{ textAlign: "right" }}>Acknowledgement</td></tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>{p.createdAt ? new Date(p.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}</td>
                  <td>{fmt(p.amount)}</td>
                  <td><span className={"pay-badge " + p.status}>{STATUS_LABEL[p.status] || p.status}</span></td>
                  <td style={{ textAlign: "right", color: "var(--muted)", fontSize: "12px" }}>{p.ackNote || (p.status === "acknowledged" ? "Received" : "—")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
