import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { adminGetAllTestimonials, adminCreateTestimonial } from "@/lib/content";

function isAuthed(req: NextRequest) {
  return req.cookies.get("cosmolearn_admin")?.value === process.env.ADMIN_SECRET;
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = await adminGetAllTestimonials();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();

  const item = await adminCreateTestimonial({
    quote: body.quote,
    name: body.name,
    designation: body.designation ?? "",
    college: body.college ?? "",
    initials: body.initials ?? body.name?.charAt(0).toUpperCase() ?? "",
    order: body.order ?? 99,
    published: body.published ?? true,
  });

  revalidatePath("/", "page");
  return NextResponse.json(item, { status: 201 });
}
