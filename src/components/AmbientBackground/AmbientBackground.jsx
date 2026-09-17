import { useEffect, useRef } from "react";
import "./AmbientBackground.css";

/**
 * خلفية ديناميكية خفيفة: جزيئات ذهبية عائمة بطيئة الحركة + توهج ناعم.
 * مرسومة على canvas خفيف الأداء (transform فقط، بدون إعادة تخطيط).
 */
export default function AmbientBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let particles = [];
    let w, h, dpr;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initParticles() {
      const count = Math.min(46, Math.floor((w * h) / 26000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vy: Math.random() * 0.18 + 0.05,
        vx: (Math.random() - 0.5) * 0.06,
        o: Math.random() * 0.5 + 0.15,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 118, ${p.o})`;
        ctx.fill();
        if (!reduceMotion) {
          p.y -= p.vy;
          p.x += p.vx;
          if (p.y < -10) {
            p.y = h + 10;
            p.x = Math.random() * w;
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();

    const onResize = () => {
      resize();
      initParticles();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-bg__glow ambient-bg__glow--a" />
      <div className="ambient-bg__glow ambient-bg__glow--b" />
      <canvas ref={canvasRef} className="ambient-bg__canvas" />
    </div>
  );
}
