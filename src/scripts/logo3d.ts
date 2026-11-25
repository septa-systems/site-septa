// Logo da Septa em 3D (ADR 0001). Só este arquivo importa o Three.js,
// e ele só é baixado depois que a página carregou (ver Abertura.astro).
import {
  AdditiveBlending,
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  ColorManagement,
  DirectionalLight,
  Group,
  Line,
  LineBasicMaterial,
  LineSegments,
  LinearSRGBColorSpace,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  TorusGeometry,
  Vector3,
  WebGLRenderer,
} from "three";
import { ritmo } from "./ritmo";

const PI = Math.PI;
const DESTAQUE = 0x2dd4bf;

export function iniciaLogo3d(caixa: HTMLElement) {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    return; // sem WebGL: fica o logo plano
  }

  // cores e luz iguais às do rascunho aprovado
  ColorManagement.enabled = false;
  renderer.outputColorSpace = LinearSRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  caixa.prepend(renderer.domElement);
  caixa.classList.add("orbe--3d");

  const celular = innerWidth < 600;
  const cena = new Scene();
  const camera = new PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0, 10);

  cena.add(new AmbientLight(0xffffff, 0.28 * PI));
  const luz = new DirectionalLight(0xffffff, 0.95 * PI);
  luz.position.set(4, 5, 6);
  cena.add(luz);
  const preenche = new DirectionalLight(0x9ff5e8, 0.35 * PI);
  preenche.position.set(-5, -2, 3);
  cena.add(preenche);
  const nucleo = new PointLight(DESTAQUE, 2.4 * PI, 9, 1);
  cena.add(nucleo);
  const atras = new PointLight(DESTAQUE, 1.4 * PI, 20, 1);
  atras.position.set(-4, -3, -4);
  cena.add(atras);

  const logo = new Group();
  cena.add(logo);

  // brilho em volta do ponto central (textura desenhada num canvas)
  const tc = document.createElement("canvas");
  tc.width = tc.height = 128;
  const g = tc.getContext("2d")!;
  const rg = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  rg.addColorStop(0, "rgba(45,212,191,.9)");
  rg.addColorStop(0.35, "rgba(45,212,191,.25)");
  rg.addColorStop(1, "rgba(45,212,191,0)");
  g.fillStyle = rg;
  g.fillRect(0, 0, 128, 128);
  const halo = new Sprite(
    new SpriteMaterial({
      map: new CanvasTexture(tc),
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    }),
  );
  halo.scale.set(4.2, 4.2, 1);
  logo.add(halo);

  const detalhe = celular ? 32 : 64;
  const centro = new Mesh(
    new SphereGeometry(0.62, detalhe, detalhe),
    new MeshStandardMaterial({
      color: DESTAQUE,
      emissive: DESTAQUE,
      emissiveIntensity: 0.6,
      roughness: 0.22,
      metalness: 0.1,
    }),
  );
  logo.add(centro);

  // os 6 pontos do logo (o hexágono aponta para cima, igual ao SVG)
  const R = 1.62;
  const matPonto = new MeshStandardMaterial({ color: 0xedf6f4, roughness: 0.28, metalness: 0.4 });
  const geoPonto = new SphereGeometry(0.47, detalhe * 0.75, detalhe * 0.75);
  const pontos: Mesh[] = [];
  for (let i = 0; i < 6; i++) {
    const a = PI / 2 + (i * PI) / 3;
    const m = new Mesh(geoPonto, matPonto);
    m.userData.base = new Vector3(Math.cos(a) * R, Math.sin(a) * R, 0);
    m.position.copy(m.userData.base);
    logo.add(m);
    pontos.push(m);
  }

  // ligações: centro até cada ponto + contorno do hexágono
  const geoRaios = new BufferGeometry();
  geoRaios.setAttribute("position", new BufferAttribute(new Float32Array(12 * 3), 3));
  logo.add(
    new LineSegments(
      geoRaios,
      new LineBasicMaterial({ color: DESTAQUE, transparent: true, opacity: 0.4 }),
    ),
  );
  const geoAro = new BufferGeometry();
  geoAro.setAttribute("position", new BufferAttribute(new Float32Array(7 * 3), 3));
  logo.add(
    new Line(geoAro, new LineBasicMaterial({ color: DESTAQUE, transparent: true, opacity: 0.22 })),
  );

  // anéis em órbita com satélites
  const orbitas: { grupo: Group; sat: Mesh; raio: number; vel: number }[] = [];
  (
    [
      [2.7, 1.25, 0.2],
      [3.15, -0.9, -0.5],
    ] as const
  ).forEach(([raio, rx, ry], k) => {
    const grupo = new Group();
    grupo.rotation.set(rx, ry, 0);
    grupo.add(
      new Mesh(
        new TorusGeometry(raio, 0.009, 8, 200),
        new MeshBasicMaterial({ color: DESTAQUE, transparent: true, opacity: k ? 0.28 : 0.5 }),
      ),
    );
    const sat = new Mesh(
      new SphereGeometry(k ? 0.07 : 0.1, 20, 20),
      new MeshBasicMaterial({ color: k ? 0xffffff : DESTAQUE }),
    );
    grupo.add(sat);
    logo.add(grupo);
    orbitas.push({ grupo, sat, raio, vel: k ? -0.35 : 0.5 });
  });

  // poeira de partículas ao fundo (menos no celular)
  const N = celular ? 350 : 700;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const r = 3.6 + Math.random() * 5;
    const t = Math.random() * PI * 2;
    const f = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(f) * Math.cos(t);
    pos[i * 3 + 1] = r * Math.sin(f) * Math.sin(t);
    pos[i * 3 + 2] = r * Math.cos(f) - 2;
  }
  const geoPoeira = new BufferGeometry();
  geoPoeira.setAttribute("position", new BufferAttribute(pos, 3));
  const poeira = new Points(
    geoPoeira,
    new PointsMaterial({
      color: DESTAQUE,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    }),
  );
  cena.add(poeira);

  function atualizaLinhas() {
    const a = geoRaios.attributes.position.array as Float32Array;
    const b = geoAro.attributes.position.array as Float32Array;
    pontos.forEach((p, i) => {
      a.set([0, 0, 0, p.position.x, p.position.y, p.position.z], i * 6);
      b.set([p.position.x, p.position.y, p.position.z], i * 3);
    });
    b.set([pontos[0].position.x, pontos[0].position.y, pontos[0].position.z], 18);
    geoRaios.attributes.position.needsUpdate = true;
    geoAro.attributes.position.needsUpdate = true;
  }

  function ajusta() {
    const w = caixa.clientWidth;
    const h = caixa.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(ajusta).observe(caixa);
  ajusta();

  // mouse inclina; arrastar gira com inércia
  let mx = 0;
  let my = 0;
  let giro = 0;
  let vel = 0;
  let arrastando = false;
  let ultX = 0;
  addEventListener("pointermove", (e) => {
    mx = (e.clientX / innerWidth) * 2 - 1;
    my = (e.clientY / innerHeight) * 2 - 1;
    if (!arrastando) return;
    vel = (e.clientX - ultX) * 0.006;
    ultX = e.clientX;
    giro += vel;
  });
  caixa.addEventListener("pointerdown", (e) => {
    arrastando = true;
    ultX = e.clientX;
    vel = 0;
  });
  const solta = () => (arrastando = false);
  addEventListener("pointerup", solta);
  addEventListener("pointercancel", solta);

  // pausa fora da tela e com a aba em segundo plano
  let visivel = true;
  let rodando = false;
  const t0 = performance.now();
  new IntersectionObserver(([e]) => {
    visivel = e.isIntersecting;
    inicia();
  }).observe(caixa);
  document.addEventListener("visibilitychange", inicia);

  function quadro(agora: number) {
    const t = ((agora - t0) / 1000) * ritmo;
    const entrada = Math.min(1, t / 1.4);
    logo.scale.setScalar(0.7 + 0.3 * (1 - Math.pow(1 - entrada, 3)));
    if (!arrastando) {
      vel *= 0.95;
      giro += vel;
    }
    logo.rotation.y += (Math.sin(t * 0.35) * 0.5 + mx * 0.45 + giro - logo.rotation.y) * 0.06;
    logo.rotation.x += (my * 0.3 + Math.sin(t * 0.25) * 0.12 - logo.rotation.x) * 0.06;
    pontos.forEach((p, i) => {
      p.position.z = p.userData.base.z + Math.sin(t * 1.3 + i * 1.05) * 0.22;
    });
    centro.scale.setScalar(1 + Math.sin(t * 2.2) * 0.04);
    halo.material.opacity = 0.75 + Math.sin(t * 2.2) * 0.2;
    for (const o of orbitas) {
      const a = t * o.vel;
      o.sat.position.set(Math.cos(a) * o.raio, Math.sin(a) * o.raio, 0);
      o.grupo.rotation.z = t * 0.05;
    }
    poeira.rotation.y = t * 0.03;
    poeira.rotation.x = Math.sin(t * 0.1) * 0.1;
    atualizaLinhas();
    renderer.render(cena, camera);
  }

  function loop(agora: number) {
    if (!visivel || document.hidden) {
      rodando = false;
      return;
    }
    quadro(agora);
    requestAnimationFrame(loop);
  }

  function inicia() {
    if (rodando || !visivel || document.hidden) return;
    rodando = true;
    requestAnimationFrame(loop);
  }

  inicia();
}
