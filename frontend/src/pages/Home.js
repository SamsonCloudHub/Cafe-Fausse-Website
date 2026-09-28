import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__text">
          <p className="hero__eyebrow">Washington, DC — Est. 2010</p>
          <h1 className="hero__title">
            Café Fausse
          </h1>
          <p className="hero__subtitle">
            Traditional Italian flavors, reimagined with modern technique,
            served in a room built for long, unhurried evenings.
          </p>
          <div className="hero__actions">
            <Link to="/reservations" className="button button--gold">
              Reserve a table
            </Link>
            <Link to="/menu" className="button button--outline">
              View the menu
            </Link>
          </div>
        </div>
        <div className="hero__image">
          <img src="/images/home-cafe-fausse.webp" alt="The dining room at Café Fausse, set for the evening" />
        </div>
      </section>

      <section className="section section--info">
        <div className="info-grid">
          <div className="info-card">
            <h3>Hours</h3>
            <p>Monday – Saturday<br />5:00 PM – 11:00 PM</p>
            <p>Sunday<br />5:00 PM – 9:00 PM</p>
          </div>
          <div className="info-card">
            <h3>Find us</h3>
            <p>1234 Culinary Ave, Suite 100<br />Washington, DC 20002</p>
          </div>
          <div className="info-card">
            <h3>Reach us</h3>
            <p>(202) 555-4567</p>
            <p>Reservations recommended, especially Friday and Saturday.</p>
          </div>
        </div>
      </section>

      <section className="section section--dark section--cta">
        <h2>An evening at Café Fausse starts with a table.</h2>
        <p>Tell us the date, the time, and the party — we'll take care of the rest.</p>
        <Link to="/reservations" className="button button--gold">Book now</Link>
      </section>
    </>
  );
}
