/* Micro Pool Funding Agreement — Himalayan Hills.
   Content transcribed from the official Money Multiply Micro Pool Funding Agreement,
   auto-generated per micro-pool contribution and personalised with the investor's
   name, email and exact contributed amount. Uses the shared .ag-* deed styling. */

import { COMPANY_BANK } from "@/lib/data";
import { execParts } from "./InvestorDeed";

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

// Project financial baseline (per the official agreement).
const PLOT_COST = 2000000; // ₹20,00,000 — 100 sq yd master plot
const RATE_PER_SQYD = 20000; // ₹20,000 / sq yd

const Val = ({ v, w = 120 }: { v?: string; w?: number }) => (v ? <b>{v}</b> : <Fill w={w} />);

export default function MicroDeed({
  name,
  email,
  refNo,
  amount,
  pan,
  aadhaar,
  address,
  execDate,
}: {
  name: string;
  email: string;
  dateStr: string;
  refNo: string;
  amount: number;
  pan?: string;
  aadhaar?: string;
  address?: string;
  execDate?: string;
}) {
  const investor = name || "________________________";
  const ex = execParts(execDate);
  const amt = Math.max(0, Math.round(amount || 0));
  const words = inWords(amt);

  // Investor-specific derived figures.
  const fracPct = amt / PLOT_COST * 100;               // proportional fractional interest
  const sqYd = amt / RATE_PER_SQYD;                     // equivalent land area
  const ret2 = Math.round(amt * 1.5);                  // 2-yr: up to 50%
  const ret4 = Math.round(amt * 2.0);                  // 4-yr: up to 100% (doubling)
  const fmtNum = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 2 });

  return (
    <div className="ag-doc md-doc">
      {/* cover — matches the official Micro Pool Funding Agreement PDF */}
      <div className="md-kicker">OFFICIAL LEGAL &amp; FINANCIAL DOCUMENT</div>
      <h1 className="md-title">MICRO POOL FUNDING AGREEMENT</h1>
      <div className="md-project">Project: Himalayan Hills</div>

      <div className="md-issued">
        <div className="md-issued-label">Issued By:</div>
        <div className="md-issued-name">Money Multiply Trading &amp; Consultant Private Limited</div>
        <div className="md-issued-tag">The Land Banker and Traders</div>
        <div className="md-issued-div" />
        <div className="md-issued-row"><b>CIN:</b> U70200UP2026PTC253626 &nbsp;|&nbsp; <b>GSTIN:</b> 09AAVCM0034C1ZL</div>
        <div className="md-issued-row"><b>Registered Office:</b> B-128, First Floor, Sector-2 Noida, Gautam Buddha Nagar, Uttar Pradesh – 201301</div>
        <div className="md-issued-row"><b>Web:</b> moneymultiplyglobal.com &nbsp;|&nbsp; <b>Email:</b> info@moneymultiplyglobal.com</div>
      </div>
      <div className="md-ref">Ref No: {refNo}</div>

      <div className="ag-callout md-summary">
        <b>Document Summary:</b> This formal agreement outlines the legal framework, terms, conditions,
        financial structures, expected returns, and governance rules for fractional land acquisition and
        micro pool funding under the Himalayan Hills project, in respect of the Investor&apos;s contribution
        of <b>{inr(amt)}</b>{words ? ` (Rupees ${words} Only)` : ""}.
      </div>

      {/* key facts */}
      <table className="ag-kv">
        <tbody>
          <tr><td>First Party (Company)</td><td>Money Multiply Trading &amp; Consultant Private Limited (CIN: U70200UP2026PTC253626)</td></tr>
          <tr><td>Registered Office</td><td>B-128, First Floor, Sector-2 Noida, Gautam Buddha Nagar, Uttar Pradesh – 201301</td></tr>
          <tr><td>Second Party (Investor)</td><td><b>{investor}</b>{email ? ` · ${email}` : ""}</td></tr>
          <tr><td>Contribution Amount</td><td><b>{inr(amt)}/-</b>{words ? ` (Rupees ${words} Only)` : ""}</td></tr>
          <tr><td>Proportional Fractional Interest</td><td>{fmtNum(fracPct)}% of the master plot (≈ {fmtNum(sqYd)} sq. yd.)</td></tr>
          <tr><td>Project</td><td>Himalayan Hills</td></tr>
        </tbody>
      </table>

      <h2 className="ag-h2">1. Parties to the Agreement &amp; Recitals</h2>
      <p>
        This Micro Pool Funding Agreement (hereinafter referred to as the &quot;Agreement&quot;) is entered
        into on this <Val v={ex.day} w={50} /> day of <Val v={ex.month} w={110} />, {ex.year} by and between:
      </p>
      <p>
        <b>FIRST PARTY (The Company):</b> Money Multiply Trading &amp; Consultant Private Limited, a company
        incorporated under the Companies Act, 2013 (CIN: U70200UP2026PTC253626), having its registered
        office at B-128, First Floor, Sector-2 Noida, Gautam Buddha Nagar, Uttar Pradesh – 201301
        (hereinafter referred to as the &quot;Company&quot;, which expression shall unless repugnant to the
        context include its successors and permitted assigns) of the First Part;
      </p>
      <p style={{ textAlign: "center" }}><b>AND</b></p>
      <p>
        <b>SECOND PARTY (The Investor):</b> <b>{investor}</b>{email ? ` (${email})` : ""}, whose details are
        registered in the official unit allotment registry, contributing <b>{inr(amt)}</b> towards the micro
        pool (hereinafter referred to as the &quot;Investor&quot;) of the Second Part.
      </p>

      <h2 className="ag-h2">2. Purpose &amp; Project Background</h2>
      <p>
        The Company is engaged in land banking, real estate consultancy, and asset management under the brand
        name &quot;The Land Banker and Traders&quot;. The Company has initiated a premier real estate project
        titled &quot;Himalayan Hills&quot;. Recognizing that standard land parcels require significant capital
        outlay, the Company has structured a <b>Micro Pool Funding Mechanism</b> to enable retail investors with
        modest capital to participate in high-value land acquisitions.
      </p>

      <h2 className="ag-h2">3. Core Financial Structure &amp; Parameters</h2>
      <p>The financial baseline of the Himalayan Hills micro pool funding structure is defined as follows:</p>
      <table className="ag-table">
        <thead>
          <tr><th>Parameter Description</th><th>Agreed Metric / Value</th></tr>
        </thead>
        <tbody>
          <tr><td>Standard Land Unit (Master Plot)</td><td>100 Square Yards (Sq. Yd.)</td></tr>
          <tr><td>Land Acquisition Rate</td><td>₹20,000 per Square Yard</td></tr>
          <tr><td>Total Standard Plot Cost</td><td>₹20,00,000 (Twenty Lakh Rupees)</td></tr>
          <tr><td>Micro Pool Investment Range</td><td>Minimum ₹10,000 to Maximum ₹5,00,000 per Investor</td></tr>
          <tr><td><b>This Investor&apos;s Contribution</b></td><td><b>{inr(amt)}</b>{words ? ` (Rupees ${words} Only)` : ""}</td></tr>
          <tr><td><b>Proportional Fractional Interest</b></td><td><b>{fmtNum(fracPct)}%</b> of the master plot (≈ {fmtNum(sqYd)} sq. yd.)</td></tr>
        </tbody>
      </table>

      <h2 className="ag-h2">4. Fractional Ownership &amp; Micro Pool Mechanics</h2>
      <p><b>4.1 Pooling Mechanism.</b> Since the acquisition of an independent standard land unit of 100 square
        yards valued at ₹20,00,000 is capital-intensive, the Company aggregates capital contributions ranging
        from ₹10,000 to ₹5,00,000 from multiple investors to form a collective &quot;Micro Pool&quot;.</p>
      <p><b>4.2 Proportional Fractional Interest.</b> Each Investor shall receive an undivided fractional share
        or proportional interest in the master land parcel corresponding strictly to the ratio of their capital
        contribution versus the total plot cost. For this Investor, the contribution of {inr(amt)} represents an
        undivided fractional interest of <b>{fmtNum(fracPct)}%</b> in the master plot.</p>
      <p><b>4.3 Land Title Security &amp; Documentation.</b> The master title of the land parcel shall be
        registered legally in the name of the Company or its designated corporate trustee. Every Investor shall
        be issued an official <b>Unit Allotment Letter</b> and a <b>Shareholding Certificate</b>, confirming
        their respective fractional ownership.</p>

      <h2 className="ag-h2">5. Projected Returns, Tenures &amp; Exit Policy</h2>
      <p><b>5.1 Expected Profit Projections.</b> Based on historical real estate appreciation models and regional
        development forecasts for the Himalayan Hills project, the expected financial returns are structured as
        follows:</p>
      <ul className="ag-list">
        <li><b>2-Year Milestone:</b> Expected cumulative return of up to <b>50%</b> on the initial contributed
          capital — approximately <b>{inr(ret2)}</b> on this contribution.</li>
        <li><b>4-Year Milestone:</b> Expected cumulative return of up to <b>100%</b> (doubling of principal value)
          upon maturity and strategic land commercialization — approximately <b>{inr(ret4)}</b> on this
          contribution.</li>
      </ul>
      <p><b>5.2 Minimum Fund Exit &amp; Liquidation.</b> Investors maintain the right to seek a liquidity exit
        after a mandatory minimum lock-in period of <b>1 Year</b> from the date of fund allotment, subject to
        company buyback policies or prevailing market liquidation rates.</p>

      <h2 className="ag-h2">6. Company Commitments &amp; Transparency</h2>
      <p>
        The Company undertakes to maintain absolute transparency throughout the lifecycle of the Himalayan Hills
        project. This includes providing periodic progress audits, land development updates, and asset valuation
        reports to all registered micro pool investors.
      </p>

      <h2 className="ag-h2">7. Remittance &amp; Company Bank Details</h2>
      <p>
        The Investor shall remit the contribution of <b>{inr(amt)}</b> to the Company&apos;s designated banking
        channel below, and upload the payment proof through the Investor portal for acknowledgement:
      </p>
      <table className="ag-kv">
        <tbody>
          <tr><td>Beneficiary Name</td><td>{COMPANY_BANK.beneficiary}</td></tr>
          <tr><td>Bank</td><td>{COMPANY_BANK.bank}</td></tr>
          <tr><td>Account Number</td><td>{COMPANY_BANK.account}</td></tr>
          <tr><td>IFSC Code</td><td>{COMPANY_BANK.ifsc}</td></tr>
          <tr><td>Account Type</td><td>{COMPANY_BANK.type}</td></tr>
          <tr><td>Branch</td><td>{COMPANY_BANK.branch}</td></tr>
          <tr><td>UPI ID</td><td>{COMPANY_BANK.upiVpa}</td></tr>
        </tbody>
      </table>

      <h2 className="ag-h2">8. Investor Declarations &amp; Legal Acknowledgments</h2>
      <ul className="ag-list">
        <li>The Investor confirms that funds invested are from legitimate sources and that they enter into this Agreement voluntarily without duress or undue influence.</li>
        <li>The Investor acknowledges that real estate and land banking involve inherent market fluctuations, and projected returns (50% in 2 years / 100% in 4 years) are target estimations based on commercial appreciation models and are not guaranteed.</li>
        <li>Both parties agree that this document constitutes the entire understanding regarding the Himalayan Hills micro pool funding arrangement in respect of this contribution.</li>
      </ul>

      <p style={{ marginTop: "14px" }}>
        IN WITNESS WHEREOF, the parties hereto have executed this Micro Pool Funding Agreement through their
        authorized representatives on the date first written above.
      </p>
      <div className="ag-sign">
        <div className="ag-sign-col">
          <div className="ag-sign-line" />
          <b>For Money Multiply Trading &amp; Consultant Pvt. Ltd.</b>
          <span className="ag-muted">(First Party / Company)</span>
          <span className="ag-muted">Authorized Signatory</span>
          <span className="ag-muted">Corporate Seal / Stamp</span>
        </div>
        <div className="ag-sign-col">
          <div className="ag-sign-line" />
          <b>Investor Signature</b>
          <span className="ag-muted">(Second Party / Investor)</span>
          <span className="ag-muted">Name: {investor}</span>
          {email && <span className="ag-muted">{email}</span>}
          <span className="ag-muted">Contribution: {inr(amt)}</span>
          <span className="ag-muted">PAN: <Val v={pan} w={120} /></span>
          <span className="ag-muted">Aadhaar: <Val v={aadhaar} w={130} /></span>
          <span className="ag-muted">Address: <Val v={address} w={150} /></span>
        </div>
      </div>

      <div className="ag-foot">
        Money Multiply Trading &amp; Consultant Pvt. Ltd. • Himalayan Hills Project • Micro Pool Funding Agreement • Generated for {investor} · {inr(amt)}. Subject to execution, stamping and KYC verification.
      </div>
    </div>
  );
}
