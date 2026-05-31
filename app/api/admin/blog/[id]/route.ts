import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { adminGetBlogPost, adminUpdateBlogPost, adminDeleteBlogPost } from "@/lib/content";

function isAuthed(req: NextRequest) {
  return req.cookies.get("cosmolearn_admin")?.value === process.env.ADMIN_SECRET;
}

interface Props { params: { id: string } }

export async function GET(req: NextRequest, { params }: Props) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const post = await adminGetBlogPost(params.id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: Props) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const post = await adminUpdateBlogPost(params.id, body);
  revalidatePath("/blog", "page");
  revalidatePath(`/blog/${post.slug}`, "page");
  return NextResponse.json(post);
}

export async function DELETE(req: NextRequest, { params }: Props) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const existing = await adminGetBlogPost(params.id);
  await adminDeleteBlogPost(params.id);
  revalidatePath("/blog", "page");
  if (existing) revalidatePath(`/blog/${existing.slug}`, "page");
  return NextResponse.json({ ok: true });
}
