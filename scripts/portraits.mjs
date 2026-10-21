// Usage: npm run portraits [folder]   (default: portraits-src/, git-ignored)
// Takes every image in the folder (png/jpg/webp/heic), centre-crops it to 4:5,
// resizes to 800×1000 and writes public/portraits/<name>.jpg. Name the files
// after the entries in site.config.ts (viking.png → /portraits/viking.jpg).
// Uses macOS's built-in `sips`, so there is nothing to install.
import { readdirSync, mkdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, parse, resolve } from "node:path";

const dir = process.argv[2] ?? "portraits-src";
if (!existsSync(dir)) {
  console.error(`No folder at ${resolve(dir)}.`);
  console.error("Put your generated images in portraits-src/ (or pass a folder) and run again.");
  process.exit(1);
}
const out = resolve("public/portraits");
mkdirSync(out, { recursive: true });

const size = (file) => {
  const info = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", file]).toString();
  return [Number(info.match(/pixelWidth: (\d+)/)[1]), Number(info.match(/pixelHeight: (\d+)/)[1])];
};

const images = readdirSync(dir).filter((n) => /\.(png|jpe?g|webp|heic)$/i.test(n));
if (!images.length) console.log(`No images in ${resolve(dir)} yet.`);

for (const name of images) {
  const src = join(dir, name);
  const dest = join(out, `${parse(name).name.toLowerCase()}.jpg`);
  const [w, h] = size(src);
  // Largest 4:5 box that fits, centred (sips -c crops around the centre).
  const cw = Math.min(w, Math.round((h * 4) / 5));
  const ch = Math.round((cw * 5) / 4);
  execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "82", "-c", String(ch), String(cw), src, "--out", dest], { stdio: "ignore" });
  execFileSync("sips", ["-z", "1000", "800", dest], { stdio: "ignore" });
  console.log(`✓ ${name} → public/portraits/${parse(dest).base}`);
}
