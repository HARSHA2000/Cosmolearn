import { notFound } from "next/navigation";
import { adminGetCollegeEngagement } from "@/lib/content";
import { EngagementForm } from "../EngagementForm";

export const dynamic = "force-dynamic";

export default async function EditEngagementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const engagement = await adminGetCollegeEngagement(id);
  if (!engagement) notFound();

  return (
    <div className="p-8 max-w-lg">
      <h1 className="text-white font-display font-bold text-2xl mb-8">Edit College Engagement</h1>
      <EngagementForm engagement={engagement} />
    </div>
  );
}
