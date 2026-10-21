// Usage: npm run new "Title of the post"
import { writeFileSync, existsSync } from "node:fs";

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error('Usage: npm run new "Title of the post"');
  process.exit(1);
}
const slug = title.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
const file = `src/content/blog/${slug}.md`;
if (existsSync(file)) {
  console.error(`${file} already exists`);
  process.exit(1);
}
const figures = ["terrain", "riffle", "exploded", "phosphor", "turntable", "keyboard", "branches", "hub", "relay", "settle", "stack", "loupe", "dish", "router", "rail"];
const figure = figures[Math.floor(Math.random() * figures.length)];
const date = new Date().toISOString().slice(0, 10);
writeFileSync(
  file,
  `---
title: "${title.replace(/"/g, '\\"')}"
description: ""
date: ${date}
tags: []
figure: ${figure}
draft: true
---

`,
);
console.log(`Created ${file}`);
