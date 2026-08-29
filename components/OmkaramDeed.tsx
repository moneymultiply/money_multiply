/* Confidential Master Deed of Co-Investment & Strategic Profit-Sharing — OMKARAM HOUSING COMPLEX.
   Content transcribed from the official Money Multiply Omkaram co-investment draft, auto-generated
   per investor and personalised with name/email. Uses the shared .ag-* deed styling. */

import { execParts } from "./InvestorDeed";

const Fill = ({ w = 160 }: { w?: number }) => (
  <span className="ag-fill" style={{ minWidth: w }} />
);

const Val = ({ v, w = 130 }: { v?: string; w?: number }) => (v ? <b>{v}</b> : <Fill w={w} />);

export default function OmkaramDeed({
  name,
  email,
  refNo,
  pan,
  aadhaar,
  address,
  guardian,
  execDate,
}: {
  name: string;
  email: string;
  dateStr: string;
  refNo: string;
  pan?: string;
  aadhaar?: string;
  address?: string;
  guardian?: string;
  execDate?: string;
}) {
  const investor = name || "________________________";
  const ex = execParts(execDate);

  return (
    <div className="ag-doc md-doc">
      {/* cover */}
      <div className="md-kicker">Confidential Draft • Money Multiply</div>
      <h1 className="md-title">CONFIDENTIAL MASTER DEED OF CO-INVESTMENT &amp; STRATEGIC PROFIT-SHARING</h1>
      <div className="md-project">Project Focus: OMKARAM HOUSING COMPLEX</div>

      <div className="md-issued">
        <div className="md-issued-label">Project Focus Allocation</div>
        <div className="md-issued-row">Residential / Mixed-Use Housing Development — project particulars to be filled in Schedule A.</div>
        <div className="md-issued-div" />
        <div className="md-issued-name">Money Multiply Trading &amp; Consultant Private Limited</div>
        <div className="md-issued-tag">The Land Bankers and Traders</div>
        <div className="md-issued-row"><b>CIN:</b> U70200UP2026PTC253626</div>
        <div className="md-issued-row"><b>Registered Corporate Base:</b> B-128, First Floor, Sector-2 Noida, Gautam Buddha Nagar, Uttar Pradesh – 201301</div>
        <div className="md-issued-row"><b>Principal Co-Investor Allocation:</b> INR 5,00,000/- (Rupees Five Lakhs Only)</div>
        <div className="md-issued-row"><b>Target Maturity Horizon:</b> 48 Calendar Months (fixed lifecycle, subject to force majeure and applicable law)</div>
        <div className="md-issued-row"><b>Governing Framework:</b> Laws of India, including the Companies Act, 2013 and the Arbitration &amp; Conciliation Act, 1996</div>
      </div>
      <div className="md-ref">Ref No: {refNo}</div>

      <p className="ag-note-box">
        IMPORTANT DRAFTING NOTE: This document is a transaction draft modeled on the Money Multiply master
        deed. It must be reviewed for stamp duty, registration, securities/collective-investment, real-estate,
        tax, corporate, consumer and other applicable regulatory requirements before execution or circulation.
      </p>

      <h2 className="ag-h2">Master Deed of Co-Investment and Profit-Sharing</h2>
      <p>
        THIS CONFIDENTIAL MASTER DEED OF CO-INVESTMENT AND PROFIT-SHARING (hereinafter the &quot;Deed&quot; or
        &quot;Agreement&quot;) is made and executed on this <Val v={ex.day} w={50} /> day of <Val v={ex.month} w={110} />, {ex.year} (the
        &quot;Execution Date&quot;), by and between:
      </p>
      <p>
        <b>MONEY MULTIPLY TRADING &amp; CONSULTANT PRIVATE LIMITED</b>, a company incorporated under the Companies
        Act, 2013, bearing CIN U70200UP2026PTC253626, having its registered/corporate office at B-128, First Floor,
        Sector-2 Noida, Gautam Buddha Nagar, Uttar Pradesh – 201301 (hereinafter &quot;Company&quot;, &quot;Parent
        Company&quot; or &quot;First Party&quot;), which expression includes its permitted successors and assigns;
      </p>
      <p style={{ textAlign: "center" }}><b>AND</b></p>
      <p>
        <b>{investor}</b>{email ? ` (${email})` : ""}, son / daughter / spouse of <Val v={guardian} w={150} />, residing at{" "}
        <Val v={address} w={230} />, PAN <Val v={pan} w={120} />, Aadhaar / other legally permissible KYC identifier <Val v={aadhaar} w={140} />
        {" "}(hereinafter &quot;Co-Investor&quot; or &quot;Second Party&quot;), which expression includes permitted
        legal representatives and assigns.
      </p>
      <p>AND, where separately appointed:</p>
      <p>
        <Fill w={220} />, having its registered office at <Fill w={220} />, acting as the Management / Project
        Management Company for the Project (hereinafter &quot;Management Company&quot;), subject to the authority and
        obligations expressly stated in this Deed.
      </p>
      <p>
        The First Party and Second Party are collectively the &quot;Parties&quot;. Where the Management Company executes
        this Deed or a joinder, it shall also be a Party solely to the extent of its stated obligations.
      </p>
      <p>
        <b>Execution and Stamp Duty.</b> This Agreement shall become operative only upon lawful execution,
        payment/adjudication of applicable stamp duty and satisfaction of all conditions precedent stated herein.
        Nothing in this draft is intended to waive any mandatory registration, disclosure, licensing or regulatory
        requirement.
      </p>

      <h2 className="ag-h2">Recitals &amp; Contextual Background</h2>
      <p>WHEREAS:</p>
      <ul className="ag-list">
        <li>The Parent Company operates as a commercial corporate entity and may undertake, directly or through duly appointed entities, land aggregation, development coordination, housing and allied real-estate activities, subject to applicable law and project-specific approvals.</li>
        <li>The Parent Company proposes to develop / facilitate the project identified as &quot;OMKARAM HOUSING COMPLEX&quot; (the &quot;Project&quot;), with the precise project location, land area, title particulars, sanctioned plan, development authority and approvals to be recorded in Schedule A.</li>
        <li>The Project is intended to comprise residential housing and associated infrastructure and amenities as approved by the competent authorities. The exact number, configuration, carpet/built-up/saleable area, common areas, amenities and development phases shall be governed by approved plans and definitive project documents.</li>
        <li>The Co-Investor has independently reviewed the information made available by the First Party and proposes to deploy a principal capital allocation of ₹5,00,000 (Rupees Five Lakhs Only), subject to KYC, source-of-funds, documentation and applicable law.</li>
        <li>The First Party agrees, subject to the terms of this Deed, to accept the capital allocation for the Project / designated project pool and to administer the commercial arrangement through the Parent Company and/or Management Company.</li>
      </ul>
      <p>
        NOW, THEREFORE, in consideration of the mutual covenants, disclosures and conditions contained herein, the
        Parties agree as follows. No statement in this Deed shall be construed as a representation that any particular
        approval, title status, construction milestone, market value or return has been achieved unless supported by
        documentary evidence and recorded in the relevant Schedule.
      </p>

      <h2 className="ag-h2">Article 1 — Definitions and Statutory Interpretation</h2>
      <ul className="ag-list">
        <li><b>1.1 &quot;Project&quot;</b> means the OMKARAM HOUSING COMPLEX development described in Schedule A, together with land, approved structures, infrastructure, common facilities and associated development rights to the extent lawfully held or controlled.</li>
        <li><b>1.2 &quot;Principal Sum&quot; / &quot;Capital Block&quot;</b> means ₹5,00,000 transferred by the Co-Investor into the designated bank account of the First Party or another legally authorized project account specified in writing.</li>
        <li><b>1.3 &quot;Maturity Framework&quot;</b> means the intended 48-calendar-month period commencing from the Capital Activation Date, subject to extension or modification required by applicable law, force majeure, approvals or written amendment.</li>
        <li><b>1.4 &quot;Capital Activation Date&quot;</b> means the date on which cleared funds are received and all agreed conditions precedent have been satisfied.</li>
        <li><b>1.5 &quot;Management Company&quot;</b> means the entity appointed in writing by the Parent Company to coordinate project management, development execution, vendor coordination, sales/marketing support, reporting or related administrative functions.</li>
        <li><b>1.6 &quot;Project Pool&quot;</b> means the funds legally designated for Project-related acquisition, development, construction, approvals, infrastructure, professional fees and other permitted Project expenditure.</li>
        <li><b>1.7 &quot;Net Distributable Profit&quot;</b> means the amount legally and contractually available for distribution after deduction of applicable project costs, taxes, statutory dues, financing costs, reserves, refunds, contingencies and other permitted expenses.</li>
        <li><b>1.8 &quot;Maturity Amount&quot;</b> means the principal and any return legally payable under the final settlement statement. Any illustrative or target return is subject to applicable law, actual Project performance and the express risk disclosures herein.</li>
      </ul>
      <p>
        <b>Interpretation.</b> Headings are for convenience. Singular includes plural and vice versa. References to law
        include amendments and replacements. If any provision conflicts with a mandatory statutory requirement, the
        statutory requirement shall prevail to the extent of the conflict.
      </p>

      <h2 className="ag-h2">Article 2 — Project Blueprint &amp; Allocation Framework</h2>
      <p><b>2.1</b> The Project shall be developed strictly in accordance with sanctioned plans, development permissions, land-use permissions, environmental and municipal requirements and other approvals applicable to the Project.</p>
      <p><b>2.2</b> The following particulars shall be completed before execution:</p>
      <table className="ag-kv">
        <tbody>
          <tr><td>Project Name</td><td>OMKARAM HOUSING COMPLEX</td></tr>
          <tr><td>Project Location</td><td><Fill w={220} /></td></tr>
          <tr><td>Total Land Area</td><td><Fill w={220} /></td></tr>
          <tr><td>Land Parcel / Khasra / Survey</td><td><Fill w={220} /></td></tr>
          <tr><td>Development Authority / Local Body</td><td><Fill w={220} /></td></tr>
          <tr><td>Sanctioned Plan / Approval Ref.</td><td><Fill w={220} /></td></tr>
          <tr><td>Promoter / Project Entity</td><td><Fill w={220} /></td></tr>
          <tr><td>Management Company</td><td><Fill w={220} /></td></tr>
          <tr><td>Expected Project Phases</td><td><Fill w={220} /></td></tr>
        </tbody>
      </table>
      <p><b>2.3</b> The Project may include residential units, internal roads, utilities, landscaped areas, parking, community facilities and other approved components. No unapproved use or development shall be represented to the Co-Investor as part of the Project.</p>
      <p><b>2.4</b> The Parent Company may appoint contractors, consultants, architects, engineers, brokers, facility operators and other service providers, provided such appointments comply with applicable law and do not dilute the Co-Investor&apos;s contractual rights.</p>

      <h2 className="ag-h2">Article 3 — Capital Covenants &amp; Return Framework</h2>
      <p><b>3.1 Principal Deployment.</b> The Co-Investor shall deploy ₹5,00,000 (Rupees Five Lakhs Only) through the designated banking channel. The First Party shall acknowledge receipt after cleared funds are credited.</p>
      <p><b>3.2 Use of Funds.</b> Subject to applicable law, the capital shall be applied only toward Project-related purposes identified in the approved Project budget and this Deed. It shall not knowingly be used to discharge unrelated liabilities of the Parent Company.</p>
      <p><b>3.3 Illustrative Target Framework.</b> The master deed contemplates a 48-month structure with an aggregate settlement target of ₹10,00,000 on a ₹5,00,000 principal. For OMKARAM HOUSING COMPLEX, any such target shall be treated as a commercial target only unless the final executed version is legally permitted to provide a fixed/guaranteed obligation and all required approvals/disclosures are satisfied.</p>
      <p><b>3.4 No Assured Return Without Legal Validation.</b> The Parties acknowledge that no fixed, guaranteed or assured return shall be promised, marketed or paid where doing so would violate applicable securities, collective investment, real-estate, deposit, company, tax or other law.</p>
      <table className="ag-table">
        <thead>
          <tr><th>Period</th><th>Indicative Milestone</th><th>Target / Distribution</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td>Year 1</td><td>Land / title / approval and project mobilization</td><td>Up to 18% target, if legally permissible</td><td>To be confirmed</td></tr>
          <tr><td>Year 2</td><td>Primary civil works / infrastructure</td><td>Up to 18% target, if legally permissible</td><td>To be confirmed</td></tr>
          <tr><td>Year 3</td><td>Construction / finishing / pre-commercial operations</td><td>Up to 18% target, if legally permissible</td><td>To be confirmed</td></tr>
          <tr><td>Year 4</td><td>Commercial operations and maturity settlement</td><td>Final settlement based on actual performance and law</td><td>To be confirmed</td></tr>
        </tbody>
      </table>
      <p><b>3.5 Maturity Settlement.</b> On completion of the intended 48-month horizon, the Company shall prepare a final settlement statement showing principal, realized project proceeds, permitted costs, taxes, reserves and the amount legally distributable to the Co-Investor.</p>

      <h2 className="ag-h2">Article 4 — Terms, Conditions &amp; Legal Disclosures</h2>
      <ul className="ag-list">
        <li><b>4.1 Ring-Fencing and Records.</b> The Company shall maintain appropriate accounting records for Project-related receipts and expenditures and shall preserve supporting documents in accordance with applicable corporate, tax and accounting requirements.</li>
        <li><b>4.2 Security / Asset-Backing.</b> Any lien, charge, mortgage, security interest, beneficial interest or asset-backed protection in favour of the Co-Investor shall exist only if separately created, documented, stamped/registered where required, and legally enforceable. This Deed alone shall not be interpreted as automatically creating a perfected security interest over Project land.</li>
        <li><b>4.3 Project Revenue Engines.</b> The Project may generate value through residential sales, development margin, leasing/rental income, approved commercial amenities, service revenues and other lawful Project activities. The exact revenue model shall be documented in the Project budget and business plan.</li>
        <li><b>4.4 Statutory Compliance.</b> The Parent Company and Management Company shall use commercially reasonable efforts to ensure Project execution complies with applicable land, building, municipal, environmental, labour, consumer, tax and corporate requirements. Where the Project falls within a specific real-estate regulatory regime, the relevant registration and disclosures shall be completed before activities requiring such registration are undertaken.</li>
        <li><b>4.5 Taxes and TDS.</b> Payments, if any, shall be subject to applicable tax laws and withholding requirements. The Company shall issue legally required tax documentation where applicable.</li>
        <li><b>4.6 Lock-in / Exit.</b> The intended horizon is 48 months. Early exit is not automatic and may be permitted only under the final agreed exit mechanism, subject to available liquidity, Project documents, applicable law and any agreed administrative costs.</li>
      </ul>

      <h2 className="ag-h2">Article 5 — Management, Reporting, Restrictions &amp; Indemnity</h2>
      <ul className="ag-list">
        <li><b>5.1 Management Structure.</b> Money Multiply Trading &amp; Consultant Private Limited shall remain the Parent Company. The Management Company, if appointed, shall perform only the functions delegated to it in writing. Appointment of a Management Company shall not transfer ownership of Project land unless separately documented.</li>
        <li><b>5.2 Passive Investment / Limited Operational Rights.</b> Unless separately agreed, the Co-Investor shall not direct day-to-day construction, vendor selection, procurement, staffing, sales pricing or project operations. This limitation does not restrict the Co-Investor&apos;s contractual right to receive statements, material disclosures and legally required information.</li>
        <li><b>5.3 Reporting.</b> The Company shall provide reasonable periodic updates on Project progress, material delays, major approvals, material litigation known to it and the financial status relevant to the Co-Investor, subject to confidentiality and applicable law.</li>
        <li><b>5.4 Title and Authority.</b> The First Party shall disclose known material title defects, encumbrances and litigation affecting the Project. Any indemnity shall be limited to losses legally attributable to the indemnifying Party and shall not cover losses caused by the Co-Investor&apos;s fraud, wilful misconduct or violation of law.</li>
        <li><b>5.5 Confidentiality.</b> The Parties shall keep non-public commercial, financial, architectural and technical information confidential, except where disclosure is required by law, regulators, auditors, professional advisers, courts or for enforcement of this Agreement.</li>
        <li><b>5.6 Non-Circumvention.</b> Neither Party shall knowingly use confidential Project information to circumvent the other Party in a transaction directly arising from the disclosed Project opportunity.</li>
      </ul>

      <h2 className="ag-h2">Article 6 — Risk Factors, Force Majeure &amp; Liability</h2>
      <ul className="ag-list">
        <li><b>6.1 Real-Estate and Market Risk.</b> Property values, sales velocity, construction costs, financing conditions, approvals, demand, rental income and Project profitability may fluctuate. The Co-Investor acknowledges that actual returns may differ from projections.</li>
        <li><b>6.2 Approval and Construction Risk.</b> Delays in land conversion, sanctions, building permissions, utilities, contractor performance, labour availability, supply chains or statutory approvals may delay Project milestones.</li>
        <li><b>6.3 Force Majeure.</b> Neither Party shall be liable for delay directly caused by events beyond reasonable control, including natural disasters, severe weather, epidemic/pandemic restrictions, war, civil disturbance, governmental orders, regulatory changes, utility failures or other comparable events. The affected timeline shall be extended for the period reasonably attributable to the disruption.</li>
        <li><b>6.4 Limitation of Liability.</b> Except for fraud, wilful misconduct, misappropriation, breach of confidentiality, statutory liabilities that cannot lawfully be excluded, or amounts expressly due under the final settlement, neither Party shall be liable for indirect or consequential losses to the extent permitted by law.</li>
        <li><b>6.5 Investor Acknowledgement.</b> The Co-Investor confirms that the decision to participate is based on independent assessment and not solely on projected returns, brochures, oral assurances or third-party statements. The final executed agreement should attach the Project information memorandum and risk disclosures.</li>
      </ul>

      <h2 className="ag-h2">Article 7 — Default, Termination, Dispute Resolution</h2>
      <ul className="ag-list">
        <li><b>7.1 Material Default.</b> A material breach shall be notified in writing with reasonable particulars. The defaulting Party shall ordinarily have 30 days to cure, unless the breach is incapable of cure or a shorter period is required by law.</li>
        <li><b>7.2 Termination.</b> This Agreement may terminate by mutual written consent, completion of the Project investment lifecycle and settlement, material uncured breach, illegality, insolvency where legally relevant, or another termination event expressly agreed in writing.</li>
        <li><b>7.3 Consequences of Termination.</b> Upon termination, the Company shall prepare an account of amounts received, amounts lawfully deployed, recoveries, liabilities, applicable deductions and the amount, if any, payable to the Co-Investor. Termination shall not create a right to payment contrary to mandatory law or the actual availability of Project assets/funds.</li>
        <li><b>7.4 Conciliation.</b> Disputes shall first be referred to senior representatives of the Parties for good-faith conciliation for 30 calendar days, unless urgent interim relief is required.</li>
        <li><b>7.5 Arbitration.</b> If unresolved, the dispute may be referred to arbitration under the Arbitration and Conciliation Act, 1996, by a sole independent arbitrator mutually appointed by the Parties, subject to applicable law. The proposed seat shall be Noida, Gautam Buddha Nagar, Uttar Pradesh, unless the final executed agreement specifies otherwise.</li>
        <li><b>7.6 Jurisdiction.</b> Subject to the arbitration clause and applicable law, courts having competent jurisdiction at the agreed seat shall have jurisdiction for interim and enforcement proceedings.</li>
      </ul>

      <h2 className="ag-h2">Article 8 — General Terms &amp; Conditions</h2>
      <ul className="ag-list">
        <li><b>8.1 Entire Agreement.</b> This Deed and its schedules constitute the understanding between the Parties regarding the subject matter and supersede inconsistent prior communications, except for representations expressly incorporated in writing.</li>
        <li><b>8.2 Amendments.</b> Any amendment shall be in writing and signed by authorized representatives of the affected Parties.</li>
        <li><b>8.3 Notices.</b> Notices shall be sent to the addresses and email identifiers recorded in Schedule B, or as subsequently updated by written notice.</li>
        <li><b>8.4 Assignment.</b> No Party may assign its rights or obligations except with written consent or where expressly permitted by this Deed and applicable law.</li>
        <li><b>8.5 Severability.</b> If any provision is held invalid or unenforceable, it shall be modified to the minimum extent necessary and the remaining provisions shall continue.</li>
        <li><b>8.6 Waiver.</b> Failure to enforce a provision on one occasion shall not constitute a continuing waiver.</li>
        <li><b>8.7 Counterparts and Electronic Execution.</b> The Parties may execute counterparts and use legally recognized electronic signatures, subject to applicable law and evidentiary requirements.</li>
        <li><b>8.8 KYC and Source of Funds.</b> The Co-Investor shall provide documents reasonably required for KYC, tax reporting and source-of-funds verification. The Company may decline or return funds where acceptance would breach law or compliance obligations.</li>
        <li><b>8.9 Regulatory Precedence.</b> If the proposed transaction structure requires registration, approval, disclosure or a different legal form, the Parties shall implement the legally compliant structure before accepting or deploying investor funds.</li>
      </ul>

      <h2 className="ag-h2">Schedule B — Party Details</h2>
      <table className="ag-kv">
        <tbody>
          <tr><td>Parent Company</td><td>Money Multiply Trading &amp; Consultant Private Limited · CIN: U70200UP2026PTC253626 · B-128, First Floor, Sector-2 Noida, Gautam Buddha Nagar, Uttar Pradesh – 201301</td></tr>
          <tr><td>Management Company</td><td><Fill w={200} /></td></tr>
          <tr><td>Co-Investor Name</td><td><b>{investor}</b>{email ? ` · ${email}` : ""}</td></tr>
          <tr><td>PAN / KYC ID</td><td>{pan || aadhaar ? <b>{[pan, aadhaar].filter(Boolean).join(" · ")}</b> : <Fill w={130} />}</td></tr>
          <tr><td>Address</td><td><Val v={address} w={230} /></td></tr>
          <tr><td>Bank / Account for Disbursement</td><td><Fill w={220} /></td></tr>
        </tbody>
      </table>

      <h2 className="ag-h2">Formal Execution &amp; Signature Terminal</h2>
      <p>
        IN WITNESS WHEREOF, the Parties, having read and understood this Agreement and subject to applicable law,
        execute the same on the date and place first written above.
      </p>
      <div className="ag-sign">
        <div className="ag-sign-col">
          <div className="ag-sign-line" />
          <b>For the Parent Company</b>
          <span className="ag-muted">Money Multiply Trading &amp; Consultant Pvt. Ltd.</span>
          <span className="ag-muted">Authorized Signatory / Director</span>
          <span className="ag-muted">Corporate Seal / Stamp</span>
          <span className="ag-muted">Date: <Fill w={70} /></span>
        </div>
        <div className="ag-sign-col">
          <div className="ag-sign-line" />
          <b>Co-Investor</b>
          <span className="ag-muted">{investor}</span>
          {email && <span className="ag-muted">{email}</span>}
          <span className="ag-muted">PAN: <Val v={pan} w={110} /></span>
          <span className="ag-muted">Aadhaar: <Val v={aadhaar} w={120} /></span>
          <span className="ag-muted">Date: <Fill w={70} /> · Place: <Fill w={90} /></span>
        </div>
      </div>
      <div className="ag-sign">
        <div className="ag-sign-col">
          <div className="ag-sign-line" />
          <b>Witness 1</b>
          <span className="ag-muted">Name: <Fill w={120} /></span>
          <span className="ag-muted">Address: <Fill w={120} /></span>
        </div>
        <div className="ag-sign-col">
          <div className="ag-sign-line" />
          <b>Witness 2</b>
          <span className="ag-muted">Name: <Fill w={120} /></span>
          <span className="ag-muted">Address: <Fill w={120} /></span>
        </div>
      </div>

      <div className="ag-callout">
        <b>Execution Checklist</b>
        <ul>
          <li>Project land/title documents and encumbrance search attached.</li>
          <li>Project approvals / registration details attached where applicable.</li>
          <li>Management Company appointment / authorization attached.</li>
          <li>Project budget and risk disclosure attached.</li>
          <li>KYC and source-of-funds documentation completed.</li>
          <li>Applicable stamp duty, registration and legal review completed.</li>
        </ul>
      </div>

      <div className="ag-foot">
        Money Multiply Trading &amp; Consultant Pvt. Ltd. • Omkaram Housing Complex • Confidential Master Deed of Co-Investment • Generated for {investor}. Subject to execution, stamping and KYC verification.
      </div>
    </div>
  );
}
