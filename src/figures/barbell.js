/**
 * Barbell: a loaded bar on a lifting platform. The pointer's height sets the
 * load, from the empty 20 kg bar up; the plates that no longer fit slide off
 * the sleeves, outermost first, and the new ones slide on from the collar
 * outwards. The outermost plate on the near sleeve takes the bright edge.
 * The slider is the heaviest load the pointer reaches, in kg.
 *
 * Plates are cylinders lying along x: Q turns a ring in y–z into one, and
 * front2 says which part of its rim faces the camera.
 */
const {
  Cam, circ, clamp, fit, poly, prism, proj, ringAt, rings, facing,
  tdone, tset, tval, tween, disposer, mk, pointer, put, register, solid,
} = HL;

const AX = 22, SL0 = 63, SL1 = 100, SLIDE = 16, STEP = 60, REST = 80, SLOTS = 5;
const KINDS = { 25: [22, 7], 20: [22, 6], 15: [22, 5], 10: [22, 4], 5: [11, 3], 2.5: [8.5, 2.5] };   // kg: [radius, thickness]
const ORDER = [25, 20, 15, 10, 5, 2.5];

/** The plates for one side, heaviest inside. */
function plates(kg) {
  let side = Math.max(0, (kg - 20) / 2);
  const out = [];
  for (const k of ORDER) while (side >= k - 1e-6 && out.length < SLOTS) { out.push(k); side -= k; }
  return out;
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let max = value;

  const C = Cam(45, 0.5, 1.42);
  fit(C, [[-118, -40, -4], [118, 40, -4], [-118, 40, 0], [118, -40, 0], [-SL1 - SLIDE, 0, 2 * AX], [SL1 + SLIDE, 0, 2 * AX]], 200, 166);
  const P = proj(C), front = facing(C);
  const Q = (u, v, w) => P(w, u, AX + v);
  const front2 = (q) => 0.61 * q.nu + 0.5 * q.nv > 0;
  const g = mk("g", {}, svg);

  // the platform: rubber either side, a strip of wood down the middle where the lifter stands
  const [pr, pi] = rings(-118, -40, 118, 40, 8, 2);
  put(solid(g), prism(P, front, pr, pi, -4, 0));
  mk("path", { d: poly(ringAt(P, [[-36, -40], [36, -40], [36, 40], [-36, 40]].map(([u, v]) => ({ u, v })), 0)), class: "nf lo" }, g);

  /** A cylinder along x from x0 to x1, radius r, with an optional hole and hub drawn on its near face. */
  const cyl = (s, r, x0, x1) => { const [ring, inner] = [circ(r, r > 6 ? 48 : 16), circ(Math.max(0.6, r - 0.9), r > 6 ? 48 : 16)]; put(s, prism(Q, front2, ring, inner, x0, x1)); };
  const face = (el, r, x) => el.setAttribute("d", poly(ringAt(Q, circ(r, 20), x)));

  // back to front along x: the far sleeve, the far plates, collar, shaft, collar, the near plates, the near sleeve
  const farSleeve = solid(g);
  const sides = [-1, 1].map((sg) => {
    const grp = mk("g", {}, g);
    const slots = [];
    for (let k = 0; k < SLOTS; k++) {
      const pg = mk("g", {}, grp), s = solid(pg);
      slots.push({ k, s, hub: mk("path", { class: "nf lo" }, pg), hole: mk("path", { class: "nf" }, pg), type: null, next: null, t: tween(0), drawn: null });
    }
    return { sg, grp, slots };
  });
  const collarL = solid(g), shaft = solid(g), collarR = solid(g);
  // the far side's plates stack outwards towards -x, so they paint outermost first
  g.insertBefore(sides[0].grp, collarL.g);
  sides[0].slots.slice().reverse().forEach((sl) => sides[0].grp.appendChild(sl.s.g.parentNode));
  g.appendChild(sides[1].grp);
  const nearSleeve = solid(g);

  cyl(collarL, 4, -SL0, -SL0 + 3);
  cyl(shaft, 1.5, -SL0 + 3, SL0 - 3);
  cyl(collarR, 4, SL0 - 3, SL0);
  cyl(farSleeve, 2.6, -SL1, -SL0);

  /** Where each slot sits: its inner face, from the collar out, by the plates inside it. */
  function layout(side) {
    let at = SL0;
    return side.slots.map((sl) => { const x = at; if (sl.type) at += KINDS[sl.type][1]; return x; });
  }

  let lit = null;
  function drawSide(side, now) {
    const xs = layout(side);
    let moving = false, outer = SL0;
    side.slots.forEach((sl, i) => {
      const want = sl.next;
      if (sl.type === want) tset(sl.t, want ? 1 : 0, now, 0);
      else if (tval(sl.t, now) <= 0.001 && tdone(sl.t, now)) {
        sl.type = want;
        if (want) tset(sl.t, 1, now, i * STEP);
      } else tset(sl.t, 0, now, (SLOTS - 1 - i) * (STEP / 2));
      const v = tval(sl.t, now);
      if (!tdone(sl.t, now) || sl.type !== sl.next) moving = true;
      const key = sl.type + ":" + v.toFixed(4) + ":" + xs[i];
      if (key === sl.drawn) { if (sl.type && v > 0.5) outer = Math.max(outer, xs[i] + KINDS[sl.type][1]); return; }
      sl.drawn = key;
      if (!sl.type || v <= 0.001) { sl.s.sil.setAttribute("d", ""); sl.s.cr.setAttribute("d", ""); sl.hub.setAttribute("d", ""); sl.hole.setAttribute("d", ""); return; }
      const [r, t] = KINDS[sl.type], off = (1 - v) * SLIDE, x0 = xs[i] + off, x1 = x0 + t;
      const a = side.sg > 0 ? x0 : -x1, b = side.sg > 0 ? x1 : -x0;
      cyl(sl.s, r, a, b);
      face(sl.hub, r > 10 ? 7 : r - 3, b);
      face(sl.hole, 2.8, b);
      if (v > 0.5) outer = Math.max(outer, xs[i] + t);
    });
    return { moving, outer };
  }

  const B = register(stage, (_dt, now) => {
    const far = drawSide(sides[0], now), near = drawSide(sides[1], now);
    cyl(nearSleeve, 2.6, near.outer, SL1);
    // the bright edge: the outermost plate on the near sleeve
    const on = sides[1].slots.filter((sl) => sl.type && tval(sl.t, now) > 0.5).pop() || null;
    if (on !== lit) { lit?.s.sil.classList.remove("hi"); on?.s.sil.classList.add("hi"); lit = on; }
    return far.moving || near.moving;
  });
  bag.add(B.unregister);

  let kg = -1;
  function load(w) {
    if (w === kg) return;
    kg = w;
    const list = plates(w);
    for (const side of sides) side.slots.forEach((sl, i) => { sl.next = list[i] ?? null; });
    B.wake();
  }

  // the pointer's height sets the load, read on the screen, which never moves
  const top = P(0, 0, 2 * AX + 30)[1], bottom = P(0, 0, -20)[1];
  function move([x, y]) {
    if (x < 20 || x > 380) return;
    const f = clamp((bottom - y) / (bottom - top), 0, 1), w = 20 + Math.round((f * (max - 20)) / 5) * 5;
    load(w);
    read.textContent = "kg " + w;
  }

  load(REST);
  bag.add(pointer(stage, { move, leave: () => { load(REST); read.textContent = "rest"; } }));
  bag.add(() => svg.replaceChildren());

  return { set: (v) => { max = v; }, destroy: bag.dispose };
}

hairline({
  name: "barbell",
  means: "A loaded barbell: the pointer's height sets the load, and plates slide off and on the sleeves to make it.",
  rules: [2, 3, 5, 8],
  range: [100, 140, 180],
  tour: [[200, 150], [200, 75], [200, 215], null],
  mount,
});
