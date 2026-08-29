"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMarketplace } from "@/context/MarketplaceContext";
import OmkaramDeed from "@/components/OmkaramDeed";
import type { Holding, AppUser } from "@/lib/types";

function refFor(id: string, year: number, prefix: string): string {
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum = (sum + id.charCodeAt(i) * (i + 1)) % 9000;
  return `${prefix}/${year}/${1000 + sum}`;
}

const isApproved = (s?: string) => ["approved", "allotted", "confirmed", "funded"].includes((s || "").toLowerCase());

export default function OmkaramAgreementPage() {
  const { currentUser, userReady } = useMarketplace();
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [me, setMe] = useState<AppUser | null>(null);
  const [loadedH, setLoadedH] = useState(false);

  useEffect(() => {
    if (!currentUser) { setLoadedH(true); return; }
    fetch("/api/user/me")
      .then((r) => r.json())
      .then((d) => { if (d?.ok) { setHoldings(d.holdings || []); setMe(d.user || null); } })
      .catch(() => {})
      .finally(() => setLoadedH(true));
  }, [currentUser?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!userReady) {
    return <div className="ag-page"><p style={{ color: "#ddd", textAlign: "center" }}>Loading…</p></div>;
  }
  if (!currentUser) {
    return (
      <div className="ag-page">
        <div className="ag-doc" style={{ textAlign: "center" }}>
          <p>This agreement is available to onboarded investors only.</p>
          <Link href="/" className="btn-gold" style={{ display: "inline-flex", padding: "12px 22px", marginTop: "12px", borderRadius: "8px" }}>Back to home</Link>
        </div>
      </div>
    );
  }

  const hasOmkaram = holdings.some((h) => /omkaram/i.test(h.title || "") && isApproved(h.status));
  if (!loadedH) {
    return <div className="ag-page"><p style={{ color: "#ddd", textAlign: "center" }}>Loading…</p></div>;
  }
  if (!hasOmkaram) {
    return (
      <div className="ag-page">
        <div className="ag-doc" style={{ textAlign: "center" }}>
          <p>Your Omkaram co-investment deed will be available here once your investment in the Omkaram project is approved.</p>
          <Link href="/dashboard" className="btn-gold" style={{ display: "inline-flex", padding: "12px 22px", marginTop: "12px", borderRadius: "8px" }}>Back to dashboard</Link>
        </div>
      </div>
    );
  }

  const created = currentUser.createdAt ? new Date(currentUser.createdAt) : new Date();
  const dateStr = created.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const refNo = refFor(currentUser.id, created.getFullYear(), "MM/OMKARAM");

  return (
    <div className="ag-page">
      <div className="ag-toolbar">
        <Link href="/dashboard" className="ag-btn ghost">← Back to dashboard</Link>
        <button className="ag-btn gold" onClick={() => window.print()}>Print / Save as PDF</button>
      </div>
      <OmkaramDeed name={currentUser.name} email={currentUser.email} dateStr={dateStr} refNo={refNo} pan={me?.pan ?? currentUser.pan} aadhaar={me?.aadhaar ?? currentUser.aadhaar} address={me?.address ?? currentUser.address} />
    </div>
  );
}
