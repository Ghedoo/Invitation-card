import React from "react";
import ReactDOM from "react-dom/client";
import gsap from "gsap";
import App from "./App.jsx";
import "./styles/global.css";

// احترام تفضيل تقليل الحركة: نجعل كل أنيميشن GSAP شبه فوري بدل تعطيله تمامًا،
// حتى لا يبقى أي محتوى مخفيًا بانتظار حركة لن تُشغَّل.
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.defaults({ duration: 0.01, ease: "none" });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
