import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { adminGetAllPrograms, adminCreateProgram } from "@/lib/content";

function isAuthed(req: NextRequest) {
  return req.cookies.get("cosmolearn_admin")?.value === process.env.ADMIN_SECRET;
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const programs = await adminGetAllPrograms();
  return NextResponse.json(programs);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();

  const program = await adminCreateProgram({
    title: body.title,
    slug: body.slug,
    audience: body.audience ?? "",
    duration: body.duration ?? "",
    format: body.format ?? "",
    tools: body.tools ?? [],
    outcomes: body.outcomes ?? [],
    aicte: body.aicte ?? false,
    order: body.order ?? 99,
    excerpt: body.excerpt ?? "",
    content: body.content ?? "",
    published: body.published ?? false,
  });

  revalidatePath("/programs", "page");
  revalidatePath(`/programs/${program.slug}`, "page");
  return NextResponse.json(program, { status: 201 });
}
