import { notFound } from "next/navigation";
import { adminGetProgram } from "@/lib/content";
import { ProgramForm } from "../ProgramForm";

export default async function EditProgramPage({ params }: { params: { id: string } }) {
  const program = await adminGetProgram(params.id);
  if (!program) notFound();

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-white font-display font-bold text-2xl mb-8">Edit Program</h1>
      <ProgramForm program={program} />
    </div>
  );
}
