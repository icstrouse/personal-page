import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  excerpt: string;
  tags: string[];
  draft: boolean;
};

export type Post = PostMeta & {
  html: string;
  readingMinutes: number;
};

function readPostFile(slug: string) {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  return matter(raw);
}

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    date: typeof data.date === "string" ? data.date : "",
    excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: data.draft === true,
  };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

/** Newest first. Drafts are hidden unless running the dev server. */
export function getAllPosts(): PostMeta[] {
  const showDrafts = process.env.NODE_ENV === "development";
  return getPostSlugs()
    .map((slug) => {
      const file = readPostFile(slug);
      return file ? toMeta(slug, file.data) : null;
    })
    .filter((post): post is PostMeta => post !== null)
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | null> {
  const file = readPostFile(slug);
  if (!file) return null;

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(file.content);

  const words = file.content.trim().split(/\s+/).length;

  return {
    ...toMeta(slug, file.data),
    html: String(processed),
    readingMinutes: Math.max(1, Math.round(words / 220)),
  };
}

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
] as const;

/**
 * "18 SEP 2026" — always exactly 11 characters.
 *
 * Deliberately not Intl.DateTimeFormat: with month "short" it renders
 * September as "Sept" in current ICU versions while every other month is three
 * letters, which breaks the alignment of the monospace date column. A fixed
 * table is also immune to the host's ICU version and locale data.
 *
 * Parsed at UTC so the date never drifts by a day.
 */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const parsed = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return iso;
  const day = String(parsed.getUTCDate()).padStart(2, "0");
  return `${day} ${MONTHS[parsed.getUTCMonth()]} ${parsed.getUTCFullYear()}`;
}
