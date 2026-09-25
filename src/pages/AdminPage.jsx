import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import "./AdminPage.css";

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return undefined;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) loadRsvps();
  }, [session]);

  async function loadRsvps() {
    if (!supabase) return;
    setLoading(true);
    const { data, error: requestError } = await supabase
      .from("rsvps")
      .select("id, name, attendance, message, created_at")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (requestError) setError("تعذر تحميل الردود. تأكد من صلاحيات حساب الإدارة.");
    else setRsvps(data ?? []);
  }

  async function signIn(event) {
    event.preventDefault();
    if (!supabase) return;
    setError("");
    setMessage("");
    const { error: signInError } = await supabase.auth.signInWithPassword(form);
    if (signInError) setError("بيانات الدخول غير صحيحة أو الحساب غير مفعل.");
  }

  async function removeRsvp(id) {
    if (!supabase || !window.confirm("حذف هذا الرد؟")) return;
    const { error: deleteError } = await supabase.from("rsvps").delete().eq("id", id);
    if (deleteError) setError("تعذر حذف الرد.");
    else {
      setRsvps((current) => current.filter((entry) => entry.id !== id));
      setMessage("تم حذف الرد.");
    }
  }

  if (!isSupabaseConfigured) {
    return <main className="admin-page"><p className="admin-page__notice">أضف إعدادات Supabase في ملف البيئة أولًا.</p></main>;
  }

  if (loading && !session) {
    return <main className="admin-page"><p className="admin-page__notice">جاري التحميل...</p></main>;
  }

  if (!session) {
    return (
      <main className="admin-page">
        <form className="admin-card admin-card--login" onSubmit={signIn}>
          <p className="admin-eyebrow">Private access</p>
          <h1>RSVP Dashboard</h1>
          <label>البريد الإلكتروني<input type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
          <label>كلمة المرور<input type="password" required value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>
          <button type="submit">تسجيل الدخول</button>
          {error && <p className="admin-error">{error}</p>}
        </form>
      </main>
    );
  }

  const attending = rsvps.filter((entry) => entry.attendance === "attending").length;
  const notAttending = rsvps.length - attending;

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <header className="admin-header"><div><p className="admin-eyebrow">Private access</p><h1>RSVP Dashboard</h1></div><button className="admin-button--quiet" onClick={() => supabase.auth.signOut()}>تسجيل الخروج</button></header>
        <div className="admin-stats"><div><span>Total</span><strong>{rsvps.length}</strong></div><div><span>Attending</span><strong>{attending}</strong></div><div><span>Not attending</span><strong>{notAttending}</strong></div></div>
        {message && <p className="admin-success">{message}</p>}
        {error && <p className="admin-error">{error}</p>}
        <div className="admin-table-wrap"><table><thead><tr><th>Guest</th><th>Attendance</th><th>Message</th><th>Date</th><th>Action</th></tr></thead><tbody>{rsvps.map((entry) => <tr key={entry.id}><td>{entry.name}</td><td>{entry.attendance === "attending" ? "سيحضر" : "لن يحضر"}</td><td>{entry.message}</td><td>{new Date(entry.created_at).toLocaleString("ar")}</td><td><button className="admin-delete" onClick={() => removeRsvp(entry.id)}>حذف</button></td></tr>)}</tbody></table></div>
      </div>
    </main>
  );
}
