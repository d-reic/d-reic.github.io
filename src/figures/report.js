/**
 * Report: a radiology report on a clipboard, its words as tiles. The tagged
 * entities, a finding, a location, a size, stand proud of the page. The
 * pointer reads a line: its entities lift, staggered out from the pointer,
 * the rest settle into the page, and the one nearest takes the bright edge.
 * The slider is the lift.
 */
const {
  Cam, clamp, fit, poly, prism, proj, ringAt, rings, rrect, unproj, facing,
  tdone, tset, tval, tween, disposer, mk, pointer, put, register, solid,
} = HL;

const W = 118, H = 150, G = 3, TD = 5.5, R0 = 24, RS = 18, X0 = 10, REST = 4, STEP = 45, HOME = [1, 1];
// each line: word widths, and which words are entities
const LINES = [
  { w: [28, 12, 18], e: {} },
  { w: [12, 20, 9, 24, 16], e: { 1: "finding", 3: "location" } },
  { w: [17, 9, 21, 13, 20], e: { 2: "size" } },
  { w: [11, 15, 26, 10, 18], e: { 2: "finding", 4: "size" } },
  { w: [21, 13, 10, 24, 12], e: { 0: "negation", 3: "finding" } },
  { w: [15, 19, 13, 17], e: { 1: "location" } },
  { w: [30, 10, 26], e: { 2: "impression" } },
];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let lift = value;

  const C = Cam(45, 0.5, 1.68);
  fit(C, [[-8, -14, 0], [W + 8, H + 8, 0], [W + 8, -14, 0], [-8, H + 8, 0], [W / 2, -8, 12], [X0, R0 + RS, 26]], 200, 166);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);

  // the board, the sheet on it, and the clip at the head of the page
  const [br, bi] = rings(-8, -14, W + 8, H + 8, 7, 1.6);
  put(solid(g), prism(P, front, br, bi, -4, 0));
  const [sr, si] = rings(0, -4, W, H, 2, 0.8);
  put(solid(g), prism(P, front, sr, si, 0, 0.8));
  const [cr, ci] = rings(W / 2 - 18, -12, W / 2 + 18, 4, 4, 1.2);
  put(solid(g), prism(P, front, cr, ci, 0.8, 6));
  const [lr, li] = rings(W / 2 - 11, -9, W / 2 + 11, 0, 3, 1);
  put(solid(g), prism(P, front, lr, li, 6, 9));

  // words: plain ones printed flat on the page, entities as tiles that stand
  const ents = [];
  LINES.forEach((ln, r) => {
    const y0 = R0 + r * RS;
    let x = X0;
    const flat = [];
    ln.w.forEach((w, k) => {
      if (ln.e[k]) ents.push({ r, k, x0: x, x1: x + w, y0, kind: ln.e[k] });
      else flat.push(poly(ringAt(P, rrect(x, y0, x + w, y0 + TD, 1.6, 3), 0.8)));
      x += w + G;
    });
    mk("path", { d: flat.join(""), class: "nf lo" }, g);
  });
  for (const e of ents) {
    [e.ring, e.inner] = rings(e.x0, e.y0, e.x1, e.y0 + TD, 1.8, 0.7);
    e.s = solid(g);
    e.z = tween(REST);
    e.drawn = null;
    e.i = ents.filter((o) => o.r === e.r).indexOf(e);
  }
  const row = (r) => ents.filter((e) => e.r === r);

  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const e of ents) {
      const z = tval(e.z, now);
      if (z !== e.drawn) { put(e.s, prism(P, front, e.ring, e.inner, 0.8, 0.8 + z)); e.drawn = z; }
      if (!tdone(e.z, now)) moving = true;
    }
    return moving;
  });
  bag.add(B.unregister);

  // the page never moves: read the pointer on it, at the height of a resting tile
  function hit([sx, sy]) {
    const [x, y] = unproj(C, sx, sy, 0.8 + REST);
    if (x < -4 || x > W + 4 || y < R0 - RS / 2 || y > H) return null;
    const r = clamp(Math.round((y - R0 - TD / 2) / RS), 0, LINES.length - 1), on = row(r);
    if (!on.length) return null;
    let best = on[0];
    for (const e of on) if (Math.abs(x - (e.x0 + e.x1) / 2) < Math.abs(x - (best.x0 + best.x1) / 2)) best = e;
    return [r, best.i];
  }

  let act = null;
  function setActive(a, force) {
    if (!force && (a ? a.join() : "") === (act ? act.join() : "")) return;
    const now = performance.now(), [hr, hi] = a || act || HOME;
    act = a;
    for (const e of ents) {
      const on = a && e.r === a[0];
      tset(e.z, on ? lift : a ? 0.5 : REST, now, e.r === hr ? Math.abs(e.i - hi) * STEP : STEP);
      const [br2, bi2] = a || HOME;
      e.s.sil.classList.toggle("hi", e.r === br2 && e.i === bi2);
    }
    read.textContent = a ? `line ${a[0]} · ${row(a[0])[a[1]].kind}` : "rest";
    B.wake();
  }

  setActive(null, true);
  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(null) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { lift = v; if (act) setActive(act, true); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "report",
  means: "A radiology report with its entities tagged: the line under the pointer lifts its findings, sizes and locations off the page.",
  rules: [1, 2, 4, 5],
  range: [9, 16, 23],
  tour: [[175, 125], [215, 165], [195, 205], null],
  mount,
});
