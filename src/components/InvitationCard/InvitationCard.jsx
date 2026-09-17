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
      <span className="invite-scene__hint">اضغطوا على الصورة لفتح الدعوة</span>
    </div>
  );
}
