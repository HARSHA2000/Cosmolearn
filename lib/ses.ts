import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import type { Lead } from "./supabase";

function getSES() {
  return new SESClient({
    region: process.env.AWS_SES_REGION || "ap-south-1",
    credentials: {
      accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY!,
    },
  });
}

const FROM = () => process.env.SES_FROM_EMAIL || "noreply@cosmoverge.in";
const TRAINER_EMAIL = () =>
  process.env.TRAINER_NOTIFICATION_EMAIL || "harshith@cosmoverge.in";

async function sendEmail(to: string, subject: string, html: string) {
  const cmd = new SendEmailCommand({
    Source: FROM(),
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: subject, Charset: "UTF-8" },
      Body: { Html: { Data: html, Charset: "UTF-8" } },
    },
  });
  return getSES().send(cmd);
}

export async function sendTrainerNotification(lead: Lead) {
  return sendEmail(
    TRAINER_EMAIL(),
    `New Proposal Request — ${lead.college_name} (${lead.program_interest})`,
    `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#0f172a;border-bottom:2px solid #f59e0b;padding-bottom:8px;">
          New Lead: ${lead.college_name}
        </h2>
        <table style="width:100%;border-collapse:collapse;margin-top:16px;">
          <tr><td style="padding:8px 0;color:#64748b;width:160px;">Name</td><td style="padding:8px 0;font-weight:600;color:#0f172a;">${lead.full_name}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Designation</td><td style="padding:8px 0;color:#0f172a;">${lead.designation}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">College</td><td style="padding:8px 0;font-weight:600;color:#0f172a;">${lead.college_name}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">City</td><td style="padding:8px 0;color:#0f172a;">${lead.city}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Email</td><td style="padding:8px 0;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Phone</td><td style="padding:8px 0;color:#0f172a;">${lead.phone}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Program</td><td style="padding:8px 0;font-weight:600;color:#d97706;">${lead.program_interest}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Student Count</td><td style="padding:8px 0;color:#0f172a;">${lead.student_count}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Preferred Month</td><td style="padding:8px 0;color:#0f172a;">${lead.preferred_month || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;vertical-align:top;">Notes</td><td style="padding:8px 0;color:#0f172a;">${lead.notes || "—"}</td></tr>
        </table>
        <div style="margin-top:24px;padding:12px 16px;background:#fef3c7;border-radius:8px;border-left:4px solid #f59e0b;">
          <p style="margin:0;font-size:13px;color:#92400e;">Reply within 24 hours with a customized program proposal.</p>
        </div>
      </div>
    `
  );
}

export async function sendAcknowledgementEmail(lead: Lead) {
  return sendEmail(
    lead.email,
    `Got your request, ${lead.full_name.split(" ")[0]}! — CosmoLearn`,
    `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#0f172a;padding:24px 32px;border-radius:12px 12px 0 0;">
          <h1 style="color:#f59e0b;font-size:22px;margin:0;">Thanks for reaching out!</h1>
          <p style="color:#94a3b8;margin:8px 0 0;">CosmoLearn | AI/ML Training, Bengaluru</p>
        </div>
        <div style="background:#fff;padding:24px 32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">
          <p style="color:#0f172a;font-size:16px;">Hi ${lead.full_name.split(" ")[0]},</p>
          <p style="color:#475569;line-height:1.6;">
            I've received your proposal request for <strong>${lead.college_name}</strong>.
            I'll review the details and get back to you within <strong>24 hours</strong>
            with a customised program proposal tailored to your batch.
          </p>
          <div style="background:#f8fafc;border-radius:8px;padding:16px;margin:20px 0;border-left:4px solid #f59e0b;">
            <p style="margin:0 0 8px;font-weight:600;color:#0f172a;">Your Request Summary</p>
            <p style="margin:0;color:#475569;font-size:14px;">
              Program: <strong>${lead.program_interest}</strong><br/>
              Students: <strong>${lead.student_count}</strong><br/>
              Preferred Month: <strong>${lead.preferred_month || "Flexible"}</strong>
            </p>
          </div>
          <p style="color:#475569;line-height:1.6;">
            In the meantime, feel free to browse the
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/programs" style="color:#d97706;">program details</a>
            or reach me directly at
            <a href="mailto:harshith@cosmoverge.in" style="color:#d97706;">harshith@cosmoverge.in</a>.
          </p>
          <p style="color:#0f172a;margin-top:24px;">
            Talk soon,<br/>
            <strong>Harshith Kulkarni</strong><br/>
            <span style="color:#64748b;font-size:13px;">Founder, CosmoLearn | Cosmoverge, Bengaluru</span>
          </p>
        </div>
      </div>
    `
  );
}
