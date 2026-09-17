import { useEffect, useRef } from "react";
import gsap from "gsap";
import { couple, hero, eventDateDisplay } from "../../data/content";
import heroImg from "../../assets/images/cover400.webp";
import "./Hero.css";

export default function Hero({ play }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!play || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero__bg",
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6 },
      )
        .fromTo(
          ".hero__overlay",
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=1.2",
        )
        .fromTo(
          ".hero__ornament",
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.6",
        )
        .fromTo(
          ".hero__kicker",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3",
        )
        .fromTo(
          ".hero__verses",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.3",
        )
        .fromTo(
          ".hero__names span",
          { opacity: 0, y: 34 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 },
          "-=0.2",
        )
        .fromTo(
          ".hero__invite",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.5",
        )
        .fromTo(
          ".hero__date",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".hero__cta",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        );
    }, rootRef);

    return () => ctx.revert();
  }, [play]);

  return (
    <section id="home" className="hero" ref={rootRef}>
      <div
        className="hero__bg"
        style={{ backgroundImage: `url(${heroImg})` }}
        role="img"
        aria-label="صورة سينمائية للعروسين"
      />
      <div className="hero__overlay" />

      <div className="hero__content container">
        <span className="hero__ornament" aria-hidden="true">
          ✦
        </span>
        <p className="hero__kicker">{hero.kicker}</p>
        <div className="hero__verses" dir="rtl">
          <p>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <p>وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً</p>
          <p>اليوم نطق قلبي قبولاً وأصبحت له شرعاً وقانوناً</p>
        </div>
        <h1 className="hero__names">
          <span>{couple.groom}</span>
          <span className="hero__amp">&amp;</span>
          <span>{couple.bride}</span>
        </h1>
        <p className="hero__invite">{hero.invite}</p>
        <p className="hero__date">
          {eventDateDisplay.weekday} {eventDateDisplay.day}{" "}
          {eventDateDisplay.month} — {eventDateDisplay.time}
        </p>
        <a
          href="#rsvp"
          className="btn btn--solid hero__cta"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("rsvp")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          تأكيد الحضور
        </a>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
