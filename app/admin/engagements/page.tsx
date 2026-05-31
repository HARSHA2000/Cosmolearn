import Link from "next/link";
import { adminGetAllCollegeEngagements } from "@/lib/content";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EngagementsPage() {
  const engagements = await adminGetAllCollegeEngagements();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white font-display font-bold text-2xl">College Engagements</h1>
          <p className="text-slate-400 text-sm mt-1">Shown as &ldquo;Past engagements include&rdquo; on the homepage.</p>
        </div>
        <Link
          href="/admin/engagements/new"
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg text-sm transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add College
        </Link>
      </div>

      {engagements.length === 0 ? (
        <p className="text-slate-500 text-sm">No colleges yet. Add one to display on the homepage.</p>
      ) : (
        <div className="space-y-2">
          {engagements.map((e) => (
            <Link
              key={e.id}
              href={`/admin/engagements/${e.id}`}
              className="flex items-center justify-between px-5 py-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-slate-600 text-xs font-mono w-6 text-right">{e.order}</span>
                <span className="text-white font-medium text-sm">{e.name}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${e.published ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-700 text-slate-400"}`}>
                {e.published ? "Published" : "Hidden"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
