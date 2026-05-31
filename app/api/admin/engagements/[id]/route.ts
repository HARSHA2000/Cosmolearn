import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminUpdateCollegeEngagement, adminDeleteCollegeEngagement } from "@/lib/content";

function isAuthed() {
  return cookies().get("cosmolearn_admin")?.value === process.env.ADMIN_SECRET;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const engagement = await adminUpdateCollegeEngagement(id, body);
  return NextResponse.json(engagement);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await adminDeleteCollegeEngagement(id);
  return new NextResponse(null, { status: 204 });
}
