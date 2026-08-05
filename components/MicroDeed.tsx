/* Confidential Micro Co-Investment & Pooled Land-Banking Agreement — auto-generated
   per micro-pool contribution, personalised with the investor's name, email and the
   exact contributed amount. Mirrors the Master Deed layout (.ag-* classes). */

const Fill = ({ w = 160 }: { w?: number }) => (
  <span className="ag-fill" style={{ minWidth: w }} />
);

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

/** Indian-system number to words (whole rupees up to lakhs — covers the ₹10k–₹5L band). */
function inWords(n: number): string {
  n = Math.round(n);
  if (n <= 0) return "";
  const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const two = (x: number): string => (x < 20 ? a[x] : b[Math.floor(x / 10)] + (x % 10 ? "-" + a[x % 10] : ""));
  const three = (x: number): string => {
    const h = Math.floor(x / 100), r = x % 100;
    return (h ? a[h] + " Hundred" + (r ? " " : "") : "") + (r ? two(r) : "");
  };
  const lakh = Math.floor(n / 100000); n %= 100000;
  const thou = Math.floor(n / 1000); n %= 1000;
  const hund = n;
  const parts: string[] = [];
  if (lakh) parts.push(two(lakh) + " Lakh");
  if (thou) parts.push(two(thou) + " Thousand");
  if (hund) parts.push(three(hund));
  return parts.join(" ").trim();
}

export default function MicroDeed({
  name,
  email,
  refNo,
  amount,
}: {
  name: string;
  email: string;
  dateStr: string;
  refNo: string;
  amount: number;
}) {
  const investor = name || "________________________";
  const amt = Math.max(0, Math.round(amount || 0));
  const words = inWords(amt);

  // Target return playbook — up to 15% / 16% / 17% base distributions over a 36-month
  // pooled horizon, principal returned at maturity (≈ 1.48× target aggregate).
  const y1 = Math.round(amt * 0.15);
  const y2 = Math.round(amt * 0.16);
  const y3 = Math.round(amt * 0.17);
  const maturity = amt + y1 + y2 + y3;

  return (
    <div className="ag-doc">
      {/* letterhead */}
      <div className="ag-head">
        <div>
          <div className="ag-brand">MONEY MULTIPLY</div>
          <div className="ag-brand-sub">THE LAND BANKERS AND TRADERS</div>
          <div className="ag-brand-tag">Invest • Trade • Grow • Multiply</div>
        </div>
        <div className="ag-legal">
          <b>Money Multiply Trading &amp; Consultant Pvt. Ltd.</b>
          <span>B-128, First Floor, Sector-2 Noida,</span>
          <span>Gautam Buddha Nagar, Uttar Pradesh – 201301</span>
          <span>CIN: U70200UP2026PTC253626</span>
          <span>Web: moneymultiplyglobal.com | Email: info@moneymultiplyglobal.com</span>
        </div>
      </div>
      <div className="ag-rule" />

      <h1 className="ag-title">CONFIDENTIAL MICRO CO-INVESTMENT &amp; POOLED LAND-BANKING AGREEMENT</h1>
      <div className="ag-ref">Ref No: {refNo}</div>

      <div className="ag-callout" style={{ textAlign: "center" }}>
        <b>Allocation Vehicle:</b> Money Multiply Micro Funding Pool
        <div style={{ fontSize: "11.5px", color: "#4b5563", marginTop: "4px" }}>
          Diversified, title-clear land-bank allocation · Small-ticket band ₹10,000 – ₹5,00,000
        </div>
      </div>

      {/* key facts */}
      <table className="ag-kv">
        <tbody>
          <tr><td>First Party (Company)</td><td>Money Multiply Trading &amp; Consultant Private Limited (CIN: U70200UP2026PTC253626)</td></tr>
          <tr><td>Registered Corporate Base</td><td>B-128, First Floor, Sector-2 Noida, Gautam Buddha Nagar, Uttar Pradesh – 201301</td></tr>
          <tr><td>Second Party (Co-Investor)</td><td><b>{investor}</b>{email ? ` · ${email}` : ""}</td></tr>
          <tr><td>Contribution Amount</td><td><b>{inr(amt)}/-</b>{words ? ` (Rupees ${words} Only)` : ""}</td></tr>
          <tr><td>Allocation Vehicle</td><td>Micro Funding Pool — pooled, diversified land-bank block</td></tr>
          <tr><td>Target Maturity Horizon</td><td>36 Calendar Months (Fixed Pooled Lifecycle)</td></tr>
          <tr><td>Governing Framework</td><td>Indian Arbitration &amp; Conciliation Act, 1996 &amp; Companies Act, 2013</td></tr>
        </tbody>
      </table>

      <p className="ag-note-box">
        THIS DOCUMENT FORMS AN ENFORCEABLE CONTRACT UNDER INDIAN LAW FOR THE SPECIFIC CONTRIBUTION
        OF {inr(amt)} STATED ABOVE. STAMP DUTY TO BE ADJUDICATED ELECTRONICALLY OR MANUALLY AT THE
        TIME OF EXECUTION.
      </p>

      <h2 className="ag-h2">Micro Co-Investment &amp; Pooled Allocation Agreement</h2>
      <p>
        THIS CONFIDENTIAL MICRO CO-INVESTMENT AND POOLED LAND-BANKING AGREEMENT (the
        &quot;Agreement&quot;) is executed and made legally operational on this <Fill w={60} /> day of{" "}
        <Fill w={120} />, 2026 (the &quot;Execution Date&quot;), by and between:
      </p>
      <p>
        <b>MONEY MULTIPLY TRADING &amp; CONSULTANT PRIVATE LIMITED</b>, a company incorporated under the
        Companies Act, 2013, holding CIN <b>U70200UP2026PTC253626</b>, having its registered office at
        B-128, First Floor, Sector-2 Noida, Gautam Buddha Nagar, Uttar Pradesh – 201301 (the
        &quot;Company&quot; or &quot;First Party&quot;);
      </p>
      <p style={{ textAlign: "center" }}><b>AND</b></p>
      <p>
        <b>{investor}</b>{email ? ` (${email})` : ""}, son / daughter / spouse of <Fill w={150} />, residing
        permanently at <Fill w={230} />, bearing Permanent Account Number (PAN): <Fill w={130} /> and
        Aadhaar Number: <Fill w={140} /> (the &quot;Co-Investor&quot; or &quot;Second Party&quot;).
      </p>
      <p>
        The Company and the Co-Investor shall collectively be the &quot;Parties&quot; and individually a
        &quot;Party&quot;.
      </p>

      <h2 className="ag-h2">Recitals &amp; Contextual Background</h2>
      <ul className="ag-list">
        <li>The Company operates across land-bank procurement, spatial landscape engineering, civil layout zoning and fractional commercial real estate across the Greater Noida and Uttarakhand growth corridors.</li>
        <li>The Company operates the <b>Micro Funding Pool</b> — a dedicated small-ticket vehicle that aggregates individual contributions in the ₹10,000 to ₹5,00,000 band into a single, professionally managed, diversified land-bank allocation.</li>
        <li>The Co-Investor has elected to deploy a principal contribution of <b>{inr(amt)}</b>{words ? ` (Rupees ${words} Only)` : ""} into the Micro Funding Pool under a structured, asset-secured arrangement, which the Company has agreed to accept on the terms set out herein.</li>
        <li>Each contribution is proportionately allocated across the pooled land-bank so that even a small-ticket Co-Investor participates in institution-grade, title-clear assets.</li>
      </ul>

      <h2 className="ag-h2">Article 1 — Definitions</h2>
      <ul className="ag-list">
        <li><b>&quot;Pool&quot; / &quot;Micro Funding Pool&quot;</b> — the diversified land-bank allocation vehicle into which small-ticket contributions between ₹10,000 and ₹5,00,000 are aggregated and deployed.</li>
        <li><b>&quot;Principal Contribution&quot;</b> — the sum of <b>{inr(amt)}</b> transferred by the Second Party to the Company&apos;s designated banking channels under this Agreement.</li>
        <li><b>&quot;Allocation Share&quot;</b> — the Co-Investor&apos;s proportionate economic interest in the Pool, equal to the Principal Contribution divided by the aggregate corpus of the Pool at the time of activation.</li>
        <li><b>&quot;Maturity Framework&quot;</b> — the execution and profit-realisation phase lasting exactly 36 calendar months from capital activation.</li>
      </ul>

      <h2 className="ag-h2">Article 2 — Pool Mechanics &amp; Allocation</h2>
      <ul className="ag-list">
        <li><b>2.1 Aggregation:</b> The Principal Contribution is pooled with contributions from other Co-Investors and deployed as a single block into title-clear, professionally selected land-bank parcels.</li>
        <li><b>2.2 Diversification:</b> The Pool spreads capital across multiple parcels and phases, so no single Co-Investor bears the concentration risk of an individual plot.</li>
        <li><b>2.3 Proportionate Interest:</b> The Co-Investor&apos;s Allocation Share, and every distribution under Article 3, is computed strictly on the {inr(amt)} Principal Contribution recorded against this Ref No.</li>
        <li><b>2.4 Ledger Activation:</b> The Company acknowledges ledger activation of the Principal Contribution upon realisation of funds and issues this Agreement as the record of the Co-Investor&apos;s participation.</li>
      </ul>

      <h2 className="ag-h2">Article 3 — Capital Covenants &amp; Return Playbook</h2>
      <p>
        <b>3.1 Principal Deployment:</b> The Co-Investor transfers <b>{inr(amt)}</b> into the Micro Funding Pool; the Company acknowledges ledger activation of this contribution.
      </p>
      <p>
        <b>3.2 Target Return:</b> Over the 36-month horizon the Pool targets base distributions of up to 15%, 16% and 17% of the Principal Contribution respectively, with the principal returned at maturity — a target aggregate of <b>{inr(maturity)}</b> for this contribution (inclusive of principal and performance-linked profit).
      </p>
      <table className="ag-table">
        <thead>
          <tr><th>Operating Target Phase</th><th>Annual Return Vector</th><th>Pool Execution Milestones</th><th>Cumulative Ledger Clearance</th></tr>
        </thead>
        <tbody>
          <tr><td>End of Year 1</td><td>Up to 15% base distribution</td><td>Parcel identification, title conversion, zoning approvals and perimeter tracking across the pooled land-bank.</td><td>{inr(y1)} gross disbursed profits</td></tr>
          <tr><td>End of Year 2</td><td>Up to 16% base distribution</td><td>Layout engineering, plotting, civic infrastructure and phased value uplift across parcels.</td><td>{inr(y1 + y2)} cumulative</td></tr>
          <tr><td>End of Year 3 (Maturity)</td><td>Up to 17% final distribution</td><td>Parcel disposals / fractional activation, pooled settlement and final maturity clearance.</td><td>{inr(y1 + y2 + y3)} cumulative distributions</td></tr>
        </tbody>
      </table>
      <p>
        <b>3.3 Maturity Settlement:</b> At the 36th month, the Company returns the <b>{inr(amt)}</b> deployed principal alongside final pooled balances — a target aggregate of <b>{inr(maturity)}</b> for this contribution. All return figures are targets, not guarantees, and are subject to the diversified performance of the Pool.
      </p>

      <h2 className="ag-h2">Article 4 — Terms, Conditions &amp; Legal Disclosures</h2>
      <ul className="ag-list">
        <li><b>4.1 Capital Ring-Fencing:</b> Every rupee of the {inr(amt)} is locked exclusively into land acquisition, layout development and allied costs of the pooled land-bank; the Company may not use it to settle unrelated debts.</li>
        <li><b>4.2 Asset-Backed Security:</b> Pool contributions are secured against the title-clear land parcels acquired by the Pool, forming an asset cushion behind the Co-Investor&apos;s Allocation Share.</li>
        <li><b>4.3 Statutory Compliance:</b> Deployment complies with applicable state land-ownership laws, environmental and municipal zoning norms and MCA rules.</li>
        <li><b>4.4 TDS:</b> All distributions and maturity balances are subject to Indian income tax; the Company deducts TDS at mandated rates and issues Form 16A.</li>
        <li><b>4.5 Lock-In:</b> A 36-month lock-in applies to this contribution. No right to early liquidation, save under extreme circumstances with board approval and an early-exit discount of up to 10% of the Principal Contribution.</li>
        <li><b>4.6 No Guarantee:</b> Return vectors in Article 3 are performance targets driven by the diversified Pool and do not constitute a guaranteed or assured return.</li>
      </ul>

      <h2 className="ag-h2">Article 5 — Restrictions &amp; Indemnification</h2>
      <ul className="ag-list">
        <li><b>5.1 Passive Status:</b> This is a passive profit-sharing collaboration; the Co-Investor holds no voting authority or operational voice in the Pool or its parcels.</li>
        <li><b>5.2 Title Indemnification:</b> The Company indemnifies the Co-Investor against losses from title discrepancies, ownership disputes or administrative non-compliance on pooled parcels.</li>
        <li><b>5.3 Force Majeure:</b> Neither Party is liable for delays from acts of God, seismic events, statutory shifts or similar; the 36-month schedule extends by the disruption period.</li>
        <li><b>5.4 Confidentiality:</b> The Co-Investor maintains confidentiality over pool plans, financials and strategies; leakage is a material breach.</li>
        <li><b>5.5 Severability:</b> Invalidity of any clause remains localised and does not affect the remaining Agreement.</li>
        <li><b>5.6 Entire Agreement:</b> This Agreement overrides all prior verbal understandings, emails, messages or brochures in respect of this contribution.</li>
        <li><b>5.7 Governing Law &amp; Arbitration:</b> Governed by the laws of India; disputes go to conciliation, then sole-arbitrator arbitration under the Arbitration &amp; Conciliation Act, 1996. Seat/venue: Noida, Gautam Buddha Nagar, Uttar Pradesh; language English; local courts retain exclusive jurisdiction.</li>
      </ul>

      <h2 className="ag-h2">Article 6 — Termination &amp; Exit</h2>
      <ul className="ag-list">
        <li><b>6.1 Natural Expiry:</b> The Agreement concludes once the maturity settlement and the {inr(amt)} principal are transferred to the Co-Investor.</li>
        <li><b>6.2 Material Default:</b> On material breach, the non-defaulting Party issues a written cure notice; the defaulting Party has 45 days to remedy, failing which arbitration may be initiated.</li>
      </ul>

      <h2 className="ag-h2">Article 7 — Execution &amp; Signatures</h2>
      <p>
        IN WITNESS WHEREOF, the Parties have set their signatures and seals onto this Agreement on the day
        and year first written above at Noida, Gautam Buddha Nagar, Uttar Pradesh, in the presence of the
        undermentioned witnesses.
      </p>
      <div className="ag-sign">
        <div className="ag-sign-col">
          <div className="ag-sign-line" />
          <b>Micro Co-Investor</b>
          <span className="ag-muted">{investor}</span>
          {email && <span className="ag-muted">{email}</span>}
          <span className="ag-muted">Contribution: {inr(amt)}</span>
          <span className="ag-muted">PAN: <Fill w={110} /></span>
          <span className="ag-muted">Date: <Fill w={70} /> · Place: <Fill w={90} /></span>
        </div>
        <div className="ag-sign-col">
          <div className="ag-sign-line" />
          <b>Director / Authorized Signatory</b>
          <span className="ag-muted">For Money Multiply Trading &amp; Consultant Pvt. Ltd.</span>
          <span className="ag-muted">Corporate Seal / Stamp</span>
          <span className="ag-muted">Date: <Fill w={70} /> · Place: Noida, U.P.</span>
        </div>
      </div>

      <div className="ag-foot">
        Money Multiply Trading &amp; Consultant Pvt. Ltd. • Confidential Micro Co-Investment Agreement • Generated for {investor} · {inr(amt)}. Subject to execution, stamping and KYC verification.
      </div>
    </div>
  );
}
