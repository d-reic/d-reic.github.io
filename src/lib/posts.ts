import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection("blog", ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function fmtDate(d: Date, short = false) {
  return d.toLocaleDateString("en-GB", short ? { month: "short", day: "numeric" } : { year: "numeric", month: "short", day: "numeric" });
}

export function readingTime(body = "") {
  const words = body.replace(/```[\s\S]*?```/g, "").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 230))} min read`;
}

export function tagCounts(posts: Post[]) {
  const m = new Map<string, number>();
  posts.forEach((p) => p.data.tags.forEach((t) => m.set(t, (m.get(t) ?? 0) + 1)));
  return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}
