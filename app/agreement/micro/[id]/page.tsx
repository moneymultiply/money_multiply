"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMarketplace } from "@/context/MarketplaceContext";
import MicroDeed from "@/components/MicroDeed";
import type { MicroContribution } from "@/lib/types";

function refFor(id: string, year: number, prefix: string): string {
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum = (sum + id.charCodeAt(i) * (i + 1)) % 9000;
  return `${prefix}/${year}/${1000 + sum}`;
}

export default function MicroAgreementPage() {
  const params = useParams();
  const id = String(params?.id || "");
  const { currentUser, userReady } = useMarketplace();
  const [item, setItem] = useState<MicroContribution | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    fetch("/api/user/micro")
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok) setItem((d.micro as MicroContribution[]).find((m) => m.id === id) || null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [currentUser?.id, id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!userReady || (currentUser && loading)) {
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

  if (!item) {
    return (
      <div className="ag-page">
        <div className="ag-doc" style={{ textAlign: "center" }}>
          <p>We couldn&apos;t find this micro contribution against your account.</p>
          <Link href="/dashboard" className="btn-gold" style={{ display: "inline-flex", padding: "12px 22px", marginTop: "12px", borderRadius: "8px" }}>Back to dashboard</Link>
        </div>
      </div>
    );
  }

  const created = item.createdAt ? new Date(item.createdAt) : new Date();
  const dateStr = created.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const refNo = refFor(item.id, created.getFullYear(), "MM/MICRO");

  return (
    <div className="ag-page">
      <div className="ag-toolbar">
        <Link href="/dashboard" className="ag-btn ghost">← Back to dashboard</Link>
        <button className="ag-btn gold" onClick={() => window.print()}>Print / Save as PDF</button>
      </div>
      <MicroDeed
        name={currentUser.name}
        email={currentUser.email}
        dateStr={dateStr}
        refNo={refNo}
        amount={item.amount}
        pan={currentUser.pan}
        aadhaar={currentUser.aadhaar}
        address={currentUser.address}
        execDate={item.createdAt}
      />
    </div>
  );
}
