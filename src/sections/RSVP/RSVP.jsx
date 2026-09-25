import { useRef, useState } from "react";
import gsap from "gsap";
import RevealOnScroll from "../../components/RevealOnScroll/RevealOnScroll";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";
import "./RSVP.css";

const initial = { name: "", attendance: "attending", message: "" };

export default function RSVP() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const formRef = useRef(null);

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "loading") return;

    const nextErrors = {};
    const name = values.name.trim();
    const message = values.message.trim();
    if (name.length < 2 || name.length > 100) nextErrors.name = "اكتبوا اسمًا بين حرفين و100 حرف.";
    if (message.length < 1 || message.length > 1000) nextErrors.message = "اكتبوا رسالة بين حرف واحد و1000 حرف.";
    if (!isSupabaseConfigured) nextErrors.form = "لم يتم إعداد خدمة تأكيد الحضور بعد.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      gsap.fromTo(formRef.current, { x: -6 }, { x: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" });
      return;
    }

    setStatus("loading");
    setStatusMessage("");
    const { error } = await supabase.from("rsvps").insert({
      name,
      attendance: values.attendance,
      message,
    });

    if (error) {
      setStatus("error");
      setStatusMessage("تعذر تسجيل الرد الآن. حاولوا مرة أخرى بعد قليل.");
      return;
    }

    setValues(initial);
    setErrors({});
    setStatus("success");
    setStatusMessage(values.attendance === "attending" ? "تم تسجيل حضورك بنجاح ❤️" : "تم تسجيل اعتذارك بنجاح.");
    window.dispatchEvent(new CustomEvent("rsvp:submitted"));
  }

  return (
    <section id="rsvp" className="rsvp section section--ivory">
      <div className="container rsvp__container">
        <RevealOnScroll className="section-head" as="div">
          <span className="eyebrow">تأكيد الحضور</span>
          <h2 className="section-title">بانتظاركم</h2>
          <p className="section-sub">اكتبوا أسماءكم ورسالة تهنئة لنا.</p>
        </RevealOnScroll>

        {status === "success" ? (
          <div className="rsvp-success" role="status">
            <span className="rsvp-success__ring">✓</span>
            <h3>{statusMessage}</h3>
            <p>شكرًا لمشاركتنا فرحتنا</p>
            <button type="button" className="btn rsvp__again" onClick={() => setStatus("idle")}>إرسال رد آخر</button>
          </div>
        ) : (
          <form className="rsvp__form" ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className="rsvp__field">
              <label htmlFor="name">الاسم الكامل</label>
              <input id="name" type="text" maxLength="100" value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={!!errors.name} placeholder="اكتب اسمك هنا" />
              {errors.name && <span className="rsvp__error">{errors.name}</span>}
            </div>

            <fieldset className="rsvp__attendance">
              <legend>هل ستتمكن من الحضور؟</legend>
              <label><input type="radio" name="attendance" value="attending" checked={values.attendance === "attending"} onChange={(event) => update("attendance", event.target.value)} /> نعم، سأحضر</label>
              <label><input type="radio" name="attendance" value="not_attending" checked={values.attendance === "not_attending"} onChange={(event) => update("attendance", event.target.value)} /> للأسف لن أتمكن من الحضور</label>
            </fieldset>

            <div className="rsvp__field">
              <label htmlFor="message">رسالتك لنا</label>
              <textarea id="message" rows="4" maxLength="1000" value={values.message} onChange={(event) => update("message", event.target.value)} aria-invalid={!!errors.message} placeholder="اكتبوا كلمة أو تهنئة لنا..." />
              {errors.message && <span className="rsvp__error">{errors.message}</span>}
            </div>

            {errors.form && <p className="rsvp__error">{errors.form}</p>}
            {status === "error" && <p className="rsvp__error">{statusMessage}</p>}
            <button type="submit" className="btn btn--solid rsvp__submit" disabled={status === "loading"}>
              {status === "loading" ? "جاري الإرسال..." : "تأكيد الحضور"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
