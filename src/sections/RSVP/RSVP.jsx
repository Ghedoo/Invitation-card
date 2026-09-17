import { useRef, useState } from "react";
import gsap from "gsap";
import RevealOnScroll from "../../components/RevealOnScroll/RevealOnScroll";
import "./RSVP.css";

const initial = { name: "", message: "" };

export default function RSVP() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [messages, setMessages] = useState([]);
  const formRef = useRef(null);

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (values.name.trim().length < 2) {
      nextErrors.name = "الرجاء إدخال الاسم";
    }
    if (!values.message.trim()) {
      nextErrors.message = "الرجاء كتابة رسالة التهنئة";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      gsap.fromTo(
        formRef.current,
        { x: -6 },
        { x: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" },
      );
      return;
    }

    setMessages((current) => [
      ...current,
      { name: values.name.trim(), message: values.message.trim() },
    ]);
    setValues(initial);
    setErrors({});
  }

  return (
    <section id="rsvp" className="rsvp section section--ivory">
      <div className="container rsvp__container">
        <RevealOnScroll className="section-head" as="div">
          <span className="eyebrow">تأكيد الحضور</span>
          <h2 className="section-title">بانتظاركم</h2>
          <p className="section-sub">اكتبوا أسماءكم ورسالة تهنئة لنا.</p>
        </RevealOnScroll>

        <form className="rsvp__form" ref={formRef} onSubmit={handleSubmit} noValidate>
          <div className="rsvp__field">
            <label htmlFor="name">الاسم</label>
            <input
              id="name"
              type="text"
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              placeholder="اكتب اسمك هنا"
            />
            {errors.name && (
              <span id="name-error" className="rsvp__error">
                {errors.name}
              </span>
            )}
          </div>

          <div className="rsvp__field">
            <label htmlFor="message">رسالة التهنئة</label>
            <textarea
              id="message"
              rows="3"
              value={values.message}
              onChange={(event) => update("message", event.target.value)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              placeholder="اكتبوا كلمة أو تهنئة لنا..."
            />
            {errors.message && (
              <span id="message-error" className="rsvp__error">
                {errors.message}
              </span>
            )}
          </div>

          <button type="submit" className="btn btn--solid rsvp__submit">
            إرسال التهنئة
          </button>
        </form>

        {messages.length > 0 && (
          <div className="rsvp__messages" aria-live="polite">
            {messages.map((entry, index) => (
              <article className="rsvp__message" key={`${entry.name}-${index}`}>
                <strong>{entry.name}</strong>
                <p>{entry.message}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
