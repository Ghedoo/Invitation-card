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

  // شاشة تحميل قصيرة أثناء تجهيز الخطوط والصور — تمنح إحساسًا فاخرًا
  // بدل ظهور مفاجئ للمحتوى.
  useEffect(() => {
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    const minDelay = new Promise((res) => setTimeout(res, 900));
    Promise.all([fontsReady, minDelay]).then(() => setLoading(false));
  }, []);

  // امنع تمرير الصفحة الخلفية أثناء عرض البطاقة
  useEffect(() => {
    document.body.style.overflow = cardOpened ? "" : "hidden";
  }, [cardOpened]);

  useEffect(() => {
    if (!cardOpened) return;

    let frame;
    const timer = window.setTimeout(() => {
      const startScroll = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const duration = 60000;
      const startTime = performance.now();

      const animateScroll = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        window.scrollTo(0, startScroll + (maxScroll - startScroll) * progress);

        if (progress < 1) {
          frame = window.requestAnimationFrame(animateScroll);
        }
      };

      frame = window.requestAnimationFrame(animateScroll);
    }, 250);

    return () => {
      window.clearTimeout(timer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [cardOpened]);

  return (
    <>
      <AmbientBackground />

      {loading && <Loader />}
      {!loading && !cardOpened && (
        <InvitationCard onOpened={() => setCardOpened(true)} />
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
