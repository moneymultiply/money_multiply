"use client";

/* Channel Partner Offer Letter — auto-generated per partner.
   Content transcribed from the official Money Multiply Channel Partner Offer. */

export default function PartnerAgreement({
  name,
  email,
  dateStr,
  refNo,
}: {
  name: string;
  email: string;
  dateStr: string;
  refNo: string;
}) {
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
          <span>Flat No. 151, 1st Floor, Saraswati Galleria, Bisrakh,</span>
          <span>Greater Noida, Gautam Buddha Nagar, UP — 201306</span>
          <span>CIN: U70200UP2026PTC253626 | GSTIN: 09AAVCM0034C1ZL</span>
          <span>Web: moneymultiplyglobal.com | Email: info@moneymultiply.in</span>
        </div>
      </div>
      <div className="ag-rule" />

      {/* title */}
      <div className="ag-title-row">
        <h1 className="ag-title">
          CHANNEL PARTNER OFFER LETTER
        </h1>
        <div className="ag-meta">
          <div><b>Date:</b> {dateStr}</div>
          <div><b>Validity:</b> Open Framework</div>
        </div>
      </div>
      <div className="ag-ref">Ref No: {refNo}</div>

      {/* addressee */}
      <p className="ag-to">To,</p>
      <p className="ag-addressee">
        <b>{name || "Channel Partner / Associate"}</b>
        <br />
        {email}
        <br />
        <span className="ag-muted">Strategic Business Alliance &amp; Distribution Network</span>
      </p>

      <p><b>Dear {name ? name.split(" ")[0] : "Business Partner"},</b></p>
      <p>
        We are pleased to extend an invitation to join hands with <b>Money Multiply Trading &amp;
        Consultant Private Limited</b> as an authorized Channel Partner. As India&apos;s emerging
        powerhouse in structured land banking and algorithmic financial market trading, we specialize
        in capital preservation, alternative asset accumulation, and wealth-multiplication ecosystem
        models.
      </p>
      <p>
        Our business network bridges institutional-grade asset procurement with retail and
        high-net-worth investments. To scale our market reach, we are seeking progressive partners,
        wealth managers, and business consultants who possess strong networks and wish to secure an
        elite, recurring revenue stream.
      </p>

      {/* 1. commission */}
      <h2 className="ag-h2">1. Channel Partner Commission Structure</h2>
      <p>
        We believe in rewarding our partners proportionately for driving growth. We have configured a
        tier-based progressive milestone commission mechanism that offers <b>up to 7.0% payout</b> on
        each successful investment capital volume onboarded into the Money Multiply ecosystem:
      </p>
      <table className="ag-table">
        <thead>
          <tr>
            <th>Tier Level</th>
            <th>Monthly Cumulative Sourced Volume (INR)</th>
            <th>Commission Rate (%)</th>
            <th>Payout Cycle Basis</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Tier I (Base)</td><td>Up to ₹25 Lakhs</td><td>4.0%</td><td>Immediate (T+3 Days)</td></tr>
          <tr><td>Tier II (Growth)</td><td>₹25 Lakhs to ₹75 Lakhs</td><td>5.0%</td><td>Immediate (T+3 Days)</td></tr>
          <tr><td>Tier III (Advance)</td><td>₹75 Lakhs to ₹2 Crores</td><td>6.0%</td><td>Immediate (T+3 Days)</td></tr>
          <tr><td>Tier IV (Elite)</td><td>Above ₹2 Crores</td><td>7.0%</td><td>Immediate (T+3 Days)</td></tr>
        </tbody>
      </table>

      <div className="ag-callout">
        <b>Strategic Multiplier Clauses:</b>
        <ul>
          <li><b>Per-Investment Execution:</b> Payout percentages apply directly to each distinct client investment ticket size and scale instantly as the client&apos;s position grows or compounds.</li>
          <li><b>No Lock-up On Payouts:</b> Earned commissions are processed systematically on a T+3 rolling-window basis immediately following fund clearance and compliance validation.</li>
          <li><b>Renewal / Top-up Incentives:</b> Any client top-up or subsequent asset re-investment triggers a recurring commission lifecycle assigned automatically to your partner tracking ID.</li>
        </ul>
      </div>

      {/* 2. roles */}
      <h2 className="ag-h2">2. Roles and Operational Scope</h2>
      <ul className="ag-list">
        <li><b>Client Onboarding &amp; Relations:</b> Introduce individual investors, corporate treasuries, or high-net-worth individuals (HNIs) to the diverse real-estate land banks and managed capital-markets trading suites offered by Money Multiply.</li>
        <li><b>Fact-Sheet Dissemination:</b> Convey product mechanics, structural safety frameworks, asset-backing provisions, and historical yields accurately using compliance-approved collateral.</li>
        <li><b>Compliance Alignment:</b> Ensure all introduced client profiles strictly align with standard regulatory Know-Your-Customer (KYC), Anti-Money Laundering (AML), and operational guidelines.</li>
      </ul>

      {/* 3. enablement */}
      <h2 className="ag-h2">3. Corporate Enablement &amp; Partner Infrastructure</h2>
      <p>To guarantee your market success, Money Multiply equips your operations with enterprise-level partner resources:</p>
      <ul className="ag-list">
        <li><b>Dedicated Relationship Manager (RM):</b> Continuous end-to-end support to assist with client query resolution, desk closures, and documentation workflows.</li>
        <li><b>Marketing &amp; Presentation Suites:</b> Access to premium white-labeled brochures, legal documentation templates, project tracking boards, and technical asset portfolios.</li>
        <li><b>CRM Portal Tracking:</b> Transparent access to a customized digital back-office portal to track leads, monitor real-time investment deployments, and check clear commission payout schedules.</li>
      </ul>

      {/* 4. governance */}
      <h2 className="ag-h2">4. Governance, Legal Terms &amp; Conditions</h2>
      <ul className="ag-list">
        <li><b>Tax Deductions:</b> All payouts are subject to applicable statutory deductions, including Tax Deducted at Source (TDS) under Indian Income Tax regulations.</li>
        <li><b>Non-Disclosure &amp; Confidentiality:</b> Channel Partners must firmly maintain strict confidentiality regarding corporate strategy, internal asset values, client records, and transaction structural mechanisms.</li>
        <li><b>Ethical Conduct Bounds:</b> No partner is permitted to guarantee fixed gains or misrepresent asset portfolios outside official documented terms. Any violation triggers immediate termination of the alliance contract.</li>
      </ul>

      <p>
        We look forward to forging a highly lucrative, multi-year partnership with you. Let us build an
        enduring infrastructure that empowers investors to secure capital and multiply generational
        wealth.
      </p>

      {/* signatures */}
      <div className="ag-sign">
        <div className="ag-sign-col">
          <div className="ag-sign-line" />
          <b>Channel Partner / Applicant</b>
          <span className="ag-muted">{name}</span>
          <span className="ag-muted">Authorized Signature &amp; Seal</span>
        </div>
        <div className="ag-sign-col">
          <div className="ag-sign-line" />
          <b>For Money Multiply Trading &amp; Consultant Pvt. Ltd.</b>
          <span className="ag-muted">Director / Authorized Signatory</span>
          <span className="ag-muted">Corporate Network &amp; Alliances Desk</span>
        </div>
      </div>

      <div className="ag-foot">
        Money Multiply Trading &amp; Consultant Pvt. Ltd. • Confidential • This offer is generated for {name || "the applicant"} and is subject to acceptance and KYC verification.
      </div>
    </div>
  );
}
