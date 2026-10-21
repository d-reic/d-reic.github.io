/**
 * Harp: a concert harp, column, neck and soundbox, with sixteen strings, its
 * C strings a shade darker as on a real one. The string under the pointer
 * is drawn out, as a finger would; leaving it lets it go, and it rings and
 * dies away, setting its neighbours ringing after it, the farther the later
 * and the softer. Strings brushed past on the way are plucked too. The
 * slider is the reach of that sympathy.
 *
 * The harp stands in the x–z plane. Its parts are slabs: a rounded outline
 * pushed out along y, drawn as a silhouette and the one crease on its face.
 */
const {
  Cam, clamp, fillet, fit, hull, lerp, open, poly, prism, proj, rings, facing,
  spring, stepS, disposer, mk, pointer, put, register, solid,
} = HL;

const N = 16, NOTES = "CDEFGAB", HOME = 7, STEP = 40, KICK = 9, PULL = 6;
const A = [14, 16], B = [94, 124];                         // the soundbox's axis, from its foot to its shoulder
const NECK = [[-5, 166], [50, 156], [103, 139], [106, 133], [99, 127], [80, 130], [45, 139], [5, 152], [-5, 155]];
const COLUMN = [[-8, 9], [5, 9], [5, 160], [-8, 160]];

const dir = [B[0] - A[0], B[1] - A[1]], len = Math.hypot(...dir), d = [dir[0] / len, dir[1] / len], nu = [-d[1], d[0]];
const at = (p, k) => [p[0] + nu[0] * k, p[1] + nu[1] * k];
const BOX = [at(A, 9), at(B, 5), at(B, -7), at(A, -12)];
const U0 = at(A, 9), U1 = at(B, 5);                         // the soundboard, where the strings end
const zb = (x) => U0[1] + ((x - U0[0]) * (U1[1] - U0[1])) / (U1[0] - U0[0]);
function zt(x) {                                            // the underside of the neck, where the strings start
  const e = NECK.slice(4, 8).reverse();
  for (let i = 0; i < e.length - 1; i++) if (x <= e[i + 1][0]) return lerp(e[i][1], e[i + 1][1], (x - e[i][0]) / (e[i + 1][0] - e[i][0]));
  return e[e.length - 1][1];
}
const XS = Array.from({ length: N }, (_, i) => 18 + i * 4.3);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let reach = value;

  const C = Cam(45, 0.5, 1.48);
  fit(C, [[-14, -14, 0], [30, 14, 0], [-8, 5, 166], [106, 4, 133], [106, -4, 139], [48, PULL, 106], [B[0], 10, B[1]]], 200, 166);
  const P = proj(C), front = facing(C);
  const faces = (nx, nz) => 0.61 * nx + 0.5 * nz > 0;

  /** A slab: the convex outline pts in x–z, rounded, pushed out from y0 to y1. */
  function slab(g, pts, r, y0, y1) {
    const o = fillet(pts, pts.map(() => r));
    let area = 0;
    o.forEach((p, i) => { const q = o[(i + 1) % o.length]; area += p[0] * q[1] - q[0] * p[1]; });
    const s = Math.sign(area), n = o.length;
    const keep = o.map((p, i) => { const q = o[(i + 1) % n]; return faces(s * (q[1] - p[1]), -s * (q[0] - p[0])); });
    let st = keep.findIndex((k, i) => k && !keep[(i + n - 1) % n]);
    const run = [];
    if (st >= 0) for (let k = 0; k <= n && keep[(st + k) % n]; k++) run.push(o[(st + k) % n], o[(st + k + 1) % n]);
    const f = o.map(([x, z]) => P(x, y1, z)), b = o.map(([x, z]) => P(x, y0, z));
    put(solid(g), { sil: poly(hull(f.concat(b))), crease: open(run.map(([x, z]) => P(x, y1, z))) });
  }

  const g = mk("g", {}, svg);
  const [br, bi] = rings(-14, -14, 30, 14, 5, 1.4);
  put(solid(g), prism(P, front, br, bi, 0, 9));

  const strings = XS.map((x, i) => ({
    x, i, top: zt(x), bot: zb(x), note: NOTES[i % 7] + (3 + Math.floor(i / 7)),
    el: mk("path", { class: "nf" + (i % 7 === 0 ? " sil" : "") }, g),
    sp: spring(0, { k: 900, c: 5 }),   // a plucked string rings: far less damping than the default, on purpose
    due: [], drawn: null,
  }));
  slab(g, BOX, 4, -10, 10);
  slab(g, COLUMN, 4, -5, 5);
  slab(g, NECK, 3, -4, 4);

  function draw(s) {
    const a = s.sp.x, pts = [];
    for (let k = 0; k <= 8; k++) { const t = k / 8; pts.push(P(s.x, a * Math.sin(Math.PI * t), lerp(s.top, s.bot, t))); }
    s.el.setAttribute("d", open(pts));
  }
  strings.forEach(draw);

  const B2 = register(stage, (dt, now) => {
    let moving = false;
    for (const s of strings) {
      while (s.due.length && s.due[0][0] <= now) { s.sp.v += s.due.shift()[1]; }
      if (s.due.length) moving = true;
      if (stepS(s.sp, dt)) moving = true;
      if (s.sp.x !== s.drawn) { draw(s); s.drawn = s.sp.x; }
    }
    return moving;
  });
  bag.add(B2.unregister);

  // the strings' plane at rest, which never moves: x picks the string, z checks the pointer is between neck and soundbox
  const o = P(0, 0, 0), X = P(1, 0, 0), Z = P(0, 0, 1);
  const ex = [X[0] - o[0], X[1] - o[1]], ez = [Z[0] - o[0], Z[1] - o[1]], det = ex[0] * ez[1] - ex[1] * ez[0];
  function hit([sx, sy]) {
    const qx = sx - o[0], qy = sy - o[1];
    const x = (qx * ez[1] - qy * ez[0]) / det, z = (ex[0] * qy - ex[1] * qx) / det;
    const i = Math.round((x - XS[0]) / 4.3);
    if (i < 0 || i >= N || Math.abs(x - XS[i]) > 3 || z < zb(x) - 2 || z > zt(x) + 2) return -1;
    return i;
  }

  let last = -1, bright = HOME;
  /** Sets string i ringing and its neighbours after it; a string let go already rings from its pull. */
  function pluck(i, now, released) {
    const span = Math.ceil(reach);
    for (let j = Math.max(0, i - span); j <= Math.min(N - 1, i + span); j++) {
      const dd = Math.abs(j - i), w = dd === 0 ? (released ? 0 : 1) : clamp(1 - dd / (reach + 1), 0, 1) * 0.6;
      if (w > 0) strings[j].due.push([now + dd * STEP, KICK * 10 * w]);
    }
    for (const s of strings) s.due.sort((a, b) => a[0] - b[0]);
  }
  function light(i) {
    strings[bright].el.classList.remove("hi");
    bright = i;
    strings[i].el.classList.add("hi");
  }
  // held: drawn out on a firm spring; let go: back on the ringing one
  const hold = (i) => { const sp = strings[i].sp; sp.t = PULL; sp.c = 50; };
  function release(i, now) {
    const sp = strings[i].sp;
    sp.t = 0; sp.c = 5;
    pluck(i, now, true);
  }
  function move(p) {
    const i = hit(p);
    if (i === last) return;
    const now = performance.now();
    if (last >= 0) release(last, now);
    if (i >= 0 && last >= 0) for (let j = last + Math.sign(i - last); j !== i; j += Math.sign(i - last)) pluck(j, now + Math.abs(j - last) * 18);
    last = i;
    if (i >= 0) { hold(i); light(i); read.textContent = strings[i].note; }
    B2.wake();
  }
  function leave() {
    if (last >= 0) release(last, performance.now());
    last = -1;
    light(HOME);
    read.textContent = "rest";
    B2.wake();
  }

  light(HOME);
  bag.add(pointer(stage, { move, leave }));
  bag.add(() => svg.replaceChildren());

  return { set: (v) => { reach = v; }, destroy: bag.dispose };
}

hairline({
  name: "harp",
  means: "A concert harp: the strings the pointer brushes are plucked, ring and die away, and their neighbours ring after them.",
  rules: [1, 2, 3, 8],
  range: [0, 2, 4],
  tour: [[160, 150], [205, 165], [245, 170], null],
  mount,
});
