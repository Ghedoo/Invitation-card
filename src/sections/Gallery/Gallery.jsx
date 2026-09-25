import { useState } from "react";
import RevealOnScroll from "../../components/RevealOnScroll/RevealOnScroll";
import Lightbox from "../../components/Lightbox/Lightbox";
import { gallery as galleryData } from "../../data/content";
import g1 from "../../assets/images/WhatsApp Image 2026-09-25 at 2.36.34 PM.jpeg";
// import g2 from "../../assets/images/Gemini_Generated_Image_lwr1ielwr1ielwr1.jfif";
// import g3 from "../../assets/images/WhatsApp Image 2026-09-17 at 7.25.20 PM.jpeg";
import "./Gallery.css";

const imgs = [g1];
const images = galleryData.slice(0, 3).map((g, i) => ({ ...g, src: imgs[i] }));

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);

  function navigate(delta) {
    setActiveIndex((i) => (i + delta + images.length) % images.length);
  }

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <RevealOnScroll className="section-head" as="div">
          <span className="eyebrow">Our Story</span>
          <h2 className="section-title">Our Image</h2>
          {/* <p className="section-sub">مجموعة من اللحظات التي نحتفظ بها بامتنان.</p> */}
        </RevealOnScroll>

        <div className="gallery__grid">
          {images.map((img, i) => (
            <RevealOnScroll
              as="button"
              key={img.src}
              className={`gallery__item gallery__item--${(i % 3) + 1}`}
              delay={(i % 3) * 0.08}
              onClick={() => setActiveIndex(i)}
              aria-label={`فتح ${img.alt}`}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <span className="gallery__zoom" aria-hidden="true">
                ＋
              </span>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <Lightbox
          images={images}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNav={navigate}
        />
      )}
    </section>
  );
}
