import type { Metadata } from "next";
import { getAllPrograms } from "@/lib/mdx";
import { ProgramCard } from "@/components/programs/ProgramCard";

export const metadata: Metadata = {
  title: "AI/ML Training Programs for Engineering Colleges",
  description:
    "Browse all workshop and FDP programs: Generative AI, Computer Vision Bootcamp, Faculty Development Program, and MLOps Deployment. AICTE-eligible. Based in Bengaluru.",
  alternates: { canonical: "/programs" },
};

export default function ProgramsPage() {
  const programs = getAllPrograms();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-slate-950 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Training Programs
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Four flagship programs designed around real industry tools and
            deliverable projects. Each is calibrated to a specific audience and
            outcome.
          </p>
        </div>
      </div>

      {/* Programs grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program) => (
            <ProgramCard
              key={program.slug}
              program={program.frontmatter}
              slug={program.slug}
            />
          ))}
        </div>

        {/* Custom request note */}
        <div className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center">
          <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
            Need a Custom Program?
          </h3>
          <p className="text-slate-500 text-sm mb-4 max-w-xl mx-auto">
            Don&apos;t see exactly what you need? Every engagement starts with a
            conversation. Share your batch details and I&apos;ll design a program
            specific to your curriculum, student level, and available time.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-md hover:bg-slate-800 transition-colors"
          >
            Request a Custom Proposal
          </a>
        </div>
      </div>
    </div>
  );
}
