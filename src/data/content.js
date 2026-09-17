// ============================================================
// كل بيانات الدعوة في مكان واحد — عدّل هنا فقط لتغيير المحتوى
// ============================================================

export const couple = {
  groom: "Bassant",
  bride: "Ragheed",
};

// موعد المناسبة (بتوقيت المتصفح المحلي) — يُستخدم في العداد التنازلي أيضًا
export const eventDate = new Date("2026-10-10T19:00:00");

export const eventDateDisplay = {
  day: "10",
  weekday: "Saturday",
  month: "October 2026",
  time: "7:00 PM",
};

export const hero = {
  kicker: "بمشاركة العائلتين الكريمتين",
  invite: "يتشرفان بدعوتكم لحضور حفل خطوبتهما",
};

export const story = {
  eyebrow: "قصتنا",
  title: "حكايتنا",
  paragraphs: [
    "بدأت الحكاية بلقاء عابر، لم يكن أحد يتوقع أن يتحوّل إلى أجمل بداية. بين حديث بسيط وابتسامة صادقة، وُلدت رابطة لم تتوقف عن النمو يومًا بعد يوم.",
    "مرّت الأيام، وتقاربت القلوب أكثر، حتى أصبح كل منهما جزءًا لا يكتمل الآخر بدونه. اليوم، وبقلوب مليئة بالامتنان، نفتح صفحة جديدة من هذه الحكاية، وندعوكم لنكون جزءًا منها.",
  ],
};

export const eventDetails = [
  { label: "Story", value: "Saturday, October 10, 2026" },
  { label: "Time", value: "7:00 PM" },
  { label: "Venue", value: "Gold Lily Hall" },
  { label: "Address", value: "Corniche Road, First Floor — Riyadh" },
];

export const gallery = [
  { src: "/src/assets/images/gallery-1.jpg", alt: "لحظة من قصتنا — الأولى" },
  { src: "/src/assets/images/gallery-2.jpg", alt: "لحظة من قصتنا — الثانية" },
  { src: "/src/assets/images/gallery-3.jpg", alt: "لحظة من قصتنا — الثالثة" },
  { src: "/src/assets/images/gallery-4.jpg", alt: "لحظة من قصتنا — الرابعة" },
  { src: "/src/assets/images/gallery-5.jpg", alt: "لحظة من قصتنا — الخامسة" },
  { src: "/src/assets/images/gallery-6.jpg", alt: "لحظة من قصتنا — السادسة" },
];

export const location = {
  venueName: "قاعة اللؤلؤة الذهبية",
  address: "طريق الكورنيش، الدور الأول — الرياض، المملكة العربية السعودية",
  mapsUrl: "https://maps.google.com/?q=Riyadh",
  embedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d463390.5!2d46.6!3d24.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzAwLjAiTiA0NsKwNDInMDAuMCJF!5e0!3m2!1sar!2ssa!4v0",
};

export const navLinks = [
  { id: "home", label: "الرئيسية" },
  { id: "story", label: "قصتنا" },
  { id: "event", label: "المناسبة" },
  { id: "gallery", label: "معرض الصور" },
  { id: "location", label: "الموقع" },
  { id: "rsvp", label: "تأكيد الحضور" },
];

export const musicSrc = "/music.mp3";
