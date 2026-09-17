import { useEffect, useState } from "react";
import Loader from "./components/Loader/Loader";
import InvitationCard from "./components/InvitationCard/InvitationCard";
import Navigation from "./components/Navigation/Navigation";
import MusicButton from "./components/MusicButton/MusicButton";
import AmbientBackground from "./components/AmbientBackground/AmbientBackground";
import Hero from "./sections/Hero/Hero";
import OurStory from "./sections/OurStory/OurStory";
import Event from "./sections/Event/Event";
import Gallery from "./sections/Gallery/Gallery";
import Location from "./sections/Location/Location";
import RSVP from "./sections/RSVP/RSVP";
import Footer from "./sections/Footer/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cardOpened, setCardOpened] = useState(false);

  // شاشة التحميل
  useEffect(() => {
    const fontsReady = document.fonts
      ? document.fonts.ready
      : Promise.resolve();

    const minDelay = new Promise((res) =>
      setTimeout(res, 900)
    );

    Promise.all([fontsReady, minDelay]).then(() => {
      setLoading(false);
    });
  }, []);

  // منع تمرير الصفحة أثناء ظهور البطاقة
  useEffect(() => {
    document.body.style.overflow = cardOpened ? "" : "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [cardOpened]);

  // Auto Scroll بعد فتح البطاقة
  useEffect(() => {
    if (!cardOpened) return;

    let frame = null;
    let timer = null;
    let stopped = false;

    // مدة السكرول: 60 ثانية
    const duration = 60000;

    // إيقاف الـ Auto Scroll
    const stopAutoScroll = () => {
      if (stopped) return;

      stopped = true;

      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }

      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }

      window.removeEventListener("wheel", stopAutoScroll);
      window.removeEventListener("touchstart", stopAutoScroll);
      window.removeEventListener("pointerdown", stopAutoScroll);
      window.removeEventListener("keydown", stopAutoScroll);
    };

    // بدء الـ Auto Scroll
    const startAutoScroll = () => {
      if (stopped) return;

      const scrollElement = document.scrollingElement;
      if (!scrollElement) return;

      const startScroll = scrollElement.scrollTop;

      const initialMaxScroll =
        scrollElement.scrollHeight -
        scrollElement.clientHeight;

      if (initialMaxScroll <= startScroll) {
        return;
      }

      const startTime = performance.now();

      const animateScroll = (currentTime) => {
        if (stopped) return;

        const elapsed = currentTime - startTime;

        const progress = Math.min(
          elapsed / duration,
          1
        );

        // Ease In Out
        const easedProgress =
          progress < 0.5
            ? 2 * progress * progress
            : 1 -
              Math.pow(-2 * progress + 2, 2) / 2;

        const maxScroll =
          scrollElement.scrollHeight -
          scrollElement.clientHeight;
        const currentScroll =
          startScroll +
          (maxScroll - startScroll) *
            easedProgress;

        scrollElement.scrollTop = currentScroll;

        if (progress < 1) {
          frame = requestAnimationFrame(
            animateScroll
          );
        } else {
          frame = null;
        }
      };

      frame = requestAnimationFrame(
        animateScroll
      );
    };

    // انتظار نصف ثانية بعد فتح البطاقة
    timer = window.setTimeout(() => {
      startAutoScroll();
    }, 500);

    // أي تفاعل من المستخدم يوقف السكرول التلقائي
    window.addEventListener("wheel", stopAutoScroll, {
      passive: true,
    });

    window.addEventListener(
      "touchstart",
      stopAutoScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "pointerdown",
      stopAutoScroll,
      {
        passive: true,
      }
    );

    window.addEventListener("keydown", stopAutoScroll);

    // تنظيف
    return () => {
      stopped = true;

      if (frame !== null) {
        cancelAnimationFrame(frame);
      }

      if (timer !== null) {
        clearTimeout(timer);
      }

      window.removeEventListener(
        "wheel",
        stopAutoScroll
      );

      window.removeEventListener(
        "touchstart",
        stopAutoScroll
      );

      window.removeEventListener(
        "pointerdown",
        stopAutoScroll
      );

      window.removeEventListener(
        "keydown",
        stopAutoScroll
      );
    };
  }, [cardOpened]);

  return (
    <>
      <AmbientBackground />

      {loading && <Loader />}

      {!loading && !cardOpened && (
        <InvitationCard
          onOpened={() => setCardOpened(true)}
        />
      )}

      <Navigation />

      <MusicButton autoPlay={cardOpened} />

      <main>
        <Hero play={cardOpened} />
        <OurStory />
        <Event />
        <Gallery />
        <Location />
        <RSVP />
      </main>

      <Footer />
    </>
  );
}