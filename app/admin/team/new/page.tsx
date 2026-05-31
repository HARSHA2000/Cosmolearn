import { TeamMemberForm } from "../TeamMemberForm";

export default function NewTeamMemberPage() {
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-white font-display font-bold text-2xl mb-8">New Team Member</h1>
      <TeamMemberForm />
    </div>
  );
}
