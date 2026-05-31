import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminGetAllCollegeEngagements, adminCreateCollegeEngagement } from "@/lib/content";

function isAuthed() {
  return cookies().get("cosmolearn_admin")?.value === process.env.ADMIN_SECRET;
}

export async function GET() {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const engagements = await adminGetAllCollegeEngagements();
  return NextResponse.json(engagements);
}

export async function POST(req: NextRequest) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const engagement = await adminCreateCollegeEngagement(body);
  return NextResponse.json(engagement, { status: 201 });
}
