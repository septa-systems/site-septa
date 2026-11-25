// Cartões que inclinam com o mouse (só com mouse; no toque ficam parados).
import { mouseFino } from "./ritmo";

export function iniciaInclina() {
  if (!mouseFino) return;
  document.querySelectorAll<HTMLElement>(".inclina").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 12}deg) translateZ(6px)`;
      el.style.setProperty("--mx", x * 100 + "%");
      el.style.setProperty("--my", y * 100 + "%");
    });
    el.addEventListener("pointerleave", () => (el.style.transform = ""));
  });
}
