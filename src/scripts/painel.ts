// Painel de exemplo: se endireita conforme a página rola e os números contam do zero.
import { mouseFino, ritmo } from "./ritmo";

export function iniciaPainel(sec: HTMLElement, palco: HTMLElement, cena: HTMLElement) {
  function conta() {
    sec.querySelectorAll<HTMLElement>("[data-n]").forEach((el) => {
      const alvo = Number(el.dataset.n);
      const pre = el.dataset.pre ?? "";
      const pos = el.dataset.pos ?? "";
      const t0 = performance.now();
      const dur = 1400 / ritmo;
      const passo = (agora: number) => {
        const k = Math.min(1, Math.max(0, (agora - t0) / dur));
        const v = Math.round(alvo * (1 - Math.pow(1 - k, 3)));
        el.textContent = pre + v.toLocaleString("pt-BR") + pos;
        if (k < 1) requestAnimationFrame(passo);
      };
      passo(t0);
    });
  }

  const obs = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return;
      sec.classList.add("viu");
      conta();
      obs.disconnect();
    },
    { threshold: 0.25 },
  );
  obs.observe(palco);

  let px = 0;
  let py = 0;
  let pendente = false;
  function aplica() {
    pendente = false;
    const r = palco.getBoundingClientRect();
    const c = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight));
    const pequeno = innerWidth < 600 ? 0.5 : 1;
    cena.style.setProperty("--rx", (2 + Math.max(0, c) * 22) * pequeno - py * 3 + "deg");
    cena.style.setProperty("--ry", px * 4 * pequeno + "deg");
  }
  function pede() {
    if (pendente) return;
    pendente = true;
    requestAnimationFrame(aplica);
  }
  addEventListener("scroll", pede, { passive: true });
  addEventListener("resize", pede);
  if (mouseFino) {
    addEventListener("pointermove", (e) => {
      px = (e.clientX / innerWidth) * 2 - 1;
      py = (e.clientY / innerHeight) * 2 - 1;
      pede();
    });
  }
  aplica();
}
