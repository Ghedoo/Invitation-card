import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader" role="status" aria-live="polite">
      <svg className="loader__ring" viewBox="0 0 80 80" aria-hidden="true">
        <circle cx="40" cy="40" r="34" />
      </svg>
      <span className="loader__label">جاري تحضير الدعوة</span>
    </div>
  );
}
