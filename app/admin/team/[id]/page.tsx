import { notFound } from "next/navigation";
import { adminGetTeamMember } from "@/lib/content";
import { TeamMemberForm } from "../TeamMemberForm";

export const dynamic = "force-dynamic";

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await adminGetTeamMember(id);
  if (!member) notFound();

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-white font-display font-bold text-2xl mb-8">Edit Team Member</h1>
      <TeamMemberForm member={member} />
    </div>
  );
}
