import RevealOnScroll from "../../components/RevealOnScroll/RevealOnScroll";
import { location } from "../../data/content";
import venueImg from "../../assets/images/venue.jpg";
import "./Location.css";

export default function Location() {
  return (
    <section id="location" className="location section">
      <div className="container">
        <RevealOnScroll className="section-head" as="div">
          <span className="eyebrow">كيف تصلون</span>
          <h2 className="section-title">الموقع</h2>
        </RevealOnScroll>

        <RevealOnScroll className="location__panel" as="div">
          <div className="location__image">
            <img src={venueImg} alt={location.venueName} loading="lazy" />
          </div>
          <div className="location__info">
            <h3>{location.venueName}</h3>
            <p>{location.address}</p>
            <a
              className="btn"
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              فتح في خرائط جوجل
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
