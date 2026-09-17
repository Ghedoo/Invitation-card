import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { eventDate } from "../../data/content";
import "./Countdown.css";

function getRemaining() {
  const diff = Math.max(0, eventDate.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const UNITS = [
  { key: "days", label: "يوم" },
  { key: "hours", label: "ساعة" },
  { key: "minutes", label: "دقيقة" },
  { key: "seconds", label: "ثانية" },
];

export default function Countdown() {
  const [time, setTime] = useState(getRemaining);
  const refs = useRef({});

  const unitDelay = {
    days: 0,
    hours: 0.1,
    minutes: 0.2,
    seconds: 0.3,
  };

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const prevTime = refs.current.prevTime ?? time;

    UNITS.forEach(({ key }, index) => {
      const el = refs.current[key];
      if (!el) return;

      const hasChanged = prevTime[key] !== time[key];
      if (!hasChanged) return;

      gsap.fromTo(
        el,
        { y: 0, opacity: 1 },
        {
          y: 18,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          delay: unitDelay[key] + index * 0.04,
          onComplete: () => {
            gsap.set(el, { y: 0, opacity: 1 });
          },
        }
      );
    });

    refs.current.prevTime = time;
  }, [time]);

  return (
    <div className="countdown">
      {UNITS.map(({ key, label }) => (
        <div className="countdown__cell" key={key}>
          <span
            className="countdown__value"
            ref={(el) => (refs.current[key] = el)}
          >
            {String(time[key]).padStart(2, "0")}
          </span>
          <span className="countdown__label">{label}</span>
        </div>
      ))}
    </div>
  );
}
