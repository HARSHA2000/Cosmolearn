import Link from "next/link";
import { adminGetAllPrograms } from "@/lib/content";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminProgramsPage() {
  const programs = await adminGetAllPrograms();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white font-display font-bold text-2xl">Programs</h1>
          <p className="text-slate-400 text-sm mt-1">{programs.length} total</p>
        </div>
        <Link
          href="/admin/programs/new"
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg text-sm transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Program
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {programs.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm">
            No programs yet.{" "}
            <Link href="/admin/programs/new" className="text-amber-400 hover:underline">
              Create your first program →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-3 font-medium">Title</th>
                <th className="text-left px-6 py-3 font-medium">Audience</th>
                <th className="text-left px-6 py-3 font-medium">Duration</th>
                <th className="text-left px-6 py-3 font-medium">Order</th>
                <th className="text-left px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {programs.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{p.title}</span>
                    <span className="text-slate-500 text-xs block mt-0.5">/programs/{p.slug}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{p.audience || "—"}</td>
                  <td className="px-6 py-4 text-slate-400">{p.duration || "—"}</td>
                  <td className="px-6 py-4 text-slate-400">{p.order}</td>
                  <td className="px-6 py-4">
                    {p.published ? (
                      <span className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                        <Eye className="h-3.5 w-3.5" /> Published
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                        <EyeOff className="h-3.5 w-3.5" /> Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/programs/${p.id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-md text-xs font-medium transition-colors ml-auto w-fit"
                    >
                      <Pencil className="h-3 w-3" /> Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
