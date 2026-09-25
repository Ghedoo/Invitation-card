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
import GuestMessages from "./sections/GuestMessages/GuestMessages";
import Footer from "./sections/Footer/Footer";
import AdminPage from "./pages/AdminPage";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cardOpened, setCardOpened] = useState(false);
  const isAdminRoute = window.location.pathname === "/admin";

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
    if (isAdminRoute) {
      document.body.style.overflow = "auto";
      return () => {
        document.body.style.overflow = "";
      };
    }

    document.body.style.overflow = cardOpened ? "" : "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [cardOpened, isAdminRoute]);

  if (isAdminRoute) return <AdminPage />;

  // Auto Scroll بعد فتح البطاقة
  useEffect(() => {
    if (!cardOpened) return;

    let frame = null;
    let timer = null;
    let stopped = false;

    const scrollSpeed = 1.6;

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

      const getMaxScroll = () =>
        Math.max(0, scrollElement.scrollHeight - scrollElement.clientHeight);

        let settledFrames = 0;

      const animateScroll = (currentTime) => {
        if (stopped) return;


        const maxScroll = getMaxScroll();


          const remaining = maxScroll - scrollElement.scrollTop;

          if (remaining > 1) {
            scrollElement.scrollTop += Math.min(scrollSpeed, remaining);
            settledFrames = 0;
          } else {
            settledFrames += 1;
          }

          if (settledFrames < 90) {
            frame = requestAnimationFrame(animateScroll);
          } else {
            scrollElement.scrollTop = getMaxScroll();
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
        <GuestMessages />
      </main>

      <Footer />
    </>
  );
}