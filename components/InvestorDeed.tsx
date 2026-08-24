"use client";

/* Confidential Master Deed of Co-Investment & Profit-Sharing — auto-generated per investor.
   Content transcribed from the official Money Multiply Master Deed. */

const Fill = ({ w = 160 }: { w?: number }) => (
  <span className="ag-fill" style={{ minWidth: w }} />
);

/** Renders a KYC value if provided, otherwise a blank fill-in line. */
const Val = ({ v, w = 130 }: { v?: string; w?: number }) => (v ? <b>{v}</b> : <Fill w={w} />);

export default function InvestorDeed({
  name,
  email,
  refNo,
  pan,
  aadhaar,
}: {
  name: string;
  email: string;
  dateStr: string;
  refNo: string;
  pan?: string;
  aadhaar?: string;
}) {
  const investor = name || "________________________";
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

      <h1 className="ag-title">CONFIDENTIAL MASTER DEED OF CO-INVESTMENT &amp; STRATEGIC PROFIT-SHARING</h1>
      <div className="ag-ref">Ref No: {refNo}</div>

      <div className="ag-callout" style={{ textAlign: "center" }}>
        <b>Project Focus Allocation:</b> Himalayan Hills Cottage, Ranikhet
        <div style={{ fontSize: "11.5px", color: "#4b5563", marginTop: "4px" }}>
          10,000 Sq. Yards Premium Zoned Land Layout Framework
        </div>
      </div>

      {/* key facts */}
      <table className="ag-kv">
        <tbody>
          <tr><td>First Party (Company)</td><td>Money Multiply Trading &amp; Consultant Private Limited (CIN: U70200UP2026PTC253626)</td></tr>
          <tr><td>Registered Corporate Base</td><td>B-128, First Floor, Sector-2 Noida, Gautam Buddha Nagar, Uttar Pradesh – 201301</td></tr>
          <tr><td>Second Party (Co-Investor)</td><td><b>{investor}</b>{email ? ` · ${email}` : ""}</td></tr>
          <tr><td>Principal Allocation Base</td><td>INR 5,00,000/- (Rupees Five Lakhs Only) Portfolio Block</td></tr>
          <tr><td>Target Maturity Horizon</td><td>48 Calendar Months (Fixed Lifecycle)</td></tr>
          <tr><td>Governing Framework</td><td>Indian Arbitration &amp; Conciliation Act, 1996 &amp; Companies Act, 2013</td></tr>
        </tbody>
      </table>

      <p className="ag-note-box">
        THIS DOCUMENT FORMS AN ENFORCEABLE CONTRACT UNDER INDIAN LAW. STAMP DUTY TO BE
        ADJUDICATED ELECTRONICALLY OR MANUALLY AT THE TIME OF EXECUTION.
      </p>

      <h2 className="ag-h2">Master Deed of Co-Investment and Profit-Sharing</h2>
      <p>
        THIS CONFIDENTIAL MASTER DEED OF CO-INVESTMENT AND PROFIT-SHARING (the &quot;Deed&quot; or
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
        permanently at <Fill w={230} />, bearing Permanent Account Number (PAN): <Val v={pan} w={130} /> and
        Aadhaar Number: <Val v={aadhaar} w={140} /> (the &quot;Co-Investor&quot; or &quot;Second Party&quot;).
      </p>
      <p>
        The Company and the Co-Investor shall collectively be the &quot;Parties&quot; and individually a
        &quot;Party&quot;.
      </p>

      <h2 className="ag-h2">Recitals &amp; Contextual Background</h2>
      <ul className="ag-list">
        <li>The Company operates across land-bank procurement, spatial landscape engineering, civil layout zoning, fractional commercial real estate, and hill-station eco-tourism hospitality.</li>
        <li>The Company has acquired absolute controller intent over a premium 10,000 sq. yard land package in Ranikhet, Uttarakhand — the &quot;Himalayan Hills Cottage&quot; project — with a 180° unobstructed panoramic corridor over the snow-covered Himalayan ranges.</li>
        <li>The aggregate deployment budget is <b>₹25,00,00,000 (Twenty-Five Crores)</b>, with an audited post-development market value of <b>₹50,00,00,000 (Fifty Crores)</b>.</li>
        <li>The Co-Investor has offered to deploy a principal capital block of <b>₹5,00,000 (Five Lakhs)</b> into the development pool under a structured, asset-secured arrangement, which the Company has agreed to accept on the terms set out herein.</li>
      </ul>

      <h2 className="ag-h2">Article 1 — Definitions</h2>
      <ul className="ag-list">
        <li><b>&quot;Project&quot;</b> — the Himalayan Hills Cottage, Ranikhet: 50 luxury independent cottages, a central premium clubhouse, wellness facilities and infrastructure lanes across 10,000 sq. yards.</li>
        <li><b>&quot;Principal Sum&quot; / &quot;Capital Block&quot;</b> — ₹5,00,000 transferred by the Second Party to the Company&apos;s designated banking channels.</li>
        <li><b>&quot;Maturity Framework&quot;</b> — the execution and profit-realization phase lasting exactly 48 calendar months from capital activation.</li>
        <li><b>&quot;Dual-Engine Allocation Model&quot;</b> — Engine Alpha (capital gains via layout expansion) and Engine Beta (recurring premiums from resort operations).</li>
      </ul>

      <h2 className="ag-h2">Article 2 — Spatial Blueprint &amp; Land Layout</h2>
      <ul className="ag-list">
        <li><b>Cottage Sector (6,000 Sq. Yards):</b> exactly 50 premium luxury cottages, each with a uniform 120 sq. yard footprint, eco-sensitive architecture.</li>
        <li><b>Clubhouse &amp; Wellness Nucleus (2,000 Sq. Yards):</b> infinity pool, fitness center, spa, organic cafes and administrative desks.</li>
        <li><b>Open Environmental Reserve (2,000 Sq. Yards):</b> unbuilt — manicured lawns, trails and green corridors preserving the permanent 180° view.</li>
      </ul>

      <h2 className="ag-h2">Article 3 — Capital Covenants &amp; Return Playbook</h2>
      <p>
        <b>3.1 Principal Deployment:</b> The Co-Investor transfers ₹5,00,000 into the Company&apos;s fund pool; the Company acknowledges ledger activation of this capital block.
      </p>
      <p>
        <b>3.2 Guaranteed Completion Multiplier:</b> At the completion of the 48-month horizon, returns under the Dual-Engine model achieve a <b>100% portfolio expansion</b>, returning <b>₹10,00,000 (Ten Lakhs)</b> — inclusive of principal and performance-linked profit.
      </p>
      <table className="ag-table">
        <thead>
          <tr><th>Operating Target Phase</th><th>Annual Return Vector</th><th>Project Execution Milestones</th><th>Cumulative Ledger Clearance</th></tr>
        </thead>
        <tbody>
          <tr><td>End of Year 1</td><td>Up to 18% base distribution</td><td>Land-bank perimeter tracking, title conversion, structural clearing, zoning approvals.</td><td>₹90,000 gross disbursed profits</td></tr>
          <tr><td>End of Year 2</td><td>Up to 18% base distribution</td><td>Primary civil foundations, utility cabling, framing for cottages 1–25, clubhouse outlines.</td><td>₹1,80,000 cumulative</td></tr>
          <tr><td>End of Year 3</td><td>Up to 18% base distribution</td><td>Cottages 26–50, interior wood paneling, infinity-pool engineering, soft commercial opening.</td><td>₹2,70,000 cumulative</td></tr>
          <tr><td>End of Year 4 (Maturity)</td><td>Up to 18% final + Alpha bonus</td><td>Full resort operations, fractional-ownership activation, final maturity settlement.</td><td>₹3,60,000 yield + ₹1,40,000 bonus</td></tr>
        </tbody>
      </table>
      <p>
        <b>3.3 Maturity Settlement:</b> At the 48th month, the Company returns the ₹5,00,000 deployed principal alongside final operational balances — an aggregate return of <b>₹10,00,000</b>, doubling the initial investment.
      </p>

      <h2 className="ag-h2">Article 4 — Terms, Conditions &amp; Legal Disclosures</h2>
      <ul className="ag-list">
        <li><b>4.1 Capital Isolation &amp; Ring-Fencing:</b> Every rupee of the ₹5,00,000 is locked exclusively into the land acquisition, construction, furbishing and branding of the Ranikhet Project; the Company may not use it to settle unrelated debts.</li>
        <li><b>4.2 Asset-Backed Lien &amp; Equity Cushion:</b> Funds are secured by a corporate lien over the 10,000 sq. yard estate. The ₹25 Cr cost vs ₹50 Cr market value gap forms an equity cushion insulating principal from market corrections.</li>
        <li><b>4.3 Dual-Engine Mechanics:</b> Engine Alpha (land consolidation, zoning optimization, fractional unit sales → capital appreciation) and Engine Beta (holiday-home rentals, travel-club subscriptions, clubhouse fees, wellness packages → recurring revenue).</li>
        <li><b>4.4 Statutory Compliance:</b> Execution complies with Uttarakhand ownership laws, mountain eco-zone environmental clearances, municipal zoning and MCA rules.</li>
        <li><b>4.5 TDS:</b> All distributions and maturity bonuses are subject to Indian income tax; the Company deducts TDS at mandated rates and issues Form 16A.</li>
        <li><b>4.6 Lock-In:</b> A strict, non-negotiable 48-month lock-in applies. No right to early liquidation, save under extreme circumstances with board approval and an early-exit discount of up to 10% of principal.</li>
      </ul>

      <h2 className="ag-h2">Article 5 — Restrictions &amp; Indemnification</h2>
      <ul className="ag-list">
        <li><b>5.1 Passive Status:</b> This is a passive profit-sharing collaboration; the Co-Investor holds no voting authority or operational voice in the Project.</li>
        <li><b>5.2 Title Indemnification:</b> The Company indemnifies the Co-Investor against losses from title discrepancies, ownership disputes or administrative non-compliance on the estate.</li>
        <li><b>5.3 Force Majeure:</b> Neither Party is liable for delays from acts of God, seismic events, cloudbursts, landslides or statutory shifts; the 48-month schedule extends by the disruption period.</li>
        <li><b>5.4 Confidentiality:</b> The Co-Investor maintains absolute confidentiality over plans, financials and strategies; leakage is a material breach.</li>
        <li><b>5.5 Severability:</b> Invalidity of any clause remains localized and does not affect the remaining Agreement.</li>
        <li><b>5.6 Entire Agreement:</b> This Deed overrides all prior verbal agreements, emails, messages or brochures.</li>
        <li><b>5.7 Governing Law &amp; Arbitration:</b> Governed by the laws of India; disputes go to conciliation, then sole-arbitrator arbitration under the Arbitration &amp; Conciliation Act, 1996. Seat/venue: Noida, Gautam Buddha Nagar, Uttar Pradesh; language English; local courts retain exclusive jurisdiction.</li>
      </ul>

      <h2 className="ag-h2">Article 6 — Termination &amp; Exit</h2>
      <ul className="ag-list">
        <li><b>6.1 Natural Expiry:</b> The Agreement concludes once the Year-4 maturity payout and the ₹5,00,000 principal are transferred to the Co-Investor.</li>
        <li><b>6.2 Material Default:</b> On material breach, the non-defaulting Party issues a written cure notice; the defaulting Party has 45 days to remedy, failing which arbitration may be initiated.</li>
      </ul>

      <h2 className="ag-h2">Article 7 — Execution &amp; Signatures</h2>
      <p>
        IN WITNESS WHEREOF, the Parties have set their signatures and seals onto this Deed on the day and
        year first written above at Noida, Gautam Buddha Nagar, Uttar Pradesh, in the presence of the
        undermentioned witnesses.
      </p>
      <div className="ag-sign">
        <div className="ag-sign-col">
          <div className="ag-sign-line" />
          <b>Principal Co-Investor</b>
          <span className="ag-muted">{investor}</span>
          {email && <span className="ag-muted">{email}</span>}
          <span className="ag-muted">PAN: <Val v={pan} w={110} /></span>
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
        Money Multiply Trading &amp; Consultant Pvt. Ltd. • Confidential Deed of Co-Investment • Generated for {investor}. Subject to execution, stamping and KYC verification.
      </div>
    </div>
  );
}
