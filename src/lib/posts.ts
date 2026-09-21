import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
};

export type Post = PostMeta & {
  content: string;
};

function toIsoDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && value.trim()) {
    return value.slice(0, 10);
  }
  throw new Error("Post frontmatter requires a date");
}

function parsePost(filename: string): Post {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(postsDirectory, filename), "utf8");
  const { data, content } = matter(raw);

  if (typeof data.title !== "string" || !data.title.trim()) {
    throw new Error(`Post "${slug}" is missing a title`);
  }

  return {
    slug,
    title: data.title.trim(),
    date: toIsoDate(data.date),
    excerpt: typeof data.excerpt === "string" ? data.excerpt.trim() : "",
    tags: Array.isArray(data.tags)
      ? data.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
    content,
  };
}

export const getAllPosts = cache((): Post[] => {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map(parsePost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
});

export const getPostBySlug = cache((slug: string): Post | null => {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
});

export function formatPostDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
