// Easter egg: the Konami code (↑ ↑ ↓ ↓ ← → ← → B A) sets off confetti.
// A small canvas animation, no library. Under prefers-reduced-motion only the
// note appears.
const CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const COLORS = ["#1f3f7a", "#2a5299", "#5d8ad8", "#8ab0f0", "#d9a441", "#1d1c1a"];

let pos = 0;
addEventListener("keydown", (e) => {
  const t = e.target as HTMLElement;
  if (t.isContentEditable || /^(input|textarea|select)$/i.test(t.tagName)) return;
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  pos = key === CODE[pos] ? pos + 1 : key === CODE[0] ? 1 : 0;
  if (pos === CODE.length) {
    pos = 0;
    celebrate();
  }
});

function note() {
  const el = document.createElement("div");
  el.className = "egg-note";
  el.textContent = "Servus! 🎉 You found the easter egg.";
  document.body.append(el);
  setTimeout(() => el.remove(), 3200);
}

function celebrate() {
  note();
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.className = "egg-confetti";
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const W = innerWidth, H = innerHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  document.body.append(canvas);
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);

  // Two bursts from the bottom corners, aimed up and inwards.
  const pieces = Array.from({ length: 180 }, (_, i) => {
    const left = i % 2 === 0;
    const angle = (left ? -60 : -120) * (Math.PI / 180) + (Math.random() - 0.5) * 0.9;
    const speed = 9 + Math.random() * 9;
    return {
      x: left ? 0 : W, y: H,
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed * 1.4,
      w: 6 + Math.random() * 6, h: 3 + Math.random() * 4,
      rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
      wobble: Math.random() * Math.PI * 2,
      color: COLORS[i % COLORS.length],
    };
  });

  const start = performance.now();
  const frame = (now: number) => {
    const t = now - start;
    ctx.clearRect(0, 0, W, H);
    for (const p of pieces) {
      p.vy += 0.32; // gravity
      p.vx *= 0.985; // air
      p.vy *= 0.985;
      p.wobble += 0.12;
      p.x += p.vx + Math.sin(p.wobble) * 0.8;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - Math.max(0, t - 3000) / 800);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(1, Math.cos(p.wobble)); // flutter
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (t < 3800) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}
