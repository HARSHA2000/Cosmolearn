import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { adminGetAllBlogPosts, adminCreateBlogPost } from "@/lib/content";

function isAuthed(req: NextRequest) {
  return req.cookies.get("cosmolearn_admin")?.value === process.env.ADMIN_SECRET;
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const posts = await adminGetAllBlogPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();

  const post = await adminCreateBlogPost({
    title: body.title,
    slug: body.slug,
    date: body.date,
    excerpt: body.excerpt ?? "",
    tags: body.tags ?? [],
    author: body.author ?? "Harshith",
    content: body.content ?? "",
    published: body.published ?? false,
  });

  revalidatePath("/blog", "page");
  revalidatePath(`/blog/${post.slug}`, "page");
  return NextResponse.json(post, { status: 201 });
}
