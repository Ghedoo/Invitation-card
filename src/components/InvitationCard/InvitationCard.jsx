import { useRef, useState } from "react";
import gsap from "gsap";
import coverImage from "../../assets/images/ChatGPT Image Sep 13, 2026, 04_47_41 AM.png";
import "./InvitationCard.css";

/**
 * بطاقة الدعوة المغلقة التي تظهر عند فتح الموقع لأول مرة.
 * عند الضغط: الغطاء ينفتح بحركة ثلاثية الأبعاد واقعية، مع توهج خفيف،
 * ثم ينتقل المشهد بسلاسة إلى الصفحة الرئيسية.
 */
export default function InvitationCard({ onOpened }) {
  const [opening, setOpening] = useState(false);
  const sceneRef = useRef(null);

  function handleOpen() {
    if (opening) return;
    setOpening(true);

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => onOpened?.(),
    });

    tl.to(sceneRef.current, {
      opacity: 0,
      filter: "blur(3px)",
      duration: 1.1,
      ease: "power2.inOut",
    });
  }

  return (
    <div
      className={`invite-scene ${opening ? "is-opening" : ""}`}
      ref={sceneRef}
      role="button"
      tabIndex={opening ? -1 : 0}
      aria-label="اضغط لفتح الدعوة"
      onClick={handleOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleOpen();
        }
      }}
    >
      <img
        className="invite-scene__image"
        src={coverImage}
        alt="غلاف دعوة الخطوبة"
      />
        <div className="invite-scene__ornaments" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M50 50 C43 43 35 47 29 41 C23 35 26 27 35 24 C27 22 20 26 18 33" />
          <path d="M50 50 C57 43 65 47 71 41 C77 35 74 27 65 24 C73 22 80 26 82 33" />
          <path d="M50 50 C43 57 35 53 29 59 C23 65 26 73 35 76 C27 78 20 74 18 67" />
          <path d="M50 50 C57 57 65 53 71 59 C77 65 74 73 65 76 C73 78 80 74 82 67" />
          <path d="M50 50 C48 40 41 35 42 27 C43 20 49 17 53 22 C56 16 63 18 64 24" />
          <path d="M50 50 C52 60 59 65 58 73 C57 80 51 83 47 78 C44 84 37 82 36 76" />
        </svg>
        </div>
      <span className="invite-scene__hint">اضغطوا على الصورة لفتح الدعوة</span>
    </div>
  );
}
