"use client";

import { useEffect, useState } from "react";
import { useMarketplace } from "@/context/MarketplaceContext";
import { MICRO_MIN, MICRO_MAX, MICRO_TICKETS } from "@/lib/data";
import type { MicroContribution } from "@/lib/types";

const STATUS_LABEL: Record<string, string> = {
  pledged: "Pledged",
  funded: "Funded",
  closed: "Closed",
};

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export default function MicroFundingPool() {
  const { fmt, toast } = useMarketplace();
  const [items, setItems] = useState<MicroContribution[]>([]);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const load = () => {
    fetch("/api/user/micro")
      .then((r) => r.json())
      .then((d) => d?.ok && setItems(d.micro))
      .catch(() => {});
  };
  useEffect(load, []);

  const amt = Math.round(Number(amount) || 0);
  const inRange = amt >= MICRO_MIN && amt <= MICRO_MAX;
  const committed = items
    .filter((i) => i.status !== "closed")
    .reduce((s, i) => s + i.amount, 0);

  const submit = async () => {
    if (busy) return;
    if (!inRange) return toast(`Enter an amount between ${inr(MICRO_MIN)} and ${inr(MICRO_MAX)}`);
    setBusy(true);
    try {
      const r = await fetch("/api/user/micro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amt, note }),
      });
      const d = await r.json().catch(() => ({}));
      setBusy(false);
      if (r.ok && d.ok) {
        toast("Micro contribution committed");
        setAmount(""); setNote("");
        load();
      } else if (d.error === "range") {
        toast(`Amount must be between ${inr(MICRO_MIN)} and ${inr(MICRO_MAX)}`);
      } else if (d.error === "investor_only") {
        toast("Micro pool is available to investor accounts");
      } else {
        toast("Couldn’t commit — try again");
      }
    } catch {
      setBusy(false);
      toast("Network error");
    }
  };

  return (
    <div className="db-card mfp">
      <div className="db-card-head">
        <h3 className="db-h3" style={{ margin: 0 }}>Micro Funding Pool</h3>
        <span className="mfp-band">{inr(MICRO_MIN)} – {inr(MICRO_MAX)}</span>
      </div>
      <p className="db-muted" style={{ marginTop: "12px" }}>
        A dedicated pool for smaller-ticket entries. Commit any amount within the band below and pay
        via the company account or UPI in the payment section — your contribution joins the pooled
        land-banking allocation and is tracked here.
      </p>

      {committed > 0 && (
        <div className="mfp-total">
          <span>Your active commitment</span>
          <b>{fmt(committed)}</b>
        </div>
      )}

      {/* quick tickets */}
      <div className="mfp-chips">
        {MICRO_TICKETS.map((t) => (
          <button
            key={t}
            type="button"
            className={"mfp-chip" + (amt === t ? " on" : "")}
            onClick={() => setAmount(String(t))}
          >
            {inr(t)}
          </button>
        ))}
      </div>

      <div className="frow" style={{ marginTop: "4px" }}>
        <div className="field">
          <label>Contribution amount (₹)</label>
          <input
            type="number"
            min={MICRO_MIN}
            max={MICRO_MAX}
            step={1000}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`${MICRO_MIN} – ${MICRO_MAX}`}
          />
          {amount !== "" && !inRange && (
            <span className="mfp-warn">Must be between {inr(MICRO_MIN)} and {inr(MICRO_MAX)}.</span>
          )}
        </div>
        <div className="field">
          <label>Note (optional)</label>
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. monthly top-up" />
        </div>
      </div>

      <button
        className={"btn-gold" + (busy ? " loading" : "")}
        onClick={submit}
        disabled={busy || !inRange}
        style={{ padding: "12px 22px" }}
      >
        Commit to pool
      </button>

      {items.length > 0 && (
        <>
          <h4 className="pd-sub">Your micro contributions</h4>
          <table className="pd-fin">
            <thead>
              <tr><td>Date</td><td>Amount</td><td>Note</td><td style={{ textAlign: "right" }}>Status</td></tr>
            </thead>
            <tbody>
              {items.map((m) => (
                <tr key={m.id}>
                  <td>{m.createdAt ? new Date(m.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}</td>
                  <td>{fmt(m.amount)}</td>
                  <td style={{ color: "var(--muted)", fontSize: "12px" }}>{m.note || "—"}</td>
                  <td style={{ textAlign: "right" }}><span className={"pay-badge mfp-" + m.status}>{STATUS_LABEL[m.status] || m.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
