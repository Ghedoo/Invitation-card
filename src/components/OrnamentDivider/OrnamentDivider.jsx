import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./OrnamentDivider.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * العنصر الزخرفي المميز للموقع — خط واحد بسيط مستوحى من الأشكال الهندسية
 * العربية، يُستخدم كفاصل متكرر بين الأقسام مع أنيميشن رسم عند الظهور.
 */
export default function OrnamentDivider({ tone = "gold" }) {
  const ref = useRef(null);

  useEffect(() => {
    const path = ref.current?.querySelector("path");
    if (!path) return;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const anim = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <div className={`ornament ornament--${tone}`} ref={ref} aria-hidden="true">
      <svg viewBox="0 0 240 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 20 H70 M100 20 L120 4 L140 20 L120 36 Z M170 20 H240"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}
