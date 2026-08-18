"use client";

import { useEffect, useState } from "react";
import { useMarketplace } from "@/context/MarketplaceContext";
import type { AppUser, Holding } from "@/lib/types";

interface Detail {
  user: AppUser;
  holdings: Holding[];
  referrals: { name: string; email: string; role: string; createdAt?: string }[];
}

export default function AdminUsers() {
  const { fmt, toast } = useMarketplace();
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [commission, setCommission] = useState("");
  const [status, setStatus] = useState("active");
  const [hold, setHold] = useState({ title: "", tokens: "", amount: "" });
  const [newPass, setNewPass] = useState("");
  const [headCode, setHeadCode] = useState("");
  const [filter, setFilter] = useState<"all" | "partner" | "investor" | "hq">("all");
  const [adding, setAdding] = useState(false);
  const [savingNew, setSavingNew] = useState(false);
  const emptyNew = { role: "investor", name: "", email: "", phone: "", password: "" };
  const [nu, setNu] = useState(emptyNew);

  const loadUsers = () => {
    setLoading(true);
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => setUsers(d?.ok ? d.users : []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  };
  useEffect(loadUsers, []);
  useEffect(() => {
    fetch("/api/admin/head-ref")
      .then((r) => r.json())
      .then((d) => d?.ok && setHeadCode(d.code))
      .catch(() => {});
  }, []);

  const viaHq = (u: AppUser) => !!headCode && u.referredBy === headCode;

  const createNew = async () => {
    if (savingNew) return;
    if (!nu.name.trim()) return toast("Enter a name");
    if (!/^\S+@\S+\.\S+$/.test(nu.email.trim())) return toast("Enter a valid email");
    if (nu.password.length < 6) return toast("Password must be at least 6 characters");
    setSavingNew(true);
    try {
      const r = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nu),
      });
      const d = await r.json().catch(() => ({}));
      setSavingNew(false);
      if (r.ok && d.ok) {
        setUsers((prev) => [d.user, ...prev]);
        setNu(emptyNew);
        setAdding(false);
        toast(`${d.user.role === "partner" ? "Partner" : "Investor"} added — share the login details`);
      } else if (d.error === "email_taken") {
        toast("That email is already registered");
      } else {
        toast("Couldn’t add user");
      }
    } catch {
      setSavingNew(false);
      toast("Network error");
    }
  };

  const openDetail = async (id: string) => {
    const r = await fetch(`/api/admin/users/${id}`);
    const d = await r.json().catch(() => ({}));
    if (d?.ok) {
      setDetail({ user: d.user, holdings: d.holdings || [], referrals: d.referrals || [] });
      setCommission(String(d.user.commission || 0));
      setStatus(d.user.status || "active");
    }
  };

  const saveUser = async () => {
    if (!detail) return;
    const r = await fetch(`/api/admin/users/${detail.user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commission: parseFloat(commission) || 0, status }),
    });
    const d = await r.json().catch(() => ({}));
    if (d?.ok) {
      toast("User updated");
      setDetail((p) => (p ? { ...p, user: d.user } : p));
      setUsers((prev) => prev.map((u) => (u.id === d.user.id ? d.user : u)));
    } else toast("Couldn’t update user");
  };

  const addHolding = async () => {
    if (!detail) return;
    if (!hold.title.trim()) return toast("Add a project title");
    const r = await fetch(`/api/admin/users/${detail.user.id}/holdings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: hold.title.trim(),
        tokens: parseInt(hold.tokens, 10) || 0,
        amount: parseFloat(hold.amount) || 0,
      }),
    });
    const d = await r.json().catch(() => ({}));
    if (d?.ok) {
      setDetail((p) => (p ? { ...p, holdings: [d.holding, ...p.holdings] } : p));
      setHold({ title: "", tokens: "", amount: "" });
      toast("Holding added");
    } else toast("Couldn’t add holding");
  };

  const delHolding = async (id: string) => {
    const r = await fetch(`/api/admin/holdings/${id}`, { method: "DELETE" });
    if (r.ok) setDetail((p) => (p ? { ...p, holdings: p.holdings.filter((h) => h.id !== id) } : p));
  };

  const setPassword = async () => {
    if (!detail) return;
    if (newPass.length < 6) return toast("Password must be at least 6 characters");
    const r = await fetch(`/api/admin/users/${detail.user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword: newPass }),
    });
    const d = await r.json().catch(() => ({}));
    if (d?.ok) {
      toast("Password reset — share it with the user");
      setNewPass("");
      setDetail((p) => (p ? { ...p, user: d.user } : p));
      setUsers((prev) => prev.map((u) => (u.id === d.user.id ? d.user : u)));
    } else toast("Couldn’t set password");
  };

  const toggleActive = async () => {
    if (!detail) return;
    const next = detail.user.status === "suspended" ? "active" : "suspended";
    const r = await fetch(`/api/admin/users/${detail.user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    const d = await r.json().catch(() => ({}));
    if (d?.ok) {
      setStatus(next);
      setDetail((p) => (p ? { ...p, user: d.user } : p));
      setUsers((prev) => prev.map((u) => (u.id === d.user.id ? d.user : u)));
      toast(next === "suspended" ? "Account deactivated — login blocked" : "Account reactivated");
    } else toast("Couldn’t update");
  };

  const removeUser = async () => {
    if (!detail) return;
    const who = detail.user.name || detail.user.email;
    if (!confirm(`Delete ${who}? This permanently removes the account and their reservations. This cannot be undone.`)) return;
    const r = await fetch(`/api/admin/users/${detail.user.id}`, { method: "DELETE" });
    const d = await r.json().catch(() => ({}));
    if (r.ok && d.ok) {
      setUsers((prev) => prev.filter((u) => u.id !== detail.user.id));
      toast("User deleted");
      setDetail(null);
    } else toast("Couldn’t delete user");
  };

  /* ---- detail view ---- */
  if (detail) {
    const u = detail.user;
    const isPartner = u.role === "partner";
    return (
      <div>
        <button className="au-back" onClick={() => setDetail(null)}>
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          All users
        </button>
        <div className="au-detail">
          <div className="leads-head" style={{ marginBottom: "10px" }}>
            <div>
              <div className="lh-title">{u.name || u.email}</div>
              <div className="lh-sub">
                {u.email} · {u.phone || "—"} · <span style={{ textTransform: "capitalize" }}>{u.role}</span>
                {u.referredBy && (viaHq(u) ? " · joined via HQ link" : ` · referred by ${u.referredBy}`)}
              </div>
            </div>
          </div>

          <div className="frow">
            <div className="field">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="active">active</option>
                <option value="pending">pending</option>
                <option value="suspended">suspended</option>
              </select>
            </div>
            {isPartner && (
              <div className="field">
                <label>Commission earned (₹)</label>
                <input type="number" value={commission} onChange={(e) => setCommission(e.target.value)} />
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            <button className="btn-mini" onClick={saveUser}>Save changes</button>
            <button className="btn-mini" onClick={toggleActive}>
              {u.status === "suspended" ? "Reactivate account" : "Deactivate account"}
            </button>
            <button className="btn-mini danger" onClick={removeUser}>Delete user</button>
          </div>
          {u.status === "suspended" && (
            <p className="db-muted" style={{ fontSize: "12px", marginTop: "8px", color: "#e08a7e" }}>
              This account is deactivated — the user cannot log in until reactivated.
            </p>
          )}

          <h4 className="pd-sub">
            Password{" "}
            {u.resetRequested && (
              <span className="lead-src wa" style={{ marginLeft: "8px" }}>reset requested</span>
            )}
          </h4>
          <div className="au-form" style={{ gridTemplateColumns: "1fr auto" }}>
            <div className="field" style={{ margin: 0 }}>
              <label>Set a new password for this user</label>
              <input type="text" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="Min 6 characters" />
            </div>
            <button className="btn-mini" onClick={setPassword}>Set password</button>
          </div>

          {isPartner ? (
            <>
              <h4 className="pd-sub">Bank details (payout)</h4>
              {u.bank && (u.bank.accountNumber || u.bank.upi) ? (
                <table className="pd-fin">
                  <tbody>
                    <tr><td>Account holder</td><td style={{ textAlign: "right" }}>{u.bank.accountName || "—"}</td></tr>
                    <tr><td>Bank</td><td style={{ textAlign: "right" }}>{u.bank.bankName || "—"}</td></tr>
                    <tr><td>Account number</td><td style={{ textAlign: "right" }}>{u.bank.accountNumber || "—"}</td></tr>
                    <tr><td>IFSC</td><td style={{ textAlign: "right" }}>{u.bank.ifsc || "—"}</td></tr>
                    <tr><td>UPI</td><td style={{ textAlign: "right" }}>{u.bank.upi || "—"}</td></tr>
                  </tbody>
                </table>
              ) : (
                <p className="db-muted">No bank details added yet.</p>
              )}
              <h4 className="pd-sub">Referrals ({detail.referrals.length})</h4>
              {detail.referrals.length === 0 ? (
                <p className="db-muted">Code <b>{u.referralCode}</b> — no referrals yet.</p>
              ) : (
                <table className="pd-fin">
                  <tbody>
                    {detail.referrals.map((r, i) => (
                      <tr key={i}><td>{r.name || r.email}<div className="db-sub">{r.email}</div></td><td style={{ textAlign: "right", textTransform: "capitalize" }}>{r.role}</td></tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          ) : (
            <>
              <h4 className="pd-sub">Reservations / holdings</h4>
              {detail.holdings.length > 0 && (
                <table className="pd-fin">
                  <tbody>
                    {detail.holdings.map((h) => (
                      <tr key={h.id}>
                        <td>{h.title}</td>
                        <td>{h.tokens}</td>
                        <td>{fmt(h.amount)}</td>
                        <td style={{ textAlign: "right" }}>
                          <button className="iconbtn del" onClick={() => delHolding(h.id)} aria-label="Delete">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className="au-form">
                <div className="field" style={{ margin: 0 }}><label>Project</label><input value={hold.title} onChange={(e) => setHold({ ...hold, title: e.target.value })} placeholder="Hindon Prime…" /></div>
                <div className="field" style={{ margin: 0 }}><label>Fractions</label><input type="number" value={hold.tokens} onChange={(e) => setHold({ ...hold, tokens: e.target.value })} placeholder="2" /></div>
                <div className="field" style={{ margin: 0 }}><label>Amount (₹)</label><input type="number" value={hold.amount} onChange={(e) => setHold({ ...hold, amount: e.target.value })} placeholder="1000000" /></div>
                <button className="btn-mini" onClick={addHolding}>Add</button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  /* ---- list view ---- */
  const setN = (k: keyof typeof nu) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setNu((p) => ({ ...p, [k]: e.target.value }));

  const addBlock = (
    <div style={{ marginBottom: "16px" }}>
      {!adding ? (
        <button className="btn-mini" onClick={() => setAdding(true)}>
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "6px" }}>
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add user / partner
        </button>
      ) : (
        <div className="au-detail">
          <div className="leads-head" style={{ marginBottom: "12px" }}>
            <div className="lh-title">Add a new user</div>
          </div>
          <div className="frow">
            <div className="field">
              <label>Role</label>
              <select value={nu.role} onChange={setN("role")}>
                <option value="investor">Investor</option>
                <option value="partner">Partner</option>
              </select>
            </div>
            <div className="field"><label>Full name</label><input value={nu.name} onChange={setN("name")} placeholder="e.g. Rahul Sharma" /></div>
          </div>
          <div className="frow">
            <div className="field"><label>Email</label><input type="email" value={nu.email} onChange={setN("email")} placeholder="name@email.com" /></div>
            <div className="field"><label>Phone</label><input value={nu.phone} onChange={setN("phone")} placeholder="+91…" /></div>
          </div>
          <div className="field"><label>Temporary password</label><input type="text" value={nu.password} onChange={setN("password")} placeholder="Min 6 characters — share with the user" /></div>
          <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
            <button className={"btn-gold" + (savingNew ? " loading" : "")} onClick={createNew} disabled={savingNew} style={{ padding: "10px 22px" }}>Create user</button>
            <button className="btn-ghost" onClick={() => { setAdding(false); setNu(emptyNew); }} style={{ padding: "10px 18px" }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );

  if (loading) return <p className="db-muted">Loading users…</p>;
  if (users.length === 0)
    return (
      <>
        {addBlock}
        <div className="lead-empty">
          <b>No users yet</b>
          <p>Add one above, or partner &amp; investor registrations from “Become an Associate” will appear here.</p>
        </div>
      </>
    );

  const counts = {
    all: users.length,
    partner: users.filter((u) => u.role === "partner").length,
    investor: users.filter((u) => u.role === "investor").length,
    hq: users.filter(viaHq).length,
  };
  const filtered = users.filter((u) =>
    filter === "all" ? true : filter === "hq" ? viaHq(u) : u.role === filter
  );

  return (
    <>
      {addBlock}
      <div className="lead-filter">
        <button className={filter === "all" ? "on" : ""} onClick={() => setFilter("all")}>All ({counts.all})</button>
        <button className={filter === "partner" ? "on" : ""} onClick={() => setFilter("partner")}>Partners ({counts.partner})</button>
        <button className={filter === "investor" ? "on" : ""} onClick={() => setFilter("investor")}>Investors ({counts.investor})</button>
        <button className={filter === "hq" ? "on" : ""} onClick={() => setFilter("hq")}>Joined via HQ ({counts.hq})</button>
      </div>
      {filtered.length === 0 ? (
        <p className="db-muted">No users match this filter.</p>
      ) : (
        <div className="admin-list">
          {filtered.map((u) => (
            <button className="adm-item" key={u.id} style={{ textAlign: "left", cursor: "pointer" }} onClick={() => openDetail(u.id)}>
              <span className={"lead-src " + (u.role === "partner" ? "partner" : "investor")} style={{ flexShrink: 0 }}>{u.role}</span>
              <div className="ai-info">
                <b>{u.name || u.email}</b>
                <span>{u.email}{u.role === "partner" ? ` · ${fmt(u.commission)} commission` : ""}</span>
              </div>
              {viaHq(u) && <span className="lead-src hq" style={{ flexShrink: 0 }}>via HQ</span>}
              {u.resetRequested && <span className="lead-src wa" style={{ flexShrink: 0 }}>reset</span>}
              <span className="lead-time">{u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : ""}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
