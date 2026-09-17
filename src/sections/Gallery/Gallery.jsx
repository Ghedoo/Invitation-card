import { useState } from "react";
import RevealOnScroll from "../../components/RevealOnScroll/RevealOnScroll";
import Lightbox from "../../components/Lightbox/Lightbox";
import { gallery as galleryData } from "../../data/content";
import g1 from "../../assets/images/Code_Generated_Image.jfif";
import g2 from "../../assets/images/Gemini_Generated_Image_aqagjoaqagjoaqag.jfif";
import g3 from "../../assets/images/Gemini_Generated_Image_sbphs3sbphs3sbph.jpeg";
import "./Gallery.css";

const imgs = [g1, g2, g3];
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
          <span className="eyebrow">لحظاتنا</span>
          <h2 className="section-title">معرض الصور</h2>
          <p className="section-sub">مجموعة من اللحظات التي نحتفظ بها بامتنان.</p>
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
