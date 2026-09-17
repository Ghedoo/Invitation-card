import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Lightbox.css";

export default function Lightbox({ images, index, onClose, onNav }) {
  const overlayRef = useRef(null);
  const imgWrapRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" }
    );
    gsap.fromTo(
      imgWrapRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out", delay: 0.05 }
    );

    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index]);

  const img = images[index];

  return (
    <div
      className="lightbox"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="عرض الصورة"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <button className="lightbox__close" onClick={onClose} aria-label="إغلاق">
        ✕
      </button>

      <button
        className="lightbox__nav lightbox__nav--prev"
        onClick={() => onNav(-1)}
        aria-label="الصورة السابقة"
      >
        ‹
      </button>

      <div className="lightbox__frame" ref={imgWrapRef}>
        <img src={img.src} alt={img.alt} />
      </div>

      <button
        className="lightbox__nav lightbox__nav--next"
        onClick={() => onNav(1)}
        aria-label="الصورة التالية"
      >
        ›
      </button>

      <span className="lightbox__counter">
        {index + 1} / {images.length}
      </span>
    </div>
  );
}
