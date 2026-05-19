import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, type Lead } from "@/lib/supabase";
import {
  sendTrainerNotification,
  sendAcknowledgementEmail,
} from "@/lib/resend";

export async function POST(req: NextRequest) {
  let body: Lead;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const required: (keyof Lead)[] = [
    "full_name",
    "college_name",
    "email",
    "designation",
    "phone",
    "program_interest",
    "student_count",
  ];

  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();

    const { error: dbError } = await supabase.from("leads").insert([
      {
        full_name: body.full_name,
        designation: body.designation,
        college_name: body.college_name,
        city: body.city,
        email: body.email,
        phone: body.phone,
        program_interest: body.program_interest,
        student_count: body.student_count,
        preferred_month: body.preferred_month || null,
        notes: body.notes || null,
        status: "new",
      },
    ]);

    if (dbError) {
      console.error("[leads] Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Failed to save your request. Please try again." },
        { status: 500 }
      );
    }

    // Fire emails concurrently — don't block the response on email failures
    await Promise.allSettled([
      sendTrainerNotification(body),
      sendAcknowledgementEmail(body),
    ]);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[leads] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
