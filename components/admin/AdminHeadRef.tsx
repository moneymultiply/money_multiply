"use client";

import { useEffect, useState } from "react";
import { useMarketplace } from "@/context/MarketplaceContext";

export default function AdminHeadRef() {
  const { toast } = useMarketplace();
  const [code, setCode] = useState("");
  const [origin, setOrigin] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
    fetch("/api/admin/head-ref")
      .then((r) => r.json())
      .then((d) => d?.ok && setCode(d.code))
      .catch(() => {});
  }, []);

  const link = (role?: string) => `${origin}/?ref=${code}${role ? `&role=${role}` : ""}`;

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast(label + " copied");
    } catch {
      toast(text);
    }
  };

  const regenerate = async () => {
    if (!confirm("Generate a new head referral code? Old links will stop attributing to you.")) return;
    setBusy(true);
    const r = await fetch("/api/admin/head-ref", { method: "POST" });
    const d = await r.json().catch(() => ({}));
    setBusy(false);
    if (d?.ok) {
      setCode(d.code);
      toast("New referral code generated");
    } else toast("Couldn’t regenerate");
  };

  if (!code) return null;

  return (
    <div className="adm-ref">
      <div className="adm-ref-top">
        <div>
          <div className="adm-ref-l">Your head referral code</div>
          <button className="adm-ref-code" onClick={() => copy(code, "Code")} title="Copy code">
            {code}
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>
          </button>
        </div>
        <button className="btn-mini" onClick={regenerate} disabled={busy}>Regenerate</button>
      </div>
      <p className="adm-ref-hint">Share a link — the referral code is pre-filled on the sign-up form. New sign-ups are attributed to this code.</p>
      <div className="adm-ref-links">
        <button className="btn-mini" onClick={() => copy(link(), "Invite link")}>Copy invite link</button>
        <button className="btn-mini" onClick={() => copy(link("partner"), "Partner link")}>Copy partner link</button>
        <button className="btn-mini" onClick={() => copy(link("investor"), "Investor link")}>Copy investor link</button>
      </div>
    </div>
  );
}
