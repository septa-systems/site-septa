// Rede de conexões no fundo: pontos que se ligam e reagem ao mouse (ADR 0001).
import { ritmo } from "./ritmo";

const LIGA = 150;
const MOUSE = 200;

export function iniciaRede(cv: HTMLCanvasElement) {
  const ctx = cv.getContext("2d");
  if (!ctx) return;

  type No = { x: number; y: number; vx: number; vy: number; r: number; azul: boolean };
  let W = 0;
  let H = 0;
  let nos: No[] = [];
  const mouse = { x: -9999, y: -9999 };
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  function monta() {
    W = innerWidth;
    H = innerHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    // menos pontos em tela pequena
    const n = Math.round(Math.min(80, Math.max(W < 600 ? 18 : 28, (W * H) / 16000)));
    nos = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.6,
      azul: Math.random() < 0.3,
    }));
  }

  // no celular a barra de endereço muda a altura ao rolar: só remonta se a largura mudar
  let largura = innerWidth;
  addEventListener("resize", () => {
    if (innerWidth === largura && Math.abs(innerHeight - H) < 120) return;
    largura = innerWidth;
    monta();
  });
  monta();
  addEventListener("pointermove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  document.addEventListener("pointerleave", () => (mouse.x = mouse.y = -9999));

  const LOTES = 6;
  const lotes: number[][] = Array.from({ length: LOTES }, () => []);
  const lotesMouse: number[][] = Array.from({ length: LOTES }, () => []);
  function desenhaLotes(grupo: number[][], cor: string, forca: number) {
    grupo.forEach((l, k) => {
      if (!l.length) return;
      ctx!.strokeStyle = `rgba(${cor},${((k + 0.5) / LOTES) * forca})`;
      ctx!.beginPath();
      for (let i = 0; i < l.length; i += 4) {
        ctx!.moveTo(l[i], l[i + 1]);
        ctx!.lineTo(l[i + 2], l[i + 3]);
      }
      ctx!.stroke();
    });
  }

  function quadro() {
    ctx!.clearRect(0, 0, W, H);
    for (const p of nos) {
      p.x += p.vx * ritmo;
      p.y += p.vy * ritmo;
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20;
      if (p.y > H + 20) p.y = -20;
    }
    // as linhas são agrupadas por transparência: poucos stroke() por quadro em vez de um por linha
    for (const lote of lotes) lote.length = 0;
    for (const lote of lotesMouse) lote.length = 0;
    for (let i = 0; i < nos.length; i++) {
      const a = nos[i];
      for (let j = i + 1; j < nos.length; j++) {
        const b = nos[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LIGA * LIGA) {
          const k = Math.min(LOTES - 1, Math.floor((1 - Math.sqrt(d2) / LIGA) * LOTES));
          lotes[k].push(a.x, a.y, b.x, b.y);
        }
      }
      const mx = a.x - mouse.x;
      const my = a.y - mouse.y;
      const dm2 = mx * mx + my * my;
      if (dm2 < MOUSE * MOUSE) {
        const k = Math.min(LOTES - 1, Math.floor((1 - Math.sqrt(dm2) / MOUSE) * LOTES));
        lotesMouse[k].push(a.x, a.y, mouse.x, mouse.y);
      }
    }
    ctx!.lineWidth = 1;
    desenhaLotes(lotes, "45,212,191", 0.28);
    desenhaLotes(lotesMouse, "56,189,248", 0.45);
    for (const azul of [false, true]) {
      ctx!.fillStyle = azul ? "rgba(56,189,248,.8)" : "rgba(45,212,191,.85)";
      ctx!.beginPath();
      for (const a of nos) {
        if (a.azul !== azul) continue;
        ctx!.moveTo(a.x + a.r, a.y);
        ctx!.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      }
      ctx!.fill();
    }
    if (document.hidden) {
      parado = true;
      return;
    }
    requestAnimationFrame(quadro);
  }

  let parado = false;
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && parado) {
      parado = false;
      requestAnimationFrame(quadro);
    }
  });
  requestAnimationFrame(quadro);
}
