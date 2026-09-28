import React, { useState } from "react";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const initialForm = {
  name: "",
  email: "",
  phone: "",
  guests: 2,
  date: "",
  time: "",
};

export default function Reservations() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { type: "ok" | "error", text }

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.email)) next.email = "Please enter a valid email address.";
    if (!form.date) next.date = "Please choose a date.";
    if (!form.time) next.time = "Please choose a time.";
    if (!form.guests || Number(form.guests) <= 0) next.guests = "Please enter a party size.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setResult(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          guests: Number(form.guests),
          time_slot: `${form.date}T${form.time}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setResult({
        type: "ok",
        text: `You're booked for ${form.guests} at table ${data.table_number} on ${form.date} at ${form.time}. We'll have it ready under ${form.name}.`,
      });
      setForm(initialForm);
    } catch (err) {
      setResult({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section page-header">
      <p className="hero__eyebrow">Reservations</p>
      <h1>Book a table</h1>
      <p className="page-header__lede">
        Pick a date and time and we'll hold a table for you — up to 30 tables
        available per slot.
      </p>

      <form className="res-form" onSubmit={handleSubmit} noValidate>
        <div className="res-form__row">
          <label>
            Full name
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              autoComplete="name"
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </label>

          <label>
            Party size
            <input
              type="number"
              min="1"
              max="20"
              value={form.guests}
              onChange={(e) => update("guests", e.target.value)}
            />
            {errors.guests && <span className="field-error">{errors.guests}</span>}
          </label>
        </div>

        <div className="res-form__row">
          <label>
            Date
            <input
              type="date"
              value={form.date}
              onChange={(e) => update("date", e.target.value)}
            />
            {errors.date && <span className="field-error">{errors.date}</span>}
          </label>

          <label>
            Time
            <input
              type="time"
              value={form.time}
              onChange={(e) => update("time", e.target.value)}
            />
            {errors.time && <span className="field-error">{errors.time}</span>}
          </label>
        </div>

        <div className="res-form__row">
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              autoComplete="email"
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </label>

          <label>
            Phone <span className="label-optional">(optional)</span>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              autoComplete="tel"
            />
          </label>
        </div>

        <button type="submit" className="button button--gold" disabled={submitting}>
          {submitting ? "Checking availability…" : "Reserve"}
        </button>

        {result && (
          <p className={`res-form__result res-form__result--${result.type}`} role="status">
            {result.text}
          </p>
        )}
      </form>
    </section>
  );
}
