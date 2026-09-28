import React, { useState } from "react";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // { type: "ok" | "error", text }
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus({ type: "error", text: "Please enter a valid email address." });
      return;
    }
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch(`${API_BASE}/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus({ type: "ok", text: data.message });
      setEmail("");
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col">
          <h3 className="footer__brand">Café Fausse</h3>
          <p>1234 Culinary Ave, Suite 100<br />Washington, DC 20002</p>
          <p>(202) 555-4567</p>
          <p>Mon–Sat: 5:00 PM – 11:00 PM<br />Sunday: 5:00 PM – 9:00 PM</p>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Join our newsletter</h3>
          <p>Seasonal menus, events, and a little wine gossip — no spam.</p>
          <form className="footer__form" onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              required
            />
            <button type="submit" disabled={submitting}>
              {submitting ? "Signing up…" : "Sign up"}
            </button>
          </form>
          {status && (
            <p className={`footer__status footer__status--${status.type}`} role="status">
              {status.text}
            </p>
          )}
        </div>
      </div>
      <p className="footer__copyright">
        © {new Date().getFullYear()} Café Fausse. All rights reserved.
      </p>
    </footer>
  );
}
