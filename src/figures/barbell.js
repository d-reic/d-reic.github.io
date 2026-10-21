/**
 * Barbell: a bar on a lifting platform, each sleeve with the same fixed stack
 * of plates, 25, 20, 15, 10 and 5 kg, heaviest inside. The pointer's height
 * sets how many are on: they slide on from the collar outwards and off from
 * the outside in, one after another. Plates never change size or place, so
 * the stack only grows and shrinks. The outermost plate on the near sleeve
 * takes the bright edge. The slider is the stagger between plates, in ms.
 *
 * Plates are cylinders lying along x: Q turns a ring in y–z into one, and
 * front2 says which part of its rim faces the camera.
 */
const {
  Cam, circ, clamp, fit, poly, prism, proj, ringAt, rings, facing,
  tdone, tset, tval, tween, disposer, mk, pointer, put, register, solid,
} = HL;

const AX = 22, SL0 = 63, SL1 = 100, SLIDE = 10, REST = 2;
const STACK = [[25, 22, 7], [20, 22, 6], [15, 22, 5], [10, 22, 4], [5, 11, 3]];   // kg, radius, thickness
const N = STACK.length;
// each plate's inner face, from the collar out: fixed, whatever is loaded
const AT = STACK.reduce((xs, [, , t], i) => (xs.push(i ? xs[i - 1] + STACK[i - 1][2] : SL0), xs), []);
const KG = (n) => 20 + 2 * STACK.slice(0, n).reduce((s, [kg]) => s + kg, 0);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let step = value;

  const C = Cam(45, 0.5, 1.42);
  fit(C, [[-118, -40, -4], [118, 40, -4], [-118, 40, 0], [118, -40, 0], [-SL1, 0, 2 * AX], [SL1, 0, 2 * AX]], 200, 166);
  const P = proj(C), front = facing(C);
  const Q = (u, v, w) => P(w, u, AX + v);
  const front2 = (q) => 0.61 * q.nu + 0.5 * q.nv > 0;
  const g = mk("g", {}, svg);

  // the platform: rubber either side, a strip of wood down the middle where the lifter stands
  const [pr, pi] = rings(-118, -40, 118, 40, 8, 2);
  put(solid(g), prism(P, front, pr, pi, -4, 0));
  mk("path", { d: poly(ringAt(P, [[-36, -40], [36, -40], [36, 40], [-36, 40]].map(([u, v]) => ({ u, v })), 0)), class: "nf lo" }, g);

  /** A cylinder along x from x0 to x1, radius r, its crease on the near (+x) face. */
  const cyl = (s, r, x0, x1) => { const n = r > 6 ? 48 : 16; put(s, prism(Q, front2, circ(r, n), circ(Math.max(0.6, r - 0.9), n), x0, x1)); };
  const disc = (el, r, x) => el.setAttribute("d", poly(ringAt(Q, circ(r, 20), x)));
  const plate = (parent) => { const pg = mk("g", {}, parent); return { s: solid(pg), hub: mk("path", { class: "nf lo" }, pg), hole: mk("path", { class: "nf" }, pg) }; };

  // painted back to front along x: far sleeve, far plates (outermost first), collar, shaft, collar, near plates, near sleeve
  cyl(solid(g), 2.6, -SL1, -SL0);
  const far = STACK.map(() => plate(g));   // far[N - 1 - i] is plate i, so the outermost paints first
  cyl(solid(g), 4, -SL0, -SL0 + 3);
  cyl(solid(g), 1.5, -SL0 + 3, SL0 - 3);
  cyl(solid(g), 4, SL0 - 3, SL0);
  const near = STACK.map(() => plate(g));
  const sleeve = solid(g);

  // one tween per plate, shared by both sleeves: 1 on, 0 off
  const on = STACK.map((_, i) => ({ t: tween(i < REST ? 1 : 0), drawn: null }));

  function drawPlate(p, i, v, sg) {
    if (v <= 0.001) { p.s.sil.setAttribute("d", ""); p.s.cr.setAttribute("d", ""); p.hub.setAttribute("d", ""); p.hole.setAttribute("d", ""); return; }
    const [, r, t] = STACK[i], x0 = AT[i] + (1 - v) * SLIDE, x1 = x0 + t;
    const a = sg > 0 ? x0 : -x1, b = sg > 0 ? x1 : -x0;
    cyl(p.s, r, a, b);
    disc(p.hub, r > 10 ? 7 : r - 3, b);
    disc(p.hole, 2.8, b);
  }

  let lit = -1;
  const B = register(stage, (_dt, now) => {
    let moving = false, outer = SL0, top = -1;
    on.forEach((o, i) => {
      const v = tval(o.t, now);
      if (!tdone(o.t, now)) moving = true;
      // the near sleeve shows from the outermost plate on it, sliding or not
      if (v > 0.001) outer = Math.max(outer, AT[i] + (1 - v) * SLIDE + STACK[i][2]);
      if (v > 0.5) top = i;
      if (v === o.drawn) return;
      o.drawn = v;
      drawPlate(far[N - 1 - i], i, v, -1);
      drawPlate(near[i], i, v, 1);
    });
    cyl(sleeve, 2.6, outer, SL1);
    if (top !== lit) { near[lit]?.s.sil.classList.remove("hi"); near[top]?.s.sil.classList.add("hi"); lit = top; }
    return moving;
  });
  bag.add(B.unregister);

  let n = -1;
  function load(k) {
    if (k === n) return;
    const now = performance.now(), adding = k > n;
    on.forEach((o, i) => tset(o.t, i < k ? 1 : 0, now, (adding ? Math.max(0, i - n) : Math.max(0, n - 1 - i)) * step));
    n = k;
    B.wake();
  }

  // the pointer's height sets how many plates are on, read on the screen, which never moves
  const hiY = P(0, 0, 2 * AX + 24)[1], loY = P(0, 0, -16)[1];
  function move([x, y]) {
    if (x < 20 || x > 380) return;
    const k = Math.round(clamp((loY - y) / (loY - hiY), 0, 1) * N);
    load(k);
    read.textContent = "kg " + KG(k);
  }

  n = REST;
  B.wake();
  bag.add(pointer(stage, { move, leave: () => { load(REST); read.textContent = "rest"; } }));
  bag.add(() => svg.replaceChildren());

  return { set: (v) => { step = v; }, destroy: bag.dispose };
}

hairline({
  name: "barbell",
  means: "A barbell: the pointer's height sets how many plates are on, and they slide on and off the sleeves one after another.",
  rules: [2, 3, 5, 8],
  range: [30, 70, 120],
  tour: [[200, 150], [200, 75], [200, 215], null],
  mount,
});
