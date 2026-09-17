import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * يغلّف أي محتوى ويجعله يظهر تدريجيًا (fade + slide up) عند دخوله الشاشة.
 * props:
 *  - as: نوع العنصر (div افتراضيًا)
 *  - y: مقدار الانزياح الرأسي الابتدائي
 *  - delay / duration
 *  - stagger: لو كان المحتوى مجموعة عناصر أبناء مباشرة يراد ظهورها بالتتابع
 */
export default function RevealOnScroll({
  as: Tag = "div",
  y = 32,
  delay = 0,
  duration = 0.9,
  stagger = 0,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger ? Array.from(el.children) : el;
    gsap.set(targets, { opacity: 0, y });

    const anim = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger: stagger || 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 82%",
        once: true,
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [y, delay, duration, stagger]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
