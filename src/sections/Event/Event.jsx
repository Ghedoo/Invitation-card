import RevealOnScroll from "../../components/RevealOnScroll/RevealOnScroll";
import Countdown from "../../components/Countdown/Countdown";
import OrnamentDivider from "../../components/OrnamentDivider/OrnamentDivider";
import { eventDetails } from "../../data/content";
import "./Event.css";

export default function Event() {
  return (
    <section id="event" className="event section section--ivory">
      <div className="container">
        <RevealOnScroll className="section-head" as="div">
          <span className="eyebrow">تفاصيل المناسبة</span>
          <h2 className="section-title">يومنا المنتظر</h2>
          <p className="section-sub">
            نتشرف بحضوركم لمشاركتنا هذه اللحظة الغالية على قلوبنا.
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="event__cards" as="div" stagger={0.1}>
          {eventDetails.map((d) => (
            <div className="event__card" key={d.label}>
              <span className="event__card-label">{d.label}</span>
              <span className="event__card-value">{d.value}</span>
            </div>
          ))}
        </RevealOnScroll>

        <OrnamentDivider tone="ivory" />

        <RevealOnScroll className="event__countdown-wrap" as="div">
          <p className="event__countdown-title">تبقّى على الحفل</p>
          <Countdown />
        </RevealOnScroll>
      </div>
    </section>
  );
}
