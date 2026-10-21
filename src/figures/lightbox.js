/**
 * Lightbox: a desk viewer with three films clipped to its glass, a hand, a
 * chest and a knee. The film under the pointer swings out on its clip and
 * takes the bright edge; the others settle against the glass, staggered
 * outwards from it. The slider is how far the film swings out, in degrees.
 *
 * The panel stands upright, so it is built in the x–z plane and pushed out
 * along y: Q swaps the axes for prism, and front2 says which of its edges
 * face the camera.
 */
const {
  Cam, fillet, fit, open, poly, prism, proj, rad, rings, rrect, ringAt,
  tdone, tset, tval, tween, disposer, mk, pointer, put, register, solid,
} = HL;

const PX0 = 0, PX1 = 186, PZ0 = 10, PZ1 = 100, PD = 9;
const FW = 50, FH = 58, FT = 88, FX = [10, 68, 126], YF = PD + 0.6, TK = 1.2;
const REST = [5, 12, 2], HOME = 1, STEP = 45, NAMES = ["hand", "chest", "knee"];
const FEET = [[18, 42], [144, 168]], FY0 = -16, FY1 = 24;

/** Each film's x-ray, as polylines in a 52 × 66 sheet (u across, v down from the clip). */
const BONES = [
  // a hand, fingers up: radius and ulna, the carpals, four rays and a thumb, each bone with its joint gap
  (() => {
    const L = [[[20, 66], [21, 54]], [[30, 66], [29, 55]], [[18, 52], [17, 47], [33, 47], [32, 52], [18, 52]]];
    const tips = [[11, 15], [21, 9], [30, 10], [38, 17]];
    tips.forEach(([tu, tv], k) => {
      const b = [19 + 4.5 * k, 46], n = [15 + 7.5 * k, 33];
      L.push([b, n]);
      for (let s = 0; s < 3; s++) {
        const a = s / 3, c = (s + 1) / 3, g = 0.08;
        L.push([[n[0] + (tu - n[0]) * (a + g), n[1] + (tv - n[1]) * (a + g)], [n[0] + (tu - n[0]) * c, n[1] + (tv - n[1]) * c]]);
      }
    });
    L.push([[17, 47], [10, 39]], [[9, 37], [5, 29]]);
    return L;
  })(),
  // a chest: the spine in vertebrae, the clavicles, five pairs of ribs
  (() => {
    const L = [];
    for (let j = 0; j < 10; j++) L.push([[26, 7 + j * 5.4], [26, 10.6 + j * 5.4]]);
    L.push([[23, 11], [14, 8], [6, 11]], [[29, 11], [38, 8], [46, 11]]);
    for (let j = 0; j < 5; j++) {
      const v = 15 + j * 7.5, w = 15 + j * 1.2, rib = [];
      for (let s = 0; s <= 6; s++) {
        const t = s / 6, a = Math.PI * t;
        rib.push([24 - w * Math.sin(a * 0.75), v + 9 * t + 2 * Math.sin(a)]);
      }
      L.push(rib, rib.map(([u, vv]) => [52 - u, vv]));
    }
    return L;
  })(),
  // a knee, front on: the femur flaring into its condyles, the joint space, the tibia and the fibula
  [
    [[20, 2], [20, 20], [15, 27], [17, 31], [26, 30], [35, 31], [37, 27], [32, 20], [32, 2]],
    [[21, 64], [21, 42], [15, 38], [16, 35], [36, 35], [37, 38], [31, 42], [31, 64]],
    [[36, 41], [39, 40], [39, 64]],
  ],
];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let swing = value;

  const C = Cam(45, 0.5, 1.62);
  const far = (th) => [YF + FH * Math.sin(rad(th)), FT - FH * Math.cos(rad(th))];
  const [fy, fz] = far(40);
  fit(C, [[PX0, FY0, 0], [PX1, FY1, 0], [PX0, 0, PZ1], [PX1, PD, PZ1], [FX[0], fy, fz], [PX1, FY1, 0]], 200, 166);
  const P = proj(C), Q = (u, v, w) => P(u, w, v);
  // the camera sits on the +x, +y side, looking down: the panel's right end and its top face it
  const front2 = (q) => 0.61 * q.nu + 0.5 * q.nv > 0;
  const front = (q) => q.nu + q.nv > 0;

  const g = mk("g", {}, svg);

  for (const [x0, x1] of FEET) {
    const [ring, inner] = rings(x0, FY0, x1, FY1, 6, 1.4);
    put(solid(g), prism(P, front, ring, inner, 0, PZ0));
  }

  const [pr, pi] = rings(PX0, PZ0, PX1, PZ1, 7, 1.6);
  put(solid(g), prism(Q, front2, pr, pi, 0, PD));
  mk("path", { d: poly(ringAt(Q, rrect(PX0 + 6, PZ0 + 6, PX1 - 6, PZ1 - 6, 4, 6), PD)), class: "nf lo" }, g);

  const outline = fillet([[0, 0], [FW, 0], [FW, FH], [0, FH]], [2.5, 2.5, 2.5, 2.5]);
  const films = FX.map((x0, i) => {
    const grp = mk("g", {}, g);
    const back = mk("path", { class: "lo" }, grp), face = mk("path", { class: "sil" }, grp);
    const bones = mk("path", { class: "nf lo" }, grp);
    return { x0, back, face, bones, a: tween(REST[i]), drawn: null, lines: BONES[i] };
  });

  for (const x0 of FX) {
    const cx = x0 + FW / 2, [ring, inner] = rings(cx - 7, FT - 3, cx + 7, FT + 6, 2, 0.8);
    put(solid(g), prism(Q, front2, ring, inner, PD, PD + 3.5));
  }

  /** Film i hanging th degrees out from the glass, swung about its top edge. */
  function draw(f, th) {
    const s = Math.sin(rad(th)), c = Math.cos(rad(th));
    const w = (u, v) => P(f.x0 + u, YF + v * s, FT - v * c);
    const wb = (u, v) => P(f.x0 + u, YF + v * s - TK * c, FT - v * c - TK * s);
    const ku = FW / 52, kv = FH / 66;
    f.back.setAttribute("d", poly(outline.map(([u, v]) => wb(u, v))));
    f.face.setAttribute("d", poly(outline.map(([u, v]) => w(u, v))));
    f.bones.setAttribute("d", f.lines.map((l) => open(l.map(([u, v]) => w(u * ku, v * kv)))).join(""));
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const f of films) {
      const th = tval(f.a, now);
      if (th !== f.drawn) { draw(f, th); f.drawn = th; }
      if (!tdone(f.a, now)) moving = true;
    }
    return moving;
  });
  bag.add(B.unregister);

  // hit test on the glass's plane at rest: the films only swing in y and z, so x along the glass never moves
  const o = P(0, YF, 0), X = P(1, YF, 0), Z = P(0, YF, 1);
  const ex = [X[0] - o[0], X[1] - o[1]], ez = [Z[0] - o[0], Z[1] - o[1]], det = ex[0] * ez[1] - ex[1] * ez[0];
  function hit([sx, sy]) {
    const qx = sx - o[0], qy = sy - o[1];
    const x = (qx * ez[1] - qy * ez[0]) / det, z = (ex[0] * qy - ex[1] * qx) / det;
    if (x < PX0 - 4 || x > PX1 + 4 || z < PZ0 - 12 || z > PZ1 + 8) return -1;
    let best = 0;
    FX.forEach((x0, i) => { if (Math.abs(x - x0 - FW / 2) < Math.abs(x - FX[best] - FW / 2)) best = i; });
    return best;
  }

  let act = -1;
  function setActive(a, force) {
    if (a === act && !force) return;
    const now = performance.now(), from = a >= 0 ? a : act >= 0 ? act : HOME;
    act = a;
    films.forEach((f, i) => {
      tset(f.a, a < 0 ? REST[i] : i === a ? swing : 0, now, Math.abs(i - from) * STEP);
      f.face.classList.toggle("hi", i === (a < 0 ? HOME : a));
    });
    read.textContent = a < 0 ? "rest" : `film ${a + 1} · ${NAMES[a]}`;
    B.wake();
  }

  films[HOME].face.classList.add("hi");
  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { swing = v; if (act >= 0) setActive(act, true); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "lightbox",
  means: "A lightbox with three x-rays: the film under the pointer swings out on its clip to be read, the others settle flat.",
  rules: [1, 2, 5, 8],
  range: [16, 28, 40],
  tour: [[150, 150], [215, 175], [280, 200], null],
  mount,
});
