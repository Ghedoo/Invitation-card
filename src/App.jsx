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
