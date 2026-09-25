import { useEffect, useState } from "react";
import RevealOnScroll from "../../components/RevealOnScroll/RevealOnScroll";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";
import "./GuestMessages.css";

export default function GuestMessages() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadMessages() {
      if (!isSupabaseConfigured || !supabase) return;
      const { data, error: requestError } = await supabase
        .from("public_rsvp_messages")
        .select("id, name, message, created_at")
        .order("created_at", { ascending: false })
        .limit(50);

      if (!active) return;
      if (requestError) setError("تعذر تحميل رسائل الأحبة حاليًا.");
      else setMessages(data ?? []);
    }

    loadMessages();
    const refresh = () => loadMessages();
    window.addEventListener("rsvp:submitted", refresh);
    return () => {
      active = false;
      window.removeEventListener("rsvp:submitted", refresh);
    };
  }, []);

  if (!isSupabaseConfigured) return null;

  return (
    <section className="guest-messages section" aria-labelledby="guest-messages-title">
      <div className="container guest-messages__container">
        <RevealOnScroll className="section-head" as="div">
          <span className="eyebrow">كلمات من القلب</span>
          <h2 id="guest-messages-title" className="section-title">رسائل من أحبتنا</h2>
        </RevealOnScroll>
        {error ? (
          <p className="guest-messages__notice">{error}</p>
        ) : !messages.length ? (
          <p className="guest-messages__notice">ستظهر رسائلكم هنا بمحبة.</p>
        ) : (
          <div className="guest-messages__list">
            {messages.map((entry) => (
              <RevealOnScroll key={entry.id} className="guest-messages__item" as="article" y={18}>
                <strong>{entry.name}</strong>
                <p>“{entry.message}”</p>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
