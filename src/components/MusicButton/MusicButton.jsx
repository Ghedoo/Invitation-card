import { useEffect, useRef, useState } from "react";
import { musicSrc } from "../../data/content";
import "./MusicButton.css";

export default function MusicButton({ autoPlay = false }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    return () => audio?.pause();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!autoPlay || !audio) return;

    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [autoPlay]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      // التشغيل يبدأ فقط بتفاعل مباشر من المستخدم، كما تفرضه المتصفحات
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }

  return (
    <div className="music-btn">
      <audio ref={audioRef} src={musicSrc} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
        className={`music-btn__circle ${playing ? "is-playing" : ""}`}
      >
        <span className="music-btn__bar" />
        <span className="music-btn__bar" />
        <span className="music-btn__bar" />
      </button>
    </div>
  );
}
