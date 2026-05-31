import { ProgramForm } from "../ProgramForm";

export default function NewProgramPage() {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-white font-display font-bold text-2xl mb-8">New Program</h1>
      <ProgramForm />
    </div>
  );
}
