import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { adminGetAllTeamMembers, adminCreateTeamMember } from "@/lib/content";

function isAuthed(req: NextRequest) {
  return req.cookies.get("cosmolearn_admin")?.value === process.env.ADMIN_SECRET;
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = await adminGetAllTeamMembers();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();

  const item = await adminCreateTeamMember({
    name: body.name,
    role: body.role ?? "instructor",
    specialization: body.specialization ?? "",
    bio: body.bio ?? "",
    tags: body.tags ?? [],
    photo_url: body.photo_url ?? "",
    order: body.order ?? 99,
    published: body.published ?? true,
  });

  revalidatePath("/about", "page");
  return NextResponse.json(item, { status: 201 });
}
