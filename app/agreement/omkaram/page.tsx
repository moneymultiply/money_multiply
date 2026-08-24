"use client";

import Link from "next/link";
import { useMarketplace } from "@/context/MarketplaceContext";
import OmkaramDeed from "@/components/OmkaramDeed";

function refFor(id: string, year: number, prefix: string): string {
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum = (sum + id.charCodeAt(i) * (i + 1)) % 9000;
  return `${prefix}/${year}/${1000 + sum}`;
}

export default function OmkaramAgreementPage() {
  const { currentUser, userReady } = useMarketplace();

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

  const created = currentUser.createdAt ? new Date(currentUser.createdAt) : new Date();
  const dateStr = created.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const refNo = refFor(currentUser.id, created.getFullYear(), "MM/OMKARAM");

  return (
    <div className="ag-page">
      <div className="ag-toolbar">
        <Link href="/dashboard" className="ag-btn ghost">← Back to dashboard</Link>
        <button className="ag-btn gold" onClick={() => window.print()}>Print / Save as PDF</button>
      </div>
      <OmkaramDeed name={currentUser.name} email={currentUser.email} dateStr={dateStr} refNo={refNo} pan={currentUser.pan} aadhaar={currentUser.aadhaar} />
    </div>
  );
}
