import React, { useEffect, useState } from "react";

const IMAGES = [
  { src: "/images/gallery-cafe-interior.webp", alt: "The Café Fausse dining room, set for the evening" },
  { src: "/images/gallery-ribeye-steak.webp", alt: "Ribeye steak plated with roasted vegetables" },
  { src: "/images/gallery-special-event.webp", alt: "A private event in the Café Fausse dining room" },
  { src: "/images/home-cafe-fausse.webp", alt: "The main dining room at Café Fausse" },
];

const AWARDS = [
  "Culinary Excellence Award — 2022",
  "Restaurant of the Year — 2023",
  "Best Fine Dining Experience — Foodie Magazine, 2023",
];

const REVIEWS = [
  { quote: "Exceptional ambiance and unforgettable flavors.", source: "Gourmet Review" },
  { quote: "A must-visit restaurant for food enthusiasts.", source: "The Daily Bite" },
];

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpenIndex(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="section page-header">
      <p className="hero__eyebrow">Gallery</p>
      <h1>The room, the food, the occasions</h1>

      <div className="gallery-grid">
        {IMAGES.map((img, i) => (
          <button
            key={img.src}
            className="gallery-grid__item"
            onClick={() => setOpenIndex(i)}
            aria-label={`Enlarge photo: ${img.alt}`}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div className="lightbox" onClick={() => setOpenIndex(null)} role="dialog" aria-modal="true">
          <button className="lightbox__close" aria-label="Close" onClick={() => setOpenIndex(null)}>
            ×
          </button>
          <img
            src={IMAGES[openIndex].src}
            alt={IMAGES[openIndex].alt}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="accolades">
        <div className="accolades__col">
          <h2>Awards</h2>
          <ul>
            {AWARDS.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
        <div className="accolades__col">
          <h2>What guests say</h2>
          <ul className="accolades__reviews">
            {REVIEWS.map((r) => (
              <li key={r.source}>
                <p className="accolades__quote">“{r.quote}”</p>
                <p className="accolades__source">— {r.source}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
