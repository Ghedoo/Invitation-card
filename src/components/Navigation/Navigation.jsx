import { useEffect, useState } from "react";
import gsap from "gsap";
import { navLinks, couple } from "../../data/content";
import "./Navigation.css";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    gsap.fromTo(
      ".mobile-menu__item",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out", delay: 0.1 }
    );
  }, [menuOpen]);

  function handleLinkClick(e, id) {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner container">
          <a
            href="#home"
            className="nav__brand"
            onClick={(e) => handleLinkClick(e, "home")}
          >
            {couple.groom}
            <span className="nav__amp">&amp;</span>
            {couple.bride}
          </a>

          <nav className="nav__links" aria-label="التنقل الرئيسي">
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={(e) => handleLinkClick(e, l.id)}>
                {l.label}
              </a>
            ))}
          </nav>

          <button
            className={`nav__burger ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <nav aria-label="قائمة الجوال">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="mobile-menu__item"
              onClick={(e) => handleLinkClick(e, l.id)}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
