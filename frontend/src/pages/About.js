import React from "react";

export default function About() {
  return (
    <section className="section page-header">
      <p className="hero__eyebrow">About Us</p>
      <h1>Our story</h1>

      <p className="page-header__lede about__intro">
        Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez,
        Café Fausse blends traditional Italian flavors with modern culinary
        innovation. Our mission is to provide an unforgettable dining
        experience that reflects both quality and creativity.
      </p>

      <div className="about-grid">
        <div className="about-card">
          <h2>Chef Antonio Rossi</h2>
          <p>
            Trained in Bologna and Rome before bringing his family's recipes
            to Washington, Antonio built the Café Fausse kitchen around
            technique first, ingredients second, and trends never.
          </p>
        </div>
        <div className="about-card">
          <h2>Maria Lopez</h2>
          <p>
            Maria oversees every table in the room. Her belief that
            hospitality is a craft, not a courtesy, shapes everything from
            the reservation system to the last pour of espresso.
          </p>
        </div>
      </div>

      <div className="about-values">
        <h2>What we care about</h2>
        <ul>
          <li>An unforgettable dining experience, every visit.</li>
          <li>Excellent food, made from scratch, table by table.</li>
          <li>Locally sourced ingredients wherever the season allows it.</li>
        </ul>
      </div>
    </section>
  );
}
