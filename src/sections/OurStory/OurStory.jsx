import RevealOnScroll from "../../components/RevealOnScroll/RevealOnScroll";
import OrnamentDivider from "../../components/OrnamentDivider/OrnamentDivider";
import { story } from "../../data/content";
import storyImg from "../../assets/images/ragheed&bassant.jpeg";
import "./OurStory.css";

export default function OurStory() {
  return (
    <section id="story" className="story section">
      <div className="container story__grid">
        <RevealOnScroll className="story__media" y={0}>
          <div className="story__frame">
            <img src={storyImg} alt="لحظة رومانسية" loading="lazy" />
          </div>
          <span className="story__frame-deco" aria-hidden="true" />
        </RevealOnScroll>

        <RevealOnScroll className="story__copy" as="div" stagger={0.12}>
          <span className="eyebrow">{story.eyebrow}</span>
          <h2 className="section-title">{story.title}</h2>
          {story.paragraphs.map((p, i) => (
            <p key={i} className="story__paragraph">
              {p}
            </p>
          ))}
          <OrnamentDivider />
        </RevealOnScroll>
      </div>
    </section>
  );
}
