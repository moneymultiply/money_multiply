"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMarketplace } from "@/context/MarketplaceContext";
import PartnerAgreement from "@/components/PartnerAgreement";
import InvestorDeed from "@/components/InvestorDeed";
import type { Holding, AppUser } from "@/lib/types";

function refFor(id: string, year: number, prefix: string): string {
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum = (sum + id.charCodeAt(i) * (i + 1)) % 9000;
  return `${prefix}/${year}/${1000 + sum}`;
}

const isApproved = (s?: string) => ["approved", "allotted", "confirmed", "funded"].includes((s || "").toLowerCase());

export default function AgreementPage() {
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
          <p>This document is available to onboarded partners and investors only.</p>
          <Link href="/" className="btn-gold" style={{ display: "inline-flex", padding: "12px 22px", marginTop: "12px", borderRadius: "8px" }}>Back to home</Link>
        </div>
      </div>
    );
  }

  const u = currentUser;
  const isPartner = u.role === "partner";
  const hasHimalayan = holdings.some((h) => /himalayan hills/i.test(h.title || "") && isApproved(h.status));

  // Investors only see the deed once an approved Himalayan Hills investment exists.
  if (!isPartner) {
    if (!loadedH) {
      return <div className="ag-page"><p style={{ color: "#ddd", textAlign: "center" }}>Loading…</p></div>;
    }
    if (!hasHimalayan) {
      return (
        <div className="ag-page">
          <div className="ag-doc" style={{ textAlign: "center" }}>
            <p>Your co-investment deed will be available here once your investment in this plot is approved by the Money Multiply team.</p>
            <Link href="/dashboard" className="btn-gold" style={{ display: "inline-flex", padding: "12px 22px", marginTop: "12px", borderRadius: "8px" }}>Back to dashboard</Link>
          </div>
        </div>
      );
    }
  }

  const created = u.createdAt ? new Date(u.createdAt) : new Date();
  const dateStr = created.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const refNo = refFor(u.id, created.getFullYear(), isPartner ? "MM/CP-OFFER" : "MM/DEED");

  return (
    <div className="ag-page">
      <div className="ag-toolbar">
        <Link href="/dashboard" className="ag-btn ghost">← Back to dashboard</Link>
        <button className="ag-btn gold" onClick={() => window.print()}>Print / Save as PDF</button>
      </div>
      {isPartner ? (
        <PartnerAgreement name={u.name} email={u.email} dateStr={dateStr} refNo={refNo} pan={me?.pan ?? u.pan} aadhaar={me?.aadhaar ?? u.aadhaar} />
      ) : (
        <InvestorDeed name={u.name} email={u.email} dateStr={dateStr} refNo={refNo} pan={me?.pan ?? u.pan} aadhaar={me?.aadhaar ?? u.aadhaar} />
      )}
    </div>
  );
}
