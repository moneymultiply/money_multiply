"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useMarketplace } from "@/context/MarketplaceContext";

/** When the URL has ?ref=CODE (optionally &role=partner|investor), open the
    sign-up modal with the referral code pre-filled. */
export default function ReferralAutoOpen() {
  const params = useSearchParams();
  const { openAssociate, currentUser, userReady } = useMarketplace();
  const done = useRef(false);

  useEffect(() => {
    if (done.current || !userReady) return;
    const ref = params.get("ref");
    if (!ref) return;
    done.current = true;
    if (currentUser) return; // already logged in — don't interrupt
    const role = params.get("role");
    openAssociate({ ref, role: role === "partner" || role === "investor" ? role : undefined });
  }, [params, userReady, currentUser, openAssociate]);

  return null;
}
