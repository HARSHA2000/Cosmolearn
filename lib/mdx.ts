import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");

export interface ProgramFrontmatter {
  title: string;
  slug: string;
  audience: string;
  duration: string;
  format: string;
  tools: string[];
  outcomes: string[];
  aicte: boolean;
  order: number;
  excerpt: string;
}

export interface BlogFrontmatter {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  author: string;
}

export interface MDXFile<T> {
  frontmatter: T;
  content: string;
  slug: string;
}

function readMDXDir<T>(dir: string): MDXFile<T>[] {
  const fullDir = path.join(contentRoot, dir);
  if (!fs.existsSync(fullDir)) return [];
  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(fullDir, file), "utf-8");
    const { data, content } = matter(raw);
    return { frontmatter: data as T, content, slug };
  });
}

export function getAllPrograms(): MDXFile<ProgramFrontmatter>[] {
  const programs = readMDXDir<ProgramFrontmatter>("programs");
  return programs.sort(
    (a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99)
  );
}

export function getProgramBySlug(
  slug: string
): MDXFile<ProgramFrontmatter> | null {
  const programs = readMDXDir<ProgramFrontmatter>("programs");
  return programs.find((p) => p.slug === slug) ?? null;
}

export function getAllBlogPosts(): MDXFile<BlogFrontmatter>[] {
  const posts = readMDXDir<BlogFrontmatter>("blog");
  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getBlogPostBySlug(
  slug: string
): MDXFile<BlogFrontmatter> | null {
  const posts = readMDXDir<BlogFrontmatter>("blog");
  return posts.find((p) => p.slug === slug) ?? null;
}
