"use client";

import Link from "next/link";
import { useMarketplace } from "@/context/MarketplaceContext";
import PartnerAgreement from "@/components/PartnerAgreement";

function refFor(id: string, year: number): string {
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum = (sum + id.charCodeAt(i) * (i + 1)) % 9000;
  return `MM/CP-OFFER/${year}/${1000 + sum}`;
}

export default function AgreementPage() {
  const { currentUser, userReady } = useMarketplace();

  if (!userReady) {
    return <div className="ag-page"><p style={{ color: "#ddd", textAlign: "center" }}>Loading…</p></div>;
  }
  if (!currentUser || currentUser.role !== "partner") {
    return (
      <div className="ag-page">
        <div className="ag-doc" style={{ textAlign: "center" }}>
          <p>This Channel Partner Agreement is available to onboarded partners only.</p>
          <Link href="/" className="btn-gold" style={{ display: "inline-flex", padding: "12px 22px", marginTop: "12px", borderRadius: "8px" }}>Back to home</Link>
        </div>
      </div>
    );
  }

  const u = currentUser;
  const created = u.createdAt ? new Date(u.createdAt) : new Date();
  const dateStr = created.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const refNo = refFor(u.id, created.getFullYear());

  return (
    <div className="ag-page">
      <div className="ag-toolbar">
        <Link href="/dashboard" className="ag-btn ghost">← Back to dashboard</Link>
        <button className="ag-btn gold" onClick={() => window.print()}>Print / Save as PDF</button>
      </div>
      <PartnerAgreement name={u.name} email={u.email} dateStr={dateStr} refNo={refNo} />
    </div>
  );
}
