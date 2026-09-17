import { useRef, useState } from "react";
import gsap from "gsap";
import RevealOnScroll from "../../components/RevealOnScroll/RevealOnScroll";
import "./RSVP.css";

const initial = { name: "", guests: "1", attendance: "yes", message: "" };

export default function RSVP() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef(null);
  const formRef = useRef(null);

  function update(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function validate() {
    const errs = {};
    if (!values.name.trim() || values.name.trim().length < 2) {
      errs.name = "الرجاء إدخال الاسم الكامل";
    }
    const guestsNum = Number(values.guests);
    if (!guestsNum || guestsNum < 1 || guestsNum > 10) {
      errs.guests = "عدد الضيوف يجب أن يكون بين ١ و١٠";
    }
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      gsap.fromTo(
        formRef.current,
        { x: -6 },
        { x: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" }
      );
      return;
    }

    // في مشروع حقيقي: أرسل القيم إلى خادمك أو خدمة نماذج هنا
    setSubmitted(true);
    requestAnimationFrame(() => {
      gsap.fromTo(
        successRef.current,
        { opacity: 0, y: 20, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }
      );
      gsap.fromTo(
        ".rsvp-success__ring",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)", delay: 0.1 }
      );
    });
  }

  return (
    <section id="rsvp" className="rsvp section section--ivory">
      <div className="container rsvp__container">
        <RevealOnScroll className="section-head" as="div">
          <span className="eyebrow">تأكيد الحضور</span>
          <h2 className="section-title">هل ستشرّفوننا؟</h2>
          <p className="section-sub">نرجو تأكيد حضوركم قبل تاريخ المناسبة بأسبوع.</p>
        </RevealOnScroll>

        {!submitted ? (
          <form className="rsvp__form" ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className="rsvp__field">
              <label htmlFor="name">الاسم الكامل</label>
              <input
                id="name"
                type="text"
                value={values.name}
                onChange={(e) => update("name", e.target.value)}
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

            <div className="rsvp__row">
              <div className="rsvp__field">
                <label htmlFor="guests">عدد الضيوف</label>
                <input
                  id="guests"
                  type="number"
                  min="1"
                  max="10"
                  value={values.guests}
                  onChange={(e) => update("guests", e.target.value)}
                  aria-invalid={!!errors.guests}
                  aria-describedby={errors.guests ? "guests-error" : undefined}
                />
                {errors.guests && (
                  <span id="guests-error" className="rsvp__error">
                    {errors.guests}
                  </span>
                )}
              </div>

              <div className="rsvp__field">
                <label htmlFor="attendance">الحضور</label>
                <select
                  id="attendance"
                  value={values.attendance}
                  onChange={(e) => update("attendance", e.target.value)}
                >
                  <option value="yes">سأحضر بكل سرور</option>
                  <option value="no">أعتذر عن الحضور</option>
                  <option value="maybe">غير مؤكد بعد</option>
                </select>
              </div>
            </div>

            <div className="rsvp__field">
              <label htmlFor="message">رسالة (اختياري)</label>
              <textarea
                id="message"
                rows="3"
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="اكتبوا كلمة أو تهنئة لنا..."
              />
            </div>

            <button type="submit" className="btn btn--solid rsvp__submit">
              إرسال التأكيد
            </button>
          </form>
        ) : (
          <div className="rsvp-success" ref={successRef}>
            <span className="rsvp-success__ring">✓</span>
            <h3>شكرًا لكم!</h3>
            <p>تم استلام تأكيدكم بنجاح، ونتشوق لرؤيتكم معنا.</p>
          </div>
        )}
      </div>
    </section>
  );
}
