import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { adminUpdateTeamMember, adminDeleteTeamMember } from "@/lib/content";

function isAuthed(req: NextRequest) {
  return req.cookies.get("cosmolearn_admin")?.value === process.env.ADMIN_SECRET;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const item = await adminUpdateTeamMember(id, body);
  revalidatePath("/about", "page");
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await adminDeleteTeamMember(id);
  revalidatePath("/about", "page");
  return NextResponse.json({ ok: true });
}
