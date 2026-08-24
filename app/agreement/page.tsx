"use client";

import Link from "next/link";
import { useMarketplace } from "@/context/MarketplaceContext";
import PartnerAgreement from "@/components/PartnerAgreement";
import InvestorDeed from "@/components/InvestorDeed";

function refFor(id: string, year: number, prefix: string): string {
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum = (sum + id.charCodeAt(i) * (i + 1)) % 9000;
  return `${prefix}/${year}/${1000 + sum}`;
}

export default function AgreementPage() {
  const { currentUser, userReady } = useMarketplace();

  if (!userReady) {
    return <div className="ag-page"><p style={{ color: "#ddd", textAlign: "center" }}>Loading…</p></div>;
  }
  if (!currentUser) {
    return (
      <div className="ag-page">
        <div className="ag-doc" style={{ textAlign: "center" }}>
          <p>This document is available to onboarded partners and investors only.</p>
          <Link href="/" className="btn-gold" style={{ display: "inline-flex", padding: "12px 22px", marginTop: "12px", borderRadius: "8px" }}>Back to home</Link>
        </div>
      </div>
    );
  }

  const u = currentUser;
  const created = u.createdAt ? new Date(u.createdAt) : new Date();
  const dateStr = created.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const isPartner = u.role === "partner";
  const refNo = refFor(u.id, created.getFullYear(), isPartner ? "MM/CP-OFFER" : "MM/DEED");

  return (
    <div className="ag-page">
      <div className="ag-toolbar">
        <Link href="/dashboard" className="ag-btn ghost">← Back to dashboard</Link>
        <button className="ag-btn gold" onClick={() => window.print()}>Print / Save as PDF</button>
      </div>
      {isPartner ? (
        <PartnerAgreement name={u.name} email={u.email} dateStr={dateStr} refNo={refNo} />
      ) : (
        <InvestorDeed name={u.name} email={u.email} dateStr={dateStr} refNo={refNo} pan={u.pan} aadhaar={u.aadhaar} />
      )}
    </div>
  );
}
