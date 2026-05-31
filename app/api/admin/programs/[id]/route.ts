import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { adminGetProgram, adminUpdateProgram, adminDeleteProgram } from "@/lib/content";

function isAuthed(req: NextRequest) {
  return req.cookies.get("cosmolearn_admin")?.value === process.env.ADMIN_SECRET;
}

interface Props { params: { id: string } }

export async function GET(req: NextRequest, { params }: Props) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const program = await adminGetProgram(params.id);
  if (!program) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(program);
}

export async function PUT(req: NextRequest, { params }: Props) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const program = await adminUpdateProgram(params.id, body);
  revalidatePath("/programs", "page");
  revalidatePath(`/programs/${program.slug}`, "page");
  return NextResponse.json(program);
}

export async function DELETE(req: NextRequest, { params }: Props) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const existing = await adminGetProgram(params.id);
  await adminDeleteProgram(params.id);
  revalidatePath("/programs", "page");
  if (existing) revalidatePath(`/programs/${existing.slug}`, "page");
  return NextResponse.json({ ok: true });
}
