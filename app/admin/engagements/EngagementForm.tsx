"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DbCollegeEngagement } from "@/lib/content";

interface Props { engagement?: DbCollegeEngagement }

export function EngagementForm({ engagement }: Props) {
  const router = useRouter();
  const isEdit = !!engagement;

  const [form, setForm] = useState({
    name: engagement?.name ?? "",
    order: engagement?.order ?? 99,
    published: engagement?.published ?? true,
  });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.type === "checkbox"
        ? e.target.checked
        : e.target.type === "number" ? Number(e.target.value) : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const url = isEdit ? `/api/admin/engagements/${engagement!.id}` : "/api/admin/engagements";
    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) { router.push("/admin/engagements"); router.refresh(); }
    else { const d = await res.json().catch(() => ({})); setError(d.error ?? "Failed to save."); setSaving(false); }
  }

  async function handleDelete() {
    if (!engagement || !confirm("Delete this college engagement?")) return;
    setDeleting(true);
    await fetch(`/api/admin/engagements/${engagement.id}`, { method: "DELETE" });
    router.push("/admin/engagements");
    router.refresh();
  }

  const inputCls = "w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent";
  const labelCls = "block text-sm font-medium text-slate-300 mb-1.5";

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label className={labelCls}>College Name *</label>
          <input
            required
            className={inputCls}
            value={form.name}
            onChange={set("name")}
            placeholder="e.g. BMS College of Engineering"
          />
        </div>

        <div>
          <label className={labelCls}>Display Order</label>
          <input type="number" className={inputCls} value={form.order} onChange={set("order")} min={1} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" id="published" checked={form.published} onChange={set("published")} className="w-4 h-4 accent-amber-500" />
        <label htmlFor="published" className="text-sm text-slate-300">
          Published <span className="text-slate-500">(uncheck to hide from homepage)</span>
        </label>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={saving} className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg text-sm transition-colors disabled:opacity-60">
          {saving ? "Saving…" : isEdit ? "Save Changes" : "Add College"}
        </button>
        <button type="button" onClick={() => router.push("/admin/engagements")} className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors">
          Cancel
        </button>
        {isEdit && (
          <button type="button" onClick={handleDelete} disabled={deleting} className="px-6 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm transition-colors ml-auto disabled:opacity-60">
            {deleting ? "Deleting…" : "Delete"}
          </button>
        )}
      </div>
    </form>
  );
}
